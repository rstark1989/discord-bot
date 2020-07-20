import { help } from "../commands/help";
import { assert } from "chai";
import { Message } from "discord.js";

describe("Help Command", async () => {
  const result = await help.command(({
    id: "test",
    author: { id: "testID" },
  } as Partial<Message>) as never);
  it("should find message author", () => {
    assert.equal(result, "testID");
  });
});
