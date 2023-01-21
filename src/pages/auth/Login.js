import React, { useState } from "react";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "aws-exports";
import { Link as RouterLink, useHistory } from "react-router-dom";

Amplify.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "100vh",
    margin: "auto",
    textAlign: "center",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.grey[800],
    fontWeight: 300,
  },
  textField: {
    [theme.breakpoints.up("xs")]: {
      width: "75%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    [theme.breakpoints.up("md")]: {
      width: "40%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "30%",
    },
    width: "70%",
  },
  submit: {
    [theme.breakpoints.up("xs")]: {
      width: "55%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "20%",
    },
    margin: "auto",
  },
}));

const initialValues = {
  email: "",
  password: "",
  error: "",
};

const Login = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const history = useHistory();

  async function logIn() {
    const email = values.email;
    const password = values.password;
    await Auth.signIn(email, password)
      .then(() => {
        history.push("/");
        history.go(0);
      })
      .catch((error) => alert(error.message));
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Box>
      <Paper className={classes.paper}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            Login
          </Typography>
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            variant="outlined"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            variant="outlined"
          />
          <Typography component="div" variant="caption">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/user/create" color="secondary">
              Create your account
            </Link>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            // color='primary'
            variant="contained"
            onClick={logIn}
            className={classes.submit}
            size="large"
          >
            Login
          </Button>
        </CardActions>
      </Paper>
    </Box>
  );
};

export default Login;
