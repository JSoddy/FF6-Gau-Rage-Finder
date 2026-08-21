import type { EncounterEntry } from "../engine/types";

const STORAGE_KEY = "ff6-rage-finder-state";

export interface AppState {
  have: string[];
  want: string[];
  history: EncounterEntry[];
}

const defaultState: AppState = {
  have: [],
  want: [],
  history: [],
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw) as AppState;
    return {
      have: parsed.have ?? [],
      want: parsed.want ?? [],
      history: parsed.history ?? [],
    };
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
  const parsed = JSON.parse(json) as AppState;
  return {
    have: parsed.have ?? [],
    want: parsed.want ?? [],
    history: parsed.history ?? [],
  };
}

export function clearHistory(state: AppState): AppState {
  return { ...state, history: [] };
}

export function reloadSave(state: AppState): AppState {
  return { ...state, history: [] };
}

export function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
