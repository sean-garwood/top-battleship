import { Ship } from "../Ship.js";

export class Battleship extends Ship {
  constructor() {
    super();
    this.name = "Battleship";
    this.size = 4;
  }
}
