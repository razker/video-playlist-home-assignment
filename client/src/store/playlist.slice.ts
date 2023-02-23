import { createSlice } from "@reduxjs/toolkit";
import { Playlist, Song } from "../../../types/playlist";

type PlaylistState = {
  currentVideo: Song | undefined;
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
      state.videoPlaylist.push(action.payload);
      if (state.videoPlaylist.length === 1) {
        state.currentVideo = state.videoPlaylist[0];
      }
    },
    updateVideoToNextSong: (state) => {
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
  updateVideoToNextSong,
  removeVideoFormList,
  setInitalPlaylist,
} = playlistSlice.actions;

export const getCurrentVideo = (state: any) => state.playlist.currentVideo;

export const getPlaylist = (state: any) =>
  state.playlist.videoPlaylist as Playlist;

export default playlistSlice.reducer;
