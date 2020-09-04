import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";

export const profile: CommandInt = {
  prefix: "profile",
  description:
    "Returns a profile for the selected **user** on the **website**. Supported websites: Steam, Facebook, GitHub, Twitter, LinkedIn, Tumblr, and Instagram.",
  parameters:
    "`<website>` - name of the website to search | `<user>` - Username or ID of the user to find",
  command: (message) => {
    const cmdArguments = message.content.split(" ");
    if (cmdArguments.length < 2) {
      message.channel.send("Sorry, but what did you want me to search for?");
      return;
    }
    const website = cmdArguments[1].toLowerCase();
    const name = cmdArguments[2];
    let id = cmdArguments[2];
    let prefix;
    if (!id) {
      message.channel.send("Sorry, but who did you want me to search for?");
      return;
    }
    if (website === "steam") {
      prefix = "https://steamcommunity.com/id/";
    }
    if (website === "facebook") {
      prefix = "https://facebook.com/";
    }
    if (website === "github") {
      prefix = "https://github.com/";
    }
    if (website === "twitter") {
      prefix = "https://twitter.com/";
    }
    if (website === "linkedin") {
      prefix = "https://linkedin.com/in/";
    }
    if (website === "tumblr") {
      prefix = "https://";
      id = id + ".tumblr.com";
    }
    if (website === "instagram") {
      prefix = "https://instagram.com/";
    }
    if (!prefix) {
      message.channel.send("Sorry, but I cannot access that website...");
      return;
    }
    const embed = new MessageEmbed()
      .setColor("#ab47e6")
      .setTitle(`Query: ${website} | For: user ${name}`)
      .setDescription(
        `BEEP BOOP: Here is a [link to their profile](${prefix}${id})`
      );
    message.channel.send(embed);
  },
};
