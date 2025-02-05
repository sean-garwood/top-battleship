import { logShipInfo } from "../utils/log-ship-positions.js";
export function placeShips(boards) {
  const p1Board = boards.one;
  const p2Board = boards.two;
  const p1Ships = boards.one.ships;
  const p2Ships = boards.two.ships;
  const debug = 1;

  placeShipsOnBoard(p1Board, p1Ships);
  placeShipsOnBoard(p2Board, p2Ships);
  if (debug) {
    logShipInfo(p1Board);
    logShipInfo(p2Board);
  }

  function placeShipsOnBoard(board, ships) {
    let x = 0,
      y = 0;
    Object.values(ships).forEach((ship) => {
      board.placeShip(ship, x, y);
      x++;
      y++;
    });
  }
}
