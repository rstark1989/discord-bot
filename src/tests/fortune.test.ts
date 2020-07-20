import { fortune, fortunes } from "../commands/fortune";
import { assert } from "chai";
import { Message } from "discord.js";

describe("Fortune command", async () => {
  const result = await fortune.command(({ id: "test" } as Partial<
    Message
  >) as never);
  it("should be a string", () => {
    assert.isString(result, "fortune command should return a string");
  });
  it("should give a fortune", () => {
    assert.isAbove(fortunes.indexOf(result), -1);
  });
});
