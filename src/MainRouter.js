import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Menu from './components/Menu'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import NewVideo from './pages/video/NewVideo'
import Signup from './pages/auth/Signup'

const MainRouter = ({ data }) => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute path='/new' component={NewVideo} />
      </Switch>
    </div>
  )
}

export default MainRouter
