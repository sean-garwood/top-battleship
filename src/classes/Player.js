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
    // we already added the event listener to the computer board squares.
    // need to __await a click on one of them__ and return the coordinates of
    // the square clicked.

    // we can use the following code to wait for a click event:
    const square = await new Promise((resolve) => {
      const handleClick = (e) => {
        e.target.removeEventListener("click", handleClick);
        resolve(e.target);
      };
      document
        .getElementById("computer-board")
        .addEventListener("click", handleClick);
    });
    move = {
      x: parseInt(square.dataset.x),
      y: parseInt(square.dataset.y),
    };
    return move;
  }

  #computerMove() {
    const randomX = () => Math.floor(Math.random() * this.board.width);
    const randomY = () => Math.floor(Math.random() * this.board.height);
    return { x: randomX(), y: randomY() };
  }
}
