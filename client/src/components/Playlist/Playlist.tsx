import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useCallback } from "react";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../socket/socket";
import {
  addVideoToPlaylist,
  getPlaylist,
  setInitalPlaylist,
  updateVideoToNextVideo,
} from "../../store/playlist.slice";
import ColumnBox from "../ColumnBox/ColumnBox";
import FBox from "../FBox/FBox";
import styles from "./Playlist.module.css";

const Playlist = () => {
  const socketContext = useContext(SocketContext);
  const playList = useSelector(getPlaylist);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    socketContext.on("addVideoResponse", (resp) => {
      if (resp) {
        dispatch(addVideoToPlaylist(resp));
        setTextInput("");
      }

      setIsLoading(false);
    });

    socketContext.on("getPlaylistResponse", (resp) => {
      if (resp.playlist) {
        dispatch(setInitalPlaylist(resp.playlist));
        dispatch(updateVideoToNextVideo());
      }
    });
  }, [dispatch, socketContext]);

  const onAddVideoHandler = useCallback(() => {
    if (!isLoading) {
      socketContext.emit("addVideo", textInput);
      setIsLoading(true);
    }
  }, [isLoading, socketContext, textInput]);

  const onEnterPress = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        onAddVideoHandler();
      }
    },
    [onAddVideoHandler]
  );

  return (
    <ColumnBox>
      <FBox>
        <TextField
          id="standard-basic"
          label="Search video"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyUp={onEnterPress}
        />
        <Button
          disabled={isLoading}
          variant="contained"
          onClick={onAddVideoHandler}
        >
          Add
        </Button>
      </FBox>
      <FBox>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 600,
            "& ul": { padding: 0 },
          }}
        >
          {playList.map((video, index: number) => {
            return (
              <ListItem key={video.id} selected={index === 0}>
                <ListItemText primary={video.title} />
                <img
                  src={video.thumbnail.url}
                  width={video.thumbnail.width}
                  height={video.thumbnail.height}
                  alt=""
                />
              </ListItem>
            );
          })}
        </List>
      </FBox>
    </ColumnBox>
  );
};

export default Playlist;
