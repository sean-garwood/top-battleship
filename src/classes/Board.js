import { Ship } from "./Ship.js";
import { Square } from "./Square.js";
import { boardDrawing } from "../modules/board-drawing.js";
import { Player } from "../classes/Player.js";

export class Board {
  static Dimensions = {
    Height: 10,
    Width: 10,
  };

  constructor(owner) {
    this.owner = owner;
    this.width = Board.Dimensions.Width;
    this.height = Board.Dimensions.Height;
    this.squares = this.build();
    this.attacks = {
      hits: [],
      misses: [],
    };
    this.ships = owner.ships;

    // Bind drawing methods to this instance
    this.getBoardContainerID = boardDrawing.getBoardContainerID.bind(this);
    this.createBoardDiv = boardDrawing.createBoardDiv.bind(this);
    this.createRowDiv = boardDrawing.createRowDiv.bind(this);
    this.createSquareDiv = boardDrawing.createSquareDiv.bind(this);
    this.addComputerBoardEventListener =
      boardDrawing.addComputerBoardEventListener.bind(this);
    this.draw();
  }

  addShipClass() {
    this.squares.forEach((row) => {
      row
        .filter((square) => square.isOccupied)
        .forEach((square) => {
          square.div.classList.add("ship", `${square.ship.name.toLowerCase()}`);
        });
    });
  }

  build() {
    const board = [];
    for (let m = 0; m < Board.Dimensions.Height; m++) {
      board[m] = [];
      for (let n = 0; n < Board.Dimensions.Width; n++) {
        board[m][n] = new Square(m, n, this.owner.type.toLowerCase());
      }
    }
    return board;
  }

  get allShipsSunk() {
    return Object.values(this.ships).every((ship) => ship.isSunk);
  }

  squareAt(x, y) {
    return this.squares[x][y];
  }

  draw() {
    const boardDivContainerID = this.getBoardContainerID();
    const boardDivContainer = document.getElementById(boardDivContainerID);
    const boardDiv = this.createBoardDiv();

    for (let y = this.height - 1; y >= 0; y--) {
      const rowDiv = this.createRowDiv(y);
      for (let x = 0; x < this.width; x++) {
        const squareDiv = this.createSquareDiv(x, y);
        rowDiv.appendChild(squareDiv);

        if (this.type === Player.Types.Computer) {
          this.addComputerBoardEventListener(squareDiv, x, y);
        }
      }
      boardDiv.appendChild(rowDiv);
    }

    boardDivContainer.appendChild(boardDiv);
  }

  placeShip(ship, startX, startY, orientation = Ship.Orientations.Horizontal) {
    if (
      startX < 0 ||
      startX >= this.width ||
      startY < 0 ||
      startY >= this.height
    ) {
      throw new Error("Invalid coordinates");
    }
    if (
      orientation === Ship.Orientations.Horizontal &&
      startX + ship.size > this.width
    ) {
      throw new Error("Ship out of bounds");
    }
    if (
      orientation === Ship.Orientations.Vertical &&
      startY + ship.size > this.height
    ) {
      throw new Error("Ship out of bounds");
    }
    for (let i = 0; i < ship.size; i++) {
      if (
        orientation === Ship.Orientations.Horizontal &&
        this.squareAt(startX + i, startY).isOccupied
      ) {
        throw new Error("Square occupied");
      }
      if (
        orientation === Ship.Orientations.Vertical &&
        this.squareAt(startX, startY + i).isOccupied
      ) {
        throw new Error("Square occupied");
      }
    }
    for (let i = 0; i < ship.size; i++) {
      if (orientation === Ship.Orientations.Horizontal) {
        this.squareAt(startX + i, startY).ship = ship;
      } else {
        this.squareAt(startX, startY + i).ship = ship;
      }
    }
  }

  receiveAttack({ x, y }) {
    const target = this.squareAt(x, y);
    const alreadyAttacked = target.hasBeenAttacked;
    let attackSuccessful = false;
    let message;
    if (alreadyAttacked) {
      alert(`Invalid attack: already attacked (${x}, ${y})`);
      return attackSuccessful;
    }

    attackSuccessful = true;
    message = `Attack at (${x}, ${y}) sent to ${this.owner.type}'s board and`;
    if (target.isOccupied) {
      target.targetStatus = Square.TargetStatuses.Hit;
      target.ship.hit();
      target.div.classList.add("hit");
      message += ` hit the ${target.ship.name}`;
      this.attacks.hits.push({ x, y });
      if (target.ship.isSunk) {
        const currentPlayerType =
          this.owner.type === Player.Types.Human ? "Computer" : "You";
        alert(`${currentPlayerType} sunk the ${target.ship.name}`);
      }
    } else {
      message += " missed!";
      target.targetStatus = Square.TargetStatuses.Miss;
      target.div.classList.add("miss");
      this.attacks.misses.push({ x, y });
    }
    alert(message);
    return attackSuccessful;
  }
}
