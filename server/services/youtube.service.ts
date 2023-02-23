import { Video } from "../../types/playlist";
import { APILogger } from "../logger/api.logger";
import {
  parse as parseDuration,
  toSeconds as durationToSeconds,
} from "iso8601-duration";
import { v4 as uuid } from "uuid";

export class YoutubeService {
  private logger: APILogger;
  private apiKey: string;

  constructor() {
    this.logger = new APILogger();
    this.apiKey = process.env.YOUTUBE_DATA_API_KEY;
  }

  searchUrl(query: string) {
    return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${this.apiKey}`;
  }

  parseSongFromVideoJson(json): Video {
    if ("error" in json) {
      throw new Error(json.error.message);
    }

    if (json.items.length !== 1) {
      throw new Error(`Got ${json.items.length} items from YouTube`);
    }

    const item = json.items[0];

    return {
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium,
      id: uuid(),
    };
  }

  async queryVideo(queryString) {
    try {
      const response = await fetch(this.searchUrl(queryString));
      const json = await response.json();

      const songToReturn = this.parseSongFromVideoJson(json);

      return songToReturn;
    } catch (error) {
      throw Error(error);
    }
  }
}
