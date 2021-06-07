import React, { useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Icon,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { BackupOutlined } from '@material-ui/icons'
import { Amplify, Auth, DataStore, Storage } from 'aws-amplify'
import awsconfig from '../../aws-exports'
import { Video } from '../../models'

Amplify.configure(awsconfig)

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.grey[800],
    fontWeight: 300,
  },
  error: {
    verticalAlign: 'middle',
  },
  textField: {
    margin: theme.spacing(1),
    width: 320,
  },
  button: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  actions: {
    flexDirection: 'column',
  },
  buttonProgress: {
    position: 'absolute',
    marginTop: theme.spacing(1),
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
  error: '',
  username: 'default',
}

// TODO find a better way to handle the following
const getCurrentUsername = async () => {
  const username = await Auth.currentUserInfo()
    .then(info => info.username)
    .catch(error => console.error(error))
  initialValues.username = username
}
getCurrentUsername()

const NewVideo = () => {
  const classes = useStyles()
  const [values, setValues] = useState(initialValues)
  const [uploadProgress, setUploadProgress] = useState(0)

  const {
    aws_user_files_s3_bucket: BUCKET,
    aws_user_files_s3_bucket_region: REGION,
  } = awsconfig

  const uploadVideo = async () => {
    const PREFIX = `input/${values.username}/`
    const EXT = values.video.name && `.${values.video.name.split('.').pop()}`
    const KEY = values.title
      ? PREFIX + values.title.replaceAll(/\s+/g, '_') + EXT
      : PREFIX + values.video.name.replaceAll(/\s+/g, '_')
    const BASENAME = KEY.split('/').pop().split('.').shift().replaceAll(/\s+/g, '_')
    const RESOURCE_URI = `https://${BUCKET}.s3.${REGION}.amazonaws.com/public/output/${values.username}/${BASENAME}/playlist.m3u8`

    await Storage.put(KEY, values.video, {
      contentType: 'video/*',
      progressCallback(progress) {
        setUploadProgress((progress.loaded / progress.total) * 100)
      },
    })
      .then(() => {
        setValues(initialValues)
        setUploadProgress(0)
      })
      .then(
        await DataStore.save(
          new Video({
            title: values.title,
            author: values.username,
            description: values.description,
            resourceURI: RESOURCE_URI,
          })
        )
      )
      .catch(error => console.log('Error uploading file: ', error))
  }

  const handleChange = name => event => {
    const value = name === 'video' ? event.target.files[0] : event.target.value
    setValues({ ...values, [name]: value })
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h5' display='block' className={classes.title}>
          Upload a new video
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
          label='An interesting title'
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
      <CardActions className={classes.actions}>
        <Button
          color='primary'
          size='large'
          variant='contained'
          disabled={Boolean(uploadProgress)}
          onClick={uploadVideo}
          className={classes.button}
          endIcon={<BackupOutlined />}>
          Upload
        </Button>
        {uploadProgress > 0 && (
          <CircularProgress
            size={28}
            className={classes.buttonProgress}
            variant='determinate'
            value={uploadProgress}
          />
        )}
      </CardActions>
    </Card>
  )
}

export default NewVideo
