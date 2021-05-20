#!/usr/bin/env bash
START_TIME=$SECONDS
set -e

echo "-----START GENERATING HLS STREAM-----"
# Usage create-vod-hls.sh SOURCE_FILE [OUTPUT_NAME]
[[ ! "${1}" ]] && echo "Usage: create-vod-hls.sh SOURCE_FILE [OUTPUT_NAME]" && exit 1

# comment/add lines here to control which renditions would be created
renditions=(
# resolution  bitrate  audio-rate
  "426x240    400k    128k"
  "640x360    800k     128k"
  "842x480    1400k    192k"
  "1280x720   2800k    192k"
  "1920x1080  5000k    256k"
)

segment_target_duration=10       # try to create a new segment every 10 seconds
max_bitrate_ratio=1.07          # maximum accepted bitrate fluctuations
rate_monitor_buffer_ratio=1.5   # maximum buffer size between bitrate conformance checks

#########################################################################

source="${1}"
target="${2}"
if [[ ! "${target}" ]]; then
  target="${source##*/}" # leave only last component of path
  target="${target%.*}"  # strip extension
fi
mkdir -p ${target}

# ----CUSTOM----
sourceResolution="$(/opt/ffmpeg/ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${source})"
# echo ${sourceResolution}
arrIN=(${sourceResolution//x/ })
sourceWidth="${arrIN[0]}"
sourceHeight="${arrIN[1]}"

echo ${sourceWidth}
echo ${sourceHeight}

sourceAudioBitRate="$(/opt/ffmpeg/ffprobe -v error -select_streams a:0 -show_entries stream=bit_rate -of csv=s=x:p=0 ${source})"
sourceAudioBitRateFormatted=$((sourceAudioBitRate / 1000))
# ----END CUSTOM----

key_frames_interval="$(echo `/opt/ffmpeg/ffprobe ${source} 2>&1 | grep -oE '[[:digit:]]+(.[[:digit:]]+)? fps' | grep -oE '[[:digit:]]+(.[[:digit:]]+)?'`*2 | /opt/bc || echo '')"
key_frames_interval=${key_frames_interval:-50}
key_frames_interval=$(echo `printf "%.1f\n" $(/opt/bc -l <<<"$key_frames_interval/10")`*10 | /opt/bc) # round
key_frames_interval=${key_frames_interval%.*} # truncate to integer

# static parameters that are similar for all renditions
static_params="-c:a aac -ar 48000 -c:v h264 -profile:v main -crf 19 -sc_threshold 0"
static_params+=" -g ${key_frames_interval} -keyint_min ${key_frames_interval} -hls_time ${segment_target_duration}"
static_params+=" -hls_playlist_type vod"

# misc params
misc_params="-hide_banner -y"

master_playlist="#EXTM3U
#EXT-X-VERSION:3
"
cmd=""
resolutionValid=0
prevHeight=0
for rendition in "${renditions[@]}"; do
  # drop extraneous spaces
  rendition="${rendition/[[:space:]]+/ }"

  # rendition fields
  resolution="$(echo ${rendition} | cut -d ' ' -f 1)"
  bitrate="$(echo ${rendition} | cut -d ' ' -f 2)"
  audiorate="$(echo ${rendition} | cut -d ' ' -f 3)"

  audioBitRateFormatted=${audiorate%?} # remove "k" at the last index

  # take highest possible audio bit rate
  if [ $audioBitRateFormatted -gt $sourceAudioBitRateFormatted ]; then
      audiorate=${sourceAudioBitRateFormatted}k
  fi

  # calculated fields
  width="$(echo ${resolution} | grep -oE '^[[:digit:]]+')"
  height="$(echo ${resolution} | grep -oE '[[:digit:]]+$')"
  maxrate="$(echo "`echo ${bitrate} | grep -oE '[[:digit:]]+'`*${max_bitrate_ratio}" | /opt/bc)"
  bufsize="$(echo "`echo ${bitrate} | grep -oE '[[:digit:]]+'`*${rate_monitor_buffer_ratio}" | /opt/bc)"
  bandwidth="$(echo ${bitrate} | grep -oE '[[:digit:]]+')000"
  name="${height}p"
  
  if [ $sourceHeight -le $prevHeight ]; then
      echo "video source has height smaller than output height (${height})"
      break
  fi

  widthParam=0
  heightParam=0

  if [ $(((width / sourceWidth) * sourceHeight)) -gt $height ]; then
    widthParam=-2
    heightParam=$height
  else
    widthParam=$width
    heightParam=-2
  fi
  
  cmd+=" ${static_params} -vf scale=w=${widthParam}:h=${heightParam}"
  cmd+=" -b:v ${bitrate} -maxrate ${maxrate%.*}k -bufsize ${bufsize%.*}k -b:a ${audiorate}"
  cmd+=" -hls_segment_filename ${target}/${name}_%03d.ts ${target}/${name}.m3u8"
  
  # add rendition entry in the master playlist
  master_playlist+="#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n${name}.m3u8\n"

  resolutionValid=1
  prevHeight=${height}
done

if [ $resolutionValid -eq 1 ]; then
  # start conversion
  echo -e "Executing command:\nffmpeg ${misc_params} -i ${source} ${cmd}\n"
  /opt/ffmpeg/ffmpeg ${misc_params} -i ${source} ${cmd}
  # create master playlist file
  echo -e "${master_playlist}" > ${target}/playlist.m3u8
  echo "Done - encoded HLS is at ${target}/"
else
  echo "Video source is too small"
  exit 1
fi

ELAPSED_TIME=$(($SECONDS - $START_TIME))

echo "Elapsed time: ${ELAPSED_TIME}"
echo "-----FINISH GENERATING HLS STREAM-----"

