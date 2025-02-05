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

  play() {
    while (!this.winner && this.turns < Game.MaxTurns) {
      this.currentPlayer.move();
      this.winner = this.#checkForWinner();
      if (this.winner) {
        this.#endGame();
        break;
      }

      this.currentPlayer = this.#getNextPlayer();
    }
  }

  #checkForWinner() {
    let winner = null;
    if (this.boards.one.allShipsSunk) {
      winner = this.players.two;
    } else if (this.boards.two.allShipsSunk) {
      winner = this.players.one;
    }
    return winner;
  }

  #endGame() {
    alert(`${this.winner.type} wins!`);
  }

  #getNextPlayer() {
    this.turns++;
    return this.turns % 2 ? this.players.two : this.players.one;
  }
}
