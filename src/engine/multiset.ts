import type { MonsterCount, MonsterMultiset } from "./types";

export function toMultiset(monsters: MonsterCount[]): MonsterMultiset {
  const map: MonsterMultiset = new Map();
  for (const { name, count } of monsters) {
    map.set(name, (map.get(name) ?? 0) + count);
  }
  return map;
}

export function multisetKey(monsters: MonsterCount[]): string {
  return [...toMultiset(monsters).entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, count]) => `${name}:${count}`)
    .join("|");
}

export function multisetEquals(a: MonsterCount[], b: MonsterCount[]): boolean {
  return multisetKey(a) === multisetKey(b);
}

export function isSubset(partial: MonsterCount[], full: MonsterCount[]): boolean {
  const partialMap = toMultiset(partial);
  const fullMap = toMultiset(full);
  for (const [name, count] of partialMap) {
    if ((fullMap.get(name) ?? 0) < count) return false;
  }
  return true;
}

export function multisetToArray(map: MonsterMultiset): MonsterCount[] {
  return [...map.entries()].map(([name, count]) => ({ name, count }));
}
