import React, { useEffect, useState } from 'react'
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Link,
  makeStyles,
} from '@material-ui/core'
import { Amplify, DataStore } from 'aws-amplify'
import ReactPlayer from 'react-player'
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
  gridList: {
    width: '100%',
    height: 'auto',
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

  const setVideoList = async () => {
    const list = await DataStore.query(Video)
    updateVideoList(list)
  }

  const getCols = () => {
    switch (width) {
      case 'xs':
        return 1
      case 'sm':
        return 2
      case 'md':
        return 3
      case 'lg':
        return 4
      case 'xl':
        return 5
      default:
        return 4
    }
  }

  useEffect(() => {
    setVideoList()
  }, [])

  return (
    <div className={classes.root}>
      <GridList cols={getCols()} spacing={8}>
        {videoList.map(tile => (
          <GridListTile className={classes.gridList} key={tile.id}>
            <Link component={RouterLink} to={`/video/${tile.id}`}>
              <ReactPlayer url={tile.resourceURI} width='auto' height='auto' />
            </Link>
            <GridListTileBar
              className={classes.tileBar}
              title={
                <Link
                  className={classes.tileTitle}
                  component={RouterLink}
                  to={`/video/${tile.id}`}
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
