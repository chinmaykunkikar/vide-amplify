import { Box, Divider, makeStyles, Paper, Typography } from '@material-ui/core'
import Avatar from 'boring-avatars'
import VideoList from 'pages/video/VideoList'
import React, { useContext } from 'react'
import { colors } from 'utils/avatar-colors'
import { UserContext } from 'utils/UserContext'
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 1),
    minHeight: '100vh',
  },

  userInfo: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    boxSizing: 'border-box',
    textAlign: 'left',
    alignItems: 'center',
    padding: theme.spacing(6, 3),
    justifyContent: 'flex-start',
    textDecoration: 'none',
  },

  avatar: {
    flexShrink: 0,
    minWidth: theme.spacing(9),
  },

  text: {
    margin: theme.spacing(1, 0),
    flex: '1 1 auto',
    color: '#323232',
  },

  divider: {
    marginBottom: theme.spacing(2),
  },
}))

const UserProfile = () => {
  const classes = useStyles()
  const { username, name, email } = useContext(UserContext)

  return (
    <Paper component='main' className={classes.paper} elevation={0} square>
      <Box className={classes.userInfo}>
        <Box className={classes.avatar}>
          <Avatar size={64} name={username} variant='pixel' colors={colors} />
        </Box>
        <Box className={classes.text}>
          <Typography variant='h4' display='block'>
            {name}
          </Typography>
          <Typography variant='caption' display='block'>
            <Box fontSize={'1rem'}>{email}</Box>
          </Typography>
        </Box>
      </Box>
      <Divider className={classes.divider} />
      <VideoList username={username} />
    </Paper>
  )
}

export default UserProfile
