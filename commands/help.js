const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "help",
  description: "Provides a list of current commands to the user.",
  command: async function(message) {
    //create message embed
    const user = message.author;
    const helpEmbed = new Discord.MessageEmbed()
      .setColor("#0099FF")
      .setTitle("Bot Commands")
      .setDescription(
        "Hello! Here are my currently available commands. You can view my source code [here](https://github.com/nhcarrigan/discord-bot)"
      )
      .setFooter("Okay, that's all! Bye bye!");
    //read command files for prefix && description
    const files = await fs.promises.readdir(__dirname);
    files.forEach(function(file) {
      const filename = require(`./${file}`);
      //check if file is missing either prefix or description, skip file if true
      if (file != "main.js" && filename.prefix && filename.description) {
        helpEmbed.addFields({
          name: filename.prefix,
          value: filename.description
        });
      }
    });
    //DM the embed
    user.send(helpEmbed);
    //message to channel so people know bot is online
    message.channel.send(
      `Good day, ${message.author}! I have sent you a message detailing the services I offer.`
    );
  }
};
