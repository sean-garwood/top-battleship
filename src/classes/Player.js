import { Board } from "./Board.js";

export class Player {
  static Types = {
    Human: "Human",
    Computer: "Computer",
  };
  constructor(type) {
    this.type = type;
    this.board = new Board(this);
  }

  async move() {
    let move;
    move =
      this.type === Player.Types.Human
        ? await this.#humanMove()
        : this.#computerMove();
    return move;
  }

  async #humanMove() {
    let move;
    const computerBoardDiv = document.getElementById("computer-board");
    await new Promise((resolve) => {
      computerBoardDiv.onclick = (e) => {
        const square = e.target.closest(".square");
        if (square) {
          const intX = parseInt(square.dataset.x);
          const intY = parseInt(square.dataset.y);
          move = { x: intX, y: intY };
          resolve();
        }
      };
    });
    return move;
  }

  #computerMove() {
    const randomX = () => Math.floor(Math.random() * this.board.width);
    const randomY = () => Math.floor(Math.random() * this.board.height);
    return { x: randomX(), y: randomY() };
  }
}
