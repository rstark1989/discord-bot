const Discord = require("discord.js");
const Enmap = require("enmap");
const client = new Discord.Client();
const begin = "!";
const config = require("../config.json");
client.config = config;
client.login(config.token);

client.on("ready", function() {
  console.log("Activate the Omega!");
});

client.on("message", function(message) {
  if (!message.content.startsWith(begin) || message.author.bot) {
    return;
  }

  if (message.content.startsWith("!ping")) {
    message.channel.send("pong!");
  }
});
