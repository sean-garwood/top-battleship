import { Ship } from "../Ship.js";

export class Destroyer extends Ship {
  constructor() {
    super();
    this.name = "Destroyer";
    this.size = 2;
  }
}
