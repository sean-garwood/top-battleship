import { Destroyer } from "../../src/classes/Ship/Destroyer";

describe("Destroyer", () => {
  let destroyer;

  beforeEach(() => {
    destroyer = new Destroyer();
  });

  it("should have the correct name", () => {
    expect(destroyer.name).toBe("Destroyer");
  });

  it("should have the correct size", () => {
    expect(destroyer.size).toBe(2);
  });

  it("should inherit from Ship", () => {
    expect(destroyer).toBeInstanceOf(Destroyer);
  });

  it("should initialize hits to 0", () => {
    expect(destroyer.hits).toBe(0);
  });

  it("should not be sunk initially", () => {
    expect(destroyer.isSunk).toBe(false);
  });

  it("should be sunk after taking 2 hits", () => {
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.isSunk).toBe(true);
  });
});
