import { Player } from "../src/classes/Player";

let humanPlayer, computerPlayer;

beforeAll(() => {
  humanPlayer = new Player(Player.Types.Human);
  computerPlayer = new Player(Player.Types.Computer);
});

describe("Player", () => {
  it("should have a type", () => {
    expect(humanPlayer.type).toBe(Player.Types.Human);
    expect(computerPlayer.type).toBe(Player.Types.Computer);
  });
  it("should throw an error if an invalid type is passed", () => {
    expect(() => new Player("INVALID")).toThrow;
  });
  it("should have a move method", () => {
    expect(humanPlayer.move).toBeDefined;
    expect(computerPlayer.move).toBeDefined;
  });
  it("should have a board", () => {
    expect(humanPlayer.board).toBeDefined;
    expect(computerPlayer.board).toBeDefined;
  });
  it("should allow a computer to make a move", async () => {
    const move = await computerPlayer.move();
    expect(move).toBeDefined;
  });
});
