import React from 'react'
import { Box, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(5, 4),
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
    </Paper>
  )
}

export default Home
