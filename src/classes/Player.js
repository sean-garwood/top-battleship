import { validatePlayerType as validate } from "../constants/PlayerTypes.js";
import { Gameboard } from "./Gameboard.js";

class Player {
  constructor(type) {
    this.type = validate(type);
    this.gameboard = new Gameboard();
  }

  drawBoard() {
    this.gameboard.draw(this.type);
  }
}

export { Player };
