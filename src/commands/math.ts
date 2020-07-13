import { commandInt } from "../interfaces/commandInt";
import { evaluate } from "mathjs";
import { MessageEmbed } from "discord.js";
export const maths: commandInt = {
  prefix: "math",
  description: "Evaluates a mathematic expression and returns the value.",
  command: function (message) {
    try {
      const expression = message.content.substring(5);
      const answer = evaluate(expression);
      if (!answer || !expression)
        return message.channel.send("ERROR 400: Invalid expression.");
      const mathEmbed = new MessageEmbed()
        .setTitle("Calculation Protocol")
        .setColor("#ab47e6")
        .setDescription("BEEP BOOP: Calculation complete.")
        .addFields(
          { name: "Input", value: expression },
          { name: "Result", value: answer }
        );
      message.channel.send(mathEmbed);
    } catch (error) {
      message.channel.send("ERROR 400: Invalid expression.");
    }
  },
};
