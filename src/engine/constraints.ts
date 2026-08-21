import type { MonsterCount, Formation } from "./types";
import { getCompatibleFormations } from "./matcher";

export function getCompatibleFormationsForPartial(
  partial: MonsterCount[]
): Formation[] {
  return getCompatibleFormations(partial);
}

export function getNextMonsterOptions(
  partial: MonsterCount[]
): string[] {
  const compatible = getCompatibleFormations(partial);
  const partialMap = new Map(partial.map((m) => [m.name, m.count]));
  const names = new Set<string>();

  for (const f of compatible) {
    for (const m of f.monsters) {
      const used = partialMap.get(m.name) ?? 0;
      if (used < m.count) names.add(m.name);
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b));
}

export function getValidCountsForMonster(
  partial: MonsterCount[],
  monster: string
): number[] {
  const compatible = getCompatibleFormations(partial);
  const partialMap = new Map(partial.map((m) => [m.name, m.count]));
  const used = partialMap.get(monster) ?? 0;
  const counts = new Set<number>();

  for (const f of compatible) {
    const fm = f.monsters.find((m) => m.name === monster);
    if (fm) {
      for (let c = 1; c <= fm.count - used; c++) {
        counts.add(c);
      }
    }
  }

  return [...counts].sort((a, b) => a - b);
}
