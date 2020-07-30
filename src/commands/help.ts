import config from "../../config.json";
import { commandInt } from "../interfaces/commandInt";
import { MessageEmbed } from "discord.js";
import { commands } from "../commands";
const prefix = config.prefix;

export const help: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "help",
  description:
    "Provides a list of current commands to the user. Hey, that's THIS command! 🙃 Optionally include a command name as a parameter to get details on that command.",
  command: async function (message) {
    //create message embed
    const user = message.author;
    const parameters = message.content.split(" ");
    if (parameters[1]) {
      for (const command of commands) {
        if (parameters[1] === command.prefix) {
          const matchEmbed = new MessageEmbed()
            .setTitle(command.prefix)
            .setDescription(command.description);
          message.channel.send(matchEmbed);
          return;
        }
      }
    }
    const helpEmbed = new MessageEmbed()
      .setColor("#ab47e6")
      .setTitle("Bot Commands")
      .setDescription(
        `BEEP BOOP: Available commands include the following. Command name must be prefixed with '${prefix}', just like the '${prefix}help' command used to get this message. For a list of all commands, or for more information, view my [documentation](https://www.nhcarrigan.com/discord-bot-documentation)`
      )
      .addFields(
        {
          name: "about",
          value: "Provides details about the bot.",
        },
        {
          name: "ping",
          value: "Measures the response time of the bot's server.",
        },
        {
          name: "status",
          value: "Provides details on the server.",
        },
        {
          name: "user",
          value: "Provides details on the user.",
        }
      )
      .setFooter("BEEP BOOP: End of message.");
    //DM the embed
    user.send(helpEmbed);
    //message to channel so people know bot is online
    message.channel.send(
      `BEEP BOOP: <@!${message.author}>, help message sent.`
    );
  },
};
