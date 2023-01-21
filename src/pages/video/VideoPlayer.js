import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { DataStore } from "aws-amplify";
import Avatar from "boring-avatars";
import InfoDialog from "components/video/InfoDialog";
import VideoActionsMenu from "components/video/VideoActionsMenu";
import { UserContext } from "contexts/UserContext";
import { Video } from "models";
import { useParams } from "react-router";
import { colors } from "utils/avatar-colors";
import { Replay } from "vimond-replay";
import "vimond-replay/index.css";
import HlsjsVideoStreamer from "vimond-replay/video-streamer/hlsjs";
import VideoList from "./VideoList";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(2, 4),
    },
    minHeight: "100vh",
  },
  meta: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1, 2),
    },
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
  videoTitle: {
    display: "inline-block",
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
  avatarStyles: {
    "& .MuiListItemAvatar-root": {
      minWidth: theme.spacing(6),
    },
  },
  description: { padding: theme.spacing(0, 6, 2) },
}));

const VideoContent = (props) => {
  const classes = useStyles();
  const { videoId } = useParams();
  const { username } = useContext(UserContext);
  const playerOptions = {
    controls: {
      includeControls: [
        "playPauseButton",
        "timeline",
        "timeDisplay",
        "qualitySelector",
        "fullscreenButton",
        "bufferingIndicator",
        "playbackMonitor",
        "volume",
      ],
    },
    keyboardShortcuts: {
      keyMap: {
        togglePause: [" "],
      },
    },
  };

  const [videoURL, setVideoURL] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUsername, setVideoUsername] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoAuthor, setVideoAuthor] = useState("");
  const [videoDateTime, setvideoDateTime] = useState("");
  const [infoDialog, setInfoDialog] = useState(false);

  const openInfoDialog = () => setInfoDialog(true);

  const closeDialog = () => setInfoDialog(false);

  useEffect(() => {
    const getVideo = async () => {
      const video = await DataStore.query(Video, videoId);
      setVideoURL(video.resourceURI);
      setVideoTitle(video.title);
      setVideoAuthor(video.author);
      setVideoUsername(video.username);
      setVideoDescription(video.description);
      setvideoDateTime(new Date(Date.parse(video.createdAt)).toDateString());
    };
    getVideo();
  }, [videoId]);

  return (
    <Paper className={classes.root} elevation={0} square>
      <Grid container alignItems="flex-start">
        <Grid item xs={12} md={8}>
          <Replay source={videoURL} options={playerOptions}>
            <HlsjsVideoStreamer />
          </Replay>
          <Box className={classes.meta}>
            <Box className={classes.title}>
              <Typography
                className={classes.videoTitle}
                variant="h6"
                color="textPrimary"
              >
                {videoTitle}
              </Typography>
              <Tooltip title="What is happening here?" placement="left">
                <IconButton onClick={openInfoDialog}>
                  <InfoOutlined color="inherit" />
                </IconButton>
              </Tooltip>
              <InfoDialog open={infoDialog} onClose={closeDialog} />
              {videoUsername === username && <VideoActionsMenu />}
            </Box>
            <Divider />
            <ListItem
              component="div"
              className={classes.avatarStyles}
              disableGutters
            >
              <ListItemAvatar>
                <Avatar
                  size={40}
                  name={videoUsername}
                  variant="pixel"
                  colors={colors}
                />
              </ListItemAvatar>
              <ListItemText
                primary={videoAuthor}
                secondary={videoDateTime}
                primaryTypographyProps={{ variant: "subtitle2" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />
            </ListItem>
            <Typography
              className={classes.description}
              variant="body2"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {videoDescription}
            </Typography>
            <Divider />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <VideoList cols={1} currentVideo={videoId} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VideoContent;
