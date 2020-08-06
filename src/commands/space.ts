import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { SpaceInt } from "../interfaces/SpaceInt";
import { MessageEmbed } from "discord.js";

dotenv.config();
export const space: CommandInt = {
  prefix: "space",
  description: "Gets the astronomy picture of the day!",
  parameters: "*none*",
  command: async (message) => {
    const spaceData = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`
    );
    const data: SpaceInt = await spaceData.json();
    const spaceEmbed = new MessageEmbed()
      .setTitle(`Today's Space Image: ${data.title}`)
      .setDescription(data.explanation)
      .setImage(data.hdurl)
      .setFooter(`© ${data.copyright}`);
    message.channel.send(spaceEmbed);
  },
};
