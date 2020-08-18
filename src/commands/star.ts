import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";

export const star: CommandInt = {
  prefix: "star",
  description:
    "Gives the **user** a gold star! Optionally provides the **reason** for giving the star.",
  parameters:
    "`<user>`: @name of the user to give the star to | `<?reason>`: reason for giving the star",
  command: (message) => {
    const target = message.mentions.members?.first();
    if (!target) {
      message.channel.send("ERROR 400: User not provided.");
      return;
    }
    const auth = message.author;
    const starEmbed = new MessageEmbed()
      .setColor("")
      .setTitle("You got a gold star!")
      .setDescription(`<@!${auth}> has given this shiny gold star to you~!`)
      .setImage(
        "https://github.com/nhcarrigan/discord-bot/blob/master/img/star.png?raw=true"
      )
      .setFooter("BEEP BOOP: Feelings of pride detected. 🙃");
    const cmdArguments = message.content.split(" ");
    const reason = cmdArguments.slice(2, cmdArguments.length);
    let reasonMessage = reason.join(" ");
    if (!reasonMessage) {
      reasonMessage = "ERROR 404: Reason not found.";
    }
    starEmbed.addFields({
      name: "Reason",
      value: reasonMessage,
    });
    if (message.mentions.users.first() === message.author) {
      message.channel.send("ERROR 400: Cannot target self.");
      return;
    }
    target.send(starEmbed);
    message.channel.send(`BEEP BOOP: Sent <@!${target}> a gold star!`);
  },
};
