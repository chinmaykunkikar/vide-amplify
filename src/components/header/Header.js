import React, { useContext } from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Link,
  makeStyles,
  Toolbar,
  Tooltip,
} from '@material-ui/core'
import {
  AccountCircle,
  HomeOutlined,
  VideoCallOutlined as VideoAddOutlined,
} from '@material-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { UserContext } from 'utils/UserContext'
import AccountMenu from './AccountMenu'

const useStyles = makeStyles(theme => ({
  home: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const classes = useStyles()
  const { loggedIn } = useContext(UserContext)

  return (
    <AppBar position='static'>
      <Toolbar>
        <Box className={classes.home}>
          <Link component={RouterLink} to='/'>
            <Tooltip title='Home'>
              <IconButton edge='start'>
                <HomeOutlined color='secondary' />
              </IconButton>
            </Tooltip>
          </Link>
        </Box>
        {!loggedIn && (
          <span>
            <Link component={RouterLink} to='/user/login'>
              <Tooltip title='Account'>
                <IconButton>
                  <AccountCircle color='secondary' />
                </IconButton>
              </Tooltip>
            </Link>
          </span>
        )}
        {loggedIn && (
          <Box>
            <Link component={RouterLink} to='/video/new'>
              <Tooltip title='New video'>
                <IconButton>
                  <VideoAddOutlined color='secondary' />
                </IconButton>
              </Tooltip>
            </Link>
            <AccountMenu />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
