import React, { useState } from 'react'
import Auth from '@aws-amplify/auth'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
}))

const initialValues = {
  name: '',
  password: '',
  email: '',
  open: false,
  error: '',
  code: '',
  formType: 'signup',
}

export default function Signup() {
  const classes = useStyles()
  const [values, setValues] = useState(initialValues)
  const { formType } = values

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  async function signUp() {
    const name = values.name
    const email = values.email
    const password = values.password

    await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        name: name,
      },
    })
      .then(setValues({ ...values, error: '', formType: 'confirm' }))
      .catch(error => setValues({ ...values, error: error }))
  }

  async function confirmSignUp() {
    const code = values.code
    const email = values.email
    await Auth.confirmSignUp(email, code)
      .then(setValues({ ...values, error: '', open: true }))
      .catch(error => setValues({ ...values, error: error }))
  }

  return (
    <div>
      {formType === 'signup' && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h6' className={classes.title}>
              Sign Up
            </Typography>
            <TextField
              id='name'
              label='Name'
              className={classes.textField}
              value={values.name}
              onChange={handleChange('name')}
              margin='normal'
              variant='outlined'
            />
            <br />
            <TextField
              id='email'
              type='email'
              label='Email'
              className={classes.textField}
              value={values.email}
              onChange={handleChange('email')}
              margin='normal'
              variant='outlined'
            />
            <br />
            <TextField
              id='password'
              type='password'
              label='Password'
              className={classes.textField}
              value={values.password}
              onChange={handleChange('password')}
              margin='normal'
              variant='outlined'
            />
            <Typography component='div' variant='caption'>
              Already have an account?{' '}
              <Link
                component={RouterLink}
                className={classes.link}
                to='/signin'>
                Sign in
              </Link>
            </Typography>
            {values.error && (
              <Typography component='p' color='error'>
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
              variant='contained'
              onClick={signUp}
              className={classes.submit}
              size='large'>
              Sign Up
            </Button>
          </CardActions>
        </Card>
      )}
      {formType === 'confirm' && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h6' className={classes.title}>
              Confirm Sign Up
            </Typography>
            <TextField
              id='confirm'
              type='number'
              label='Confirmation code'
              className={classes.textField}
              value={values.code}
              onChange={handleChange('code')}
              margin='normal'
              variant='outlined'
            />
            <br />
            {values.error && (
              <Typography component='p' color='error'>
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
              variant='contained'
              onClick={confirmSignUp}
              className={classes.submit}>
              Confirm Code
            </Button>
          </CardActions>
        </Card>
      )}
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link component={RouterLink} to='/signin'>
            <Button color='primary' autoFocus='autoFocus' variant='contained'>
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}
