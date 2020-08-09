import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { HpHouseInt } from "../interfaces/HpHouseInt";
import { MessageEmbed } from "discord.js";

dotenv.config();
export const hpsort: CommandInt = {
  prefix: "hpsort",
  description: "Sorts you into a Hogwarts house.",
  parameters: "*none*",
  command: async (message) => {
    const sortData = await fetch("https://www.potterapi.com/v1/sortingHat");
    const sort = await sortData.json();
    const houseData = await fetch(
      `https://www.potterapi.com/v1/houses?key=${process.env.HP_KEY}`
    );
    const houses: Array<HpHouseInt> = await houseData.json();
    const targetHouse = houses.filter((el) => el.name === sort)[0];
    const sortEmbed = new MessageEmbed()
      .setTitle("The sorting hat has spoken!")
      .setDescription(`You have been placed in House ${targetHouse.name}!`)
      .addFields(
        { name: "House Mascot", value: targetHouse.mascot },
        { name: "Head of House", value: targetHouse.headOfHouse },
        { name: "House Founder", value: targetHouse.founder },
        { name: "Values", value: targetHouse.values.join(", ") },
        { name: "Colours", value: targetHouse.colors.join(", ") },
        { name: "House Ghost", value: targetHouse.houseGhost }
      );
    message.channel.send(sortEmbed);
  },
};
