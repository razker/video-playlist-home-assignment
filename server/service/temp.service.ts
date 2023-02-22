import { APILogger } from "../logger/api.logger";
import { ITemp } from "../model/temp.model";
import { TempRepository } from "../repository/temp.repository";

export class TempService {
  private tempRepository: TempRepository;
  private logger: APILogger;

  constructor() {
    this.tempRepository = new TempRepository();
    this.logger = new APILogger();
  }

  async createTemp(eventData: ITemp) {
    try {
      const existEvent = await this.tempRepository.getTemp(eventData);
      if (existEvent.length) {
        this.logger.error("EventService: createTask | event exist");
        return { error: "event exist" };
      }
      return await this.tempRepository.createTemp(eventData);
    } catch (error) {
      throw Error(error);
    }
  }

  async getTemp() {
    try {
      return await this.tempRepository.getTemps();
    } catch (error) {
      throw Error(error);
    }
  }
}
