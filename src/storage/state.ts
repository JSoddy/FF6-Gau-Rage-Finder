import type { EncounterEntry, MonsterCount } from "../engine/types";
import { multisetKey } from "../engine/multiset";

const STORAGE_KEY = "ff6-rage-finder-state";

export interface AppState {
  have: string[];
  want: string[];
  history: EncounterEntry[];
}

export const defaultState: AppState = {
  have: [],
  want: [],
  history: [],
};

export function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function sanitizeStringArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) return [];
  return arr.filter((item): item is string => typeof item === "string");
}

function sanitizeMonsters(monsters: unknown): MonsterCount[] {
  if (!Array.isArray(monsters)) return [];
  const result: MonsterCount[] = [];
  for (const m of monsters) {
    if (m && typeof m === "object" && typeof (m as { name?: unknown }).name === "string") {
      const name = (m as { name: string }).name.trim();
      if (!name) continue;
      const countRaw = (m as { count?: unknown }).count;
      const count = typeof countRaw === "number" && countRaw > 0 ? Math.floor(countRaw) : 1;
      result.push({ name, count });
    }
  }
  return result;
}

function sanitizeHistory(history: unknown): EncounterEntry[] {
  if (!Array.isArray(history)) return [];
  const result: EncounterEntry[] = [];
  for (const entry of history) {
    if (!entry || typeof entry !== "object") continue;
    const entryObj = entry as Record<string, unknown>;
    const monsters = sanitizeMonsters(entryObj.monsters);
    if (monsters.length === 0) continue;

    const id = typeof entryObj.id === "string" && entryObj.id ? entryObj.id : createId();
    const key = typeof entryObj.multisetKey === "string" && entryObj.multisetKey
      ? entryObj.multisetKey
      : multisetKey(monsters);
    const resolved = Boolean(entryObj.resolved);
    const pack = typeof entryObj.pack === "number" && Number.isInteger(entryObj.pack)
      ? entryObj.pack
      : undefined;
    const slot = typeof entryObj.slot === "number" && Number.isInteger(entryObj.slot)
      ? entryObj.slot
      : undefined;

    result.push({
      id,
      monsters,
      multisetKey: key,
      resolved,
      ...(pack !== undefined ? { pack } : {}),
      ...(slot !== undefined ? { slot } : {}),
    });
  }
  return result;
}

export function sanitizeState(input: unknown): AppState {
  if (!input || typeof input !== "object") {
    return { ...defaultState };
  }
  const obj = input as Record<string, unknown>;
  return {
    have: sanitizeStringArray(obj.have),
    want: sanitizeStringArray(obj.want),
    history: sanitizeHistory(obj.history),
  };
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);
    return sanitizeState(parsed);
  } catch {
    return { ...defaultState };
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportState(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function importState(json: string): AppState {
  const parsed = JSON.parse(json);
  return sanitizeState(parsed);
}

export function clearHistory(state: AppState): AppState {
  return { ...state, history: [] };
}
