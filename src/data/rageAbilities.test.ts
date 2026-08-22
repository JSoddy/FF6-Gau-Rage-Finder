import { describe, expect, it } from "vitest";
import {
  RAGE_ABILITY_CATEGORIES,
  ALL_RAGE_ABILITIES,
} from "./rageAbilities";
import formations from "../../data/formations.json";

describe("rageAbilities data (Complete Compendium)", () => {
  it("should contain 4 primary categories", () => {
    expect(RAGE_ABILITY_CATEGORIES).toHaveLength(4);
    expect(RAGE_ABILITY_CATEGORIES[0].id).toBe("offensive-magic");
    expect(RAGE_ABILITY_CATEGORIES[1].id).toBe("physical-attacks");
    expect(RAGE_ABILITY_CATEGORIES[2].id).toBe("debuffs-status");
    expect(RAGE_ABILITY_CATEGORIES[3].id).toBe("defensive-support");
  });

  it("should contain all 124 canonical abilities across categories", () => {
    expect(ALL_RAGE_ABILITIES).toHaveLength(124);
  });

  it("should have valid non-empty fields for every ability", () => {
    for (const ability of ALL_RAGE_ABILITIES) {
      expect(ability.name.trim().length).toBeGreaterThan(0);
      expect(ability.effect.trim().length).toBeGreaterThan(0);
      expect(ability.monsters.trim().length).toBeGreaterThan(0);
    }
  });

  it("should cover all 256 selectable monsters from the Veldt tracker", () => {
    expect(formations.monsterNames).toHaveLength(256);

    function abilityMentionsMonster(
      monstersField: string,
      monsterName: string
    ): boolean {
      // Match as a discrete token so "Mu" does not match "Murussu"
      // and "Tonberry" does not match "Tonberries".
      const escaped = monsterName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`(^|[^\\w'])${escaped}(?=[^\\w']|$)`);
      return re.test(monstersField);
    }

    for (const monsterName of formations.monsterNames) {
      const isFound = ALL_RAGE_ABILITIES.some((a) =>
        abilityMentionsMonster(a.monsters, monsterName)
      );
      expect(
        isFound,
        `Expected monster "${monsterName}" to appear in rage abilities`
      ).toBe(true);
    }
  });

  it("should contain key iconic abilities in each category including Knife", () => {
    const names = new Set(ALL_RAGE_ABILITIES.map((a) => a.name));
    expect(names.has("Aqua Breath")).toBe(true);
    expect(names.has("Meltdown (Merton)")).toBe(true);
    expect(names.has("Shock")).toBe(true);
    expect(names.has("Catscratch (Cat Scratch)")).toBe(true);
    expect(names.has("Knife")).toBe(true);
    expect(names.has("Entice")).toBe(true);
    expect(names.has("White Wind")).toBe(true);
    expect(names.has("Mighty Guard")).toBe(true);
    expect(names.has("Disaster")).toBe(true);

    const knife = ALL_RAGE_ABILITIES.find((a) => a.name === "Knife");
    expect(knife?.monsters).toContain("Tonberries");

    const breakAbility = ALL_RAGE_ABILITIES.find((a) =>
      a.name.startsWith("Break")
    );
    expect(breakAbility?.monsters).toContain("Tonberry");
  });
});
