import { cat } from "../commands/cat";
import { assert } from "chai";
import { Message } from "discord.js";

describe("Cat command", async () => {
  const result = await cat.command(({ content: "test" } as Partial<
    Message
  >) as never);
  it("should return a string", () => {
    assert.isString(result);
  });
  it("should be between 1 and 100 characters", () => {
    assert.isAtMost(result.length, 100);
    assert.isAtLeast(result.length, 1);
  });
});
