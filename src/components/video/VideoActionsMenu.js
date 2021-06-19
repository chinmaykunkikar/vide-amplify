import React, { useState } from 'react'
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
import { useParams } from 'react-router-dom'
import EditVideoDialog from './EditVideoDialog'
import DeleteVideoDialog from './DeleteVideoDialog'

const VideoActionsMenu = () => {
  const { videoId } = useParams()

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setDialog] = useState(null)

  const openMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const openEditDialog = () => {
    setDialog('EDIT')
    closeMenu()
  }

  const openDeleteDialog = () => {
    setDialog('DELETE')
    closeMenu()
  }

  const closeDialog = () => {
    setDialog(null)
  }

  return (
    <>
      <Tooltip title='Video options'>
        <IconButton
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={openMenu}
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
        onClose={closeMenu}>
        <MenuItem onClick={openEditDialog}>
          <ListItemIcon>
            <EditOutlined color='secondary' />
          </ListItemIcon>
          <ListItemText primary='Edit details' />
        </MenuItem>
        <MenuItem onClick={openDeleteDialog}>
          <ListItemIcon>
            <DeleteForeverOutlined color='secondary' />
          </ListItemIcon>
          <ListItemText primary='Delete video' />
        </MenuItem>
        <EditVideoDialog
          open={openDialog === 'EDIT'}
          onClose={closeDialog}
          videoId={videoId}
        />
        <DeleteVideoDialog
          open={openDialog === 'DELETE'}
          onClose={closeDialog}
          videoId={videoId}
        />
      </Menu>
    </>
  )
}

export default VideoActionsMenu
