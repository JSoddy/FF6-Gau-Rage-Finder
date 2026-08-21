import formationData from "../../data/formations.json";
import type { Formation, FormationData } from "./types";
import { multisetKey } from "./multiset";

const data = formationData as FormationData;

export const formations: Formation[] = data.formations;
export const monsterNames: string[] = data.monsterNames;

const byPack = new Map<number, Formation[]>();
const byMultiset = new Map<string, Formation[]>();
const byPackSlot = new Map<string, Formation>();

for (const f of formations) {
  if (!byPack.has(f.pack)) byPack.set(f.pack, []);
  byPack.get(f.pack)!.push(f);

  if (!f.empty) {
    const key = f.multisetKey || multisetKey(f.monsters);
    if (!byMultiset.has(key)) byMultiset.set(key, []);
    byMultiset.get(key)!.push(f);
  }

  byPackSlot.set(`${f.pack}:${f.slot}`, f);
}

for (const packFormations of byPack.values()) {
  packFormations.sort((a, b) => a.slot - b.slot);
}

export function getPackFormations(pack: number): Formation[] {
  return byPack.get(pack) ?? [];
}

export function getFormation(pack: number, slot: number): Formation | undefined {
  return byPackSlot.get(`${pack}:${slot}`);
}

export function getFormationsByMultiset(key: string): Formation[] {
  return byMultiset.get(key) ?? [];
}

export function isPackAllEmpty(pack: number): boolean {
  return getPackFormations(pack).every((f) => f.empty);
}

export function getNonEmptyFormations(pack: number): Formation[] {
  return getPackFormations(pack).filter((f) => !f.empty);
}

export function packContainsMonster(pack: number, monster: string): boolean {
  return getNonEmptyFormations(pack).some((f) =>
    f.monsters.some((m) => m.name === monster)
  );
}
