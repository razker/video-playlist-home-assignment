import { Typography, Button, useTheme } from "@mui/material";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { socket, SocketContext } from "../../socket/socket";
import ColumnBox from "../ColumnBox/ColumnBox";
import FBox from "../FBox/FBox";
import styles from "./Home.module.css";

type HomeProps = {};

const Home = ({}: HomeProps) => {
  const [searchTextInput, setSearchTextInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleSubmit = () => {
    setSearchText(searchTextInput);
  };

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
        <ColumnBox className={styles.innerContainer}>raz 1</ColumnBox>
        <ColumnBox className={styles.innerContainer}>video player</ColumnBox>
      </FBox>
    </SocketContext.Provider>
  );
};

export default Home;
