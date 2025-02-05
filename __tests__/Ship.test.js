import { Ship } from "../src/classes/Ship";

let ship;

beforeAll(() => {
  ship = new Ship();
});

describe("Ship", () => {
  it("should include a hits attribute", () => {
    expect(ship.hits).toBeDefined();
  });
  it("should include an orientation attribute", () => {
    expect(ship.orientation).toBeDefined();
  });
  it("should include a hit attribute that inits to zero", () => {
    expect(ship.hits).toEqual(0);
  });
  it("should not be sunk when created", () => {
    expect(ship.isSunk()).toBe(false);
  });
});
