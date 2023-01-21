import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
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
