import React, { useEffect, useState } from 'react'
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Link,
  makeStyles,
} from '@material-ui/core'
import { Amplify, DataStore } from 'aws-amplify'
import { Link as RouterLink } from 'react-router-dom'
import awsconfig from '../../aws-exports'
import { Video } from '../../models'
import { useWidth } from '../../utils/theme'

Amplify.configure(awsconfig)

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: theme.spacing(1, 2),
  },
  tileBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
    '& .MuiGridListTileBar-titleWrap': {
      margin: theme.spacing(0, 1.2),
    },
  },
  tileTitle: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.grey[100],
  },
}))

const VideoList = props => {
  const classes = useStyles()
  const [videoList, updateVideoList] = useState([])
  const width = useWidth()

  DataStore.start().catch(() => {
    DataStore.clear().then(() => {
      DataStore.start()
    })
  })

  const setVideoList = async () => {
    const list = await DataStore.query(Video)
    updateVideoList(list)
  }

  const getCols = () => {
    switch (width) {
      case 'xs':
        return 1
      case 'sm':
        return videoList.length < 2 ? videoList.length : 2
      case 'md':
        return videoList.length < 3 ? videoList.length : 3
      case 'lg':
        return videoList.length < 4 ? videoList.length : 4
      case 'xl':
        return videoList.length < 5 ? videoList.length : 5
      default:
        return 4
    }
  }

  useEffect(() => {
    setVideoList()
  }, [])

  return (
    <div className={classes.root}>
      <GridList cols={props.cols || getCols()} spacing={8}>
        {videoList
          .filter(currentVideo => currentVideo.id !== props.currentVideo)
          .map(tile => (
            <GridListTile
              component='div'
              key={tile.id}
              style={{ height: 'auto' }}>
              <Link component={RouterLink} to={`/${tile.id}`} underline='none'>
                <img
                  src={tile.thumbnailURI}
                  alt={tile.title}
                  width='100%'
                  height='auto'
                  decoding='async'
                  loading='eager'
                />
              </Link>
              <GridListTileBar
                className={classes.tileBar}
                title={
                  <Link
                    className={classes.tileTitle}
                    component={RouterLink}
                    to={`/${tile.id}`}
                    underline='none'>
                    {tile.title}
                  </Link>
                }
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  )
}

export default VideoList
