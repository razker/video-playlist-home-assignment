import { model, Schema, Model } from "mongoose";

export interface ITemp {
  tempType: string;
  tempDate: string;
}

const TempSchema: Schema = new Schema({
  tempType: { type: String, required: true },
  tempDate: { type: Date, required: true },
});

export const TempModel: Model<ITemp> = model<ITemp>("temp", TempSchema);
