import { CommandInt } from "../interfaces/CommandInt";
import { MessageEmbed } from "discord.js";
import { MagicInt } from "../interfaces/MagicInt";
import fetch from "node-fetch";

export const magic: CommandInt = {
  prefix: "magic",
  description: "Returns a Magic: The Gathering card that matches the **name**.",
  parameters: "`<card>` - name of the card to search for",
  command: async (message) => {
    const query = message.content.substring(7, message.content.length);
    if (!query) {
      message.channel.send("ERROR 400: Missing card name.");
      return;
    }
    message.channel.send("STATUS 202: Searching...");
    const data = await fetch(
      `https://api.magicthegathering.io/v1/cards?name=${query}&pageSize=1`
    );
    if (!data) {
      message.channel.send("ERROR 404: Database Connection Failed");
      return;
    }
    const card: MagicInt = await data.json();
    let flavour = card.cards[0].flavor;
    if (!flavour) {
      flavour = "ERROR 404: No flavour text found.";
    }
    let ability = card.cards[0].text;
    if (!ability) {
      ability = "ERROR 404: No abilities found.";
    }
    let image = card.cards[0].imageUrl;
    if (!image) {
      image =
        "https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/thumb/f/f8/Magic_card_back.jpg/250px-Magic_card_back.jpg?version=56c40a91c76ffdbe89867f0bc5172888";
    }
    const cardEmbed = new MessageEmbed()
      .setColor("#ab47e6")
      .setTitle(card.cards[0].name)
      .setDescription(flavour)
      .addFields(
        {
          name: "Types",
          value: card.cards[0].types,
        },
        {
          name: "Cost",
          value: card.cards[0].manaCost,
        },
        {
          name: "Abilities",
          value: ability,
        }
      )
      .setImage(image);
    message.channel.send(cardEmbed);
  },
};
