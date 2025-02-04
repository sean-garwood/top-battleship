import { validatePlayerType as validate } from "../constants/PlayerTypes";
import { Gameboard } from "./Gameboard";

class Player {
  constructor(type) {
    this.type = validate(type);
    this.gameboard = new Gameboard();
  }
}

export { Player };
