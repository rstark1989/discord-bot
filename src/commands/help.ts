import config from "../../config.json";
import { commandInt } from "../interfaces/commandInt";
import { MessageEmbed } from "discord.js";
import fs from "fs";
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
      const file = await fs.promises
        .readFile("./src/commands/" + parameters[1] + ".ts", "utf8")
        .catch((err) => {
          message.channel.send(
            `ERROR 404: ${parameters[1]} command not found.`
          );
          console.log(err);
        });
      if (!file) return "blah";
      const match = file.match(/description:.*,/);
      const matchEmbed = new MessageEmbed()
        .setTitle(parameters[1])
        .setDescription(match);
      message.channel.send(matchEmbed);
      return "balh";
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
    if (message.id !== "test") user.send(helpEmbed);
    //message to channel so people know bot is online
    if (message.id !== "test")
      message.channel.send(
        `BEEP BOOP: <@!${message.author}>, help message sent.`
      );
    return message.author.id;
  },
};
