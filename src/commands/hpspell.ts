import { CommandInt } from "../interfaces/CommandInt";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { HpSpellInt } from "../interfaces/HpSpellInt";
import { MessageEmbed } from "discord.js";
dotenv.config();

export const hpspell: CommandInt = {
  prefix: "hpspell",
  description: "Returns information on the <name> spell.",
  parameters: "`<name>`: The name of the spell to search for.",
  command: async (message) => {
    const cmdArguments = message.content
      .split(" ")
      .slice(1)
      .join(" ")
      .toLowerCase();
    const data = await fetch(
      `https://www.potterapi.com/v1/spells?key=${process.env.HP_KEY}`
    );
    const spellData: Array<HpSpellInt> = await data.json();
    let targetSpell = spellData.filter(
      (el) => el.spell.toLowerCase().trim() === cmdArguments
    )[0];
    if (cmdArguments === "random") {
      targetSpell = spellData[Math.floor(Math.random() * spellData.length)];
    }
    if (!targetSpell) {
      message.channel.send(
        "Sorry, but I could not find anything... It's leviOsa, not leviosA."
      );
      return;
    }
    const spellEmbed = new MessageEmbed()
      .setTitle(targetSpell.spell)
      .setDescription(targetSpell.effect)
      .setFooter(`Type: ${targetSpell.type}`);
    message.channel.send(spellEmbed);
  },
};
