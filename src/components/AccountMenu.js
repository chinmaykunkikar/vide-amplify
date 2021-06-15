import React, { useContext, useState } from 'react'
import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core'
import { Auth } from 'aws-amplify'
import Avatar from 'boring-avatars'
import { UserContext } from 'utils/UserContext'

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
          <Avatar
            size={32}
            name={username}
            variant='pixel'
            colors={['#A840A0', '#FFCA1B', '#93D951', '#28598F', '#FF5723']}
          />
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
          <MenuItem divider disabled>
            Hey, {name}!
          </MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={logOut}>Logout</MenuItem>
        </Menu>
    </>
  )
}

export default AccountMenu
