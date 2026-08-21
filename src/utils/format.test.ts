import { describe, it, expect } from "vitest";
import { formatMonsters } from "./format";

describe("formatMonsters", () => {
  it("formats single monster with count 1", () => {
    expect(formatMonsters([{ name: "Silver Lobo", count: 1 }])).toBe("Silver Lobo");
  });

  it("formats single monster with count > 1", () => {
    expect(formatMonsters([{ name: "Silver Lobo", count: 2 }])).toBe("Silver Lobo x2");
  });

  it("formats multiple monsters joined by comma", () => {
    expect(
      formatMonsters([
        { name: "Silver Lobo", count: 2 },
        { name: "Guard Leader", count: 1 },
      ])
    ).toBe("Silver Lobo x2, Guard Leader");
  });

  it("returns empty string for empty array", () => {
    expect(formatMonsters([])).toBe("");
  });
});
