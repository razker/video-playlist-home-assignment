export type Video = {
  videoId: string;
  title: string;
  thumbnail: { url: string; width: number; height: number };
  id: string;
};

export type Playlist = Video[];
