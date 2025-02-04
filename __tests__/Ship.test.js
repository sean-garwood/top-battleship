import { Ship } from "../src/classes/Ship";
import { SHIPS } from "../src/constants/Ships";

let ship;

beforeAll(() => {
  ship = new Ship(SHIPS.CARRIER.size, SHIPS.CARRIER.name);
});

describe("Ship", () => {
  it("should include a length attribute", () => {
    expect(ship.length).toBe(SHIPS.CARRIER.size);
  });
  it("should include a name attribute", () => {
    expect(ship.name).toBe(SHIPS.CARRIER.name);
  });
  it("should include a hit attribute that inits to zero", () => {
    expect(ship.hits).toEqual(0);
  });
  it("should not be sunk when created", () => {
    expect(ship.isSunk()).toBe(false);
  });
});
