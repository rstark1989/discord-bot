import { commandInt } from "../interfaces/commandInt";
import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { pokemonInt } from "../interfaces/pokemonInt";

export const pokenum: commandInt = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "pokenum",
  description:
    "Look up a Pokemon! Use the format 'pokenum <number>', or use 'pokenum random' to get a random Pokemon!",
  command: async function (message) {
    const cmdarguments = message.content.split(" ");
    if (cmdarguments.length < 2) {
      message.channel.send("ERROR 400: No query provided.");
      return;
    }
    let number = parseInt(cmdarguments[1]);
    if (cmdarguments[1].toLowerCase() == "random") {
      number = Math.floor(Math.random() * 802);
    }
    //PokeAPI only has 802 right now. Check this to avoid null objects.
    if (number < 0 || number > 802) {
      message.channel.send(
        `ERROR 400: Number must be between 0 and 802 (inclusive).`
      );
      return;
    }
    //if the argument is not a number, don't call the API.
    if (isNaN(number)) {
      message.channel.send(`ERROR 400: Invalid number.`);
      return;
    }
    //missingno easter egg
    if (number === 0) {
      const pokemonEmbed = new MessageEmbed()
        .setColor("#ab47e6")
        .setTitle("Missingno")
        .setDescription("???")
        .setImage("https://aldelaro5.files.wordpress.com/2016/04/657.png")
        .setFooter("Data not found.");
      message.channel.send(pokemonEmbed);
      return;
    }
    //call the API and send the data.
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const pokemon: pokemonInt = await data.json();
    const pokemonEmbed = new MessageEmbed()
      .setColor("#ab47e6")
      .setTitle(`${pokemon.name}`)
      .setDescription(`#${pokemon.id}`)
      .setImage(`${pokemon.sprites.front_default}`)
      .setFooter("BEEP BOOP: Brought to you by the Pokemon API.");
    message.channel.send(pokemonEmbed);
  },
};
