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
    if (message.member?.hasPermission("KICK_MEMBERS") == false) {
      message.channel.send(`ERROR 401: Missing permissions.`);
      return;
    }
    const mod = message.author;
    const cmdArguments = message.content.split(" ");
    const user = message.mentions.users.first();
    if (user == undefined) {
      message.channel.send(`ERROR 400: Invalid user tag.`);
      return;
    }
    if (user == mod) {
      message.channel.send(`ERROR 400: Cannot target self.`);
      return;
    }
    const reasonArg = cmdArguments.slice(2, cmdArguments.length);
    let reason = reasonArg.join(" ");
    if (reason == "") {
      reason = "ERROR 404: No reason provided.";
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
      .setFooter("BEEP BOOP: You can read the rules in the Welcome channel!");
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
      message.channel.send("ERROR 400: missing log channel.");
    }
  },
};
