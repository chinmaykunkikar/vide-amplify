import React, { useEffect, useState } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
} from "@mui/material";
import { Amplify, DataStore } from "aws-amplify";
import awsconfig from "aws-exports";
import { Video } from "models";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link as RouterLink } from "react-router-dom";
import { useWidth } from "utils/useWidth";
import { makeStyles } from "@mui/styles";

Amplify.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: theme.spacing(1, 2),
  },
  tileBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)",
    "& .MuiImageListItemBar-titleWrap": {
      margin: theme.spacing(0, 1.2),
    },
    transform: "translateY(-0.4em)",
  },
  tileTitle: {
    fontSize: theme.typography.fontSize,
    color: theme.palette.grey[100],
  },
}));

const VideoList = (props) => {
  const classes = useStyles();
  const [videoList, updateVideoList] = useState([]);
  const width = useWidth();

  const setVideoList = async () => {
    const list = await DataStore.query(Video);
    updateVideoList(list);
  };

  const getCols = () => {
    switch (width) {
      case "xs":
        return 1;
      case "sm":
        return videoList.length < 2 ? videoList.length : 2;
      case "md":
        return videoList.length < 3 ? videoList.length : 3;
      case "lg":
        return videoList.length < 4 ? videoList.length : 4;
      case "xl":
        return videoList.length < 5 ? videoList.length : 5;
      default:
        return 4;
    }
  };

  useEffect(() => {
    DataStore.start().catch(() =>
      DataStore.clear().then(() => DataStore.start())
    );
    setVideoList();
  }, []);

  return (
    <div className={classes.root}>
      <ImageList cols={props.cols || getCols()} gap={8}>
        {videoList
          .filter((currentVideo) => currentVideo.id !== props.currentVideo)
          .filter((currentUser) =>
            props.username
              ? currentUser.username === props.username
              : currentUser
          )
          .map((tile) => (
            <ImageListItem
              component="div"
              key={tile.id}
              style={{ height: "auto" }}
            >
              <Link component={RouterLink} to={`/${tile.id}`} underline="none">
                <LazyLoadImage
                  src={tile.thumbnailURI}
                  alt={tile.title}
                  effect="blur"
                  width="100%"
                  height="auto"
                />
              </Link>
              <ImageListItemBar
                className={classes.tileBar}
                title={
                  <Link
                    className={classes.tileTitle}
                    component={RouterLink}
                    to={`/${tile.id}`}
                    underline="none"
                  >
                    {tile.title}
                  </Link>
                }
                subtitle={tile.author}
              />
            </ImageListItem>
          ))}
      </ImageList>
    </div>
  );
};

export default VideoList;
