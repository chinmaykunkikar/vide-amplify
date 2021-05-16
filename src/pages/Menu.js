import React from 'react'
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import VideoCallOutlinedIcon from '@material-ui/icons/VideoCallOutlined'
import { Link } from 'react-router-dom'
import authHelper from '../utils/authHelper'
import Signout from '../components/Signout'

const Menu = () => {
  const [isSignedin] = React.useState(authHelper.isAuthenticated())
  console.log(isSignedin)
  return (
    <AppBar position='static'>
      <Toolbar>
        <div>
          <Link to='/'>
            <IconButton>
              <HomeOutlinedIcon color='secondary' />
            </IconButton>
          </Link>
        </div>
        <div style={{ position: 'absolute', right: '12px' }}>
          <span style={{ float: 'right' }}>
            {!isSignedin && (
              <span>
                <Link to='/signin'>
                  <Button color='secondary' variant='outlined'
                    style={{ margin: '8px' }}>
                    Sign In
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button color='secondary' variant='outlined'
                    style={{ margin: '8px' }}>
                    SignUp
                  </Button>
                </Link>
              </span>
            )}
            {isSignedin && (
              <span>
                <Link to='/videos/new'>
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
