const Discord = require("discord.js");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description ensures it shows in |help.
  prefix: "profile",
  description:
    "Returns a profile for the selected website. Use the format 'profile <website name> <id>'. I am able to access the following websites: Steam, Facebook, GitHub, Twitter, LinkedIn, Tumblr",
  command: function(message) {
    const arguments = message.content.split(" ");
    const website = arguments[1].toLowerCase();
    const name = arguments[2];
    let id = arguments[2];
    let prefix;
    //if no id is provided, throw error.
    if (!id) {
      message.channel.send(
        `Very sorry, ${message.author}, but I need a profile ID to find your friend.`
      );
      return;
    }
    //set url for website
    if (website == "steam") {
      prefix = "https://steamcommunity.com/id/";
    }
    if (website == "facebook") {
      prefix = "https://facebook.com/";
    }
    if (website == "github") {
      prefix = "https://github.com/";
    }
    if (website == "twitter") {
      prefix = "https://twitter.com/";
    }
    if (website == "linkedin") {
      prefix = "https://linkedin.com/in/";
    }
    if (website == "tumblr") {
      prefix = "https://";
      id = id + ".tumblr.com";
    }
    //if website isn't available for this command, notify user.
    if (!prefix) {
      message.channel.send(
        `Very sorry, ${message.author}, but I do not seem to have access to that website yet.`
      );
      return;
    }
    const embed = new Discord.MessageEmbed()
      .setColor("#ab47e6")
      .setTitle(`${website} user ${name}`)
      .setDescription(`Here is a [link to their profile](${prefix}${id})`);
    message.channel.send(embed);
  }
};
