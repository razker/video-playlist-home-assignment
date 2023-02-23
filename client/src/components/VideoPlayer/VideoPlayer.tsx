import styles from "./VideoPlayer.module.css";
import YouTube from "react-youtube";
import { useContext, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentVideo,
  removeVideoFormList,
  updateVideoToNextSong,
} from "../../store/playlist.slice";
import FBox from "../FBox/FBox";
import { SocketContext } from "../../socket/socket";

const VideoPlayer = () => {
  const player: any = useRef(null);
  const currentVideo = useSelector(getCurrentVideo);
  const socketContext = useContext(SocketContext);
  const dispatch = useDispatch();

  const videoOptions = {
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    if (player?.current && currentVideo?.videoId) {
      player.current.getInternalPlayer().playVideo();
    }
  }, [currentVideo]);

  const handleStatusChanged = (e: any) => {
    if (e.data === 0) {
      socketContext.emit("deleteVideo", currentVideo.id);
      dispatch(updateVideoToNextSong());
    }
  };

  return (
    <FBox>
      <YouTube
        ref={player}
        videoId={currentVideo?.videoId}
        onStateChange={handleStatusChanged}
        opts={videoOptions}
      />
    </FBox>
  );
};

export default VideoPlayer;
