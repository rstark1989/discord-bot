import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";
import { CommandLog, CommandLogInt } from "../interfaces/UsageInt";

export const usage: CommandInt = {
  prefix: "usage",
  description:
    "Gets the number of times a particular **command** has been used.",
  parameters: "`<command>`: name of the command to check",
  command: (message) => {
    const array = message.content.split(" ");
    const command = array[1];
    CommandLog.findOne(
      { command: command },
      (err: Error, data: CommandLogInt) => {
        if (err || !data) {
          message.channel.send("ERROR 404: Command history not found.");
          return;
        }
        const commandEmbed = new MessageEmbed()
          .setTitle(command)
          .setDescription(
            `BEEP BOOP: This command has been used ${data.uses} times!`
          )
          .setFooter(
            `The command was last called by ${data.lastCaller} on ${data.lastCalled}`
          );
        message.channel.send(commandEmbed);
      }
    );
  },
};
