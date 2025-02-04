import { BoardDimensions } from "../constants/BoardDimensions";
import { Orientations } from "../constants/Orientations";
class Gameboard {
  constructor(player) {
    this.width = BoardDimensions.BOARD_WIDTH;
    this.height = BoardDimensions.BOARD_HEIGHT;
    this.board = Array.from({ length: this.width }, () =>
      Array.from({ length: this.height }, () => null)
    );
    this.belongsTo = player;
    this.attacks = {
      hits: [],
      misses: [],
    };
  }

  placeShip(ship, startAtX, startAtY, orientation) {
    this.#validatePlacement(ship, startAtX, startAtY, orientation);
    if (orientation === Orientations.HORIZONTAL) {
      this.#placeShipHorizontally(ship, startAtX, startAtY);
    } else {
      this.#placeShipVertically(ship, startAtX, startAtY);
    }
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
    // check orientation

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

export { Gameboard };
