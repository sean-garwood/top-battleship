import { Square } from "../src/classes/Square";
import { jest } from "@jest/globals";

describe("Square", () => {
  let square;
  const ship = jest.fn();
  const missStatus = Square.TargetStatuses.Miss;
  const emptyStatus = Square.TargetStatuses.Empty;
  const hitStatus = Square.TargetStatuses.Hit;

  beforeEach(() => {
    square = new Square(1, 2);
  });

  it("should create a Square with given coordinates", () => {
    expect(square.coordinates).toEqual({ x: 1, y: 2 });
  });

  it("should have initial target status as Empty", () => {
    expect(square.targetStatus).toBe(emptyStatus);
  });

  it("should set and get ship correctly", () => {
    square.ship = ship;
    expect(square.ship).toBe(ship);
  });

  it("should set and get target status correctly", () => {
    square.targetStatus = hitStatus;
    expect(square.targetStatus).toBe(hitStatus);
  });

  it("should return true for isHit when target status is Hit", () => {
    square.targetStatus = hitStatus;
    expect(square.isHit).toBe(true);
  });

  it("should return true for isMiss when target status is Miss", () => {
    square.targetStatus = missStatus;
    expect(square.isMiss).toBe(true);
  });

  it("should return true for isOccupied when ship is set", () => {
    square.ship = ship;
    expect(square.isOccupied).toBe(true);
  });

  it("should return false for isOccupied when ship is not set", () => {
    expect(square.isOccupied).toBe(false);
  });
});
