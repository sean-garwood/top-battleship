export class Square {
  // make a Map?
  static TargetStatusMap = {
    null: "Empty",
    0: "Miss",
    1: "Hit",
  };
  static TargetStatuses = {
    Miss: -1,
    Empty: 0,
    Hit: 1,
  };

  constructor(x, y) {
    this._coordinates = {
      x: x,
      y: y,
    };
    this._ship = null;
    this._targetStatus = Square.TargetStatuses.Empty;
  }

  get coordinates() {
    return this._coordinates;
  }

  get isHit() {
    return this._targetStatus === Square.TargetStatuses.Hit;
  }
  get isMiss() {
    return this._targetStatus === Square.TargetStatuses.Miss;
  }

  get isOccupied() {
    return this._ship !== null;
  }

  get ship() {
    return this._ship;
  }
  set ship(value) {
    this._ship = value;
  }

  get targetStatus() {
    return this._targetStatus;
  }
  set targetStatus(value) {
    this._targetStatus = value;
  }
  get x() {
    return this.coordinates.x;
  }
  get y() {
    return this.coordinates.y;
  }
}
