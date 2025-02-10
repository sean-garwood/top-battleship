import { drawShips } from "./ui/draw/ships.js";
import { Game } from "../classes/Game.js";
import { placeShips } from "./init/place-ships.js";

export function init() {
  document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    const boards = game.boards;
    placeShips(boards);
    drawShips(boards);
    game.play();
  });
}
