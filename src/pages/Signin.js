import React from 'react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp
} from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify'
import { Redirect } from 'react-router'
import awsconfig from '../aws-exports'

Amplify.configure(awsconfig)

const Signin = () => {
  const [authState, setAuthState] = React.useState()
  const [user, setUser] = React.useState()

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user ? (
    <Redirect to='/' />
  ) : (
    <div>
      <AmplifyAuthenticator usernameAlias='email'>
        <AmplifySignUp
          usernameAlias='email'
          slot='sign-up'
          headerText='Create a Vide account'
          formFields={[
            {
              type: 'email',
              label: 'Email',
              placeholder: 'Enter your email',
              hint: 'Enter Your Email',
              required: true,
            },
            {
              type: 'name',
              label: 'Name',
              placeholder: 'Enter your name',
              required: true,
            },
            {
              type: 'password',
              label: 'Password',
              placeholder: 'Enter a new password',
              required: true,
            },
          ]}
        />
        <AmplifySignIn headerText='Sign in into your Vide account' usernameAlias='email' slot='sign-in' />
      </AmplifyAuthenticator>
    </div>
  )
}

export default Signin
