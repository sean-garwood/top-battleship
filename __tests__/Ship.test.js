import { Ship } from "../src/classes/Ship";

describe("Ship", () => {
  it("should include a length attribute", () => {
    const ship = new Ship(4);
    expect(ship.length).toBe(4);
  });
  it("should include a hit attribute", () => {
    const ship = new Ship(4);
    expect(ship.hits).toEqual(0);
  });
  it("should not be sunk when created", () => {
    const ship = new Ship(4);
    expect(ship.isSunk()).toBe(false);
  });
});
