import { createContext, useEffect, useState } from "react";
import { Amplify, DataStore } from "aws-amplify";
import awsconfig from "aws-exports";
import { Video } from "models";
Amplify.configure(awsconfig);

export const VideoContext = createContext();

const VideoContextProvider = (props) => {
  const [videoId, setVideoId] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUsername, setVideoUsername] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoAuthor, setVideoAuthor] = useState("");
  const [videoDateTime, setvideoDateTime] = useState("");

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
    <VideoContext.Provider
      value={{
        setVideoId,
        videoURL,
        videoTitle,
        videoUsername,
        videoDescription,
        videoAuthor,
        videoDateTime,
      }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};

export default VideoContextProvider;
