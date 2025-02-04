class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.hits = 0;
  }

  isSunk() {
    return this.hits === this.length;
  }
}

export { Ship };
