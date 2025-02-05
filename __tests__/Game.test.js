import { Game } from "../src/classes/Game";

describe("Game", () => {
  let game;
  beforeEach(() => {
    game = new Game();
  });
  it("should have a players attribute", () => {
    expect(game.players).toBeDefined;
  });
  it("should have a currentPlayer attribute", () => {
    expect(game.currentPlayer).toBeDefined;
  });
  it("should have a winner attribute", () => {
    expect(game.winner).toBeDefined;
  });
  it("should have a turns attribute", () => {
    expect(game.turns).toBeDefined;
  });
  it("should have a static maxTurns attribute", () => {
    expect(Game.maxTurns).toBeDefined;
  });
  it("should have a playGame method", () => {
    expect(game.playGame).toBeDefined;
  });
});
