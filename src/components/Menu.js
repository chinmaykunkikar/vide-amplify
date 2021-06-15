import React, { useContext } from 'react'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import { HomeOutlined, VideoCallOutlined } from '@material-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { UserContext } from '../utils/UserContext'
import Signout from './Signout'

const useStyles = makeStyles(theme => ({
  actionsDiv: {
    position: 'absolute',
    right: '12px',
  },
  actions: {
    float: 'right',
  },
  button: {
    margin: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}))

const Menu = () => {
  const classes = useStyles()
  const { loggedIn } = useContext(UserContext)

  return (
    <AppBar position='static'>
      <Toolbar>
        <Box>
          <Link component={RouterLink} to='/'>
            <IconButton>
              <HomeOutlined color='secondary' />
            </IconButton>
          </Link>
        </Box>
        <div className={classes.actionsDiv}>
          <span className={classes.actions}>
            {!loggedIn && (
              <span>
                <Link component={RouterLink} to='/signin'>
                  <Button
                    color='secondary'
                    variant='outlined'
                    className={classes.button}>
                    Sign In
                  </Button>
                </Link>
              </span>
            )}
            {loggedIn && (
              <span>
                <Link component={RouterLink} to='/new'>
                  <Button
                    color='secondary'
                    variant='outlined'
                    className={classes.button}
                    startIcon={<VideoCallOutlined className={classes.icon} />}>
                    New Video
                  </Button>
                </Link>
                <Signout color='secondary' variant='outlined' />
              </span>
            )}
          </span>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
