import React from "react";
import io from "socket.io-client";

export const socket = io(
  process.env.REACT_APP_VIDEO_PLAYLIST_SERVICE as string
);

export const SocketContext = React.createContext(socket);
