import { Gameboard } from "./classes/Gameboard.js";
import { Orientations } from "./constants/Orientations.js";
import { Player } from "./classes/Player.js";
import { PlayerTypes } from "./constants/PlayerTypes.js";
import { Ship } from "./classes/Ship.js";
import { Ships } from "./constants/Ships.js";

export function init() {
  document.addEventListener("DOMContentLoaded", () => {
    const players = createPlayers();
    const gameboards = getBoards(players);
    drawGameboards(gameboards);
    placeShips(gameboards);
    drawShips(gameboards);
  });
}

function createPlayers() {
  const human = new Player(PlayerTypes.HUMAN);
  const computer = new Player(PlayerTypes.COMPUTER);
  return { human, computer };
}

function createShips() {
  const ships = Object.keys(Ships).map((ship) => {
    return new Ship(Ships[ship]);
  });
  return ships;
}

function drawGameboards(boards) {
  const humanBoard = boards.humanBoard;
  const computerBoard = boards.computerBoard;
  humanBoard.draw(PlayerTypes.HUMAN);
  computerBoard.draw(PlayerTypes.COMPUTER);
}

// add a .ship class to the cell divs that contain a ship
function drawShips(gameboards) {
  // the Ship class does not have a method that returns the ship's coordinates
  // so we need to loop through the board and check if there is a ship in each
  // cell
  const humanBoard = gameboards.humanBoard;
  const computerBoard = gameboards.computerBoard;
  const humanBoardDiv = document.getElementById("human-board");
  const computerBoardDiv = document.getElementById("computer-board");

  for (let y = 0; y < humanBoard.height; y++) {
    for (let x = 0; x < humanBoard.width; x++) {
      const cell = humanBoardDiv.querySelector(
        `.cell[data-x="${x}"][data-y="${y}"]`
      );
      if (humanBoard.board[x][y] !== null) {
        cell.classList.add("ship");
      }
    }
  }

  for (let y = 0; y < computerBoard.height; y++) {
    for (let x = 0; x < computerBoard.width; x++) {
      const cell = computerBoardDiv.querySelector(
        `.cell[data-x="${x}"][data-y="${y}"]`
      );
      if (computerBoard.board[x][y] !== null) {
        cell.classList.add("ship");
      }
    }
  }
}

function getBoards(players) {
  const humanBoard = players.human.gameboard;
  const computerBoard = players.computer.gameboard;
  return { humanBoard, computerBoard };
}

function placeShips(gameboards) {
  const humanBoard = gameboards.humanBoard;
  const computerBoard = gameboards.computerBoard;
  const humanShips = createShips();
  const computerShips = createShips();
  // debug
  let x = 0,
    y = 0,
    orientation = Orientations.HORIZONTAL;
  humanShips.forEach((ship) => {
    humanBoard.placeShip(ship, x, y, orientation);
    x++;
    y++;
  });
  x = 0;
  y = 0;
  computerShips.forEach((ship) => {
    computerBoard.placeShip(ship, x, y, orientation);
    x++;
    y++;
  });
}
