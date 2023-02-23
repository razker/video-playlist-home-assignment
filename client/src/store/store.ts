import { configureStore } from "@reduxjs/toolkit";
import playlistSlice from "./playlist.slice";

export default configureStore({
  reducer: {
    playlist: playlistSlice,
  },
});
