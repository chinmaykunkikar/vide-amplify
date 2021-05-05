import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './pages/Menu'
import Home from './pages/Home'

const MainRouter = ({ data }) => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  )
}

export default MainRouter
