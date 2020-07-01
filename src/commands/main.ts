import { Client, TextChannel, MessageEmbed } from "discord.js";
const client = new Client();
import config from "../../config.json";
const prefix = config.prefix;
import dotenv from "dotenv";
import Mongoose from "mongoose";
dotenv.config();
client.login(process.env.DISCORD_TOKEN).catch((e) => console.error(e));
const URI: string = process.env.MONGO_URI || "";

//command files here:
import { ping } from "./ping";
import { kick } from "./kick";
import { help } from "./help";
import { fortune } from "./fortune";
import { warn } from "./warn";
import { restrict } from "./restrict";
import { unrestrict } from "./unrestrict";
import { pokenum } from "./pokenum";
import { status } from "./status";
import { ban } from "./ban";
import { roll } from "./roll";
import { purge } from "./purge";
import { about } from "./about";
import { wiki } from "./wiki";
import { pokename } from "./pokename";
import { search } from "./search";
import { profile } from "./profile";
import { kirby } from "./kirby";
import { magic } from "./magic";
import { star } from "./star";
import { user } from "./user";
import { level } from "./levels";
import { cat } from "./cat";
import { close } from "./close";
import { usage } from "./usage";
import { hearts } from "../listeners/heartsListen";
import { levelListen } from "../listeners/levelsListen";
import { usageListen } from "../listeners/usageListen";
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
  magic,
  star,
  user,
  level,
  cat,
  close,
  usage,
];

//verify bot is ready
client.on("ready", function () {
  console.log("Activate the Omega");
  return;
});

//db connection
Mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => console.log("Database connection failed."));

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
  levelListen.listener(message);
  hearts.listener(message);
  if (message.attachments.array().length > 0) {
    if (!message.attachments.array()[0].height) {
      message.delete();
      message.channel.send("ERROR 415: Only images and videos supported.");
    }
  }
  for (let command of commands) {
    if (message.content.startsWith(prefix + command.prefix)) {
      usageListen.listener(message);
      command.command(message);
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
        value: message.content,
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
