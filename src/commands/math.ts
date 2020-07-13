import { commandInt } from "../interfaces/commandInt";
import { evaluate } from "mathjs";
export const maths: commandInt = {
  prefix: "math",
  description: "Evaluates a mathematic expression and returns the value.",
  command: function (message) {
    try {
      const expression = message.content.substring(5);
      const answer = evaluate(expression);
      if (!answer)
        return message.channel.send("ERROR 400: Invalid expression.");
      message.channel.send(answer);
    } catch (error) {
      message.channel.send("ERROR 400: Invalid expression.");
    }
  },
};
