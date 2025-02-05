import { Game } from "../classes/Game.js";
import { placeShips } from "./init/place-ships.js";
import { drawBoards } from "./init/ui/draw/board.js";
import { drawShips } from "./init/ui/draw/ships.js";

export function init() {
  document.addEventListener("DOMContentLoaded", () => {
    let game = new Game();
    const boards = game.boards;
    placeShips(boards);
    drawBoards(boards);
    drawShips(boards);
    game.play();
  });
}
