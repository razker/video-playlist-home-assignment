import { useEffect } from "react";
import { socket, SocketContext } from "../../socket/socket";
import ColumnBox from "../ColumnBox/ColumnBox";
import FBox from "../FBox/FBox";
import Playlist from "../Playlist/Playlist";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { getPlaylist, getCurrentVideo } from "../../store/playlist.slice";
import { useSelector } from "react-redux";
import styles from "./Home.module.css";

const Home = () => {
  const playlist = useSelector(getPlaylist);
  const currentVideo = useSelector(getCurrentVideo);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("getPlaylist");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <FBox className={styles.outerContainer}>
        <ColumnBox className={styles.playlistContainer}>
          <Playlist playlist={playlist} />
        </ColumnBox>
        <ColumnBox className={styles.videoContainer}>
          <VideoPlayer currentVideo={currentVideo} />
        </ColumnBox>
      </FBox>
    </SocketContext.Provider>
  );
};

export default Home;
