import { BoardDimensions } from "../constants/BoardDimensions";
class Gameboard {
  constructor(player) {
    this.x = BoardDimensions.BOARD_WIDTH;
    this.y = BoardDimensions.BOARD_HEIGHT;
    this.belongsTo = player;
  }
}

export { Gameboard };
