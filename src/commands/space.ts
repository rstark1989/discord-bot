import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { SpaceInt } from "../interfaces/SpaceInt";
import { MessageEmbed, Message } from "discord.js";

dotenv.config();
export const space: CommandInt = {
  prefix: "space",
  description:
    "Gets the astronomy picture of the day! Optionally retrieve an APoD from an earlier date.",
  parameters: "`<date?>`: date of picture to retrieve, format YYYY-MM-DD",
  command: async (message) => {
    const cmdArguments = message.content.split(" ");
    let date: string | undefined;
    if (cmdArguments[1] && /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(cmdArguments[1]))
      date = cmdArguments[1];
    let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`;
    if (date)
      url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}&date=${date}`;
    const spaceData = await fetch(url);
    const data: SpaceInt = await spaceData.json();
    if (data.code === 404) {
      const fourOhfour = new MessageEmbed()
        .setTitle("SPAAAAACE")
        .setDescription("ERROR: Bot got lost in space. Please try again later.")
        .setImage(
          "https://github.com/nhcarrigan/Weather-App/blob/master/space.png?raw=true"
        );
      message.channel.send(fourOhfour);
      return;
    }
    const copyright = data.copyright || "No Copyright Provided";
    const spaceEmbed = new MessageEmbed()
      .setTitle(`${data.date} Space Image: ${data.title}`)
      .setURL("https://apod.nasa.gov/apod/astropix.html")
      .setDescription(data.explanation.substring(0, 2047))
      .setImage(data.hdurl)
      .setFooter(`© ${copyright}`);
    message.channel.send(spaceEmbed);
  },
};
