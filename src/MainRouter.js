import React from 'react'
import { Box } from '@material-ui/core'
import UserProfile from 'pages/user/UserProfile'
import { Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/header/Header'
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
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user/login' component={Login} />
          <Route exact path='/user/create' component={Signup} />
          <PrivateRoute path='/video/new' component={NewVideo} />
          <Route exact path='/:videoId'>
            <VideoPlayer />
          </Route>
          <PrivateRoute path='/user/:userId' component={UserProfile} />
        </Switch>
        <Footer />
      </Box>
    </UserContextProvider>
  )
}

export default MainRouter
