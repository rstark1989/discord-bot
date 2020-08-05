import { commandInt } from "../interfaces/commandInt";
import { pokemonInt } from "../interfaces/pokemonInt";
import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";

export const pokename: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record
  prefix: "pokename",
  description: "Provides information on the Pokemon named **name**.",
  parameters: "`<name>` - name of the Pokemon to search for",
  command: async function (message) {
    const cmdarguments = message.content.split(" ");
    if (cmdarguments.length < 2) {
      message.channel.send("ERROR 400: No query submitted.");
      return;
    }
    const name = cmdarguments[1].toLowerCase();
    //call the API and send the data.
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    //check for valid result
    if (data.status === 404) {
      message.channel.send(`ERROR 404: Pokemon not found.`);
      return;
    }
    const pokemon: pokemonInt = await data.json();
    const pokemonEmbed = new MessageEmbed()
      .setColor("#0099FF")
      .setTitle(`${pokemon.name}`)
      .setDescription(`#${pokemon.id}`)
      .setImage(`${pokemon.sprites.front_default}`)
      .setFooter("BEEP BOOP: Brought to you by the Pokemon API.");
    message.channel.send(pokemonEmbed);
  },
};
