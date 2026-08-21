import type { EncounterEntry, MonsterCount, PositionState } from "./types";
import { matchMonstersInPack, matchMonstersToFormations } from "./matcher";
import { nextNonEmptyPack, prevNonEmptyPack } from "./rotation";

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

export function resolveHistoryEntries(
  history: EncounterEntry[]
): EncounterEntry[] {
  const resolved = history.map((entry) => ({ ...entry }));
  let candidatePacks: number[] | null = null;

  // 1. Forward candidate pass
  for (let i = 0; i < resolved.length; i++) {
    const entry = resolved[i];
    if (entry.resolved && entry.pack != null) {
      candidatePacks = [entry.pack];
    } else {
      candidatePacks = getPacksForObservation(entry.monsters, candidatePacks);
      if (candidatePacks.length === 1) {
        const pack = candidatePacks[0];
        const matches = matchMonstersInPack(pack, entry.monsters);
        if (matches.length > 0) {
          resolved[i].pack = pack;
          resolved[i].slot = matches[0].slot;
          resolved[i].resolved = true;
        }
      }
    }
  }

  // 2. Backward resolution pass to resolve prior ambiguous encounters
  for (let i = resolved.length - 1; i >= 1; i--) {
    if (resolved[i].resolved && resolved[i].pack != null) {
      if (!resolved[i - 1].resolved || resolved[i - 1].pack == null) {
        const prevPack = prevNonEmptyPack(resolved[i].pack!);
        const matches = matchMonstersInPack(prevPack, resolved[i - 1].monsters);
        if (matches.length > 0) {
          resolved[i - 1].pack = prevPack;
          resolved[i - 1].slot = matches[0].slot;
          resolved[i - 1].resolved = true;
        }
      }
    }
  }

  // 3. Forward propagation pass
  for (let i = 0; i < resolved.length - 1; i++) {
    if (resolved[i].resolved && resolved[i].pack != null) {
      if (!resolved[i + 1].resolved || resolved[i + 1].pack == null) {
        const nextPack = nextNonEmptyPack(resolved[i].pack!);
        const matches = matchMonstersInPack(nextPack, resolved[i + 1].monsters);
        if (matches.length > 0) {
          resolved[i + 1].pack = nextPack;
          resolved[i + 1].slot = matches[0].slot;
          resolved[i + 1].resolved = true;
        }
      }
    }
  }

  return resolved;
}

export function resolvePackCandidates(
  history: EncounterEntry[]
): PositionState {
  if (history.length === 0) {
    return { locked: false, currentPack: null, candidatePacks: [], resolvedHistory: [] };
  }

  const resolvedHistory = resolveHistoryEntries(history);
  let candidatePacks: number[] | null = null;

  for (const entry of resolvedHistory) {
    if (entry.resolved && entry.pack != null) {
      candidatePacks = [entry.pack];
      continue;
    }

    candidatePacks = getPacksForObservation(entry.monsters, candidatePacks);
  }

  if (candidatePacks === null || candidatePacks.length === 0) {
    return { locked: false, currentPack: null, candidatePacks: [], resolvedHistory };
  }

  const locked = candidatePacks.length === 1;

  return {
    locked,
    currentPack: locked ? candidatePacks[0] : null,
    candidatePacks,
    resolvedHistory,
  };
}

export function getCandidatePacksAfterHistory(
  history: EncounterEntry[]
): number[] | null {
  const state = resolvePackCandidates(history);
  return state.candidatePacks.length > 0 ? state.candidatePacks : null;
}

export function getCurrentPack(history: EncounterEntry[]): number | null {
  const state = resolvePackCandidates(history);
  if (!state.locked) return null;
  return state.currentPack;
}

