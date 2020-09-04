import { CommandInt } from "../interfaces/CommandInt";
import { evaluate } from "mathjs";
import { MessageEmbed } from "discord.js";
import { solveEquation } from "mathsteps";
import { StepInt } from "../interfaces/StepInt";
export const maths: CommandInt = {
  prefix: "maths",
  description:
    "Performs the **function** on the **problem** - will either calculate an expression, or solve an equation.",
  parameters:
    "`<function>` - calculate, to evaluate an expression; solve, to solve an equation | `<problem>` - expression or equation to process",
  command: (message) => {
    try {
      const args = message.content.split(" ");
      const type = args[1];
      const expression = args.slice(2).join(" ");
      if (type === "calculate") {
        const answer = evaluate(expression);
        if (!answer || !expression) {
          message.channel.send(
            "Sorry, but that does not appear to be a valid math expression."
          );
          return;
        }
        const mathEmbed = new MessageEmbed()
          .setTitle("Calculating...")
          .setColor("#ab47e6")
          .setDescription("All done!")
          .addFields(
            { name: "Input", value: expression },
            { name: "Result", value: answer }
          );
        message.channel.send(mathEmbed);
        return;
      }
      if (type === "solve") {
        const solved = solveEquation(expression);
        if (!solved.length) {
          message.channel.send(
            "Sorry, but that does not appear to be a valid math equation."
          );
          return;
        }
        solved.forEach((step: StepInt, index: number) => {
          const solveEmbed = new MessageEmbed()
            .setTitle(`Step ${index + 1}`)
            .addFields(
              { name: "Before this step", value: step.oldEquation.ascii() },
              { name: "This Step", value: step.changeType },
              { name: "After this step", value: step.newEquation.ascii() }
            );
          message.channel.send(solveEmbed);
        });
        return;
      }
      message.channel.send(
        "Sorry, but did you want me to `calculate` or `solve` that?"
      );
    } catch (error) {
      message.channel.send("Sorry, but my calculator is broken!");
    }
  },
};
