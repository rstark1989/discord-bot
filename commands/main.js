const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const prefix = config.prefix;
client.config = config;
client.login(config.token);

//command files here:
const ping = require("./ping.js");
const kick = require("./kick.js");
const help = require("./help.js");
const fortune = require("./fortune.js");
const warn = require("./warn.js");
//command names in this array
const commands = [kick, ping, help, fortune, warn];

//verify bot is ready
client.on("ready", function() {
  console.log("Activate the Omega!");
});

//welcome message
client.on("guildMemberAdd", function(member) {
  const welcomeEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Welcome!")
    .setDescription("Thank you for joining my server!")
    .addFields(
      {
        name: "Rules",
        value: "Please read the rules in our Welcome channel!"
      },
      {
        name: "My Commands",
        value:
          "Use the '|' prefix to get my attention! Try '|help' to see what I can do!"
      }
    )
    .setFooter("Have fun!");
  member.send(welcomeEmbed);
});

//depart message
client.on("guildMemberRemove", function(member) {
  member.guild.channels.cache
    .find(channel => channel.name == "introductions")
    .send(`** ${member.user} has left us! :( **`);
});
client.on("message", function(message) {
  for (let command of commands) {
    if (message.content.startsWith(prefix + command.prefix)) {
      command.command(message);
      break;
    }
  }
});
