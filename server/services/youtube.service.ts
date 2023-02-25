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

  videoQueryUrl(query: string) {
    return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${this.apiKey}`;
  }

  async parseVideoResponse(videoResponse) {
    if (videoResponse.error || !videoResponse?.items[0]?.id?.videoId) {
      throw new Error(videoResponse?.error?.message || "No video found");
    }

    const item = videoResponse.items[0];

    return {
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium,
      id: uuid(),
    };
  }

  async queryVideo(queryString) {
    try {
      const response = await axios.get(this.videoQueryUrl(queryString));
      const videoToReturn = this.parseVideoResponse(response.data);

      return videoToReturn;
    } catch (error) {
      throw Error(error);
    }
  }
}
