import React from "react";
import {
  AppBar,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";

const Footer = () => {
  return (
    <AppBar component="footer" position="relative" color="secondary">
      <Toolbar>
        <Typography
          variant="overline"
          color="inherit"
          style={{ userSelect: "none" }}
        >
          Chinmay Kunkikar
        </Typography>
        <Tooltip title="Check out the source code">
          <Link
            target="blank"
            href="https://github.com/chinmaykunkikar/vide-amplify"
          >
            <IconButton>
              <GitHub color="primary" />
            </IconButton>
          </Link>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
