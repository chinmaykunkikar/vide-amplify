import React from 'react'
import { Auth } from 'aws-amplify'
import { Button } from '@material-ui/core'

async function signOut() {
  await Auth.signOut()
    .then(() => true)
    .catch(error => console.log(error))
}

const Signout = props => {
  const { ...rest } = props
  return (
    <>
      <Button onClick={signOut} {...rest}>
        Sign Out
      </Button>
    </>
  )
}

export default Signout
