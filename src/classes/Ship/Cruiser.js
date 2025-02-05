import { Ship } from "../Ship.js";

export class Cruiser extends Ship {
  constructor() {
    super();
    this.name = "Cruiser";
    this.size = 3;
  }
}
