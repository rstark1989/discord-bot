import config from "../../config.json";
import { CommandInt } from "../interfaces/CommandInt";
import { TextChannel, MessageEmbed } from "discord.js";

export const kick: CommandInt = {
  prefix: "kick",
  description:
    "Kick **user** from the channel. Optionally provide a **reason**. Only available to server moderators. Bot will log this action if the log channel is available.",
  parameters:
    "`<user>`: @name of the user to kick | `<?reason>`: reason for kicking the user",
  command: (message) => {
    if (!message.member?.hasPermission("KICK_MEMBERS")) {
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
      message.channel.send(
        "Sorry, but that appears to be an invalid user mention."
      );
      return;
    }
    if (user === mod) {
      message.channel.send("Sorry, but you cannot kick yourself!");
      return;
    }
    if (user?.id === bot || member.id === bot) {
      message.channel.send("Why are you trying to kick me? I am sad now.");
      return;
    }
    const reasonArg = cmdArguments.slice(2, cmdArguments.length);
    let reason = reasonArg.join(" ");
    if (!reason) {
      reason = "Sorry, but the moderator did not provide a reason.";
    }
    const kickEmbed = new MessageEmbed()
      .setColor("#ff8400")
      .setTitle("Kicked!")
      .addFields(
        {
          name: "Event:",
          value: `<@!${mod}> has kicked <@!${user}> from the server.`,
        },
        {
          name: "Reason:",
          value: `${reason}`,
        }
      )
      .setFooter("Please remember to follow our rules!");
    const modChannel = message.guild?.channels.cache.find(
      (channel) => channel.name === config.log_channel
    ) as TextChannel;
    if (modChannel) {
      modChannel.send(kickEmbed);
    }
    if (!modChannel) {
      message.channel.send(
        "Sorry, but I could not find where you wanted the logs."
      );
    }
    member.kick().catch((err: Error) => console.log(err));
  },
};
