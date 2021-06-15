import Amplify, { Auth } from 'aws-amplify'
import { createContext, useEffect, useState } from 'react'
import awsconfig from 'aws-exports'
Amplify.configure(awsconfig)

export const UserContext = createContext()

const currentAuthenticatedUser = async () =>
  await Auth.currentAuthenticatedUser()

const UserContextProvider = props => {
  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    currentAuthenticatedUser()
      .then(user => {
        setUsername(user.username)
        setName(user.attributes.name)
        setLoggedIn(true)
      })
      .catch(error => {
        setLoggedIn(false)
        setUsername('')
        setName('')
        console.warn(error)
      })
  }, [])

  return (
    <UserContext.Provider value={{ username, name, loggedIn }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
