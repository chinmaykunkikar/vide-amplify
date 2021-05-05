import { createMuiTheme } from '@material-ui/core/styles'
import { purple, yellow } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: yellow[400],
    },
  },
})

export default theme
