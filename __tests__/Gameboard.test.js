import { Gameboard } from "../src/classes/Gameboard";
import { jest } from "@jest/globals";

let gameboard;
let player;
const expectedHeight = 10;
const expectedWidth = 10;

beforeAll(() => {
  player = jest.fn();
  gameboard = new Gameboard(player);
});

describe("Gameboard", () => {
  it("should include an x attribute with value of 10", () => {
    expect(gameboard.x).toBe(expectedWidth);
  });
  it("should include a y attribute with value of 10", () => {
    expect(gameboard.y).toBe(expectedHeight);
  });
  it("should include a belongsTo attribute", () => {
    expect(gameboard.belongsTo).toBe(player);
  });
});
