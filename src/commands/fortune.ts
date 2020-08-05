import { CommandInt } from "../interfaces/CommandInt";

const fortunes = [
  "You will find great wealth in the near future.",
  "Show others kindness and you shall receive kindness in return.",
  "Always remember those who helped you get where you are now.",
];

export const fortune: CommandInt = {
  prefix: "fortune",
  description: "Tells you a fortune.",
  parameters: "*none*",
  command: (message) => {
    const index = Math.floor(Math.random() * fortunes.length);
    message.channel.send(`BEEP BOOP: ${fortunes[index]}`);
  },
};
