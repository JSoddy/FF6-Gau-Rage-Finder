import { useMemo, useState } from "react";
import { monsterNames } from "../engine/formations";

interface RageTableProps {
  have: Set<string>;
  want: Set<string>;
  showOnlyWant: boolean;
  onToggleHave: (name: string) => void;
  onToggleWant: (name: string) => void;
  onToggleFilter: () => void;
}

export function RageTable({
  have,
  want,
  showOnlyWant,
  onToggleHave,
  onToggleWant,
  onToggleFilter,
}: RageTableProps) {
  const [search, setSearch] = useState("");

  const names = useMemo(() => {
    let list = showOnlyWant
      ? monsterNames.filter((n) => want.has(n))
      : monsterNames;

    const query = search.trim().toLowerCase();
    if (query) {
      list = list.filter((n) => n.toLowerCase().includes(query));
    }

    return list;
  }, [showOnlyWant, want, search]);

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
                      checked={have.has(name)}
                      onChange={() => onToggleHave(name)}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
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
