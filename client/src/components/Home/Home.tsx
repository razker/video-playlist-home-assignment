import { Typography, Button, useTheme } from "@mui/material";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { socket, SocketContext } from "../../socket/socket";
import ColumnBox from "../ColumnBox/ColumnBox";
import FBox from "../FBox/FBox";
import Playlist from "../Playlist/Playlist";
import styles from "./Home.module.css";

const Home = () => {
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("getItems");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <FBox className={styles.outerContainer}>
        <ColumnBox className={styles.innerContainer}>
          <Playlist />
        </ColumnBox>
        <ColumnBox className={styles.innerContainer}>video player</ColumnBox>
      </FBox>
    </SocketContext.Provider>
  );
};

export default Home;
