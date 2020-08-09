import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import { XkcdInt } from "../interfaces/XkcdInt";
import { MessageEmbed } from "discord.js";

export const xkcd: CommandInt = {
  prefix: "xkcd",
  description:
    "Returns today's XKCD comic. Optionally pass a <number> to return that specific comic.",
  parameters: "`<?number>`: the number of the XKCD comic to return.",
  command: async (message) => {
    const cmdArguments = message.content.split(" ")[1];
    let data = await fetch("https://xkcd.com/info.0.json");
    if (cmdArguments) {
      data = await fetch(`https://xkcd.com/${cmdArguments}/info.0.json`);
    }
    if (data.status === 404) {
      message.channel.send("ERROR 404: Comic not found.");
      return;
    }
    const comicData: XkcdInt = await data.json();
    const comicEmbed = new MessageEmbed()
      .setTitle(comicData.title)
      .setDescription(comicData.alt)
      .setImage(comicData.img);
    message.channel.send(comicEmbed);
  },
};
