import React from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import VideoList from './video/VideoList'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(5, 4),
    paddingBottom: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}))

const Home = props => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title} variant='overline' component='div'>
        <Box letterSpacing={2} fontSize={16}>
          Popular Videos
        </Box>
      </Typography>
      <VideoList />
    </Paper>
  )
}

export default Home
