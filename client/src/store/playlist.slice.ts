import { createSlice } from "@reduxjs/toolkit";
import { Playlist, Song } from "../../../types/playlist";

type PlaylistState = {
  currentVideo: Song | undefined;
  playlist: Playlist;
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    currentVideo: undefined,
    playlist: [],
  } as PlaylistState,
  reducers: {
    addVideoToPlaylist: (state, action) => {
      state.playlist.push(action.payload);
      if (state.playlist.length === 1) {
        state.currentVideo = state.playlist[0];
      }
    },
    updateVideoToNextSong: (state) => {
      if (state.playlist.length > 0) {
        state.currentVideo = state.playlist[0];
      }
    },
    removeVideoFormList: (state) => {
      state.playlist.shift();
    },
    setInitalPlaylists: (state, action) => {
      state.playlist = action.payload;
    },
  },
});

export const {
  addVideoToPlaylist,
  updateVideoToNextSong,
  removeVideoFormList,
  setInitalPlaylists,
} = playlistSlice.actions;

export const getCurrentVideo = (state: PlaylistState) => state.playlist;

export const getRecordsList = (state: PlaylistState) => state.playlist;

export default playlistSlice.reducer;
