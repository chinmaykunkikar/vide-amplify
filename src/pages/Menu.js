import React from 'react'
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <div>
          <Link to='/'>
            <IconButton>
              <HomeIcon color='secondary' />
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
