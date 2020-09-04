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
  command: async (message) => {
    const cmdArguments = message.content.split(" ");
    if (cmdArguments[1]) {
      for (const command of COMMANDS) {
        if (cmdArguments[1] === command.prefix) {
          const matchEmbed = new MessageEmbed()
            .setTitle(command.prefix)
            .setDescription(
              `Here is the information on my ${command.prefix} feature.`
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
        `Sorry, but I could not find the \`${cmdArguments[1]}\` command. Try \`${prefix}help\` for a list of available commands.`
      );
      return;
    }
    const helpEmbed = new MessageEmbed()
      .setColor("#ab47e6")
      .setTitle("Bot Commands")
      .setDescription(
        `My available commands include the following. The command name must be prefixed with '${prefix}', just like the '${prefix}help' command used to get this message. For information on a specific command, use '${prefix}help <command>.`
      )
      .setFooter("I hope I could help!");
    const commandArray = [];
    for (const command of COMMANDS) {
      commandArray.push(`\`${command.prefix}\``);
    }
    const commandString = commandArray.sort().join(" | ");
    helpEmbed.addFields({ name: "Available Commands", value: commandString });
    message.channel.send(helpEmbed);
  },
};
