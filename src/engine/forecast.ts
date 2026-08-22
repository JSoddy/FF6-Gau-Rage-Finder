import type {
  MonsterCount,
  PackForecast,
  WantRageETA,
} from "./types";
import {
  getNonEmptyFormations,
  packContainsMonster,
} from "./formations";
import { matchMonstersInPack } from "./matcher";
import { nextNonEmptyPack } from "./rotation";

export function getNextFivePacks(currentPack: number): PackForecast[] {
  const result: PackForecast[] = [];
  let p = currentPack;
  for (let i = 0; i < 5; i++) {
    p = nextNonEmptyPack(p);
    result.push({
      pack: p,
      formations: getNonEmptyFormations(p),
    });
  }
  return result;
}

export function findNextMatchingFormation(
  currentPack: number,
  monsters: MonsterCount[]
): { pack: number; slot: number; formation: import("./types").Formation } | null {
  let p = currentPack;
  for (let i = 0; i < 64; i++) {
    p = nextNonEmptyPack(p);
    const matches = matchMonstersInPack(p, monsters);
    if (matches.length > 0) {
      return { pack: p, slot: matches[0].slot, formation: matches[0] };
    }
  }
  return null;
}

export function getWantRageETAs(
  currentPack: number,
  want: Set<string>,
  have: Set<string>
): WantRageETA[] {
  const wanted = [...want].filter((r) => !have.has(r));
  const etas: WantRageETA[] = [];

  for (const rage of wanted) {
    let p = currentPack;
    let found: number | null = null;

    for (let step = 1; step <= 64; step++) {
      p = nextNonEmptyPack(p);
      if (packContainsMonster(p, rage)) {
        found = step;
        break;
      }
    }

    etas.push({
      rage,
      encounters: found,
      inNextFive: found !== null && found <= 5,
    });
  }

  return etas.sort((a, b) => {
    if (a.encounters === null) return 1;
    if (b.encounters === null) return -1;
    return a.encounters - b.encounters;
  });
}

export function formationHasUnearnedRage(
  formation: import("./types").Formation,
  have: Set<string>
): boolean {
  return formation.monsters.some((m) => !have.has(m.name));
}

export function formationHasWantedRage(
  formation: import("./types").Formation,
  want: Set<string>,
  have: Set<string>
): boolean {
  return formation.monsters.some(
    (m) => want.has(m.name) && !have.has(m.name)
  );
}
