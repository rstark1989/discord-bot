const Discord = require("discord.js");
const fs = require("fs");
const package = require("../package.json")
module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is just for the record.
  prefix: "about",
  description: "Provides details about the bot.",
  command: async function(message, bot) {
    const files = await fs.promises.readdir(__dirname);
    const aboutEmbed = new Discord.MessageEmbed()
      .setColor("#ab47e6")
      .setTitle("My name is nhbot!")
      .setDescription(
        "BEEP BOOP: I am a discord bot created by nhcarrigan, with help from a few contributors.  You can view my [source code and contributor list](https://github.com/nhcarrigan/discord-bot) online."
      )
      .addFields(
        {
          name: "Version",
          value: `Version ${package.version}`
        },
        {
          name: "I Was Created On",
          value: "Sun May 31 2020"
        },
        {
          name: "How many commands I know:",
          value: `${files.length} 🙃`
        },
        {
          name: "My favourite colour:",
          value: "PURPLE! 💜"
        }
      );
    message.channel.send(aboutEmbed);
  }
};
