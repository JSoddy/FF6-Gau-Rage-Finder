import {
  HIGH_VALUE_RAGES,
  type HighValueRage,
} from "../data/highValueRages";

export function RageGuide() {
  return (
    <div className="guide-view">
      <section className="guide-hero">
        <h2>High-Value Rages Guide</h2>
        <p>
          While Gau has access to 255 rages in <em>Final Fantasy VI</em>, this
          page is a curated collection of generally useful, powerful attacks
          that provide game-changing damage spikes, rare utility, and end-game
          dominance. You can quickly add these rages to your tracker using the{" "}
          <strong>Select High-Value</strong> button on the Veldt Tracker page.
        </p>
        <p className="guide-hero__note">
          📖 <strong>Deep Dive:</strong> For more complete information—including
          elemental resistances, status immunities, and other benefits from
          using specific rages—check out{" "}
          <a
            href="https://gamefaqs.gamespot.com/snes/554041-final-fantasy-iii/faqs/35118"
            target="_blank"
            rel="noopener noreferrer"
          >
            Djibriel&apos;s Rage Guide on GameFAQs
          </a>
          .
        </p>
      </section>

      <div className="guide-table-wrap">
        <table className="guide-table">
          <thead>
            <tr>
              <th style={{ minWidth: "160px" }}>Monster</th>
              <th style={{ minWidth: "220px" }}>First Encounter Opportunity</th>
              <th style={{ minWidth: "160px" }}>Ability / Effect</th>
              <th>Role &amp; Tactical Impact</th>
            </tr>
          </thead>
          <tbody>
            {HIGH_VALUE_RAGES.map((rage: HighValueRage) => (
              <tr key={rage.monster} className="guide-row">
                <td className="guide-cell__monster">
                  <strong>{rage.displayName}</strong>
                </td>
                <td className="guide-cell__encounter">
                  <span className="guide-tag">{rage.firstEncounter}</span>
                </td>
                <td className="guide-cell__ability">
                  <span className="guide-ability-badge">{rage.ability}</span>
                </td>
                <td className="guide-cell__impact">{rage.roleImpact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
