import { Carrier } from "../../src/classes/Ship/Carrier";
import { Ship } from "../../src/classes/Ship";

let carrier;

beforeAll(() => {
  carrier = new Carrier();
});

describe("Carrier", () => {
  it("should be an instance of Ship", () => {
    expect(carrier).toBeInstanceOf(Carrier);
  });

  it("should extend the Ship class", () => {
    expect(Object.getPrototypeOf(carrier)).toBeInstanceOf(Ship);
  });

  it("should have a name attribute set to 'Carrier'", () => {
    expect(carrier.name).toBe("Carrier");
  });

  it("should have a size attribute set to 5", () => {
    expect(carrier.size).toBe(5);
  });

  it("should have a hits attribute initialized to 0", () => {
    expect(carrier.hits).toBe(0);
  });

  it("should not be sunk when created", () => {
    expect(carrier.isSunk).toBe(false);
  });

  it("should be sunk when hits equal size", () => {
    for (let i = 0; i < carrier.size; i++) {
      carrier.hit();
    }
    expect(carrier.isSunk).toBe(true);
  });
});
