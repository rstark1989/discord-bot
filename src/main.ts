import { Client, TextChannel, MessageEmbed } from "discord.js";
const client = new Client();
import config from "../config.json";
const prefix = config.prefix;
import dotenv from "dotenv";
import Mongoose from "mongoose";
dotenv.config();
client.login(process.env.DISCORD_TOKEN).catch((e) => console.error(e));
const URI: string = process.env.MONGO_URI || "";

import { commands } from "./commands";
import { hearts } from "./listeners/heartsListen";
import { levelListen } from "./listeners/levelsListen";
import { usageListen } from "./listeners/usageListen";

//verify bot is ready
client.on("ready", function () {
  console.log("Activate the Omega");
  return;
});

//db connection
Mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => console.log("Database connection failed.", err));

//welcome message
client.on("guildMemberAdd", function (member) {
  const welcomeEmbed = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle("Welcome!")
    .setDescription("BEEP BOOP: Gratitude for joining my server.")
    .addFields(
      {
        name: "Rules:",
        value: "Please read the rules in our Welcome channel!",
      },
      {
        name: "My Commands:",
        value: `Use the ${prefix} prefix to get my attention! Try '${prefix}help' to see what I can do!`,
      }
    )
    .setFooter("BEEP BOOP: Have fun!");
  member.send(welcomeEmbed).catch((e) => console.error(e));
  const welcomeLogEmbed = new MessageEmbed()
    .setColor("#ab47e6")
    .setTitle("A new user has joined! 🙃")
    .setDescription(
      `BEEP BOOP: New member detected. Initiate welcome protocol for <@!${member.user}>!`
    );
  const welcomeChannel = member.guild.channels.cache.find(
    (channel) => channel.name == config.join_leave_channel
  ) as TextChannel;
  if (!welcomeChannel) {
    console.error("welcome channel not found.");
    return;
  } else {
    welcomeChannel.send(welcomeLogEmbed).catch((e) => console.error(e));
  }
});

//depart message
client.on("guildMemberRemove", function (member) {
  const goodbyeChannel = member.guild.channels.cache.find(
    (channel) => channel.name == config.join_leave_channel
  ) as TextChannel;
  const departEmbed = new MessageEmbed()
    .setColor("#ab47e6")
    .setTitle("A user has left us! 😦")
    .setDescription(
      `BEEP BOOP: User departure detected. Initiate goodbye protocol for <@!${member.user}>! You will be missed!`
    );
  if (!goodbyeChannel) {
    console.error("depart channel not found.");
    return;
  } else {
    goodbyeChannel.send(departEmbed).catch((e) => console.error(e));
  }
});

//messages listener
client.on("message", function (message) {
  if (message.channel.type === "dm" && message.author.id !== client.user?.id) {
    message.channel.send(
      "BEEP BOOP: Please talk to me in a server, not a private message. If you need a server to join, check out my home! https://discord.gg/PHqDbkg"
    );
    return;
  }
  levelListen.listener(message);
  hearts.listener(message);
  if (message.attachments.array().length > 0) {
    if (!message.attachments.array()[0].height) {
      message.delete();
      message.channel.send("ERROR 415: Only images and videos supported.");
    }
  }
  for (const command of commands) {
    if (message.content.split(" ")[0] === prefix + command.prefix) {
      usageListen.listener(message);
      command.command(message, client);
      break;
    }
  }
});

//deleted message logging
client.on("messageDelete", function (message) {
  const logChannel = message.guild?.channels.cache.find(
    (channel) => channel.name == config.log_channel
  ) as TextChannel;
  const deleteEmbed = new MessageEmbed()
    .setTitle("A message was deleted.")
    .setColor("#ff0000")
    .setDescription("BEEP BOOP: Loading message details.")
    .addFields(
      {
        name: "Message author:",
        value: message.author,
      },
      {
        name: "Channel:",
        value: message.channel,
      },
      {
        name: "Content:",
        value: message.content || "ERROR 404: Content not found.",
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
