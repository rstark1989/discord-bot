import { Message, Client } from "discord.js";

export interface commandInt {
  prefix: string;
  description: string;
  parameters?: string;
  command: (message: Message, bot?: Client) => void;
}
