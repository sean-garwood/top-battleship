import { Ship } from "./Ship.js";
import { Ships } from "../modules/init/ships.js";
import { Square } from "./Square.js";

export class Board {
  static Dimensions = {
    Height: 10,
    Width: 10,
  };

  constructor(owningPlayer) {
    this.owningPlayer = owningPlayer;
    this.width = Board.Dimensions.Width;
    this.height = Board.Dimensions.Height;
    this.squares = Board.build();
    this.attacks = {
      hits: [],
      misses: [],
    };
    this.ships = Ships;
    this._allShipsSunk = false;
  }

  get allShipsSunk() {
    return this._allShipsSunk;
  }
  set allShipsSunk(value) {
    this._allShipsSunk = value;
  }
  static build() {
    // 2D array: 10 rows of 10 squares
    // m is the row index, n is the column index
    const board = [];
    for (let m = 0; m < Board.Dimensions.Height; m++) {
      board[m] = []; // set up the row
      for (let n = 0; n < Board.Dimensions.Width; n++) {
        board[m][n] = new Square(m, n); // add square to mth row at nth index
      }
    }
    return board;
  }

  draw() {
    const boardDivContainerID =
      this.type === Player.Types.Human
        ? "human-board-container"
        : "computer-board-container";
    const boardDivContainer = document.getElementById(boardDivContainerID);
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    boardDiv.id =
      this.type === Player.Types.Human ? "human-board" : "computer-board";
    for (let y = this.height - 1; y >= 0; y--) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      rowDiv.dataset.y = y;
      for (let x = 0; x < this.width; x++) {
        const cellDiv = document.createElement("div");
        cellDiv.dataset.x = x;
        cellDiv.dataset.y = y;
        cellDiv.classList.add("cell-div");
        this.type === Player.Types.Human
          ? cellDiv.classList.add("human")
          : cellDiv.classList.add("computer");
        rowDiv.appendChild(cellDiv);

        if (this.type === Player.Types.Computer) {
          cellDiv.addEventListener("click", (e) => {
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);
            const result = this.receiveAttack(x, y);
            if (result) {
              e.target.classList.add("hit");
            } else {
              e.target.classList.add("miss");
            }
          });
        }
      }
      boardDiv.appendChild(rowDiv);
    }

    boardDivContainer.appendChild(boardDiv);
  }

  // TODO: cleanup this pile of garbage

  placeShip(ship, startX, startY) {
    if (
      startX < 0 ||
      startX >= this.width ||
      startY < 0 ||
      startY >= this.height
    ) {
      throw new Error("Invalid coordinates");
    }
    if (
      ship.orientation === Ship.Orientations.Horizontal &&
      startX + ship.size > this.width
    ) {
      throw new Error("Ship out of bounds");
    }
    if (
      ship.orientation === Ship.Orientations.Vertical &&
      startY + ship.size > this.height
    ) {
      throw new Error("Ship out of bounds");
    }
    for (let i = 0; i < ship.size; i++) {
      if (
        ship.orientation === Ship.Orientations.Horizontal &&
        this.squares[startX + i][startY].isOccupied
      ) {
        throw new Error("Square occupied");
      }
      if (
        ship.orientation === Ship.Orientations.Vertical &&
        this.squares[startX][startY + i].isOccupied
      ) {
        throw new Error("Square occupied");
      }
    }
    for (let i = 0; i < ship.size; i++) {
      if (ship.orientation === Ship.Orientations.Horizontal) {
        this.squares[startY + i][startX].ship = ship;
      } else {
        this.squares[startY][startX + i].ship = ship;
      }
    }
  }

  receiveAttack(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      throw new Error("Invalid coordinates");
    }
    if (this.squares[x][y].isAttacked) {
      throw new Error("Square already attacked");
    }
    this.squares[x][y].isAttacked = true;
    if (this.squares[x][y].isOccupied) {
      this.squares[x][y].ship.hit();
      this.attacks.hits.push({ x, y });
      if (this.squares[x][y].ship.isSunk()) {
        this.ships = this.ships.filter(
          (ship) => ship !== this.squares[x][y].ship
        );
        if (this.ships.length === 0) {
          this.allShipsSunk = true;
        }
      }
      return true;
    } else {
      this.attacks.misses.push({ x, y });
      return false;
    }
  }
}
