import React from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import VideoList from './video/VideoList'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 1),
    minHeight: '100vh'
  },
  title: {
    padding: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
  },
}))

const Home = () => {
  const classes = useStyles()

  return (
    <Paper component='main' className={classes.paper} elevation={0}>
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
