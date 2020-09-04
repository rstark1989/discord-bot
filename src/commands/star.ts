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
      message.channel.send(
        "Sorry, but that appears to be an invalid user mention."
      );
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
      .setFooter("I am so proud of you! 🙃");
    const cmdArguments = message.content.split(" ");
    const reason = cmdArguments.slice(2, cmdArguments.length);
    let reasonMessage = reason.join(" ");
    if (!reasonMessage) {
      reasonMessage = "Sorry, but the user did not provide a reason.";
    }
    starEmbed.addFields({
      name: "Reason",
      value: reasonMessage,
    });
    if (message.mentions.users.first() === message.author) {
      message.channel.send(
        "Sorry, but you cannot give yourself a star! I still love you though."
      );
      return;
    }
    target.send(starEmbed);
    message.channel.send(`Okay, I sent <@!${target}> a gold star!`);
  },
};
