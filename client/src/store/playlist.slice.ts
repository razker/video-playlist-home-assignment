import { createSlice } from "@reduxjs/toolkit";
import { Playlist, Video } from "../../../types/playlist";

type PlaylistState = {
  currentVideo: Video | undefined;
  videoPlaylist: Playlist;
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    currentVideo: undefined,
    videoPlaylist: [],
  } as PlaylistState,
  reducers: {
    addVideoToPlaylist: (state, action) => {
      if (
        !state.videoPlaylist.find((video) => video.id === action.payload.id)
      ) {
        state.videoPlaylist.push(action.payload);
        if (state.videoPlaylist.length === 1) {
          state.currentVideo = state.videoPlaylist[0];
        }
      }
    },
    updateVideoToNextVideo: (state) => {
      if (state.videoPlaylist.length > 0) {
        state.currentVideo = state.videoPlaylist[0];
      }
    },
    removeVideoFormList: (state) => {
      state.videoPlaylist.shift();
    },
    setInitalPlaylist: (state, action) => {
      state.videoPlaylist = action.payload;
    },
  },
});

export const {
  addVideoToPlaylist,
  updateVideoToNextVideo,
  removeVideoFormList,
  setInitalPlaylist,
} = playlistSlice.actions;

export const getCurrentVideo = (state: any) =>
  state.playlist.currentVideo as Video;

export const getPlaylist = (state: any) =>
  state.playlist.videoPlaylist as Playlist;

export default playlistSlice.reducer;
