import { Document, Schema, model } from "mongoose";

export interface UserInt extends Document {
  name: string;
  points: number;
  userid: string;
}

export const userSchema = new Schema({
  name: String,
  points: Number,
  userid: String,
});
export const User = model<UserInt>("user", userSchema);
