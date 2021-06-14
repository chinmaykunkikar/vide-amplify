import React, { useEffect, useState } from 'react'
import { DataStore } from '@aws-amplify/datastore'
import {
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import Avatar from 'boring-avatars'
import { useParams } from 'react-router'
import { Replay } from 'vimond-replay'
import 'vimond-replay/index.css'
import HlsjsVideoStreamer from 'vimond-replay/video-streamer/hlsjs'
import { Video } from '../../models'
import VideoList from './VideoList'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 5),
    minHeight: '100vh'
  },
  player: {
    '& .replay': {
      marginTop: theme.spacing(2),
    },
  },
  meta: {
    marginBottom: theme.spacing(2),
  },
  videoTitle: {
    marginTop: theme.spacing(2),
  },
  avatarStyles: {
    '& .MuiListItemAvatar-root': {
      minWidth: theme.spacing(6),
    },
  },
  description: { padding: theme.spacing(0, 6) },
}))

const VideoContent = props => {
  const classes = useStyles()
  const { videoId } = useParams()

  const [videoURL, setVideoURL] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [videoDescription, setVideoDescription] = useState('')
  const [videoAuthor, setVideoAuthor] = useState('')
  const [videoDateTime, setvideoDateTime] = useState('')

  useEffect(() => {
    const getVideo = async () => {
      const video = await DataStore.query(Video, videoId)
      setVideoURL(video.resourceURI)
      setVideoTitle(video.title)
      setVideoAuthor(video.author)
      setVideoDescription(video.description)
      setvideoDateTime(new Date(Date.parse(video.createdAt)).toDateString())
    }
    getVideo()
  }, [videoId])
  return (
    <Paper className={classes.root} elevation={0} square>
      <Grid container alignItems='flex-start'>
        <Grid item xs={12} md={8}>
          <Replay
            style={{
              marginTop: '16px',
            }}
            source={videoURL}
            options={{
              controls: {
                includeControls: [
                  'playPauseButton',
                  'timeline',
                  'timeDisplay',
                  'qualitySelector',
                  'fullscreenButton',
                  'bufferingIndicator',
                  'playbackMonitor',
                ],
              },
              keyboardShortcuts: {
                keyMap: {
                  togglePause: [' '],
                },
              },
            }}>
            <HlsjsVideoStreamer />
          </Replay>
          <div className={classes.meta}>
            <Typography
              className={classes.videoTitle}
              variant='h6'
              color='textPrimary'>
              {videoTitle}
            </Typography>
            <Divider />
            <ListItem
              component='div'
              className={classes.avatarStyles}
              disableGutters>
              <ListItemAvatar>
                <Avatar
                  size={40}
                  name={videoAuthor}
                  variant='pixel'
                  colors={[
                    '#A840A0',
                    '#FFCA1B',
                    '#93D951',
                    '#28598F',
                    '#FF5723',
                  ]}
                />
              </ListItemAvatar>
              <ListItemText
                primary={videoAuthor}
                secondary={videoDateTime}
                primaryTypographyProps={{ variant: 'subtitle2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </ListItem>
            <Typography className={classes.description} variant='body2'>
              {videoDescription}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <VideoList cols={1} currentVideo={videoId} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default VideoContent
