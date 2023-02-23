import React from "react";
import socketIOClient from "socket.io-client";

export const socket = socketIOClient(
  process.env.REACT_APP_VIDEO_PLAYLIST_SERVICE as string
);
export const SocketContext = React.createContext(socket);
