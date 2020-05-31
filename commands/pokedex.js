const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  prefix: "pokedex",
  description: "Look up a Pokemon! Use the format |pokedex <number>.",
  command: async function(message) {
    const arguments = message.content.split(" ");
    const number = arguments[1];
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const pokemon = await data.json();
    const pokemonEmbed = new Discord.MessageEmbed()
      .setColor("#0099FF")
      .setTitle(`${pokemon.name}`)
      .setDescription(`#${pokemon.id}`)
      .setImage(`${pokemon.sprites.front_default}`)
      .setFooter("Brought to you by the Pokemon API.");
    message.channel.send(pokemonEmbed);
  }
};
