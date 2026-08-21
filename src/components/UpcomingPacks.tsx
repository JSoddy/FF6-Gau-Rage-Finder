import type { Formation } from "../engine/types";
import { formationHasUnearnedRage } from "../engine/forecast";

interface UpcomingPacksProps {
  packs: { pack: number; formations: Formation[] }[];
  have: Set<string>;
  onSelectFormation: (formation: Formation) => void;
}

export function UpcomingPacks({
  packs,
  have,
  onSelectFormation,
}: UpcomingPacksProps) {
  if (packs.length === 0) return null;

  return (
    <section className="upcoming-packs">
      <h2>Upcoming Packs</h2>
      {packs.map(({ pack, formations }) => (
        <div key={pack} className="pack-row">
          <div className="pack-label">Pack {pack}</div>
          <div className="pack-formations">
            {formations.map((f) => {
              const unearned = formationHasUnearnedRage(f, have);
              return (
                <button
                  key={`${f.pack}-${f.slot}`}
                  type="button"
                  className={`formation-cell${unearned ? " formation--unearned" : ""}`}
                  onClick={() => onSelectFormation(f)}
                  title="Click to log this as your next encounter"
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
