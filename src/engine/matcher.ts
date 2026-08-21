import type { MonsterCount, Formation } from "./types";
import {
  formations,
  getFormationsByMultiset,
  getNonEmptyFormations,
} from "./formations";
import { isSubset, multisetEquals, multisetKey } from "./multiset";

export function matchMonstersToFormations(
  monsters: MonsterCount[]
): Formation[] {
  return getFormationsByMultiset(multisetKey(monsters));
}

export function matchMonstersInPack(
  pack: number,
  monsters: MonsterCount[]
): Formation[] {
  return getNonEmptyFormations(pack).filter((f) =>
    multisetEquals(f.monsters, monsters)
  );
}

export function getCompatibleFormations(
  partial: MonsterCount[]
): Formation[] {
  if (partial.length === 0) {
    return formations.filter((f) => !f.empty);
  }
  return formations.filter(
    (f) => !f.empty && isSubset(partial, f.monsters)
  );
}

export function isCompleteMatch(partial: MonsterCount[]): Formation | null {
  const matches = matchMonstersToFormations(partial);
  return matches.length === 1 ? matches[0] : null;
}

