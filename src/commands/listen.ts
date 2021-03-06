import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";
import { LISTENERS } from "../LISTENERS";

export const listen: CommandInt = {
  prefix: "listen",
  description:
    "Provides information on the active listener features for the bot.",
  parameters: "*none*",
  command: (message) => {
    const listenersEmbed = new MessageEmbed()
      .setTitle("I am always listening...")
      .setDescription(
        "For my commands to work, I have to listen to every message in the server. I check each message to see if you have called for my assistance. But did you know I also listen for other events? Here's what they are!"
      );
    LISTENERS.forEach((el) =>
      listenersEmbed.addFields({ name: el.name, value: el.description })
    );
    message.channel.send(listenersEmbed);
    return;
  },
};
