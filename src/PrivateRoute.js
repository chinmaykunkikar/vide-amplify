import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from './utils/UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useContext(UserContext)

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/user/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
