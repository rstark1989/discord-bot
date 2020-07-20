import { assert } from "chai";
import { kirby } from "../commands/kirby";
import { Message } from "discord.js";

describe("Kirby Command", () => {
  it("should return a string", () => {
    assert.equal(
      kirby.command(({ id: "test" } as Partial<Message>) as never),
      "Do a little dance!"
    );
  });
});
