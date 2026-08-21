export interface MonsterCount {
  name: string;
  count: number;
}

export interface Formation {
  pack: number;
  slot: number;
  label: string;
  monsters: MonsterCount[];
  empty: boolean;
  multisetKey: string;
}

export interface FormationData {
  formations: Formation[];
  monsterNames: string[];
}

export interface EncounterEntry {
  id: string;
  monsters: MonsterCount[];
  multisetKey: string;
  pack?: number;
  slot?: number;
  resolved: boolean;
}

export interface PackForecast {
  pack: number;
  formations: Formation[];
}

export interface WantRageETA {
  rage: string;
  encounters: number | null;
  inNextFive: boolean;
}

export interface PositionState {
  locked: boolean;
  currentPack: number | null;
  candidatePacks: number[];
  resolvedHistory: EncounterEntry[];
}

export type MonsterMultiset = Map<string, number>;
