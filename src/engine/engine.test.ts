import { describe, it, expect } from "vitest";
import { nextNonEmptyPack } from "./rotation";
import { isPackAllEmpty } from "./formations";
import {
  findNextMatchingFormation,
  getNextFivePacks,
  getWantRageETAs,
} from "./forecast";
import {
  resolveObservation,
  getPacksForObservation,
  resolvePackCandidates,
} from "./locate";
import { matchMonstersToFormations } from "./matcher";
import { getValidCountsForMonster, getNextMonsterOptions } from "./constraints";

describe("rotation", () => {
  it("skips all-None pack 49", () => {
    expect(isPackAllEmpty(49)).toBe(true);
    expect(nextNonEmptyPack(48)).toBe(50);
  });

  it("skips packs 55-56 after 54", () => {
    expect(nextNonEmptyPack(54)).toBe(57);
  });

  it("wraps from 64 to 1", () => {
    expect(nextNonEmptyPack(64)).toBe(1);
  });
});

describe("matcher", () => {
  it("matches Silver Lobo formation", () => {
    const matches = matchMonstersToFormations([{ name: "Silver Lobo", count: 1 }]);
    expect(matches.some((m) => m.pack === 1 && m.slot === 0)).toBe(true);
  });

  it("matches Harvester in pack 14", () => {
    const matches = matchMonstersToFormations([{ name: "Harvester", count: 1 }]);
    expect(matches.some((m) => m.pack === 14 && m.slot === 3)).toBe(true);
  });
});

describe("constraints", () => {
  it("limits counts for selected monster", () => {
    const partial = [{ name: "Silver Lobo", count: 1 }];
    const counts = getValidCountsForMonster(partial, "Silver Lobo");
    expect(counts).toContain(1);
  });

  it("filters next monsters when formation is complete", () => {
    const options = getNextMonsterOptions([
      { name: "Veil Dancer", count: 1 },
      { name: "Gobbledygook", count: 3 },
    ]);
    expect(options.length).toBe(0);
  });
});

describe("locate", () => {
  it("resolves unique formation on first observation", () => {
    const result = resolveObservation(
      [{ name: "Harvester", count: 1 }],
      null
    );
    expect(result.resolved).toBe(true);
    expect(result.pack).toBe(14);
    expect(result.slot).toBe(3);
  });

  it("filters by prior candidate packs on next observation", () => {
    const second = getPacksForObservation(
      [
        { name: "Leaf Bunny", count: 2 },
        { name: "Darkwind", count: 2 },
      ],
      [1]
    );
    expect(second).toEqual([2]);
  });
});

describe("forecast", () => {
  it("returns next five non-empty packs", () => {
    const packs = getNextFivePacks(12);
    expect(packs).toHaveLength(5);
    expect(packs.every((p) => p.formations.length > 0)).toBe(true);
  });

  it("finds next matching formation after current pack", () => {
    const result = findNextMatchingFormation(13, [
      { name: "Harvester", count: 1 },
    ]);
    expect(result).not.toBeNull();
    expect(result!.pack).toBeGreaterThan(13);
  });

  it("computes want rage ETAs with inNextFive flag", () => {
    const want = new Set(["Harvester"]);
    const have = new Set<string>();
    const etas = getWantRageETAs(13, want, have);
    expect(etas[0].rage).toBe("Harvester");
    expect(etas[0].encounters).toBe(1);
    expect(etas[0].inNextFive).toBe(true);
  });
});

describe("resolvePackCandidates", () => {
  it("locks after unique resolved entry", () => {
    const state = resolvePackCandidates([
      {
        id: "1",
        monsters: [{ name: "Harvester", count: 1 }],
        multisetKey: "Harvester:1",
        pack: 14,
        slot: 3,
        resolved: true,
      },
    ]);
    expect(state.locked).toBe(true);
    expect(state.currentPack).toBe(14);
  });
});
