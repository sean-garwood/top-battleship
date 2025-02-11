export function drawShips(boards) {
  const humanBoard = boards.one;
  const computerBoard = boards.two;
  const humanBoardDiv = document.getElementById("human-board");
  const computerBoardDiv = document.getElementById("computer-board");

  function addShipClass(board, boardDiv) {
    board.squares.forEach((row) => {
      row
        .filter((square) => square.isOccupied)
        .forEach((square) => {
          square.div.classList.add("ship");
        });
    });
  }

  addShipClass(humanBoard, humanBoardDiv);
  addShipClass(computerBoard, computerBoardDiv);
}
