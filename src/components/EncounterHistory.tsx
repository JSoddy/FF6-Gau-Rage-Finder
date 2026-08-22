import type { EncounterEntry } from "../engine/types";
import { formatMonsters } from "../utils/format";

interface EncounterHistoryProps {
  history: EncounterEntry[];
  onRemoveLast: () => void;
}

export function EncounterHistory({ history, onRemoveLast }: EncounterHistoryProps) {
  return (
    <section className="encounter-history-section">
      <h2 className="encounter-history__heading">Encounter History</h2>
      {history.length === 0 ? (
        <div className="encounter-history">
          <p className="status-msg">No encounters logged yet.</p>
        </div>
      ) : (
        <div className="encounter-history">
          {history.map((entry, index) => (
            <div
              key={entry.id}
              className={`encounter-box${entry.resolved ? "" : " encounter-box--ambiguous"}`}
            >
              {index === history.length - 1 && (
                <button
                  type="button"
                  className="encounter-box__remove"
                  onClick={onRemoveLast}
                  title="Remove last encounter"
                  aria-label="Remove last encounter"
                >
                  ×
                </button>
              )}
              {entry.resolved && entry.pack != null && (
                <div className="encounter-box__meta">
                  Pack {entry.pack} · F{entry.slot}
                </div>
              )}
              {!entry.resolved && (
                <div className="encounter-box__meta">Unknown pack</div>
              )}
              <div>{formatMonsters(entry.monsters)}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
