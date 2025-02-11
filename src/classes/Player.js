import { Board } from "./Board.js";
import { Battleship } from "./Ship/Battleship.js";
import { Carrier } from "./Ship/Carrier.js";
import { Cruiser } from "./Ship/Cruiser.js";
import { Destroyer } from "./Ship/Destroyer.js";
import { Submarine } from "./Ship/Submarine.js";

export class Player {
  static Types = {
    Human: "Human",
    Computer: "Computer",
  };
  constructor(type) {
    this.type = type;
    this.ships = {
      battleship: new Battleship(),
      carrier: new Carrier(),
      cruiser: new Cruiser(),
      destroyer: new Destroyer(),
      submarine: new Submarine(),
    };
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
    const attack = { x: randomX(), y: randomY() };
    alert(`Computer attacks ${attack.x}, ${attack.y}`);
    return attack;
  }

  async placeShipsManually() {
    for (const shipName in this.ships) {
      // this.ships, not Ships
      const ship = this.ships[shipName];
      let placed = false;
      while (!placed) {
        const { x, y, orientation } = await this.#getShipPlacementInput(ship);
        try {
          this.board.placeShip(ship, x, y, orientation);
          placed = true;
          this.board.addShipClass();
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }

  placeShipsAutomatically() {
    const randomX = () => Math.floor(Math.random() * this.board.width);
    const randomY = () => Math.floor(Math.random() * this.board.height);
    const randomOrientation = () => {
      return Math.random() > 0.5 ? "Horizontal" : "Vertical";
    };
    for (const shipname in this.ships) {
      const ship = this.ships[shipname];
      let placed = false;
      while (!placed) {
        try {
          const x = randomX();
          const y = randomY();
          const o = randomOrientation();
          this.board.placeShip(ship, x, y, o);
          placed = true;
          this.board.addShipClass();
        } catch (error) {
          // Do nothing
        }
      }
    }
  }

  async #getShipPlacementInput(ship) {
    // Implement UI to get ship placement input from the user
    // For simplicity, we use prompt here, but you should replace it with a proper UI
    const x = parseInt(prompt(`Enter x coordinate for ${ship.name}`));
    const y = parseInt(prompt(`Enter y coordinate for ${ship.name}`));
    const orientation = prompt(
      `Enter orientation (Horizontal/Vertical) for ${ship.name}`
    );
    return { x, y, orientation };
  }
}
