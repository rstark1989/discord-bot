import config from "../../config.json";
import { commandInt } from "../interfaces/commandInt";
import { MessageEmbed } from "discord.js";
import { commands } from "../commands";
const prefix = config.prefix;

export const help: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "help",
  description:
    "Provides a list of current commands to the user. Optionally provides information on the specific **command**.",
  parameters:
    "`<?command>` - name of the command to get more information about",
  command: async function (message) {
    //create message embed
    const user = message.author;
    const parameters = message.content.split(" ");
    if (parameters[1]) {
      for (const command of commands) {
        if (parameters[1] === command.prefix) {
          const matchEmbed = new MessageEmbed()
            .setTitle(command.prefix)
            .setDescription(
              `BEEP BOOP: Providing information on my ${command.prefix} feature.`
            )
            .addFields(
              { name: "Description", value: command.description },
              { name: "Parameters", value: command.parameters },
              {
                name: "Syntax",
                value:
                  command.parameters === "*none*"
                    ? `${config.prefix}${command.prefix}`
                    : `${config.prefix}${
                        command.prefix
                      } ${command.parameters?.match(/<[a-z?]*>/g)?.join(" ")}`,
              }
            );
          message.channel.send(matchEmbed);
          return;
        }
      }
      message.channel.send(
        `\`${parameters[1]}\` command not found. Try \`${prefix}help\` for a list of available commands.`
      );
      return;
    }
    const helpEmbed = new MessageEmbed()
      .setColor("#ab47e6")
      .setTitle("Bot Commands")
      .setDescription(
        `BEEP BOOP: Available commands include the following. Command name must be prefixed with '${prefix}', just like the '${prefix}help' command used to get this message. For information on a specific command, use '${prefix}help <command>.`
      )
      .setFooter("BEEP BOOP: End of message.");
    const commandArray = [];
    for (const command of commands) {
      commandArray.push(`\`${command.prefix}\``);
    }
    const commandString = commandArray.sort().join(" | ");
    helpEmbed.addFields({ name: "Available Commands", value: commandString });
    //DM the embed
    user.send(helpEmbed);
    //message to channel so people know bot is online
    message.channel.send(
      `BEEP BOOP: <@!${message.author}>, help message sent.`
    );
  },
};
