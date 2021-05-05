import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import MainRouter from './MainRouter'
import theme from './utils/theme'

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </Router>
  )
}

export default App
