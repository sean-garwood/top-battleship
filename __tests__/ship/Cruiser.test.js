import { Cruiser } from "../../src/classes/Ship/Cruiser";

describe("Cruiser", () => {
  let cruiser;

  beforeAll(() => {
    cruiser = new Cruiser();
  });

  it("should be an instance of Cruiser", () => {
    expect(cruiser).toBeInstanceOf(Cruiser);
  });

  it("should have a name attribute set to 'Cruiser'", () => {
    expect(cruiser.name).toBe("Cruiser");
  });

  it("should have a size attribute set to 3", () => {
    expect(cruiser.size).toBe(3);
  });

  it("should have a hits attribute initialized to 0", () => {
    expect(cruiser.hits).toBe(0);
  });

  it("should not be sunk when created", () => {
    expect(cruiser.isSunk()).toBe(false);
  });

  it("should be sunk when hits equal size", () => {
    cruiser.hits = cruiser.size;
    expect(cruiser.isSunk()).toBe(true);
  });

  it("should increment hits when hit method is called", () => {
    cruiser.hits = 0;
    cruiser.hit();
    expect(cruiser.hits).toBe(1);
  });

  it("should not be sunk when hits are less than size", () => {
    cruiser.hits = cruiser.size - 1;
    expect(cruiser.isSunk()).toBe(false);
  });
});
