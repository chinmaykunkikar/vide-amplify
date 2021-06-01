import React from 'react'
import { Amplify, Storage } from 'aws-amplify'
import { GridList, makeStyles } from '@material-ui/core'
import awsconfig from '../aws-exports'
import VideoTileSkeleton from '../components/VideoTileSkeleton'
Amplify.configure(awsconfig)

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%',
    height: 'auto',
    overflowY: 'auto',
  },
}))

const VideoList = props => {
  const classes = useStyles()

  const displayList = () => {
    Storage.list('output')
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  return (
    <div className={classes.root}>
      <GridList cols={4}>
        {Array(8)
          .fill(1)
          .map((tile, i) => (
            <VideoTileSkeleton key={i} />
          ))}
      </GridList>
    </div>
  )
}

export default VideoList
