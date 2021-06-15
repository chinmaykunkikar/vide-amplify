import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { Auth, DataStore } from 'aws-amplify'
import { User } from 'models'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
  },
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
    color: theme.palette.grey[800],
    fontWeight: 300,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 320,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
}))

const SIGNUP_FORM = 'signup_form'
const CONFIRM_FORM = 'confirm_form'

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmCode: '',
  openDialog: false,
  error: '',
  formType: SIGNUP_FORM,
}

export default function Signup() {
  const classes = useStyles()
  const [values, setValues] = useState(initialValues)
  const { formType } = values

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  async function signUp() {
    await Auth.signUp({
      username: values.email,
      password: values.password,
      attributes: {
        email: values.email,
        name: values.name,
      },
    })
      .then(() => setValues({ ...values, error: '', formType: CONFIRM_FORM }))
      .catch(error => setValues({ ...values, error: error }))
  }

  async function confirmSignUp() {
    await Auth.confirmSignUp(values.email, values.confirmCode)
      .then(
        await DataStore.save(
          new User({
            name: values.name,
            email: values.email,
            Videos: [],
          })
        )
          .then(() => setValues({ ...values, error: '', openDialog: true }))
          .catch(error => setValues({ ...values, error: error }))
      )
      .catch(error => setValues({ ...values, error: error }))
  }

  return (
    <Box className={classes.root}>
      {formType === SIGNUP_FORM && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h4' className={classes.title}>
              Create new account
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
              <Link component={RouterLink} to='/user/login' color='secondary'>
                Login here
              </Link>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              color='primary'
              variant='contained'
              onClick={signUp}
              className={classes.submit}
              size='large'>
              Continue
            </Button>
          </CardActions>
        </Card>
      )}
      {formType === CONFIRM_FORM && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='h4' className={classes.title}>
              Confirm your account
            </Typography>
            <TextField
              id='confirm'
              type='number'
              label='Confirmation code'
              className={classes.textField}
              value={values.confirmCode}
              onChange={handleChange('confirmCode')}
              margin='normal'
              variant='outlined'
            />
            <Typography component='div' variant='caption'>
              Didn't receive a confirmation code?{' '}
              <Link
                component='button'
                variant='caption'
                color='secondary'
                onClick={() => Auth.resendSignUp(values.email)}>
                Resend code
              </Link>
            </Typography>
            <br />
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
      <Dialog open={values.openDialog} disableBackdropClick>
        <DialogTitle>Account created successfully</DialogTitle>
        <DialogContent>
          <DialogContentText>Welcome aboard {values.name}!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link component={RouterLink} to='/user/login'>
            <Button color='primary' autoFocus>
              Back to Login
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
