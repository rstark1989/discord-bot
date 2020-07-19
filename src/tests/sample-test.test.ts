import { expect } from "chai";

function sample(bool: boolean) {
  if (bool) return true;
  return false;
}

describe("Sample test", () => {
  it("should return true", () => {
    const result = sample(true);
    expect(result).to.equal(true);
  });
  it("should return false", () => {
    const result = sample(false);
    expect(result).to.equal(false);
  });
});
