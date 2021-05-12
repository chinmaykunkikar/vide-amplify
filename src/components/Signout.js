import React from 'react'
import { Auth } from 'aws-amplify'
import { Button } from '@material-ui/core'

async function signOut() {
  try {
    await Auth.signOut()
  } catch (error) {
    console.log('error signing out: ', error)
  }
}

const Signout = props => {
  const { ...rest } = props
  return (
    <Button onClick={signOut} {...rest}>
      Sign Out
    </Button>
  )
}

export default Signout
