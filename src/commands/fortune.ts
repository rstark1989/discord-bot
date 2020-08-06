import { CommandInt } from "../interfaces/CommandInt";
import { fortunes } from "../resources/fortunesList";

export const fortune: CommandInt = {
  prefix: "fortune",
  description: "Tells you a fortune.",
  parameters: "*none*",
  command: (message) => {
    const index = Math.floor(Math.random() * fortunes.length);
    message.channel.send(`BEEP BOOP: ${fortunes[index]}`);
  },
};
