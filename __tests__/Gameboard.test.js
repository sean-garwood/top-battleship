import { Gameboard } from "../src/classes/Gameboard";

describe("Gameboard", () => {
  it("should include an x attribute", () => {
    const gameboard = new Gameboard();
    expect(gameboard.x).toBe(10);
  });
  it("should include a y attribute", () => {
    const gameboard = new Gameboard();
    expect(gameboard.y).toBe(10);
  });
});
