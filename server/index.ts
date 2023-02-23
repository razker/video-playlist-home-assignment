import express = require("express");
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as http from "http";
import { Server } from "socket.io";
import { Playlist } from "../types/playlist";

import { APILogger } from "./logger/api.logger";
require("dotenv").config();

const port = process.env.PORT || 3080;

const logger = new APILogger();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let playlist: Playlist = [
  {
    videoId: "123",
    title: "123",
    thumbnail: { url: "123", width: 12, height: 12 },
    durationInSeconds: 123,
    id: "123",
  },
];
let connectionCount = 0;

io.on("connection", (socket) => {
  connectionCount += 1;
  logger.info("Made socket connection");
  logger.info("connectionCount after connect", connectionCount);

  socket.on("addSong", (songUrl) => {
    console.log("songUrl", songUrl);
  });

  socket.on("getPlaylist", () => {
    socket.emit("getPlaylistResponse", { playlist });
  });

  socket.on("disconnect", () => {
    connectionCount -= 1;
    logger.info("connectionCount after disconnect", connectionCount);
    if (connectionCount == 0) {
      //TODO: implement later
      // playlist = [];
    } else if (connectionCount < 0) {
      connectionCount = 0;
    }
  });
});

server.listen(port, () => {
  logger.info(`Server running on port: ${port}`);
});
