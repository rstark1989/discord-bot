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
      message.channel.send(
        "Sorry, but this command is restricted to moderators."
      );
      return;
    }
    const mod = message.author;
    const cmdArguments = message.content.split(" ");
    const member = message.mentions.members?.first();
    const user = message.mentions.users.first();
    const bot = config.bot_id;
    if (!member) {
      message.channel.send("Sorry, but I do not see a valid user mention.");
      return;
    }
    if (user === mod) {
      message.channel.send("Sorry, but you cannot ban yourself!");
      return;
    }
    if (user?.id === bot || member.id === bot) {
      message.channel.send("Why are you trying to ban me? I am sad now.");
      return;
    }
    const reasonArg = cmdArguments.slice(2, cmdArguments.length);
    let reason = reasonArg.join(" ");
    if (!reason) {
      reason = "Sorry, but the moderator did not give a reason.";
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
      .setFooter("Please remember to follow the rules.");
    message.channel.send(
      "Wait! This action is irreversible. To proceed, reply with 'Yes'."
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
          message.channel.send(
            "Sorry, but I could not find where you wanted the logs."
          );
        }
        member.ban({ reason: reason }).catch((err) => console.log(err));
        return;
      }
      message.channel.send("Okay, I will hold off on this action for now.");
    });
  },
};
