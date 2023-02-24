import { useEffect } from "react";
import { socket, SocketContext } from "../../socket/socket";
import ColumnBox from "../ColumnBox/ColumnBox";
import FBox from "../FBox/FBox";
import Playlist from "../Playlist/Playlist";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import styles from "./Home.module.css";

const Home = () => {
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
          <Playlist />
        </ColumnBox>
        <ColumnBox className={styles.videoContainer}>
          <VideoPlayer />
        </ColumnBox>
      </FBox>
    </SocketContext.Provider>
  );
};

export default Home;
