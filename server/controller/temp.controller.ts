import { APILogger } from "../logger/api.logger";
import { ITemp } from "../model/temp.model";
import { TempService } from "../service/temp.service";

export class TempController {
  private tempService: TempService;
  private logger: APILogger;

  constructor() {
    this.tempService = new TempService();
    this.logger = new APILogger();
  }

  async getTempData() {
    return await this.tempService.getTemp();
  }

  async createTempData(event: ITemp) {
    return await this.tempService.createTemp(event);
  }
}
