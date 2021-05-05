import React from 'react'
import { Card, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    margin: `${theme.spacing(5)}px 30px`,
  },
  title: {
    padding: `${theme.spacing(2)}px`,
    color: theme.palette.text.secondary,
    fontSize: '1em',
  },
}))

function Home(props) {
  const classes = useStyles()
  
  return (
    <Card className={classes.card}>
      <Typography variant='h2' className={classes.title}>
        Popular Videos
      </Typography>
    </Card>
  )
}

export default Home
