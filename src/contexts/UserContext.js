import { createContext, useEffect, useState } from 'react'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from 'aws-exports'
Amplify.configure(awsconfig)

export const UserContext = createContext()

const currentAuthenticatedUser = async () =>
  await Auth.currentAuthenticatedUser()

const UserContextProvider = props => {
  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    currentAuthenticatedUser()
      .then(user => {
        setUsername(user.username)
        setName(user.attributes.name)
        setEmail(user.attributes.email)
        setLoggedIn(true)
      })
      .catch(error => {
        setLoggedIn(false)
        setEmail('')
        setUsername('')
        setName('')
        console.warn(error)
      })
  }, [])

  return (
    <UserContext.Provider value={{ username, name, email, loggedIn }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
