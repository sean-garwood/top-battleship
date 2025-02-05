import { BoardDimensions } from "../constants/BoardDimensions.js";
import { Orientations } from "../constants/Orientations.js";
import { PlayerTypes } from "../constants/PlayerTypes.js";
class Board {
  constructor() {
    this.width = BoardDimensions.BOARD_WIDTH;
    this.height = BoardDimensions.BOARD_HEIGHT;
    this.board = Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => null)
    );
    this.attacks = {
      hits: [],
      misses: [],
    };
    this.ships = [];
    this._allShipsSunk = false;
  }

  get allShipsSunk() {
    return this._allShipsSunk;
  }

  set allShipsSunk(value) {
    this._allShipsSunk = value;
  }

  draw(playerType) {
    const boardDivContainerID =
      playerType === PlayerTypes.HUMAN
        ? "human-board-container"
        : "computer-board-container";
    const boardDivContainer = document.getElementById(boardDivContainerID);
    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");
    boardDiv.id =
      playerType === PlayerTypes.HUMAN ? "human-board" : "computer-board";
    for (let y = BoardDimensions.BOARD_HEIGHT - 1; y >= 0; y--) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      rowDiv.dataset.y = y;
      for (let x = 0; x < BoardDimensions.BOARD_WIDTH; x++) {
        const cell = document.createElement("div");
        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.classList.add("cell");
        playerType === PlayerTypes.HUMAN
          ? cell.classList.add("human")
          : cell.classList.add("computer");
        rowDiv.appendChild(cell);
        if (playerType === PlayerTypes.COMPUTER) {
          cell.addEventListener("click", (e) => {
            const x = parseInt(e.target.dataset.x);
            const y = parseInt(e.target.dataset.y);
            const result = this.receiveAttack(x, y);
            if (result) {
              // is a hit
              e.target.classList.add("hit");
            } else {
              // is a miss
              e.target.classList.add("miss");
            }
          });
        }
      }
      boardDiv.appendChild(rowDiv);
    }

    boardDivContainer.appendChild(boardDiv);
  }

  placeShip(ship, startAtX, startAtY, orientation) {
    this.#validatePlacement(ship, startAtX, startAtY, orientation);
    if (orientation === Orientations.HORIZONTAL) {
      this.#placeShipHorizontally(ship, startAtX, startAtY);
    } else {
      this.#placeShipVertically(ship, startAtX, startAtY);
    }
    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    this.#validateAttack(x, y);

    const target = this.board[x][y];
    if (target === null) {
      this.attacks.misses.push({ x, y });
      return false;
    } else {
      this.attacks.hits.push({ x, y });
      target.hit();
      this.allShipsSunk = this.ships.every((ship) => ship.isSunk());
      return true;
    }
  }

  #catchOutOfBounds(ship, x, y, orientation) {
    const areNegativeCoordinates = x < 0 || y < 0;
    if (areNegativeCoordinates) {
      throw new Error("Coordinates must be positive integers");
    }
    const exceedsWidth = x + ship.size > this.width;
    const exceedsHeight = y + ship.size > this.height;

    switch (orientation) {
      case Orientations.HORIZONTAL:
        if (exceedsWidth) {
          throw new Error("Ship exceeds board width");
        }
        break;
      case Orientations.VERTICAL:
        if (exceedsHeight) {
          throw new Error("Ship exceeds board height");
        }
        break;
      default:
        throw new Error("Invalid orientation");
    }
  }

  #catchOverlap(ship, x, y, orientation) {
    switch (orientation) {
      case Orientations.HORIZONTAL:
        for (let i = 0; i < ship.size; i++) {
          if (this.board[x + i][y] !== null) {
            throw new Error("Ship overlaps another ship");
          }
        }
        break;
      case Orientations.VERTICAL:
        for (let i = 0; i < ship.size; i++) {
          if (this.board[x][y + i] !== null) {
            throw new Error("Ship overlaps another ship");
          }
        }
        break;
      default:
        throw new Error("Invalid orientation");
    }
  }

  #placeShipHorizontally(ship, startAtX, startAtY) {
    for (let i = 0; i < ship.size; i++) {
      this.board[startAtX + i][startAtY] = ship;
    }
  }

  #placeShipVertically(ship, startAtX, startAtY) {
    for (let i = 0; i < ship.size; i++) {
      this.board[startAtX][startAtY + i] = ship;
    }
  }

  #validateAttack(x, y) {
    if (!(x >= 0 && x < this.width && y >= 0 && y < this.height)) {
      throw new Error(
        `Invalid attack coordinates: ${x}, ${y}` +
          ` for board dimensions: ${this.width}, ${this.height}`
      );
    }
    if (
      this.attacks.hits.some((hit) => hit.x === x && hit.y === y) ||
      this.attacks.misses.some((miss) => miss.x === x && miss.y === y)
    ) {
      throw new Error(`Coordinates ${x}, ${y} have already been attacked`);
    }
  }

  #validatePlacement(ship, x, y, orientation) {
    this.#catchOutOfBounds(ship, x, y, orientation);
    this.#catchOverlap(ship, x, y, orientation);
  }
}

export { Board };
