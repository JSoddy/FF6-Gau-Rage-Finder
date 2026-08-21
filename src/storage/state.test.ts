import { describe, it, expect, beforeEach } from "vitest";
import {
  clearHistory,
  defaultState,
  exportState,
  importState,
  loadState,
  sanitizeState,
  saveState,
  type AppState,
} from "./state";

describe("state storage & sanitization", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns defaultState when localStorage is empty", () => {
    const state = loadState();
    expect(state).toEqual(defaultState);
  });

  it("handles corrupted or invalid JSON gracefully in loadState", () => {
    localStorage.setItem("ff6-rage-finder-state", "{ invalid json");
    const state = loadState();
    expect(state).toEqual(defaultState);
  });

  it("sanitizes primitives and null input", () => {
    expect(sanitizeState(null)).toEqual(defaultState);
    expect(sanitizeState(undefined)).toEqual(defaultState);
    expect(sanitizeState(123)).toEqual(defaultState);
    expect(sanitizeState("string")).toEqual(defaultState);
  });

  it("filters non-string values in have and want lists", () => {
    const raw = {
      have: ["Silver Lobo", 123, null, "Guard"],
      want: [undefined, "Harvester", true],
      history: [],
    };
    const sanitized = sanitizeState(raw);
    expect(sanitized.have).toEqual(["Silver Lobo", "Guard"]);
    expect(sanitized.want).toEqual(["Harvester"]);
  });

  it("sanitizes malformed history entries without throwing", () => {
    const raw = {
      have: [],
      want: [],
      history: [
        null,
        {},
        { id: "1" }, // missing monsters
        { monsters: "not an array" },
        { monsters: [{ name: "" }] }, // empty name
        {
          id: "valid-1",
          monsters: [
            { name: "Silver Lobo", count: 2 },
            { name: "Guard", count: -1 }, // invalid count defaults to 1
            { name: "Foper", count: 2.7 }, // float count floored
          ],
          resolved: true,
          pack: 1,
          slot: 0,
        },
      ],
    };

    const sanitized = sanitizeState(raw);
    expect(sanitized.history).toHaveLength(1);
    expect(sanitized.history[0].id).toBe("valid-1");
    expect(sanitized.history[0].monsters).toEqual([
      { name: "Silver Lobo", count: 2 },
      { name: "Guard", count: 1 },
      { name: "Foper", count: 2 },
    ]);
    expect(sanitized.history[0].resolved).toBe(true);
    expect(sanitized.history[0].pack).toBe(1);
    expect(sanitized.history[0].slot).toBe(0);
    expect(sanitized.history[0].multisetKey).toBe("Foper:2|Guard:1|Silver Lobo:2");
  });

  it("drops out-of-range pack and slot values", () => {
    const sanitized = sanitizeState({
      have: [],
      want: [],
      history: [
        {
          id: "bad-pack",
          monsters: [{ name: "Silver Lobo", count: 1 }],
          resolved: true,
          pack: 99,
          slot: 0,
        },
        {
          id: "bad-slot",
          monsters: [{ name: "Harvester", count: 1 }],
          resolved: true,
          pack: 14,
          slot: 8,
        },
      ],
    });

    expect(sanitized.history).toHaveLength(2);
    expect(sanitized.history[0].pack).toBeUndefined();
    expect(sanitized.history[0].slot).toBe(0);
    expect(sanitized.history[0].resolved).toBe(false);
    expect(sanitized.history[1].pack).toBe(14);
    expect(sanitized.history[1].slot).toBeUndefined();
    expect(sanitized.history[1].resolved).toBe(true);
  });

  it("saves and loads state properly", () => {
    const state: AppState = {
      have: ["Silver Lobo"],
      want: ["Harvester"],
      history: [
        {
          id: "test-1",
          monsters: [{ name: "Silver Lobo", count: 1 }],
          multisetKey: "Silver Lobo:1",
          pack: 1,
          slot: 0,
          resolved: true,
        },
      ],
    };

    saveState(state);
    const loaded = loadState();
    expect(loaded).toEqual(state);
  });

  it("exports and imports valid JSON state", () => {
    const state: AppState = {
      have: ["Silver Lobo"],
      want: ["Harvester"],
      history: [
        {
          id: "test-1",
          monsters: [{ name: "Silver Lobo", count: 1 }],
          multisetKey: "Silver Lobo:1",
          resolved: false,
        },
      ],
    };

    const exported = exportState(state);
    const imported = importState(exported);
    expect(imported).toEqual(state);
  });

  it("returns defaultState for invalid import JSON", () => {
    expect(importState("{ not json")).toEqual(defaultState);
  });

  it("sanitizes incomplete but valid import JSON", () => {
    const incomplete = JSON.stringify({
      have: ["Silver Lobo"],
      history: [{ monsters: [{ name: "Guard", count: 1 }] }],
    });

    const imported = importState(incomplete);
    expect(imported.have).toEqual(["Silver Lobo"]);
    expect(imported.want).toEqual([]);
    expect(imported.history).toHaveLength(1);
    expect(imported.history[0].monsters).toEqual([{ name: "Guard", count: 1 }]);
    expect(imported.history[0].id).toBeTruthy();
  });

  it("clears encounter history while keeping have and want lists", () => {
    const state: AppState = {
      have: ["Silver Lobo"],
      want: ["Harvester"],
      history: [
        {
          id: "1",
          monsters: [{ name: "Silver Lobo", count: 1 }],
          multisetKey: "Silver Lobo:1",
          resolved: true,
        },
      ],
    };

    const cleared = clearHistory(state);
    expect(cleared.have).toEqual(["Silver Lobo"]);
    expect(cleared.want).toEqual(["Harvester"]);
    expect(cleared.history).toEqual([]);
  });
});
