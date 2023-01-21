import React from "react";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const InfoDialog = (props) => {
  const { onClose, open, ...other } = props;
  const classes = useStyles();

  return (
    <>
      <Dialog open={open} onClose={onClose} {...other} fullScreen>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              How does this work?
            </Typography>
          </Toolbar>
        </AppBar>
      </Dialog>
    </>
  );
};

export default InfoDialog;
