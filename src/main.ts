import { Client, TextChannel, MessageEmbed, WebhookClient } from "discord.js";
const client = new Client();
import config from "../config.json";
const prefix = config.prefix;
import dotenv from "dotenv";
import Mongoose from "mongoose";
import packageInfo from "../package.json";
dotenv.config();
client.login(process.env.DISCORD_TOKEN).catch((e) => console.error(e));
const URI: string = process.env.MONGO_URI || "";

import { COMMANDS } from "./COMMANDS";
import { hearts } from "./listeners/heartsListen";
import { levelListen } from "./listeners/levelsListen";
import { usageListen } from "./listeners/usageListen";

const hook = new WebhookClient(
  process.env.WH_ID || "none",
  process.env.WH_TOKEN || "none"
);

export const uptimeTimestamp = Date.now();

client.on("ready", () => {
  console.log("Activate the Omega");
  hook.send(
    `\`${client.user?.username}\` online. Running a ${process.env.PRODDEV} instance of bot version ${packageInfo.version}.`
  );
  client.user?.setActivity(`for commands! Try ${prefix}help`, {
    type: "WATCHING",
  });
  return;
});

Mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => console.log("Database connection failed.", err));

client.on("guildCreate", (guild) => {
  hook.send(
    `\`${client.user?.username}\` has joined the ${guild.name} server!`
  );
});

client.on("guildDelete", (guild) => {
  hook.send(`\`${client.user?.username}\` has left the ${guild.name} server`);
});

client.on("guildMemberAdd", (member) => {
  const welcomeEmbed = new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`Welcome to ${member.guild.name}`)
    .setDescription("BEEP BOOP: Gratitude for joining our server.")
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
  member.send(welcomeEmbed).catch((err) => console.error(err));
  const welcomeLogEmbed = new MessageEmbed()
    .setColor("#ab47e6")
    .setTitle("A new user has joined! 🙃")
    .setDescription(
      `BEEP BOOP: New member detected. Initiate welcome protocol for <@!${member.user}>!`
    );
  const welcomeChannel = member.guild.channels.cache.find(
    (channel) => channel.name === config.join_leave_channel
  ) as TextChannel;
  if (!welcomeChannel) {
    console.error("welcome channel not found.");
    return;
  }
  welcomeChannel.send(welcomeLogEmbed).catch((err) => console.error(err));
});

client.on("guildMemberRemove", (member) => {
  const goodbyeChannel = member.guild.channels.cache.find(
    (channel) => channel.name === config.join_leave_channel
  ) as TextChannel;
  const departEmbed = new MessageEmbed()
    .setColor("#ab47e6")
    .setTitle("A user has left us! 😦")
    .setDescription(
      `BEEP BOOP: User departure detected. Initiate goodbye protocol for ${
        member.nickname || member.user?.username
      }! You will be missed!`
    );
  if (!goodbyeChannel) {
    console.error("depart channel not found.");
    return;
  }
  goodbyeChannel.send(departEmbed).catch((err) => console.error(err));
});

client.on("message", (message) => {
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
  for (const command of COMMANDS) {
    if (message.content.split(" ")[0] === prefix + command.prefix) {
      usageListen.listener(message);
      command.command(message, client);
      break;
    }
  }
});

client.on("messageDelete", (message) => {
  const logChannel = message.guild?.channels.cache.find(
    (channel) => channel.name === config.log_channel
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
  }
  logChannel.send(deleteEmbed);
});

process.once("beforeExit", () => {
  hook.send(`${client.user?.username} is shutting down. Goodbye.`);
});
