import { Ship } from "../Ship.js";

export class Carrier extends Ship {
  constructor() {
    super();
    this.name = "Carrier";
    this.size = 5;
  }
}
