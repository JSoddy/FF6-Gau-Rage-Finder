import type { MonsterCount } from "../engine/types";

export function formatMonsters(monsters: MonsterCount[]): string {
  return monsters
    .map((m) => (m.count === 1 ? m.name : `${m.name} x${m.count}`))
    .join(", ");
}

