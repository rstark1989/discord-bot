import {
  MessageEmbed,
  Message,
  MessageCollector,
  TextChannel,
} from "discord.js";
import config from "../../config.json";
import { commandInt } from "../interfaces/commandInt";

export const ban: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "ban",
  description:
    "Ban a user from the channel. Use the format 'ban <user> <reason>'. Only available to server moderators.",
  command: function (message) {
    //check for appropriate permission.
    if (message.member?.hasPermission("BAN_MEMBERS") == false) {
      message.channel.send(`ERROR 401: Missing permissions.`);
      return;
    }
    const mod = message.author;
    const cmdarguments = message.content.split(" ");
    const user = message.mentions.members?.first();
    const usernotmember = message.mentions.users.first();
    //check for valid user mention
    if (user == undefined) {
      message.channel.send(`ERROR 404: Invalid usertag.`);
      return;
    }
    if (usernotmember == mod) {
      message.channel.send(`ERROR 400: Cannot target self.`);
      return;
    }
    const reasonArg = cmdarguments.slice(2, cmdarguments.length);
    let reason = reasonArg.join(" ");
    //check for reason provided.
    if (reason == "") {
      reason = "ERROR 404: No reason provided";
    }
    const banEmbed = new MessageEmbed()
      .setColor("#ff0000")
      .setTitle(`Banned!`)
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
    //confirm you want to do this, as the bot currently cannot revert a ban.
    message.channel.send(
      "ERROR 100: This action is irreversible. To proceed, reply with 'Yes'."
    );
    //listen for reply.
    const collector: MessageCollector = new MessageCollector(
      message.channel as TextChannel,
      (m: Message) => m.author == message.author,
      { time: 10000 }
    );
    collector.on("collect", (reply) => {
      //yes.
      if (reply.content == "Yes") {
        const modChannel = message.guild?.channels.cache.find(
          (channel) => channel.name === config.log_channel
        ) as TextChannel;
        //moderation channel must be valid.
        if (modChannel) {
          modChannel.send(banEmbed);
        }
        if (!modChannel) {
          message.channel.send("ERROR 404: Log channel not found.");
        }
        user.ban({ reason: reason }).catch((err) => console.log(err));
      }
      // anything but yes.
      else {
        message.channel.send("STATUS 304: Request cancelled.");
      }
    });
  },
};
