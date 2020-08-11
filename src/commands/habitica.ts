import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { HabiticaInt } from "../interfaces/HabiticaInt";
import { MessageEmbed } from "discord.js";
dotenv.config();

export const habitica: CommandInt = {
  prefix: "habitica",
  description: "Gets user profile information on the given <id>.",
  parameters: "`<id>`: The UserID of the profile to look up",
  command: async (message) => {
    const key: string = process.env.HABITICA_KEY || "Error finding key.";
    const cmdArguments = message.content.split(" ")[1];
    const data = await fetch(
      `https://habitica.com/api/v3/members/${cmdArguments}`,
      {
        method: "get",
        headers: {
          "x-client": "285a3335-33b9-473f-8d80-085c04f207bc-DiscordBot",
          "x-api-user": "285a3335-33b9-473f-8d80-085c04f207bc",
          "x-api-key": key,
        },
      }
    );
    const habiticaData: HabiticaInt = await data.json();
    if (!habiticaData.success) {
      message.channel.send("ERROR 404: User not found.");
      return;
    }
    const habiticaEmbed = new MessageEmbed()
      .setTitle(habiticaData.data.profile.name)
      .setDescription(`@${habiticaData.data.auth.local.username}`)
      .addFields(
        { name: "Class", value: habiticaData.data.stats.class },
        {
          name: "HP",
          value: `${Math.floor(habiticaData.data.stats.hp)}/${
            habiticaData.data.stats.maxHealth
          }`,
        },
        {
          name: "MP",
          value: `${habiticaData.data.stats.mp}/${habiticaData.data.stats.maxMP}`,
        },
        {
          name: "Stats",
          value: `STR: ${habiticaData.data.stats.str} | CON: ${habiticaData.data.stats.con} | INT: ${habiticaData.data.stats.int} | PER: ${habiticaData.data.stats.per}`,
        },
        {
          name: "Experience",
          value: `${habiticaData.data.stats.exp} - (${habiticaData.data.stats.toNextLevel} to reach the next level.)`,
        }
      );
    message.channel.send(habiticaEmbed);
  },
};
