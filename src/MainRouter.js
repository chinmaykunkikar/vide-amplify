import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Menu from './pages/Menu'
import Home from './pages/Home'
import Signin from './pages/Signin'
import NewVideo from './pages/NewVideo'
import Signup from './pages/Signup'

const MainRouter = ({ data }) => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <PrivateRoute path='/videos/new' component={NewVideo} />
      </Switch>
    </div>
  )
}

export default MainRouter
