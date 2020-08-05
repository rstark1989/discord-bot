import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { PokemonInt } from "../interfaces/PokemonInt";

export const pokeNum: CommandInt = {
  prefix: "pokenum",
  description: "Searches for the Pokemon by the **number** provided.",
  parameters: `<number> - the number to search for; optionally use the string 'random' instead`,
  command: async (message) => {
    const cmdArguments = message.content.split(" ");
    if (cmdArguments.length < 2) {
      message.channel.send("ERROR 400: No query provided.");
      return;
    }
    let number = parseInt(cmdArguments[1]);
    if (cmdArguments[1].toLowerCase() == "random") {
      number = Math.floor(Math.random() * 802);
    }
    if (number < 0 || number > 802) {
      message.channel.send(
        `ERROR 400: Number must be between 0 and 802 (inclusive).`
      );
      return;
    }
    if (isNaN(number)) {
      message.channel.send(`ERROR 400: Invalid number.`);
      return;
    }
    if (number === 0) {
      const pokemonEmbed = new MessageEmbed()
        .setColor("#ab47e6")
        .setTitle("Missingno")
        .setDescription("???")
        .setImage("https://aldelaro5.files.wordpress.com/2016/04/657.png")
        .setFooter("Data not found.");
      message.channel.send(pokemonEmbed);
    }
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const pokemon: PokemonInt = await data.json();
    const pokemonEmbed = new MessageEmbed()
      .setColor("#ab47e6")
      .setTitle(`${pokemon.name}`)
      .setDescription(`#${pokemon.id}`)
      .setImage(`${pokemon.sprites.front_default}`)
      .setFooter("BEEP BOOP: Brought to you by the Pokemon API.");
    message.channel.send(pokemonEmbed);
  },
};
