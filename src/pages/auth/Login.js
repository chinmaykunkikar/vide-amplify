import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  TextField,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Amplify, Auth } from 'aws-amplify'
import awsconfig from 'aws-exports'
import { Redirect } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'

Amplify.configure(awsconfig)

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

const initialValues = {
  email: '',
  password: '',
  error: '',
  redirectToReferrer: false,
}

const Login = props => {
  const classes = useStyles()
  const [values, setValues] = useState(initialValues)

  async function logIn() {
    const email = values.email
    const password = values.password
    await Auth.signIn(email, password)
      .then(() => {
        setValues({ ...values, redirectToReferrer: true })
        window.location.reload()
      })
      .catch(error => alert(error.message))
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const { from } = props.location.state || {
    from: {
      pathname: '/',
    },
  }
  const { redirectToReferrer } = values
  if (redirectToReferrer) {
    return <Redirect to={from} />
  }

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h4' className={classes.title}>
            Login
          </Typography>
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
            Don't have an account?{' '}
            <Link component={RouterLink} to='/user/create' color='secondary'>
              Create your account
            </Link>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            variant='contained'
            onClick={logIn}
            className={classes.submit}
            size='large'>
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Login
