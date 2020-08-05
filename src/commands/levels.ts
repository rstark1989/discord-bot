import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";
import { User, UserInt } from "../interfaces/UserInt";

export const level: CommandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "level",
  description: "Gets the user's current level.",
  parameters: "*none*",
  command: (message) => {
    User.findOne(
      { userid: message.author.toString() },
      (err: Error, data: UserInt) => {
        if (err || !data) {
          message.channel.send(`ERROR 404: Record not found.`);
          return;
        }
        const rankEmbed = new MessageEmbed()
          .setColor("#ab47e6")
          .setTitle(`${message.author.username}'s Ranking`)
          .setDescription(
            "Database search successful. Displaying available data:"
          )
          .addFields(
            {
              name: "Experience Points:",
              value: `${data.points} XP`,
            },
            {
              name: "Level:",
              value: `LVL ${Math.floor(data.points / 100)}`,
            }
          )
          .setFooter("BEEP BOOP: You level up with every 100 points.");
        message.channel.send(rankEmbed);
      }
    );
  },
};
