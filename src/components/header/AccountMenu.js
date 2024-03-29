import React, { useContext, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { Auth } from "aws-amplify";
import Avatar from "boring-avatars";
import { UserContext } from "contexts/UserContext";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { colors } from "utils/avatar-colors";

const AccountMenu = () => {
  const { username, name } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function logOut() {
    await Auth.signOut()
      .then(() => {
        history.push("/");
        history.go(0);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <Tooltip title="Account">
        <IconButton
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar size={32} name={username} variant="pixel" colors={colors} />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleClose}
      >
        <MenuItem
          component={RouterLink}
          to={`/user/${username}`}
          onClick={handleClose}
          divider
        >
          <Box fontWeight={300} fontSize={20}>
            {name}
          </Box>
        </MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
