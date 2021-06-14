import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'

const Footer = () => {
  return (
    <AppBar component='footer' position='relative' color='secondary'>
      <Toolbar>
        <Typography variant='overline' color='inherit'>
          © 2021 Chinmay
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
