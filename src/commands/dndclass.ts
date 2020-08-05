import { commandInt } from "../interfaces/commandInt";
import fetch from "node-fetch";
import { MessageEmbed } from "discord.js";
import { dndclassInt } from "../interfaces/dndclassInt";

export const dndclass: commandInt = {
  prefix: "dndclass",
  description:
    "Gets information on the provided Dungeons and Dragons **class**.",
  parameters: "`<class>`: the name of the class to search",
  command: async (message) => {
    const query = message.content.split(" ").slice(1).join("-");
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
    const embed = new MessageEmbed()
      .setTitle(data.name)
      .setURL("https://www.dnd5eapi.co" + data.url)
      .addFields(
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
