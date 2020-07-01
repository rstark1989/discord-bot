import { Message } from "discord.js";

export interface listenerInt {
  listener: (message: Message) => void;
}
