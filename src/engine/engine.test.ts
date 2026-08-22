import { describe, it, expect } from "vitest";
import { nextNonEmptyPack, prevNonEmptyPack, advancePacks } from "./rotation";
import { isPackAllEmpty, getFormation, packContainsMonster } from "./formations";
import {
  findNextMatchingFormation,
  getNextFivePacks,
  getWantRageETAs,
  formationHasUnearnedRage,
  formationHasWantedRage,
} from "./forecast";
import {
  resolveObservation,
  getPacksForObservation,
  resolvePackCandidates,
  getCandidatePacksAfterHistory,
  getCurrentPack,
} from "./locate";
import { matchMonstersToFormations, matchMonstersInPack, isCompleteMatch } from "./matcher";
import { getValidCountsForMonster, getNextMonsterOptions } from "./constraints";
import { toMultiset, multisetKey, multisetEquals, isSubset } from "./multiset";

describe("rotation", () => {
  it("skips all-None pack 49 forward and backward", () => {
    expect(isPackAllEmpty(49)).toBe(true);
    expect(nextNonEmptyPack(48)).toBe(50);
    expect(prevNonEmptyPack(50)).toBe(48);
  });

  it("skips packs 55-56 after 54", () => {
    expect(nextNonEmptyPack(54)).toBe(57);
    expect(prevNonEmptyPack(57)).toBe(54);
  });

  it("wraps from 64 to 1 and 1 to 61 (last non-empty pack)", () => {
    expect(nextNonEmptyPack(64)).toBe(1);
    expect(prevNonEmptyPack(1)).toBe(61);
  });

  it("advances multiple non-empty packs", () => {
    expect(advancePacks(1, 3)).toBe(4);
    expect(advancePacks(48, 2)).toBe(51);
  });
});

describe("multiset", () => {
  it("creates multiset map with accumulated counts", () => {
    const map = toMultiset([
      { name: "Silver Lobo", count: 1 },
      { name: "Silver Lobo", count: 2 },
    ]);
    expect(map.get("Silver Lobo")).toBe(3);
  });

  it("produces deterministic multiset key regardless of item order", () => {
    const key1 = multisetKey([
      { name: "Guard", count: 2 },
      { name: "Silver Lobo", count: 1 },
    ]);
    const key2 = multisetKey([
      { name: "Silver Lobo", count: 1 },
      { name: "Guard", count: 2 },
    ]);
    expect(key1).toBe("Guard:2|Silver Lobo:1");
    expect(key1).toBe(key2);
    expect(multisetEquals(
      [{ name: "Guard", count: 2 }, { name: "Silver Lobo", count: 1 }],
      [{ name: "Silver Lobo", count: 1 }, { name: "Guard", count: 2 }]
    )).toBe(true);
  });

  it("evaluates isSubset correctly", () => {
    const partial = [{ name: "Silver Lobo", count: 1 }];
    const full = [
      { name: "Silver Lobo", count: 2 },
      { name: "Guard Leader", count: 1 },
    ];
    expect(isSubset(partial, full)).toBe(true);
    expect(isSubset([{ name: "Silver Lobo", count: 3 }], full)).toBe(false);
    expect(isSubset([{ name: "Foper", count: 1 }], full)).toBe(false);
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

  it("matches monsters in a specific pack", () => {
    const matches = matchMonstersInPack(1, [{ name: "Silver Lobo", count: 1 }]);
    expect(matches).toHaveLength(1);
    expect(matches[0].slot).toBe(0);
  });

  it("returns single unique complete match", () => {
    const match = isCompleteMatch([{ name: "Harvester", count: 1 }]);
    expect(match).not.toBeNull();
    expect(match!.pack).toBe(14);
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

  it("filters candidate packs by prior candidate packs on next observation", () => {
    const packs = getPacksForObservation(
      [
        { name: "Leaf Bunny", count: 2 },
        { name: "Darkwind", count: 2 },
      ],
      [1, 14]
    );
    expect(packs).toEqual([2]);
  });

  it("returns empty candidate array for invalid / nonexistent monster combination", () => {
    const result = resolveObservation(
      [{ name: "Nonexistent Monster", count: 1 }],
      null
    );
    expect(result.resolved).toBe(false);
    expect(result.candidatePacks).toEqual([]);
  });
});

describe("retroactive history resolution", () => {
  it("retroactively resolves earlier unresolved encounters once subsequent position is locked", () => {
    // Suppose entry1 was previously unresolved
    const entry1 = {
      id: "1",
      monsters: [{ name: "Silver Lobo", count: 1 }],
      multisetKey: "Silver Lobo:1",
      resolved: false,
    };
    // entry2 is in Pack 2 slot 0
    const entry2 = {
      id: "2",
      monsters: [
        { name: "Leaf Bunny", count: 2 },
        { name: "Darkwind", count: 2 },
      ],
      multisetKey: "Darkwind:2|Leaf Bunny:2",
      pack: 2,
      slot: 0,
      resolved: true,
    };

    const state = resolvePackCandidates([entry1, entry2]);
    expect(state.locked).toBe(true);
    expect(state.currentPack).toBe(2);

    // Check retroactively resolved history: entry 1 was Pack 1 Slot 0
    expect(state.resolvedHistory[0].resolved).toBe(true);
    expect(state.resolvedHistory[0].pack).toBe(1);
    expect(state.resolvedHistory[0].slot).toBe(0);

    expect(state.resolvedHistory[1].resolved).toBe(true);
    expect(state.resolvedHistory[1].pack).toBe(2);
    expect(state.resolvedHistory[1].slot).toBe(0);
  });

  it("returns empty state for empty history", () => {
    const state = resolvePackCandidates([]);
    expect(state.locked).toBe(false);
    expect(state.currentPack).toBeNull();
    expect(state.candidatePacks).toEqual([]);
    expect(state.resolvedHistory).toEqual([]);
  });

  it("getCandidatePacksAfterHistory and getCurrentPack return expected values", () => {
    expect(getCandidatePacksAfterHistory([])).toBeNull();
    expect(getCurrentPack([])).toBeNull();

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

describe("forecast", () => {
  it("returns next five non-empty packs", () => {
    const packs = getNextFivePacks(12);
    expect(packs).toHaveLength(5);
    expect(packs.every((p) => p.formations.length > 0)).toBe(true);
  });

  it("finds next matching formation after current pack including wraparound", () => {
    const result = findNextMatchingFormation(13, [
      { name: "Harvester", count: 1 },
    ]);
    expect(result).not.toBeNull();
    expect(result!.pack).toBe(14);

    // Wraparound search: from pack 15 to pack 1
    const wrapResult = findNextMatchingFormation(15, [
      { name: "Silver Lobo", count: 1 },
    ]);
    expect(wrapResult).not.toBeNull();
    expect(wrapResult!.pack).toBe(1);

    // Non-existent formation returns null
    const noMatch = findNextMatchingFormation(1, [
      { name: "Nonexistent Monster", count: 99 },
    ]);
    expect(noMatch).toBeNull();
  });

  it("computes want rage ETAs with inNextFive flag", () => {
    const want = new Set(["Harvester", "Nonexistent Monster"]);
    const have = new Set<string>();
    const etas = getWantRageETAs(13, want, have);
    expect(etas[0].rage).toBe("Harvester");
    expect(etas[0].encounters).toBe(1);
    expect(etas[0].inNextFive).toBe(true);

    const missing = etas.find((e) => e.rage === "Nonexistent Monster");
    expect(missing?.encounters).toBeNull();
    expect(missing?.inNextFive).toBe(false);
  });

  it("checks if formation contains unearned or wanted rage", () => {
    const formation = getFormation(1, 0)!;
    expect(formationHasUnearnedRage(formation, new Set())).toBe(true);
    expect(formationHasUnearnedRage(formation, new Set(["Silver Lobo"]))).toBe(false);
    expect(
      formationHasWantedRage(formation, new Set(["Silver Lobo"]), new Set())
    ).toBe(true);
    expect(
      formationHasWantedRage(
        formation,
        new Set(["Silver Lobo"]),
        new Set(["Silver Lobo"])
      )
    ).toBe(false);
  });

  it("checks if pack contains a monster", () => {
    expect(packContainsMonster(1, "Silver Lobo")).toBe(true);
    expect(packContainsMonster(1, "Harvester")).toBe(false);
  });
});

