import {
  MessageEmbed,
  Message,
  MessageCollector,
  TextChannel,
} from "discord.js";
import config from "../../config.json";
import { CommandInt } from "../interfaces/CommandInt";

export const ban: CommandInt = {
  prefix: "ban",
  description:
    "Ban **user** from the channel. Optionally provide a **reason**. Only available to server moderators. Bot will log this action if log channel is available.",
  parameters:
    "`<user>`: @name of the user to ban | `<?reason>`: reason for banning the user",
  command: (message) => {
    if (!message.member?.hasPermission("BAN_MEMBERS")) {
      message.channel.send("ERROR 401: Missing permissions.");
      return;
    }
    const mod = message.author;
    const cmdArguments = message.content.split(" ");
    const member = message.mentions.members?.first();
    const user = message.mentions.users.first();
    const bot = config.bot_id;
    if (!member) {
      message.channel.send("ERROR 404: Invalid usertag.");
      return;
    }
    if (user === mod) {
      message.channel.send("ERROR 400: Cannot target self.");
      return;
    }
    if (user?.id === bot || member.id === bot) {
      message.channel.send("ERROR 400: Cannot target me.");
      return;
    }
    const reasonArg = cmdArguments.slice(2, cmdArguments.length);
    let reason = reasonArg.join(" ");
    if (!reason) {
      reason = "ERROR 404: No reason provided";
    }
    const banEmbed = new MessageEmbed()
      .setColor("#ff0000")
      .setTitle("Banned!")
      .addFields(
        {
          name: "Event:",
          value: `<@!${mod}> has banned <@!${user}> from the server.`,
        },
        {
          name: "Reason:",
          value: `${reason}`,
        }
      )
      .setFooter("BEEP BOOP: Detected sadness for user's departure.");
    message.channel.send(
      "ERROR 100: This action is irreversible. To proceed, reply with 'Yes'."
    );
    const collector: MessageCollector = new MessageCollector(
      message.channel as TextChannel,
      (m: Message) => m.author === message.author,
      { time: 10000 }
    );
    collector.on("collect", (reply) => {
      if (reply.content === "Yes") {
        const modChannel = message.guild?.channels.cache.find(
          (channel) => channel.name === config.log_channel
        ) as TextChannel;
        if (modChannel) {
          modChannel.send(banEmbed);
        }
        if (!modChannel) {
          message.channel.send("ERROR 404: Log channel not found.");
        }
        member.ban({ reason: reason }).catch((err) => console.log(err));
        return;
      }
      message.channel.send("STATUS 304: Request cancelled.");
    });
  },
};
