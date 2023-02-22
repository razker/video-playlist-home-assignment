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

let playlist: Playlist = [];

io.on("connection", (socket) => {
  socket.emit("playlist", { playlist, fromCurrentUser: false });

  socket.on("addRecord", (recordLink) => {});

  socket.on("getItems", () => {});
});

server.listen(port);

server.on("listening", function (): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`, null);
});
