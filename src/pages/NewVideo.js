import React, { useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { BackupOutlined } from '@material-ui/icons'
import { Amplify, Storage } from 'aws-amplify'
import { Redirect } from 'react-router'
import awsconfig from '../aws-exports'

Amplify.configure(awsconfig)

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: 'middle',
  },
  textField: {
    margin: theme.spacing(1),
    width: 300,
  },
  button: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  filename: {
    margin: theme.spacing(1, 0, 0, 0),
  },
}))

const initialValues = {
  title: '',
  video: '',
  description: '',
  redirect: false,
  error: '',
  mediaId: '',
}

const NewVideo = () => {
  const classes = useStyles()
  const [values, setValues] = useState(initialValues)

  const uploadVideo = async () => {

    const PREFIX = 'input/'
    const EXT = `.${values.video?.name.split('.').pop()}`
    const fileName = values.title
      ? PREFIX + values.title + EXT
      : PREFIX + values.video.name

    await Storage.put(fileName, values.video, {
      contentType: 'video/*',
      progressCallback(progress) {
        console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
      },
    })
      .then(setValues(initialValues))
      .catch(error => console.log('Error uploading file: ', error))
  }

  const handleChange = name => event => {
    const value = name === 'video' ? event.target.files[0] : event.target.value
    setValues({ ...values, [name]: value })
  }

  if (values.redirect) {
    return <Redirect to={'/media/' + values.mediaId} />
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' display='block' className={classes.title}>
          New Video
        </Typography>
        <input
          accept='video/*'
          onChange={handleChange('video')}
          className={classes.input}
          id='contained-button-file'
          type='file'
        />
        <label htmlFor='contained-button-file'>
          <Button
            variant='contained'
            color='secondary'
            component='span'
            className={classes.button}>
            Select Video
          </Button>
        </label>
        {values.video && (
          <Typography
            variant='caption'
            display='block'
            className={classes.filename}>
            {values.video.name}
          </Typography>
        )}
        <br />
        <TextField
          id='title'
          label='Title'
          className={classes.textField}
          value={values.title}
          onChange={handleChange('title')}
          margin='normal'
          variant='outlined'
        />
        <TextField
          id='standard-multiline-flexible'
          label='Description'
          className={classes.textField}
          multiline
          rowsMax={4}
          value={values.description}
          onChange={handleChange('description')}
          variant='outlined'
        />
        {values.error && (
          <Typography component='p' variant='caption' color='error'>
            <Icon color='error' className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color='primary'
          size='large'
          variant='contained'
          onClick={uploadVideo}
          className={classes.button}
          endIcon={<BackupOutlined />}>
          Upload
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewVideo
