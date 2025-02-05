export class Ship {
  static Orientations = {
    Horizontal: "Horizontal",
    Vertical: "Vertical",
  };
  constructor(orientation = Ship.Orientations.Horizontal) {
    this._hits = 0;
    this.orientation = orientation;
  }

  get hits() {
    return this._hits;
  }

  set hits(value) {
    this._hits = value;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits === this.size;
  }
}
