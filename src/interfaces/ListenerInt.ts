import { Message } from "discord.js";

export interface ListenerInt {
  name: string;
  description: string;
  listener: (message: Message) => void;
}
