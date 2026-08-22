import { useMemo, useState } from "react";
import { monsterNames } from "../engine/formations";
import {
  HIGH_VALUE_MONSTER_NAMES,
  HIGH_VALUE_RAGES,
} from "../data/highValueRages";

interface RageTableProps {
  have: Set<string>;
  want: Set<string>;
  showOnlyWant: boolean;
  onToggleHave: (name: string) => void;
  onToggleWant: (name: string) => void;
  onToggleFilter: () => void;
  onSelectAllHighValue?: () => void;
  onDeselectAllHighValue?: () => void;
}

export function RageTable({
  have,
  want,
  showOnlyWant,
  onToggleHave,
  onToggleWant,
  onToggleFilter,
  onSelectAllHighValue,
  onDeselectAllHighValue,
}: RageTableProps) {
  const [search, setSearch] = useState("");
  const [hideAcquired, setHideAcquired] = useState(false);

  const wantedHighValueCount = useMemo(
    () => HIGH_VALUE_MONSTER_NAMES.filter((name) => want.has(name)).length,
    [want]
  );

  const allHighValueWanted = wantedHighValueCount === HIGH_VALUE_RAGES.length;

  const names = useMemo(() => {
    let list = showOnlyWant
      ? monsterNames.filter((n) => want.has(n))
      : monsterNames;

    if (hideAcquired) {
      list = list.filter((n) => !have.has(n));
    }

    const query = search.trim().toLowerCase();
    if (query) {
      list = list.filter((n) => n.toLowerCase().includes(query));
    }

    return list;
  }, [showOnlyWant, hideAcquired, have, want, search]);

  return (
    <section>
      <div className="filter-row">
        <input
          type="search"
          className="rage-search"
          placeholder="Search rages…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={showOnlyWant}
            onChange={onToggleFilter}
          />{" "}
          Show only Want
        </label>
        <label>
          <input
            type="checkbox"
            checked={hideAcquired}
            onChange={(e) => setHideAcquired(e.target.checked)}
          />{" "}
          Hide acquired
        </label>
        {onSelectAllHighValue && (
          <button
            type="button"
            className="btn-select-high-value"
            onClick={
              allHighValueWanted
                ? onDeselectAllHighValue
                : onSelectAllHighValue
            }
          >
            {allHighValueWanted
              ? "Clear High-Value from Want"
              : `Select High-Value (${wantedHighValueCount}/${HIGH_VALUE_RAGES.length})`}
          </button>
        )}
      </div>
      <div className="rage-table-wrap">
        <table className="rage-table">
          <thead>
            <tr>
              <th>Monster / Rage</th>
              <th>Have</th>
              <th>Want</th>
            </tr>
          </thead>
          <tbody>
            {names.length === 0 ? (
              <tr>
                <td colSpan={3} className="rage-table__empty">
                  No rages match your search.
                </td>
              </tr>
            ) : (
              names.map((name) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Have ${name} rage`}
                      checked={have.has(name)}
                      onChange={() => onToggleHave(name)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Want ${name} rage`}
                      checked={want.has(name)}
                      onChange={() => onToggleWant(name)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
