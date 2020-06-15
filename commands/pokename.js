const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record
  prefix: "pokename",
  description: "Look up a Pokemon! Use the format 'pokename <name>'.",
  command: async function(message) {
    const arguments = message.content.split(" ");
    const name = arguments[1].toLowerCase();
    //call the API and send the data.
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    //check for valid result
    if (data.status === 404) {
      message.channel.send(`ERROR 404: Pokemon not found, ${message.author}.`);
      return;
    }
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
