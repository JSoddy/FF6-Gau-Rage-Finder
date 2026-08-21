import type { MonsterCount } from "../engine/types";

export function formatMonsters(monsters: MonsterCount[]): string {
  return monsters
    .map((m) => (m.count === 1 ? m.name : `${m.name} x${m.count}`))
    .join(", ");
}

export function mergeMonsterRows(
  rows: { monster: string; count: number }[]
): MonsterCount[] {
  const map = new Map<string, number>();
  for (const row of rows) {
    if (!row.monster) continue;
    map.set(row.monster, (map.get(row.monster) ?? 0) + row.count);
  }
  return [...map.entries()].map(([name, count]) => ({ name, count }));
}
