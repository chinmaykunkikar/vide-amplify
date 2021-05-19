import React, { useState } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Amplify, Auth } from 'aws-amplify'
import { Redirect } from 'react-router'
import awsconfig from '../aws-exports'

Amplify.configure(awsconfig)

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

const Signin = props => {
  const classes = useStyles()
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  })

  async function signIn() {
    const email = values.email
    const password = values.password
    await Auth.signIn(email, password)
      .then(setValues({ ...values, redirectToReferrer: true }))
      .catch(error => setValues({ ...values, error: error }))
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
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.title}>
          Sign In
        </Typography>
        <TextField
          id='email'
          type='email'
          label='Email'
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin='normal'
          variant="outlined"
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
          variant="outlined"
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
          onClick={signIn}
          className={classes.submit}>
          Submit
        </Button>
      </CardActions>
    </Card>
  )
}

export default Signin
