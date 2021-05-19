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
import { Redirect } from 'react-router'

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
  submit: {
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

const NewVideo = () => {
  const classes = useStyles()
  const [values, setValues] = useState({
    title: '',
    video: '',
    description: '',
    redirect: false,
    error: '',
    mediaId: '',
  })

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
          accept='image/*'
          onChange={handleChange('video')}
          className={classes.input}
          id='contained-button-file'
          multiple
          type='file'
        />
        <label htmlFor='contained-button-file'>
          <Button variant='contained' color='secondary' component='span'>
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
          value={values.descriptionue}
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
          onClick={e => e.preventDefault()}
          className={classes.submit}
          endIcon={<BackupOutlined />}>
          Upload
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewVideo
