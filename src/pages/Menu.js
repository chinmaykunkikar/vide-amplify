import React, { useState } from 'react'
import { AppBar, Button, IconButton, Link, Toolbar } from '@material-ui/core'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined'
import { Link as RouterLink } from 'react-router-dom'
import Signout from '../components/Signout'
import authHelper from '../utils/authHelper'

const Menu = () => {
  const [isSignedin] = useState(authHelper.isAuthenticated())
  return (
    <AppBar position='static'>
      <Toolbar>
        <div>
          <Link component={RouterLink} to='/'>
            <IconButton>
              <HomeOutlinedIcon color='secondary' />
            </IconButton>
          </Link>
        </div>
        <div style={{ position: 'absolute', right: '12px' }}>
          <span style={{ float: 'right' }}>
            {!isSignedin && (
              <span>
                <Link component={RouterLink} to='/signin'>
                  <Button
                    color='secondary'
                    variant='outlined'
                    style={{ margin: '8px' }}>
                    Sign In
                  </Button>
                </Link>
              </span>
            )}
            {isSignedin && (
              <span>
                <Link component={RouterLink} to='/videos/new'>
                  <Button
                    color='secondary'
                    variant='outlined'
                    style={{ margin: '8px' }}
                    startIcon={
                      <VideoCallOutlinedIcon style={{ marginRight: '8px' }} />
                    }>
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
