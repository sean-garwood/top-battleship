export function drawBoards(boards) {
  const p1Board = boards.one;
  const p2Board = boards.two;
  p1Board.draw(PlayerTypes.HUMAN);
  p2Board.draw(PlayerTypes.COMPUTER);
}
