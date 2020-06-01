const profanity = [
  "ass",
  "shit",
  "fuck",
  "crap",
  "bitch",
  "cunt",
  "bastard",
  "slut",
  "whore",
  "nigger",
  "dick",
  "cock",
  "pussy"
];
const Discord = require("discord.js");
module.exports = {
  command: function(message) {
    const stuff = message.content.toLowerCase();
    for (let i = 0; i < profanity.length; i++) {
      if (stuff.includes(profanity[i])) {
        message.channel.send(
          `${message.author}, please take care to mind your language.`
        );
        const profanityEmbed = new Discord.MessageEmbed()
          .setTitle("Someone used profanity :(")
          .setDescription("Here's the details.")
          .addFields(
            {
              name: "Who said it?",
              value: `${message.author}`
            },
            {
              name: "What did they say?",
              value: `${message.content}`
            },
            {
              name: "What was wrong with that message?",
              value: `It contained the word "${profanity[i]}"`
            }
          )
          .setFooter(
            "I do hope no one is offended. I deleted the message to be safe."
          );
        message.delete();
        const modChannel = message.guild.channels.cache.find(
          channel => channel.name == "moderation-activity"
        );
        if (!modChannel) {
          console.error("mod channel not found.");
        } else {
          modChannel.send(profanityEmbed);
        }
        break;
      }
    }
  }
};
