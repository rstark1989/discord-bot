import { commandInt } from "../interfaces/commandInt";
import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";
import { dndclassInt } from "../interfaces/dndclassInt";

export const dndclass: commandInt = {
  prefix: "dndclass",
  description:
    "Gets information on a Dungeons and Dragons class. Use the format 'dndclass <class name>'",
  command: async (message) => {
    const query = message.content.split(" ").slice(1).join("-");
    console.log(query);
    if (!query) {
      message.channel.send("ERROR 400: No query provided.");
      return;
    }
    const classdata = await fetch(
      "https://www.dnd5eapi.co/api/classes/" + query
    );
    const data: dndclassInt = await classdata.json();
    if (!data || data.error) {
      message.channel.send("ERROR 404: Not found.");
      return;
    }
    const embed = new MessageEmbed().setTitle(data.name).addFields(
      { name: "Hit Die", value: data.hit_die },
      {
        name: "Proficiencies",
        value: data.proficiencies
          .map((el) => el.name)
          .reduce((acc, el) => acc + ", " + el),
      },
      {
        name: `Plus ${data.proficiency_choices[0].choose} from`,
        value: data.proficiency_choices[0].from
          .map((el) => el.name)
          .reduce((acc, el) => acc + ", " + el),
      }
    );
    message.channel.send(embed);
  },
};
