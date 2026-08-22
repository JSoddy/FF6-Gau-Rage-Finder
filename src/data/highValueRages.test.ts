import { describe, expect, it } from "vitest";
import { HIGH_VALUE_RAGES, HIGH_VALUE_MONSTER_NAMES } from "./highValueRages";
import { monsterNames } from "../engine/formations";

describe("highValueRages data", () => {
  it("should contain exactly 20 high-value rages", () => {
    expect(HIGH_VALUE_RAGES).toHaveLength(20);
    expect(HIGH_VALUE_MONSTER_NAMES).toHaveLength(20);
  });

  it("should have all monster names match canonical formations monsterNames", () => {
    const validMonsterSet = new Set(monsterNames);
    for (const rage of HIGH_VALUE_RAGES) {
      expect(
        validMonsterSet.has(rage.monster),
        `Monster "${rage.monster}" must exist in monsterNames`
      ).toBe(true);
    }
  });

  it("should have non-empty fields for each high-value rage", () => {
    for (const rage of HIGH_VALUE_RAGES) {
      expect(rage.monster.trim().length).toBeGreaterThan(0);
      expect(rage.displayName.trim().length).toBeGreaterThan(0);
      expect(rage.firstEncounter.trim().length).toBeGreaterThan(0);
      expect(rage.ability.trim().length).toBeGreaterThan(0);
      expect(rage.roleImpact.trim().length).toBeGreaterThan(0);
    }
  });

  it("should not contain duplicate monsters in the high-value list", () => {
    const uniqueMonsters = new Set(HIGH_VALUE_MONSTER_NAMES);
    expect(uniqueMonsters.size).toBe(20);
  });

  it("should correctly add all high-value monsters to a want set while preserving existing want entries", () => {
    const initialWant = new Set(["Silver Lobo", "Guard"]);
    const updatedWant = new Set(initialWant);
    for (const name of HIGH_VALUE_MONSTER_NAMES) {
      updatedWant.add(name);
    }

    expect(updatedWant.has("Silver Lobo")).toBe(true);
    expect(updatedWant.has("Guard")).toBe(true);
    for (const name of HIGH_VALUE_MONSTER_NAMES) {
      expect(updatedWant.has(name)).toBe(true);
    }
    expect(updatedWant.size).toBe(22);
  });

  it("should correctly remove all high-value monsters from a want set while preserving other want entries", () => {
    const want = new Set(["Silver Lobo", ...HIGH_VALUE_MONSTER_NAMES]);
    for (const name of HIGH_VALUE_MONSTER_NAMES) {
      want.delete(name);
    }

    expect(want.has("Silver Lobo")).toBe(true);
    expect(want.size).toBe(1);
  });
});

