import { Players } from "../modules/init/players.js";

export class Game {
  static MaxTurns;
  constructor() {
    this.players = {
      one: Players.one,
      two: Players.two,
    };
    this.boards = {
      one: this.players.one.board,
      two: this.players.two.board,
    };
    Game.MaxTurns = this.boards.one.width * this.boards.one.height;
    this._currentPlayer = this.players.one;
    this._winner = null;
    this.turns = 0;
  }

  get currentPlayer() {
    return this._currentPlayer;
  }
  set currentPlayer(player) {
    this._currentPlayer = player;
  }
  get winner() {
    return this._winner;
  }
  set winner(player) {
    this._winner = player;
  }

  async play() {
    while (!this.winner && this.turns < Game.MaxTurns) {
      const player = this.currentPlayer;
      const targetBoard =
        this.currentPlayer === this.players.one
          ? this.boards.two
          : this.boards.one;
      const move = await player.move();
      targetBoard.receiveAttack(move);
      this.#checkForWinner() || (this.currentPlayer = this.#getNextPlayer());
    }
    this.#endGame();
  }

  #checkForWinner() {
    if (this.boards.one.allShipsSunk || this.boards.two.allShipsSunk) {
      this.winner = this.currentPlayer;
      return true;
    }
    return false;
  }

  #endGame() {
    alert(`${this.winner.type} wins!`);
  }

  #getNextPlayer() {
    this.turns++;
    return this.turns % 2 ? this.players.two : this.players.one;
  }
}
