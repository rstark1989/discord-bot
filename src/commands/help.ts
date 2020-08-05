import config from "../../config.json";
import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";
import { COMMANDS } from "../COMMANDS";
const prefix = config.prefix;

export const help: CommandInt = {
  prefix: "help",
  description:
    "Provides a list of current commands to the user. Optionally provides information on the specific **command**.",
  parameters:
    "`<?command>` - name of the command to get more information about",
  command: async function (message) {
    const user = message.author;
    const parameters = message.content.split(" ");
    if (parameters[1]) {
      for (const command of COMMANDS) {
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
    for (const command of COMMANDS) {
      commandArray.push(`\`${command.prefix}\``);
    }
    const commandString = commandArray.sort().join(" | ");
    helpEmbed.addFields({ name: "Available Commands", value: commandString });
    user.send(helpEmbed);
    message.channel.send(
      `BEEP BOOP: <@!${message.author}>, help message sent.`
    );
  },
};
