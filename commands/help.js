const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  prefix: "help",
  description: "Provides a list of current commands to the user.",
  command: async function(message) {
    const user = message.author;
    const helpEmbed = new Discord.MessageEmbed()
      .setColor("#0099FF")
      .setTitle("Bot Commands")
      .setDescription("Here are my currently available commands.")
      .setFooter("Have fun!");
    const files = await fs.promises.readdir(__dirname);
    files.forEach(function(file) {
      const filename = require(`./${file}`);
      if (file != "main.js") {
        helpEmbed.addFields({
          name: filename.prefix,
          value: filename.description
        });
      }
    });
    user.send(helpEmbed);
  }
};
