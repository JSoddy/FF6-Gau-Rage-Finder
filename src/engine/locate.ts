import type { EncounterEntry, MonsterCount, PositionState } from "./types";
import { matchMonstersInPack, matchMonstersToFormations } from "./matcher";
import { nextNonEmptyPack } from "./rotation";

export function getPacksForObservation(
  monsters: MonsterCount[],
  priorCandidatePacks: number[] | null
): number[] {
  const matches = matchMonstersToFormations(monsters);
  if (matches.length === 0) return [];

  if (priorCandidatePacks === null) {
    return [...new Set(matches.map((f) => f.pack))];
  }

  const nextPacks: number[] = [];
  for (const p of priorCandidatePacks) {
    const nextPack = nextNonEmptyPack(p);
    if (matchMonstersInPack(nextPack, monsters).length > 0) {
      nextPacks.push(nextPack);
    }
  }
  return [...new Set(nextPacks)];
}

export function resolveObservation(
  monsters: MonsterCount[],
  priorCandidatePacks: number[] | null
): {
  pack?: number;
  slot?: number;
  resolved: boolean;
  candidatePacks: number[];
} {
  const matches = matchMonstersToFormations(monsters);
  if (matches.length === 0) {
    return { resolved: false, candidatePacks: [] };
  }

  if (priorCandidatePacks === null) {
    const packs = [...new Set(matches.map((f) => f.pack))];
    if (packs.length === 1 && matches.length === 1) {
      return {
        pack: matches[0].pack,
        slot: matches[0].slot,
        resolved: true,
        candidatePacks: packs,
      };
    }
    return { resolved: false, candidatePacks: packs };
  }

  const candidatePacks = getPacksForObservation(monsters, priorCandidatePacks);
  const viable = matches.filter((m) => candidatePacks.includes(m.pack));

  if (viable.length === 1) {
    return {
      pack: viable[0].pack,
      slot: viable[0].slot,
      resolved: true,
      candidatePacks: [viable[0].pack],
    };
  }

  return { resolved: false, candidatePacks };
}

export function resolvePackCandidates(
  history: EncounterEntry[]
): PositionState {
  if (history.length === 0) {
    return { locked: false, currentPack: null, candidatePacks: [] };
  }

  let candidatePacks: number[] | null = null;

  for (const entry of history) {
    if (entry.resolved && entry.pack != null) {
      candidatePacks = [entry.pack];
      continue;
    }

    candidatePacks = getPacksForObservation(entry.monsters, candidatePacks);
  }

  if (candidatePacks === null || candidatePacks.length === 0) {
    return { locked: false, currentPack: null, candidatePacks: [] };
  }

  const locked = candidatePacks.length === 1;

  return {
    locked,
    currentPack: locked ? candidatePacks[0] : null,
    candidatePacks,
  };
}

export function getCandidatePacksAfterHistory(
  history: EncounterEntry[]
): number[] | null {
  if (history.length === 0) return null;

  let candidatePacks: number[] | null = null;

  for (const entry of history) {
    if (entry.resolved && entry.pack != null) {
      candidatePacks = [entry.pack];
    } else {
      candidatePacks = getPacksForObservation(entry.monsters, candidatePacks);
    }
  }

  return candidatePacks;
}

export function getCurrentPack(history: EncounterEntry[]): number | null {
  const state = resolvePackCandidates(history);
  if (!state.locked) return null;
  return state.currentPack;
}
