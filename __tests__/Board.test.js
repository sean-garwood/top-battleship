import { Board } from "../src/classes/Board";
import { Carrier } from "../src/classes/Ship/Carrier";

let board;
let ship;
const expectedHeight = Board.Dimensions.Height;
const expectedWidth = Board.Dimensions.Width;

beforeEach(() => {
  board = new Board();
  ship = new Carrier();
});

describe("Board", () => {
  it("should have a width attribute", () => {
    expect(board.width).toBeDefined;
  });
  it("should have a height attribute", () => {
    expect(board.height).toBeDefined;
  });
  it("should include a width attribute with value of 10", () => {
    expect(board.width).toBe(expectedWidth);
  });
  it("should include a y attribute with value of 10", () => {
    expect(board.height).toBe(expectedHeight);
  });
  it("should include a squares attribute", () => {
    expect(board.squares).toBeDefined;
  });
  it("should include a draw method", () => {
    expect(board.draw).toBeDefined;
  });
  it("should include a build method", () => {
    expect(Board.build).toBeDefined;
  });
  it("should have ten rows of squares after initialization", () => {
    expect(board.squares.length).toBe(expectedHeight);
  });
  it("should include a ships attribute", () => {
    expect(board.ships).toBeDefined;
  });
  it("should include an allShipsSunk attribute", () => {
    expect(board.allShipsSunk).toBeDefined;
  });
  it(" should not have allShipsSunk after initialization", () => {
    expect(board.allShipsSunk).toBe(false);
  });
  it("should include an attacks attribute", () => {
    expect(board.attacks).toBeDefined;
  });
  it("should include a placeShip method", () => {
    expect(board.placeShip).toBeDefined;
  });
  it("should have a receiveAttack method", () => {
    expect(board.receiveAttack).toBeDefined;
  });
});
