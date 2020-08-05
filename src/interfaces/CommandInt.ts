import { Message, Client } from "discord.js";

export interface CommandInt {
  prefix: string;
  description: string;
  parameters?: string;
  command: (message: Message, bot?: Client) => void;
}
