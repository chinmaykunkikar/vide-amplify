import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataStore } from "aws-amplify";
import { Video } from "models";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1, 0),
  },
}));

const initialValues = {
  title: "",
  description: "",
};

const EditVideoDialog = (props) => {
  const { onClose, open, videoId, ...other } = props;
  const classes = useStyles();

  const [values, setValues] = useState(initialValues);
  const [video, setVideo] = useState(null);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const reload = () => window.location.reload();

  const updateVideoDetails = async () => {
    await DataStore.save(
      Video.copyOf(video, (updated) => {
        updated.title = values.title;
        updated.description = values.description.replaceAll(
          /(?:\r|\n|\r\n)/g,
          "\n"
        );
      })
    );
    reload();
  };

  useEffect(() => {
    const getVideo = async () => {
      const videoQuery = await DataStore.query(Video, videoId);
      setVideo(videoQuery);
      setValues({
        ...values,
        title: videoQuery.title,
        description: videoQuery.description,
      });
    };
    getVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        {...other}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit video details</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            You can edit the title and the description of this video
          </DialogContentText>
          <TextField
            id="title"
            label="Title"
            className={classes.textField}
            value={values.title}
            onChange={handleChange("title")}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <br />
          <TextField
            id="standard-multiline-flexible"
            label="Description"
            multiline
            rowsMax={12}
            className={classes.textField}
            value={values.description}
            onChange={handleChange("description")}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" size="small">
            Cancel
          </Button>
          <Button
            onClick={updateVideoDetails}
            color="secondary"
            variant="outlined"
            size="small"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditVideoDialog;
