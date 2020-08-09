import { CommandInt } from "../interfaces/CommandInt";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { HpCharInt } from "../interfaces/HpCharInt";
import { MessageEmbed } from "discord.js";

dotenv.config();
export const hpchar: CommandInt = {
  prefix: "hpchar",
  description:
    "Returns information on the provided Harry Potter character <name>.",
  parameters: "`<name>`: The first and last name of the character.",
  command: async (message) => {
    const cmdArguments = message.content.split(" ").slice(1).join("%20");
    const data = await fetch(
      `https://www.potterapi.com/v1/characters?key=${process.env.HP_KEY}&name=${cmdArguments}`
    );
    const hpData: Array<HpCharInt> = await data.json();
    if (!hpData[0]) {
      message.channel.send("ERROR 400: No data found.");
      return;
    }
    const hpEmbed = new MessageEmbed()
      .setTitle(hpData[0].name)
      .addFields(
        { name: "Role", value: hpData[0].role },
        { name: "School", value: hpData[0].school },
        { name: "House", value: hpData[0].house },
        { name: "Wand", value: hpData[0].wand },
        { name: "Blood?", value: hpData[0].bloodStatus },
        { name: "Species", value: hpData[0].species },
        { name: "Patronus", value: hpData[0].patronus }
      );
    message.channel.send(hpEmbed);
  },
};
