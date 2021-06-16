import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core'
import { DataStore } from 'aws-amplify'
import Avatar from 'boring-avatars'
import { Video } from 'models'
import { useParams } from 'react-router'
import { Replay } from 'vimond-replay'
import 'vimond-replay/index.css'
import HlsjsVideoStreamer from 'vimond-replay/video-streamer/hlsjs'
import VideoList from './VideoList'
import VideoActionsMenu from 'components/VideoActionsMenu'
import { UserContext } from 'utils/UserContext'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 5),
    minHeight: '100vh',
  },
  player: {
    '& .replay': {
      marginTop: theme.spacing(2),
    },
  },
  meta: {
    marginBottom: theme.spacing(2),
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  videoTitle: {
    display: 'inline-block',
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  avatarStyles: {
    '& .MuiListItemAvatar-root': {
      minWidth: theme.spacing(6),
    },
  },
  description: { padding: theme.spacing(0, 6, 2) },
}))

const VideoContent = props => {
  const classes = useStyles()
  const { videoId } = useParams()
  const { name } = useContext(UserContext)

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
          <Box className={classes.meta}>
            <Box className={classes.title}>
              <Typography
                className={classes.videoTitle}
                variant='h6'
                color='textPrimary'>
                {videoTitle}
              </Typography>
              {videoAuthor === name && <VideoActionsMenu />}
            </Box>
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
            <Divider />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <VideoList cols={1} currentVideo={videoId} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default VideoContent
