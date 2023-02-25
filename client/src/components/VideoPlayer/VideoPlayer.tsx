import YouTube, { YouTubeProps } from "react-youtube";
import { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentVideo,
  removeVideoFormList,
  updateVideoToNextVideo,
} from "../../store/playlist.slice";
import FBox from "../FBox/FBox";
import styles from "./VideoPlayer.module.css";

const videoOptions: YouTubeProps["opts"] = {
  playerVars: {
    autoplay: 1,
  },
};
const VideoPlayer = () => {
  const player: any = useRef(null);
  const currentVideo = useSelector(getCurrentVideo);
  const dispatch = useDispatch();

  const handleChangeToNextVideo = useCallback(() => {
    if (currentVideo) {
      dispatch(removeVideoFormList(currentVideo.id));
      dispatch(updateVideoToNextVideo());
    }
  }, [currentVideo, dispatch]);

  const handleError = useCallback(
    (e: any) => {
      if (e.data) {
        handleChangeToNextVideo();
      }
    },
    [handleChangeToNextVideo]
  );

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    if (currentVideo) {
      player.current = event.target;
      player.current.playVideo();
    }
  };

  const onPlayerEnd = () => {
    handleChangeToNextVideo();
  };

  return (
    <FBox className={styles.videoOutterContainer}>
      <YouTube
        videoId={currentVideo?.videoId}
        opts={videoOptions}
        onError={handleError}
        onReady={onPlayerReady}
        onEnd={onPlayerEnd}
      />
    </FBox>
  );
};

export default VideoPlayer;
