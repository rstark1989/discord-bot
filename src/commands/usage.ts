import { commandInt } from "../interfaces/commandInt";
import { MessageEmbed } from "discord.js";
import { commandLog, commandLogInt } from "../interfaces/usageInt";

export const usage: commandInt = {
  prefix: "usage",
  description:
    "Gets the number of times a particular command has been used. Use the format 'usage <command>'.",
  command: function (message) {
    const array = message.content.split(" ");
    const command = array[1];
    commandLog.findOne({ command: command }, function (
      err: Error,
      data: commandLogInt
    ) {
      if (err || !data) {
        message.channel.send("ERROR 404: Command history not found.");
      } else {
        const commandEmbed = new MessageEmbed()
          .setTitle(command)
          .setDescription(
            `BEEP BOOP: This command has been used ${data.uses} times!`
          );
        message.channel.send(commandEmbed);
      }
    });
    return "success";
  },
};
