import { connect, disconnect } from "../config/db.config";
import { TempModel, ITemp } from "../model/temp.model";
import { APILogger } from "../logger/api.logger";
import * as dayjs from "dayjs";
export class TempRepository {
  private logger: APILogger;

  constructor() {
    connect();
    this.logger = new APILogger();
  }

  async getTemps() {
    try {
      return await TempModel.find({
        tempDate: { $gte: dayjs().format("YYYY-MM-DD") },
      }).sort({ eventDate: 1 });
    } catch (error) {
      this.logger.error(`ERROR :: EventRepository:: getEvents | ${error}`);
    }
  }

  async getTemp(tempData: ITemp) {
    try {
      const { tempType, tempDate } = tempData;
      const event = await TempModel.find({
        tempType,
        tempDate: dayjs(tempDate).set("hour", 14).format(),
      });

      return event;
    } catch (error) {
      this.logger.error(`ERROR :: EventRepository:: getEvent | ${error}`);
    }
  }

  async createTemp(tempData: ITemp) {
    try {
      const { tempType, tempDate } = tempData;
      const event = await TempModel.create({
        tempType,
        eventDate: dayjs(tempDate).set("hour", 14).format(),
      });

      return event;
    } catch (error) {
      this.logger.error(`ERROR :: EventRepository:: getEvent | ${error}`);
    }
  }
}
