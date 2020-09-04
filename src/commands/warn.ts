import config from "../../config.json";
import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed, TextChannel } from "discord.js";

export const warn: CommandInt = {
  prefix: "warn",
  description:
    "Send a warning to the **user**. Optionally provide a **reason**. Only available to server moderators. Bot will log this action if log channel is available.",
  parameters:
    "`<user>`: @name of the user to warn | `<?reason>`: reason for warning the user.",
  command: (message) => {
    if (!message.member?.hasPermission("KICK_MEMBERS")) {
      message.channel.send(
        `Sorry, but this command is restricted to moderators.`
      );
      return;
    }
    const mod = message.author;
    const cmdArguments = message.content.split(" ");
    const user = message.mentions.users.first();
    const bot = config.bot_id;
    if (!user) {
      message.channel.send(
        `Sorry, but that appears to be an invalid user mention.`
      );
      return;
    }
    if (user === mod) {
      message.channel.send(`Sorry, but you cannot warn yourself!`);
      return;
    }
    if (user?.id === bot) {
      message.channel.send("Why do you want to warn me? I am sad now.");
      return;
    }
    const reasonArg = cmdArguments.slice(2, cmdArguments.length);
    let reason = reasonArg.join(" ");
    if (!reason) {
      reason = "Sorry, but the moderator did not provide a reason.";
    }
    const warnEmbed = new MessageEmbed()
      .setColor("#ffff00")
      .setTitle("This is a warning!")
      .addFields(
        {
          name: "Event:",
          value: `<@!${mod}> has issued a warning to you.`,
        },
        {
          name: "Reason:",
          value: `${reason}`,
        }
      )
      .setFooter("Please remember to follow the rules.");
    user.send(warnEmbed).catch((err) => console.log(err));
    const modChannel = message.guild?.channels.cache.find(
      (channel) => channel.name === config.log_channel
    ) as TextChannel;
    const warnLogEmbed = new MessageEmbed()
      .setTitle("Warning!")
      .setDescription(`<@!${mod}> has issued a warning to <@!${user}>!`)
      .addFields({
        name: "Reason",
        value: `${reason}`,
      });
    if (modChannel) {
      modChannel.send(warnLogEmbed);
    }
    if (!modChannel) {
      message.channel.send(
        "Sorry, but I could not find where you wanted the logs."
      );
    }
  },
};
