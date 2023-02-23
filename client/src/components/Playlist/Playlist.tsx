import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../socket/socket";
import {
  addVideoToPlaylist,
  getPlaylist,
  setInitalPlaylists,
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
    socketContext.on("addSong", (resp) => {
      if (resp) {
        if (resp.success) {
          dispatch(addVideoToPlaylist(resp.data));
          setTextInput("");
        }
      }

      setIsLoading(false);
    });

    socketContext.on("getPlaylist", (resp) => {
      if (resp) {
        if (resp.success) {
          dispatch(setInitalPlaylists(resp.data));
          dispatch(updateVideoToNextSong());
        } else {
          window.alert(resp.error);
        }
      }
    });
  }, [dispatch, socketContext]);

  const onAddVideoHandler = () => {
    if (!isLoading) {
      socketContext.emit("addSong", textInput);
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
          {playList.map((song: any, index: number) => {
            return (
              <ListItem key={index} selected={index === 0}>
                <ListItemText primary={song.title} />
              </ListItem>
            );
          })}
        </List>
      </FBox>
    </ColumnBox>
  );
};

export default Playlist;
