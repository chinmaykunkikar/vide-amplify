import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authHelper from './authHelper'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authHelper.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

export default PrivateRoute
