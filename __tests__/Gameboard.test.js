import { Gameboard } from "../src/classes/Gameboard";
import { Orientations } from "../src/constants/Orientations";
import { jest } from "@jest/globals";
import { Ship } from "../src/classes/Ship";
import { SHIPS } from "../src/constants/Ships";

let gameboard;
let player;
let ship;
const expectedHeight = 10;
const expectedWidth = 10;

beforeEach(() => {
  player = jest.fn();
  gameboard = new Gameboard(player);
  ship = new Ship(SHIPS.CARRIER);
});

describe("Gameboard", () => {
  it("should include an x attribute with value of 10", () => {
    expect(gameboard.width).toBe(expectedWidth);
  });
  it("should include a y attribute with value of 10", () => {
    expect(gameboard.height).toBe(expectedHeight);
  });
  it("should include a belongsTo attribute", () => {
    expect(gameboard.belongsTo).toBe(player);
  });
  it("should have a board that is an array of arrays", () => {
    expect(gameboard.board).toEqual(
      Array.from({ length: expectedWidth }, () =>
        Array.from({ length: expectedHeight }, () => null)
      )
    );
  });
  it("should be able to place ships at specific coordinates by calling the placeShip method", () => {
    gameboard.placeShip(ship, 0, 0, Orientations.HORIZONTAL);
    expect(gameboard.board[0][0]).toBe(ship);
  });
  it("should throw an error if the coordinates are out of bounds and orientation is horizontal", () => {
    expect(() => gameboard.placeShip(ship, 0, 10, Orientations.HORIZONTAL))
      .toThrow;
  });
  it("should throw an error if the coordinates are out of bounds and orientation is vertical", () => {
    expect(() => gameboard.placeShip(ship, 10, 0, Orientations.VERTICAL))
      .toThrow;
  });
  it("should throw an error if the *starting* coords are in-bounds, but the ship would extend out of bounds", () => {
    expect(() => gameboard.placeShip(ship, 9, 9, Orientations.HORIZONTAL))
      .toThrow;
  });
  it("should throw an error if a ship is placed on top of another ship", () => {
    gameboard.placeShip(ship, 0, 0, Orientations.HORIZONTAL);
    expect(() => gameboard.placeShip(ship, 0, 0, Orientations.HORIZONTAL))
      .toThrow;
  });
  it("should throw an error if the orientation is not horizontal or vertical", () => {
    expect(() => gameboard.placeShip(ship, 0, 0, "diagonal")).toThrow;
  });
  it("should throw an error if the coordinates are negative", () => {
    expect(() => gameboard.placeShip(ship, -1, 0, Orientations.HORIZONTAL))
      .toThrow;
  });
  it("should have a receiveAttack method", () => {
    expect(gameboard.receiveAttack).toBeDefined;
  });
  it("should not throw an error if the attack coordinates are in bounds", () => {
    expect(() => gameboard.receiveAttack(0, 0)).not.toThrow;
  });
  it("should throw an error if the attack coordinates are out of bounds", () => {
    expect(() => gameboard.receiveAttack(10, 0)).toThrow;
  });
  it("should throw an error if the attack coordinates are negative", () => {
    expect(() => gameboard.receiveAttack(-1, 0)).toThrow;
  });
  it("should throw an error if the attack coordinates are in bounds, but the attack has already been made", () => {
    gameboard.receiveAttack(0, 0);
    expect(() => gameboard.receiveAttack(0, 0)).toThrow;
  });
  it("should update the hit count of a ship if the attack is successful", () => {
    gameboard.placeShip(ship, 0, 0, Orientations.HORIZONTAL);
    gameboard.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
  });
  it("should target a ship when a successful attack is made", () => {
    gameboard.placeShip(ship, 0, 0, Orientations.HORIZONTAL);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0]).toBe(ship);
  });
  it("should update the misses array if the attack is unsuccessful", () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.attacks.misses).toEqual([{ x: 0, y: 0 }]);
  });
  it("should update the hits array if the attack is successful", () => {
    gameboard.placeShip(ship, 0, 0, Orientations.HORIZONTAL);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.attacks.hits).toEqual([{ x: 0, y: 0 }]);
  });
});
