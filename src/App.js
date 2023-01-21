import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";
import theme from "./utils/theme";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
