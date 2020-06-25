const mtg = require("mtgsdk");
const Discord = require("discord.js");

module.exports = {
  //prefix and description - prefix is necessary to trigger command, description is for the record.
  prefix: "magic",
  description:
    "Returns a Magic: The Gathering card by name. Use the format 'magic <cardname>'.",
  command: async function (message) {
    const query = message.content.substring(7, message.content.length);
    let cardCount = 0;
    if (!query) {
      message.channel.send(`ERROR 400: ${message.author}, missing card name.`);
      return;
    }
    message.channel.send("STATUS 202: Searching...");
    await mtg.card.all({ name: query }).on("data", (card) => {
      let flavour = card.flavor;
      if (!flavour) {
        flavour = "ERROR 404: No flavour text found.";
      }
      let ability = card.text;
      if (!ability) {
        ability = "ERROR 404: No abilities found.";
      }
      let image = card.imageUrl;
      if (!image) {
        image =
          "https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/thumb/f/f8/Magic_card_back.jpg/250px-Magic_card_back.jpg?version=56c40a91c76ffdbe89867f0bc5172888";
      }
      const cardEmbed = new Discord.MessageEmbed()
        .setColor("#ab47e6")
        .setTitle(card.name)
        .setDescription(flavour)
        .addFields(
          {
            name: "Types",
            value: card.types,
          },
          {
            name: "Cost",
            value: card.manaCost,
          },
          {
            name: "Abilities",
            value: ability,
          }
        )
        .setImage(image);
      message.channel.send(cardEmbed);
      cardCount++;
    });
    setTimeout(
      () =>
        message.channel.send(
          `BEEP BOOP: Search complete! Found ${cardCount} cards.`
        ),
      30000
    );
  },
};
