import { validatePlayerType as validate } from "../constants/PlayerTypes.js";
import { Board } from "./Board.js";

class Player {
  constructor(type) {
    this.type = validate(type);
    this.board = new Board();
  }

  drawBoard() {
    this.board.draw(this.type);
  }
}

export { Player };
