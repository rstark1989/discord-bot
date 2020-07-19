import { Message } from "discord.js";

export interface testInt {
  testCommand: (message?: Partial<Message>, bot?: unknown) => string;
}
