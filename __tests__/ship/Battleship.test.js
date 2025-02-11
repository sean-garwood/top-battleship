import { Battleship } from "../../src/classes/Ship/Battleship";

describe("Battleship", () => {
  let battleship;

  beforeEach(() => {
    battleship = new Battleship();
  });

  test("should have the correct name", () => {
    expect(battleship.name).toBe("Battleship");
  });

  test("should have the correct size", () => {
    expect(battleship.size).toBe(4);
  });

  test("should be an instance of Ship", () => {
    expect(battleship).toBeInstanceOf(Battleship);
  });

  test("should initialize with no hits", () => {
    expect(battleship.hits).toBe(0);
  });

  test("should be able to take a hit", () => {
    battleship.hit();
    expect(battleship.hits).toBe(1);
  });

  test("should sink when hits equal size", () => {
    for (let i = 0; i < battleship.size; i++) {
      battleship.hit();
    }
    expect(battleship.isSunk).toBe(true);
  });
});
