export function logShipInfo(board) {
  let name, xPos, yPos;
  board.squares.forEach((row) => {
    row.forEach((sq) => {
      if (sq.isOccupied) {
        name = sq.ship.name;
        xPos = sq.x;
        yPos = sq.y;
        console.log(`name: ${name}\nx: ${xPos}\ny: ${yPos}`);
      }
    });
  });
}
