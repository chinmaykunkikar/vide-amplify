import React, { useContext } from "react";
import { AppBar, Box, IconButton, Link, Toolbar, Tooltip } from "@mui/material";
import {
  AccountCircle,
  HomeOutlined,
  VideoCallOutlined as VideoAddOutlined,
} from "@mui/icons-material";
import { UserContext } from "contexts/UserContext";
import { Link as RouterLink } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: { justifyContent: "space-between" },
}));

const Header = () => {
  const classes = useStyles();
  const { loggedIn } = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Link component={RouterLink} to="/">
          <Tooltip title="Home">
            <IconButton edge="start">
              <HomeOutlined color="secondary" />
            </IconButton>
          </Tooltip>
        </Link>
        <Link
          component={RouterLink}
          to="/"
          variant="overline"
          color="secondary"
          underline="none"
          style={{ userSelect: "none" }}
        >
          <Box fontSize={18} letterSpacing={3} fontWeight={500}>
            Vide
          </Box>
        </Link>
        {!loggedIn && (
          <span>
            <Link component={RouterLink} to="/user/login">
              <Tooltip title="Account">
                <IconButton>
                  <AccountCircle color="secondary" />
                </IconButton>
              </Tooltip>
            </Link>
          </span>
        )}
        {loggedIn && (
          <Box>
            <Link component={RouterLink} to="/video/new">
              <Tooltip title="New video">
                <IconButton>
                  <VideoAddOutlined color="secondary" />
                </IconButton>
              </Tooltip>
            </Link>
            <AccountMenu />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
