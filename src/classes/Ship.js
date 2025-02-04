class Ship {
  constructor(SHIP) {
    this.name = SHIP.name;
    this.size = SHIP.size;
    this.hits = 0;
  }

  hit() {
    this.hits += 1;
  }
  isSunk() {
    return this.hits === this.size;
  }
}

export { Ship };
