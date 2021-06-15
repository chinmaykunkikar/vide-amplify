import React from 'react'
import { Auth } from 'aws-amplify'
import { Button } from '@material-ui/core'

async function signOut() {
  await Auth.signOut()
    .then(window.location.reload())
    .catch(error => console.log(error))
}

const Signout = ({ ...rest }) => {
  return (
    <>
      <Button onClick={signOut} {...rest}>
        Sign Out
      </Button>
    </>
  )
}

export default Signout
