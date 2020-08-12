import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import dotenv from "dotenv";
import {
  HabiticaUserInt,
  HabiticaAchievementInt,
} from "../interfaces/HabiticaInt";
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
    const habiticaData: HabiticaUserInt = await data.json();
    if (!habiticaData.success) {
      message.channel.send("ERROR 404: User not found.");
      return;
    }
    const achievementData = await fetch(
      `https://habitica.com/api/v3/members/${cmdArguments}/achievements`,
      {
        method: "get",
        headers: {
          "x-client": "285a3335-33b9-473f-8d80-085c04f207bc-DiscordBot",
          "x-api-user": "285a3335-33b9-473f-8d80-085c04f207bc",
          "x-api-key": key,
        },
      }
    );
    const habiticaAchievementData: HabiticaAchievementInt = await achievementData.json();
    if (!habiticaAchievementData.success) {
      message.channel.send("ERROR 404: Achievements not found.");
      return;
    }
    const basicAchievements = Object.keys(
      habiticaAchievementData.data.basic.achievements
    )
      .filter(
        (el: string) =>
          habiticaAchievementData.data.basic.achievements[el].earned
      )
      .map((el) => habiticaAchievementData.data.basic.achievements[el].title)
      .join(", ");
    const onboardingAchievements = Object.keys(
      habiticaAchievementData.data.onboarding.achievements
    )
      .filter(
        (el: string) =>
          habiticaAchievementData.data.onboarding.achievements[el].earned
      )
      .map(
        (el) => habiticaAchievementData.data.onboarding.achievements[el].title
      )
      .join(", ");
    const seasonalAchievements = Object.keys(
      habiticaAchievementData.data.seasonal.achievements
    )
      .filter(
        (el: string) =>
          habiticaAchievementData.data.seasonal.achievements[el].earned
      )
      .map((el) => habiticaAchievementData.data.seasonal.achievements[el].title)
      .join(", ");
    const specialAchievements = Object.keys(
      habiticaAchievementData.data.special.achievements
    )
      .filter(
        (el: string) =>
          habiticaAchievementData.data.special.achievements[el].earned
      )
      .map((el) => habiticaAchievementData.data.special.achievements[el].title)
      .join(", ");
    const habiticaEmbed = new MessageEmbed()
      .setTitle(habiticaData.data.profile.name)
      .setDescription(`@${habiticaData.data.auth.local.username}`)
      .setURL(`https://habitica.com/profile/${cmdArguments}`)
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
        },
        {
          name: "Completed Quests",
          value: Object.keys(habiticaData.data.achievements.quests)
            .sort()
            .join(", "),
        },
        { name: "Basic Achievements", value: basicAchievements || "None" },
        {
          name: "Onboarding Achievements",
          value: onboardingAchievements || "None",
        },
        {
          name: "Seasonal Achievements",
          value: seasonalAchievements || "None",
        },
        { name: "Special Achievements", value: specialAchievements || "None" },
        {
          name: "Join Date",
          value: new Date(
            habiticaData.data.auth.timestamps.created
          ).toLocaleDateString(),
        },
        {
          name: "Last Seen",
          value: new Date(
            habiticaData.data.auth.timestamps.loggedin
          ).toLocaleDateString(),
        }
      );
    message.channel.send(habiticaEmbed);
  },
};
