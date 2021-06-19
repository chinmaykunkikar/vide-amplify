import React, { useContext, useState } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core'
import { Auth } from 'aws-amplify'
import Avatar from 'boring-avatars'
import { UserContext } from 'contexts/UserContext'
import { Link as RouterLink } from 'react-router-dom'
import { colors } from 'utils/avatar-colors'

const AccountMenu = () => {
  const { username, name } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  async function logOut() {
    await Auth.signOut()
      .then(window.location.reload())
      .catch(error => console.log(error))
  }
  return (
    <>
      <Tooltip title='Account'>
        <IconButton
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleMenu}
          color='inherit'>
          <Avatar size={32} name={username} variant='pixel' colors={colors} />
        </IconButton>
      </Tooltip>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleClose}>
        <MenuItem component={Typography} align='center' disabled divider>
          Hey, {name}!
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={`/user/${username}`}
          onClick={handleClose}>
          My account
        </MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu
