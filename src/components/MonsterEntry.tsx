import { useMemo, useState } from "react";
import type { MonsterCount } from "../engine/types";
import {
  getNextMonsterOptions,
  getValidCountsForMonster,
} from "../engine/constraints";
import { isCompleteMatch } from "../engine/matcher";
import { createId } from "../utils/id";

interface MonsterRow {
  id: string;
  monster: string;
  count: number;
}

interface MonsterEntryProps {
  onSubmit: (monsters: MonsterCount[]) => void;
  error?: string | null;
  positionLocked?: boolean;
}

function createInitialRow(): MonsterRow {
  return { id: createId(), monster: "", count: 1 };
}

function rowsToPartial(rows: MonsterRow[], excludeId?: string): MonsterCount[] {
  const map = new Map<string, number>();
  for (const row of rows) {
    if (row.id === excludeId || !row.monster) continue;
    map.set(row.monster, (map.get(row.monster) ?? 0) + row.count);
  }
  return [...map.entries()].map(([name, count]) => ({ name, count }));
}

export function MonsterEntry({ onSubmit, error, positionLocked = false }: MonsterEntryProps) {
  const [rows, setRows] = useState<MonsterRow[]>([createInitialRow()]);

  const partial = useMemo(() => rowsToPartial(rows), [rows]);

  const complete = useMemo(
    () => (partial.length > 0 ? isCompleteMatch(partial) : null),
    [partial]
  );

  function updateRow(id: string, patch: Partial<MonsterRow>) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );
  }

  function addRow() {
    setRows((prev) => [...prev, createInitialRow()]);
  }

  function removeRow(id: string) {
    setRows((prev) => {
      const next = prev.filter((r) => r.id !== id);
      return next.length > 0 ? next : [createInitialRow()];
    });
  }

  function handleSubmit() {
    if (partial.length === 0) return;
    onSubmit(partial);
    setRows([createInitialRow()]);
  }

  return (
    <div className="monster-entry">
      <h3>Current Encounter</h3>
      <p className="monster-entry__hint">
        {positionLocked
          ? "Enter your encounter or select one from the packs above."
          : "Enter monsters from your current fight to lock your position."}
      </p>
      {rows.map((row) => {
        const partialBefore = rowsToPartial(rows, row.id);
        const monsterOptions = getNextMonsterOptions(partialBefore);
        if (row.monster && !monsterOptions.includes(row.monster)) {
          monsterOptions.unshift(row.monster);
        }
        monsterOptions.sort((a, b) => a.localeCompare(b));
        const rawCounts = row.monster
          ? getValidCountsForMonster(partialBefore, row.monster)
          : [1];
        const countOptions = rawCounts.length > 0 ? rawCounts : [1];

        return (
          <div key={row.id} className="monster-row">
            <select
              aria-label="Select monster"
              value={row.monster}
              onChange={(e) => {
                const monster = e.target.value;
                const counts = monster
                  ? getValidCountsForMonster(partialBefore, monster)
                  : [1];
                const validCounts = counts.length > 0 ? counts : [1];
                updateRow(row.id, { monster, count: validCounts[0] ?? 1 });
              }}
            >
              <option value="">Select monster…</option>
              {monsterOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              aria-label="Select monster count"
              value={row.count}
              disabled={!row.monster}
              onChange={(e) =>
                updateRow(row.id, { count: parseInt(e.target.value, 10) })
              }
            >
              {countOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {rows.length > 1 && (
              <button
                type="button"
                aria-label="Remove monster row"
                onClick={() => removeRow(row.id)}
              >
                Remove
              </button>
            )}
          </div>
        );
      })}
      <div className="entry-actions">
        <button type="button" onClick={addRow}>
          + Add monster
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={partial.length === 0}
        >
          Submit encounter
        </button>
      </div>
      {complete && (
        <p className="status-msg">
          Matches: Pack {complete.pack}, Formation {complete.slot} ({complete.label})
        </p>
      )}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}

