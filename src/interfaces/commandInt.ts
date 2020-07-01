import { Message } from "discord.js";

export interface commandInt {
  prefix: string;
  description: string;
  command: (message: Message, bot?: any) => void;
}
