const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "help",
  description:
    "Provides a list of current commands to the user. Hey, that's THIS command! 🙃",
  command: async function (message) {
    //create message embed
    const user = message.author;
    const helpEmbed = new Discord.MessageEmbed()
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
    message.channel.send(`BEEP BOOP: ${message.author}, help message sent.`);
  },
};
