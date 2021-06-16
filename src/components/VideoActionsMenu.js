import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core'
import {
  DeleteForeverOutlined,
  EditOutlined,
  MoreVertOutlined,
} from '@material-ui/icons'
import React, { useState } from 'react'

const VideoActionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip title='Video options'>
        <IconButton
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleMenu}
          color='disabled'>
          <MoreVertOutlined />
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
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditOutlined color='secondary'/>
          </ListItemIcon>
          <ListItemText primary='Edit details' />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteForeverOutlined color='secondary' />
          </ListItemIcon>
          <ListItemText primary='Delete video' />
        </MenuItem>
      </Menu>
    </>
  )
}

export default VideoActionsMenu
