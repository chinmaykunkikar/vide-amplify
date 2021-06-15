import React from 'react'
import { Box } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Home from './pages/Home'
import NewVideo from './pages/video/NewVideo'
import VideoPlayer from './pages/video/VideoPlayer'
import PrivateRoute from './PrivateRoute'
import UserContextProvider from './utils/UserContext'

const MainRouter = ({ data }) => {
  return (
    <UserContextProvider>
      <Box>
        <Menu />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user/login' component={Login} />
          <Route exact path='/user/create' component={Signup} />
          <PrivateRoute path='/video/new' component={NewVideo} />
          <Route path='/:videoId'>
            <VideoPlayer />
          </Route>
        </Switch>
        <Footer />
      </Box>
    </UserContextProvider>
  )
}

export default MainRouter
