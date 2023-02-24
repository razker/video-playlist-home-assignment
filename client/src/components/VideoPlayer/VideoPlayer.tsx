import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentVideo,
  removeVideoFormList,
  updateVideoToNextVideo,
} from "../../store/playlist.slice";
import FBox from "../FBox/FBox";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = () => {
  const player: any = useRef(null);
  const currentVideo = useSelector(getCurrentVideo);
  const dispatch = useDispatch();

  const videoOptions: YouTubeProps["opts"] = {
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
      handleChangeToNextVideo();
    }
  };

  const handleError = (e: any) => {
    if (e.data) {
      handleChangeToNextVideo();
    }
  };

  const handleChangeToNextVideo = () => {
    dispatch(removeVideoFormList(currentVideo.id));
    dispatch(updateVideoToNextVideo());
  };

  return (
    <FBox className={styles.videoOutterContainer}>
      <YouTube
        ref={player}
        videoId={currentVideo?.videoId}
        onStateChange={handleStatusChanged}
        opts={videoOptions}
        onError={handleError}
      />
    </FBox>
  );
};

export default VideoPlayer;
