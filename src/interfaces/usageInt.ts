import { Document, Schema, model } from "mongoose";

export interface commandLogInt extends Document {
  command: string;
  uses: number;
}

export const commandLogSchema = new Schema({
  command: String,
  uses: Number,
});
export const commandLog = model("commandLog", commandLogSchema);
