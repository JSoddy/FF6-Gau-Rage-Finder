import type { WantRageETA } from "../engine/types";

interface WantCountdownProps {
  etas: WantRageETA[];
  locked: boolean;
}

export function WantCountdown({ etas, locked }: WantCountdownProps) {
  return (
    <aside className="want-sidebar">
      <h2>Upcoming Wanted Rages</h2>
      <div className="want-sidebar__body">
        {!locked && (
          <p className="status-msg">Lock your position to see countdowns.</p>
        )}
        {locked && etas.length === 0 && (
          <p className="status-msg">No wanted rages remaining.</p>
        )}
        {locked &&
          etas.map((eta) => (
            <div
              key={eta.rage}
              className={`want-rage-item${eta.inNextFive ? " want-rage--soon" : ""}`}
            >
              {eta.rage} —{" "}
              {eta.encounters === null
                ? "not in rotation"
                : `~${eta.encounters} encounter${eta.encounters === 1 ? "" : "s"}`}
            </div>
          ))}
      </div>
    </aside>
  );
}
