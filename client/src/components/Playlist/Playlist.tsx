import { Button, List, ListItem, TextField } from "@mui/material";
import { useCallback } from "react";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SocketContext } from "../../socket/socket";
import {
  addVideoToPlaylist,
  setInitalPlaylist,
  updateVideoToNextVideo,
} from "../../store/playlist.slice";
import ColumnBox from "../ColumnBox/ColumnBox";
import FBox from "../FBox/FBox";
import styles from "./Playlist.module.css";
import { Playlist as PlaylistType } from "../../../../types/playlist";

type PlaylistProps = {
  playlist: PlaylistType;
};

const Playlist = ({ playlist }: PlaylistProps) => {
  const socketContext = useContext(SocketContext);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    socketContext.on("addVideoResponse", (resp) => {
      if (resp?.id) {
        dispatch(addVideoToPlaylist(resp));
      }

      setTextInput("");
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
    <ColumnBox
      dataTestId={"playlist-outer-container"}
      className={styles.outterContainer}
    >
      <FBox className={styles.textInputContainer}>
        <TextField
          data-testid={"text-field"}
          id="standard-basic"
          label="Search video"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyUp={onEnterPress}
          sx={{ ml: 1, flex: 1, paddingRight: 2 }}
        />
        <Button
          data-testid={"add-button"}
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
            maxHeight: 480,
          }}
        >
          {playlist?.map((video, index: number) => {
            return (
              <ListItem
                data-testid={"list-item"}
                key={video.id}
                selected={index === 0}
              >
                <FBox className={styles.listItemContainer}>
                  <FBox className={styles.videoTextOutterConatiner}>
                    <span className={styles.videoText}>{video.title}</span>
                  </FBox>
                  <FBox>
                    <img
                      src={video.thumbnail.url}
                      width={video.thumbnail.width}
                      height={video.thumbnail.height}
                      alt={`${video.id}-thumbnail`}
                    />
                  </FBox>
                </FBox>
              </ListItem>
            );
          })}
        </List>
      </FBox>
    </ColumnBox>
  );
};

export default Playlist;
