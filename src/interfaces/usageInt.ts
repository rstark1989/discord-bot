import { Document, Schema, model } from "mongoose";

export interface CommandLogInt extends Document {
  command: string;
  uses: number;
}

export const commandLogSchema = new Schema({
  command: String,
  uses: Number,
});
export const CommandLog = model<CommandLogInt>("commandLog", commandLogSchema);
