import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../socket/socket";
import {
  addVideoToPlaylist,
  getPlaylist,
  setInitalPlaylist,
  updateVideoToNextSong,
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
        dispatch(updateVideoToNextSong());
      }
    });
  }, [dispatch, socketContext]);

  const onAddVideoHandler = () => {
    if (!isLoading) {
      socketContext.emit("addVideo", textInput);
      setIsLoading(true);
    }
  };

  return (
    <ColumnBox>
      <FBox>
        <TextField
          id="standard-basic"
          label="insert link"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
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
        <List>
          {playList.map((video, index: number) => {
            return (
              <ListItem key={video.id} selected={index === 0}>
                <ListItemText primary={video.title} />
              </ListItem>
            );
          })}
        </List>
      </FBox>
    </ColumnBox>
  );
};

export default Playlist;
