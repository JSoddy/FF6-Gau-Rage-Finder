import { useCallback, useEffect, useMemo, useState } from "react";
import type { EncounterEntry, Formation, MonsterCount } from "./engine/types";
import {
  findNextMatchingFormation,
  getNextFivePacks,
  getWantRageETAs,
} from "./engine/forecast";
import {
  getCandidatePacksAfterHistory,
  resolveObservation,
  resolvePackCandidates,
} from "./engine/locate";
import { multisetKey } from "./engine/multiset";
import { RageTable } from "./components/RageTable";
import { EncounterHistory } from "./components/EncounterHistory";
import { WantCountdown } from "./components/WantCountdown";
import { UpcomingPacks } from "./components/UpcomingPacks";
import { MonsterEntry } from "./components/MonsterEntry";
import {
  clearHistory,
  exportState,
  importState,
  loadState,
  saveState,
  type AppState,
} from "./storage/state";
import { createId } from "./utils/id";
import "./app.css";

function toSet(arr: string[]): Set<string> {
  return new Set(arr);
}

export default function App() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [showOnlyWant, setShowOnlyWant] = useState(false);
  const [entryError, setEntryError] = useState<string | null>(null);

  const have = useMemo(() => toSet(state.have), [state.have]);
  const want = useMemo(() => toSet(state.want), [state.want]);

  const position = useMemo(
    () => resolvePackCandidates(state.history),
    [state.history]
  );

  const currentPack = position.currentPack;

  const upcoming = useMemo(
    () => (currentPack != null ? getNextFivePacks(currentPack) : []),
    [currentPack]
  );

  const etas = useMemo(
    () =>
      currentPack != null ? getWantRageETAs(currentPack, want, have) : [],
    [currentPack, want, have]
  );

  useEffect(() => {
    saveState(state);
  }, [state]);

  const updateState = useCallback((patch: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  function toggleHave(name: string) {
    const next = new Set(state.have);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    updateState({ have: [...next] });
  }

  function toggleWant(name: string) {
    const next = new Set(state.want);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    updateState({ want: [...next] });
  }

  function appendEncounter(entry: Omit<EncounterEntry, "id">) {
    updateState({
      history: [...state.history, { ...entry, id: createId() }],
    });
  }

  function handleSubmitEncounter(monsters: MonsterCount[]) {
    setEntryError(null);

    if (position.locked && currentPack != null) {
      const match = findNextMatchingFormation(currentPack, monsters);
      if (!match) {
        setEntryError(
          "No matching formation found in the next pack rotation cycle."
        );
        return;
      }
      appendEncounter({
        monsters: match.formation.monsters,
        multisetKey: multisetKey(match.formation.monsters),
        pack: match.pack,
        slot: match.slot,
        resolved: true,
      });
      return;
    }

    const priorCandidates = getCandidatePacksAfterHistory(state.history);
    const result = resolveObservation(monsters, priorCandidates);

    if (result.candidatePacks.length === 0) {
      setEntryError("No matching formation found.");
      return;
    }

    appendEncounter({
      monsters,
      multisetKey: multisetKey(monsters),
      pack: result.pack,
      slot: result.slot,
      resolved: result.resolved,
    });
  }

  function handleSelectFormation(formation: Formation) {
    setEntryError(null);
    appendEncounter({
      monsters: formation.monsters,
      multisetKey: formation.multisetKey,
      pack: formation.pack,
      slot: formation.slot,
      resolved: true,
    });
  }

  function handleRemoveLast() {
    if (state.history.length === 0) return;
    updateState({ history: state.history.slice(0, -1) });
  }

  function handleClearHistory() {
    setState(clearHistory(state));
    setEntryError(null);
  }

  function handleExport() {
    const blob = new Blob([exportState(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ff6-rage-finder-state.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        try {
          JSON.parse(text);
        } catch {
          setEntryError("Invalid import file.");
          return;
        }
        setState(importState(text));
        setEntryError(null);
      };
      reader.readAsText(file);
    };
    input.click();
  }

  return (
    <div className="app">
      <header className="app-header">
        <img
          src="/assets/images/gau.webp"
          alt="Gau"
          className="app-header__gau"
        />
        <div className="app-header__text">
          <h1>FF6 Gau Rage Finder</h1>
          <p className="app-header__subtitle">
            Pixel Remaster Veldt pack tracker
          </p>
        </div>
      </header>

      <div className="app-panel">
        <div className="toolbar">
          <button type="button" onClick={handleClearHistory}>
            Clear history
          </button>
          <button type="button" onClick={handleExport}>
            Export
          </button>
          <button type="button" onClick={handleImport}>
            Import
          </button>
        </div>

        <RageTable
          have={have}
          want={want}
          showOnlyWant={showOnlyWant}
          onToggleHave={toggleHave}
          onToggleWant={toggleWant}
          onToggleFilter={() => setShowOnlyWant((v) => !v)}
        />

        <div className="middle-row">
          <div className="middle-row__main">
            <EncounterHistory
              history={position.resolvedHistory}
              onRemoveLast={handleRemoveLast}
            />
            {!position.locked && (
              <MonsterEntry
                onSubmit={handleSubmitEncounter}
                error={entryError}
                positionLocked={false}
              />
            )}
            {!position.locked && position.candidatePacks.length > 1 && (
              <p className="status-msg">
                {position.candidatePacks.length} possible packs — log another
                encounter to narrow down.
              </p>
            )}
          </div>
          <WantCountdown etas={etas} locked={position.locked} />
        </div>

        {position.locked && currentPack != null && (
          <>
            <UpcomingPacks
              packs={upcoming}
              have={have}
              onSelectFormation={handleSelectFormation}
            />
            <MonsterEntry
              onSubmit={handleSubmitEncounter}
              error={entryError}
              positionLocked
            />
          </>
        )}
      </div>

      <footer className="app-footer">
        <p>
          © 2026 James Soddy · MIT License · Fan project; Final Fantasy VI ©
          Square Enix
        </p>
      </footer>
    </div>
  );
}
