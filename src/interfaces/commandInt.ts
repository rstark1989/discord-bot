import { Message, Client } from "discord.js";

export interface commandInt {
  prefix: string;
  description: string;
  command: (message: Message, bot?: Client) => string | Promise<string>;
}
