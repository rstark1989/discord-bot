import { fortune, fortunes } from "../commands/fortune";
import { assert } from "chai";
import { Message } from "discord.js";

describe("Fortune command", () => {
  it("should be a string", async () => {
    const result = await fortune.command(({ content: "test" } as Partial<
      Message
    >) as never);
    assert.isString(result, "fortune command should return a string");
  });
  it("should give a fortune", async () => {
    const result = await fortune.command(({ content: "test" } as Partial<
      Message
    >) as never);
    assert.isAbove(fortunes.indexOf(result), -1);
  });
});
