import { Ship } from "../Ship.js";

export class Submarine extends Ship {
  constructor() {
    super();
    this.name = "Submarine";
    this.size = 3;
  }
}
