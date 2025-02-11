import { Game } from "./src/classes/Game.js";

document.addEventListener("DOMContentLoaded", async () => {
  const debug = 0;
  const game = new Game();
  const humanPlayer = game.players.one;
  const computerPlayer = game.players.two;

  debug
    ? humanPlayer.placeShipsAutomatically()
    : humanPlayer.placeShipsManually();

  computerPlayer.placeShipsAutomatically();

  game.play();
});
