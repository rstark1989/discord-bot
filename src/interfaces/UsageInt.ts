import { Document, Schema, model } from "mongoose";

export interface CommandLogInt extends Document {
  command: string;
  uses: number;
  lastCalled: string;
}

export const commandLogSchema = new Schema({
  command: String,
  uses: Number,
  lastCalled: String,
});
export const CommandLog = model<CommandLogInt>("commandLog", commandLogSchema);
