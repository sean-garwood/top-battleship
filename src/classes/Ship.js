export class Ship {
  static Orientations = {
    Horizontal: "Horizontal",
    Vertical: "Vertical",
  };
  constructor(orientation = Ship.Orientations.Horizontal) {
    this._hits = 0;
    this.orientation = orientation;
    this._isSunk = false;
  }

  get hits() {
    return this._hits;
  }

  set hits(value) {
    this._hits = value;
  }

  get isSunk() {
    return this._isSunk;
  }
  set isSunk(value) {
    this._isSunk = value;
  }

  hit() {
    this.hits++;
    if (this.hits === this.size) {
      this.isSunk = true;
    }
  }
}
