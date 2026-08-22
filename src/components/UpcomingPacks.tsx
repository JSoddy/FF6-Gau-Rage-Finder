import type { Formation } from "../engine/types";
import {
  formationHasUnearnedRage,
  formationHasWantedRage,
} from "../engine/forecast";

interface UpcomingPacksProps {
  packs: { pack: number; formations: Formation[] }[];
  have: Set<string>;
  want: Set<string>;
  onSelectFormation: (formation: Formation) => void;
}

function formationHighlightClass(
  formation: Formation,
  have: Set<string>,
  want: Set<string>
): string {
  if (formationHasWantedRage(formation, want, have)) {
    return " formation--wanted";
  }
  if (formationHasUnearnedRage(formation, have)) {
    return " formation--unearned";
  }
  return "";
}

export function UpcomingPacks({
  packs,
  have,
  want,
  onSelectFormation,
}: UpcomingPacksProps) {
  if (packs.length === 0) return null;

  return (
    <section className="upcoming-packs">
      <div className="upcoming-packs__header">
        <h2>Upcoming Packs</h2>
        <div className="formation-legend" aria-label="Formation highlight guide">
          <span className="formation-legend__item">
            <span className="formation-cell formation--unearned formation-legend__swatch">
              Unobtained Rages
            </span>
          </span>
          <span className="formation-legend__item">
            <span className="formation-cell formation--wanted formation-legend__swatch">
              Wanted Rages
            </span>
          </span>
        </div>
      </div>
      {packs.map(({ pack, formations }) => (
        <div key={pack} className="pack-row">
          <div className="pack-label">Pack {pack}</div>
          <div className="pack-formations">
            {formations.map((f) => (
              <button
                key={`${f.pack}-${f.slot}`}
                type="button"
                className={`formation-cell${formationHighlightClass(f, have, want)}`}
                onClick={() => onSelectFormation(f)}
                title="Click to log this as your next encounter"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
