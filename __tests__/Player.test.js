import { Player } from "../src/classes/Player";
import { PlayerTypes } from "../src/constants/PlayerTypes";

let humanPlayer, computerPlayer;

beforeAll(() => {
  humanPlayer = new Player(PlayerTypes.HUMAN);
  computerPlayer = new Player(PlayerTypes.COMPUTER);
});

describe("Player", () => {
  it("should have a type", () => {
    expect(humanPlayer.type).toBe(PlayerTypes.HUMAN);
    expect(computerPlayer.type).toBe(PlayerTypes.COMPUTER);
  });
  it("should throw an error if an invalid type is passed", () => {
    expect(() => new Player("INVALID")).toThrow("Invalid player type");
  });
  it("should have a gameboard", () => {
    expect(humanPlayer.gameboard).toBeDefined();
    expect(computerPlayer.gameboard).toBeDefined();
  });
});
