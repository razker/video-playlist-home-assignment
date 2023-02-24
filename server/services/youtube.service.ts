import { Video } from "../../types/playlist";
import { APILogger } from "../logger/api.logger";
import axios from "axios";
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

  parseVideoFromVideoJson(json): Video {
    if ("error" in json) {
      throw new Error(json.error.message);
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
      const response = await axios.get(this.searchUrl(queryString));
      const videoToReturn = this.parseVideoFromVideoJson(response.data);

      return videoToReturn;
    } catch (error) {
      throw Error(error);
    }
  }
}
