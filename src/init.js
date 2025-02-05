import { Orientations } from "./constants/Orientations.js";
import { Player } from "./classes/Player.js";
import { PlayerTypes } from "./constants/PlayerTypes.js";
import { Ship } from "./classes/Ship.js";
import { Ships } from "./constants/Ships.js";

export function init() {
  document.addEventListener("DOMContentLoaded", () => {
    const players = createPlayers();
    const boards = getBoards(players);
    drawBoards(boards);
    placeShips(boards);
    drawShips(boards);
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

function drawBoards(boards) {
  const humanBoard = boards.humanBoard;
  const computerBoard = boards.computerBoard;
  humanBoard.draw(PlayerTypes.HUMAN);
  computerBoard.draw(PlayerTypes.COMPUTER);
}

// add a .ship class to the cell divs that contain a ship
function drawShips(boards) {
  const humanBoard = boards.humanBoard;
  const computerBoard = boards.computerBoard;
  const humanBoardDiv = document.getElementById("human-board");
  const computerBoardDiv = document.getElementById("computer-board");

  function addShipClass(board, boardDiv) {
    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        const cell = boardDiv.querySelector(
          `.cell[data-x="${x}"][data-y="${y}"]`
        );
        if (board.board[x][y] !== null) {
          cell.classList.add("ship");
        }
      }
    }
  }

  addShipClass(humanBoard, humanBoardDiv);
  addShipClass(computerBoard, computerBoardDiv);
}

function getBoards(players) {
  const humanBoard = players.human.board;
  const computerBoard = players.computer.board;
  return { humanBoard, computerBoard };
}

function placeShips(boards) {
  const humanBoard = boards.humanBoard;
  const computerBoard = boards.computerBoard;
  const humanShips = createShips();
  const computerShips = createShips();

  function placeShipsOnBoard(board, ships) {
    let x = 0,
      y = 0,
      orientation = Orientations.HORIZONTAL;
    ships.forEach((ship) => {
      board.placeShip(ship, x, y, orientation);
      x++;
      y++;
    });
  }

  placeShipsOnBoard(humanBoard, humanShips);
  placeShipsOnBoard(computerBoard, computerShips);
}
