import { help } from "../commands/help";
import { assert } from "chai";
import { Message } from "discord.js";

describe("Help Command", () => {
  it("should find message author", async () => {
    const result = await help.command(({
      content: "test",
      author: { id: "testID" },
    } as Partial<Message>) as never);
    assert.equal(result, "testID");
  });
});
