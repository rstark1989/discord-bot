import { CommandInt } from "../interfaces/CommandInt";
import { PokemonInt } from "../interfaces/PokemonInt";
import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export const pokeName: CommandInt = {
  prefix: "pokename",
  description: "Provides information on the Pokemon named **name**.",
  parameters: "`<name>` - name of the Pokemon to search for",
  command: async (message) => {
    const cmdArguments = message.content.split(" ");
    if (cmdArguments.length < 2) {
      message.channel.send("ERROR 400: No query submitted.");
      return;
    }
    const name = cmdArguments[1].toLowerCase();
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (data.status === 404) {
      message.channel.send(`ERROR 404: Pokemon not found.`);
      return;
    }
    const pokemon: PokemonInt = await data.json();
    const pokemonEmbed = new MessageEmbed()
      .setColor("#0099FF")
      .setTitle(`${pokemon.name}`)
      .setDescription(`#${pokemon.id}`)
      .setImage(`${pokemon.sprites.front_default}`)
      .setFooter("BEEP BOOP: Brought to you by the Pokemon API.");
    message.channel.send(pokemonEmbed);
  },
};
