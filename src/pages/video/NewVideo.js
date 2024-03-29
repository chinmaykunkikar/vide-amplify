import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { BackupOutlined } from "@mui/icons-material";
import { Amplify, DataStore, Storage } from "aws-amplify";
import awsconfig from "aws-exports";
import { UserContext } from "contexts/UserContext";
import { Video } from "models";
import { makeStyles } from "@mui/styles";

Amplify.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: "100vh",
    margin: "auto",
    textAlign: "center",
  },
  title: {
    margin: theme.spacing(2),
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
    marginTop: theme.spacing(2),
  },
  button: {
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
    marginBottom: theme.spacing(2),
  },
  actions: {
    flexDirection: "column",
  },
  buttonProgress: {
    position: "absolute",
    marginTop: theme.spacing(1),
  },
  input: {
    display: "none",
  },
  filename: {
    marginTop: theme.spacing(1),
  },
}));

const initialValues = {
  description: "",
  error: "",
  title: "",
  video: "",
};

const NewVideo = () => {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    aws_user_files_s3_bucket: BUCKET,
    aws_user_files_s3_bucket_region: REGION,
  } = awsconfig;
  const { username, name } = useContext(UserContext);

  const uploadVideo = async () => {
    const PREFIX = `input/${username}/`;
    const EXT = values.video.name && `.${values.video.name.split(".").pop()}`;
    const KEY = values.title
      ? PREFIX + values.title.replaceAll(/\s+/g, "_") + EXT
      : PREFIX + values.video.name.replaceAll(/\s+/g, "_");
    const BASENAME = KEY.split("/")
      .pop()
      .split(".")
      .shift()
      .replaceAll(/\s+/g, "_");
    const COMMON_URI = `https://${BUCKET}.s3.${REGION}.amazonaws.com/public/output/${username}/${BASENAME}`;
    const RESOURCE_URI = `${COMMON_URI}/playlist.m3u8`;
    const THUMBNAIL_URI = `${COMMON_URI}/thumbnail.png`;

    await Storage.put(KEY, values.video, {
      contentType: "video/*",
      progressCallback(progress) {
        setUploadProgress((progress.loaded / progress.total) * 100);
      },
    })
      .then(
        await DataStore.save(
          new Video({
            title: values.title,
            author: name,
            username: username,
            description: values.description.replaceAll(/(?:\r|\n|\r\n)/g, "\n"),
            resourceURI: RESOURCE_URI,
            thumbnailURI: THUMBNAIL_URI,
          })
        )
      )
      .then(() => {
        setValues(initialValues);
        setUploadProgress(0);
      })
      .catch((error) => console.log("Error uploading file: ", error));
  };

  const handleChange = (name) => (event) => {
    const value = name === "video" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <Box>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" display="block" className={classes.title}>
            Upload a new video
          </Typography>
          <input
            accept="video/*"
            onChange={handleChange("video")}
            className={classes.input}
            id="contained-button-file"
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="secondary"
              component="span"
              className={classes.button}
            >
              Select Video
            </Button>
          </label>
          {values.video && (
            <Typography
              variant="caption"
              display="block"
              className={classes.filename}
            >
              {values.video.name}
            </Typography>
          )}
          <br />
          <TextField
            id="title"
            label="Title"
            className={classes.textField}
            value={values.title}
            onChange={handleChange("title")}
            margin="normal"
            variant="outlined"
          />
          <br />
          <TextField
            id="standard-multiline-flexible"
            label="Description"
            className={classes.textField}
            multiline
            rowsMax={12}
            value={values.description}
            onChange={handleChange("description")}
            variant="outlined"
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            // color="primary"
            size="large"
            variant="contained"
            disabled={Boolean(uploadProgress)}
            onClick={uploadVideo}
            className={classes.button}
            endIcon={<BackupOutlined />}
          >
            Upload
          </Button>
          {uploadProgress > 0 && (
            <CircularProgress
              size={28}
              className={classes.buttonProgress}
              variant="determinate"
              value={uploadProgress}
            />
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default NewVideo;
