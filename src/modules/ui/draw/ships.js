export function drawShips(boards) {
  const humanBoard = boards.one;
  const computerBoard = boards.two;
  const humanBoardDiv = document.getElementById("human-board");
  const computerBoardDiv = document.getElementById("computer-board");

  function addShipClass(board, boardDiv) {
    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        const square = boardDiv.querySelector(
          `.square[data-x="${x}"][data-y="${y}"]`
        );
        if (board.squares[x][y].isOccupied) {
          square.classList.add("ship");
        }
      }
    }
  }

  addShipClass(humanBoard, humanBoardDiv);
  addShipClass(computerBoard, computerBoardDiv);
}
