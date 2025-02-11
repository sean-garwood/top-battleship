export class Square {
  // make a Map?
  static TargetStatuses = {
    Miss: -1,
    Empty: 0,
    Hit: 1,
  };

  constructor(x, y, owner) {
    this.owner = owner;
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

  get div() {
    const dataX = this.coordinates.x;
    const dataY = this.coordinates.y;
    return document.querySelector(
      `.${this.owner}[data-x="${dataX}"][data-y="${dataY}"]`
    );
  }

  get hasBeenAttacked() {
    return this._targetStatus !== Square.TargetStatuses.Empty;
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
