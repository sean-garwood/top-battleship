import { Submarine } from "../../src/classes/Ship/Submarine";

describe("Submarine", () => {
  let submarine;

  beforeEach(() => {
    submarine = new Submarine();
  });

  it("should have the correct name", () => {
    expect(submarine.name).toBe("Submarine");
  });

  it("should have the correct size", () => {
    expect(submarine.size).toBe(3);
  });

  it("should inherit from Ship", () => {
    expect(submarine).toBeInstanceOf(Submarine);
  });

  it("should initialize hits to 0", () => {
    expect(submarine.hits).toBe(0);
  });

  it("should not be sunk initially", () => {
    expect(submarine.isSunk()).toBe(false);
  });

  it("should be sunk after taking 3 hits", () => {
    submarine.hit();
    submarine.hit();
    submarine.hit();
    expect(submarine.isSunk()).toBe(true);
  });
});
