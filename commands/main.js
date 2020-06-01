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
const pokedex = require("./pokedex.js");
const status = require("./status.js");
const ban = require("./ban.js");
const roll = require("./roll.js");
const purge = require("./purge.js");
//command names in this array
const commands = [
  kick,
  ping,
  help,
  fortune,
  warn,
  restrict,
  unrestrict,
  pokedex,
  status,
  ban,
  roll,
  purge
];

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
client.on("message", function(message) {
  for (let command of commands) {
    if (message.content.startsWith(prefix + command.prefix)) {
      command.command(message);
      break;
    }
  }
});
