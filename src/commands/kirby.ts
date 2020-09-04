import { CommandInt } from "../interfaces/CommandInt";

export const kirby: CommandInt = {
  prefix: "kirby",
  description: "Do a little dance... make a little noise... GET DOWN TONIGHT!",
  parameters: "*none*",
  command: (message) => {
    message.channel.send("Dance with me!");
    setTimeout(() => message.channel.send("<('.')>"), 1000);
    setTimeout(() => message.channel.send("<('.'<)"), 2000);
    setTimeout(() => message.channel.send("(>'.')>"), 3000);
    setTimeout(() => message.channel.send("^('.')^"), 4000);
  },
};
