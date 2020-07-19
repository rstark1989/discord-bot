import { helpTest } from "../commands/help";
import { assert } from "chai";
import { Message } from "discord.js";

describe("Help Command", () => {
  it("should find message author", () => {
    assert.equal(
      helpTest.testCommand({ author: { id: "testID" } } as Partial<Message>),
      "testID"
    );
  });
});
