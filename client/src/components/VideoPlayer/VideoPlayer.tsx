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

  useEffect(() => {
    if (player?.current && currentVideo?.videoId) {
      player.current.getInternalPlayer().playVideo();
    }
  }, [currentVideo]);

  const handleChangeToNextVideo = useCallback(() => {
    dispatch(removeVideoFormList(currentVideo.id));
    dispatch(updateVideoToNextVideo());
  }, [currentVideo, dispatch]);

  const handleStatusChanged = useCallback(
    (e: any) => {
      if (e.data === 0) {
        handleChangeToNextVideo();
      }
    },
    [handleChangeToNextVideo]
  );

  const handleError = useCallback(
    (e: any) => {
      if (e.data) {
        handleChangeToNextVideo();
      }
    },
    [handleChangeToNextVideo]
  );

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
