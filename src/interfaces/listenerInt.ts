import { Message } from "discord.js";

export interface listenerInt {
  name: string;
  description: string;
  listener: (message: Message) => void;
}
