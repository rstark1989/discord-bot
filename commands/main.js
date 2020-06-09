const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const prefix = config.prefix;
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/../.env" });
client.login(process.env.DISCORD_TOKEN);

//command files here:
const ping = require("./ping.js");
const kick = require("./kick.js");
const help = require("./help.js");
const fortune = require("./fortune.js");
const warn = require("./warn.js");
const restrict = require("./restrict.js");
const unrestrict = require("./unrestrict.js");
const pokenum = require("./pokenum.js");
const status = require("./status.js");
const ban = require("./ban.js");
const roll = require("./roll.js");
const purge = require("./purge.js");
const about = require("./about.js");
const wiki = require("./wiki.js");
const pokename = require("./pokename.js");
const search = require("./search.js");
const profile = require("./profile.js");
const kirby = require("./kirby.js");
const magic = require("./magic.js");
//command names in this array
const commands = [
  kick,
  ping,
  help,
  fortune,
  warn,
  restrict,
  unrestrict,
  pokenum,
  status,
  ban,
  roll,
  purge,
  about,
  wiki,
  pokename,
  search,
  profile,
  kirby,
  magic
];

//verify bot is ready
client.on("ready", function() {
  console.log("Activate the Omega!");
});

//welcome message
client.on("guildMemberAdd", function(member) {
  const welcomeEmbed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setTitle("Welcome!")
    .setDescription("Thank you for joining my server!")
    .addFields(
      {
        name: "Rules",
        value: "Please read the rules in our Welcome channel!"
      },
      {
        name: "My Commands",
        value: `Use the ${prefix} prefix to get my attention! Try '${prefix}help' to see what I can do!`
      }
    )
    .setFooter("Have fun!");
  member.send(welcomeEmbed);
  const welcomeChannel = member.guild.channels.cache.find(
    channel => channel.name == "introductions"
  );
  if (!welcomeChannel) {
    console.error("welcome channel not found.");
    return;
  } else {
    welcomeChannel.send(
      `** Welcome ${member.user}! Take a moment to introduce yourself here! :) **`
    );
  }
});

//depart message
client.on("guildMemberRemove", function(member) {
  const goodbyeChannel = member.guild.channels.cache.find(
    channel => channel.name == "introductions"
  );
  if (!goodbyeChannel) {
    console.error("depart channel not found.");
    return;
  } else {
    goodbyeChannel.send(`** ${member.user} has left us! :( **`);
  }
});

//messages listener
client.on("message", function(message) {
  for (let command of commands) {
    if (message.content.startsWith(prefix + command.prefix)) {
      command.command(message);
      break;
    }
  }
});

//deleted message logging
client.on("messageDelete", function(message) {
  const logChannel = message.guild.channels.cache.find(
    channel => channel.name == "moderation-activity"
  );
  const deleteEmbed = new Discord.MessageEmbed()
    .setTitle("A message was deleted.")
    .setColor("")
    .setDescription("Here's the details of that message.")
    .addFields(
      {
        name: "Message author",
        value: message.author
      },
      {
        name: "Channel",
        value: message.channel
      },
      {
        name: "Content",
        value: message.content
      }
    );
  if (!logChannel) {
    console.error("logging channel not found");
    message.channel.send(deleteEmbed);
    return;
  } else {
    logChannel.send(deleteEmbed);
  }
});
