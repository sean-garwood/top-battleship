import { Player } from "../classes/Player.js";
export const boardDrawing = {
  getBoardContainerID() {
    return this.owner.type === Player.Types.Human
      ? "human-board-container"
      : "computer-board-container";
  },

  createBoardDiv() {
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    boardDiv.id =
      this.owner.type === Player.Types.Human ? "human-board" : "computer-board";
    return boardDiv;
  },

  createRowDiv(y) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowDiv.dataset.y = y;
    return rowDiv;
  },

  createSquareDiv(x, y) {
    const squareDiv = document.createElement("div");
    squareDiv.dataset.x = x;
    squareDiv.dataset.y = y;
    squareDiv.classList.add("square");
    this.owner.type === Player.Types.Human
      ? squareDiv.classList.add("human")
      : squareDiv.classList.add("computer");
    return squareDiv;
  },

  addComputerBoardEventListener(squareDiv, x, y) {
    squareDiv.addEventListener("click", (e) => {
      const x = parseInt(e.target.dataset.x);
      const y = parseInt(e.target.dataset.y);
      const result = this.receiveAttack(x, y);
      if (result) {
        e.target.classList.add("hit");
      } else {
        e.target.classList.add("miss");
      }
    });
  },
};
