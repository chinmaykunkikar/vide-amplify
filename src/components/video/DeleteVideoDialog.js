import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { DataStore } from 'aws-amplify'
import { Video } from 'models'
import { useHistory } from 'react-router-dom'

const DeleteVideoDialog = props => {
  const { onClose, open, videoId, ...other } = props
  let history = useHistory()

  const deleteCurrentVideo = async () => {
    const currentVideo = await DataStore.query(Video, videoId)
    DataStore.delete(currentVideo).then(() => history.push('/'))
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='xs'
        {...other}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Delete video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Permanently delete your video?
            You can’t undo this.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={deleteCurrentVideo} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteVideoDialog
