export function VeldtGuide() {
  return (
    <div className="veldt-guide">
      <section className="guide-hero">
        <h2>How the Veldt &amp; Rages Work</h2>
        <p>
          In <em>Final Fantasy VI</em>, Gau&apos;s <strong>Rage</strong> ability
          allows him to unleash monster spells, attacks, elemental immunities,
          and status properties. Unlike traditional random encounters, the
          Veldt operates on an exact, sequential 64-pack queuing system.
          Understanding this rotation allows you to reliably hunt down the
          strongest rages in the game with minimal downtime.
        </p>
      </section>

      <div className="guide-grid">
        {/* The Veldt Encounter Pool */}
        <div className="guide-card">
          <div className="guide-card__header">
            <span className="guide-card__icon">🌿</span>
            <h3>The Veldt Encounter Pool</h3>
          </div>
          <ul className="guide-list">
            <li>
              <strong>The Unlock Rule:</strong> Enemies do not appear on the
              Veldt automatically by reaching story milestones. You must
              encounter a formation elsewhere in the world—either by{" "}
              <strong>defeating it or fleeing from it</strong>—to flag that
              group for your Veldt pool.
            </li>
            <li>
              <strong>Permanent Unlocks:</strong> Once unlocked, a monster
              formation remains in your Veldt pool permanently for the rest of
              the game.
            </li>
            <li>
              <strong>Missable Formations:</strong> Formations unique to
              one-time dungeons (such as the Magitek Research Facility,
              Imperial Camp, or Floating Continent) must be encountered before
              those areas are locked out or destroyed.
            </li>
          </ul>
        </div>

        {/* The 64-Pack Rotation Mechanic */}
        <div className="guide-card">
          <div className="guide-card__header">
            <span className="guide-card__icon">🔄</span>
            <h3>The 64-Pack Rotation Engine</h3>
          </div>
          <ul className="guide-list">
            <li>
              <strong>The 64-Pack Loop:</strong> All enemy formations in the
              game are mapped into 64 sequential packs (Pack 1 through Pack
              64).
            </li>
            <li>
              <strong>Linear Progression:</strong> Every time a battle on the
              Veldt ends—whether won or escaped—the internal pack pointer
              advances by <strong>+1</strong>. After Pack 64, it loops back to
              Pack 1.
            </li>
            <li>
              <strong>Pack Skipping:</strong> If you reach a pack where you have
              unlocked none of its possible formations, the game engine
              automatically skips it and immediately advances to the next pack
              in the sequence.
            </li>
            <li>
              <strong>Note on this tracker:</strong> The Veldt Tracker shows{" "}
              <em>all</em> non-empty formations in each pack, not only ones you
              have unlocked. Use it to plan ahead; the game may skip packs or
              slots you have not flagged elsewhere.
            </li>
            <li>
              <strong>The 8-Slot Roll:</strong> Each pack contains up to 8
              specific monster formations. When the game arrives at a pack, it
              rolls an RNG check among only the formations you have unlocked in
              that group.
            </li>
          </ul>
        </div>

        {/* Hunting & Manipulation Tactics */}
        <div className="guide-card guide-card--wide">
          <div className="guide-card__header">
            <span className="guide-card__icon">🎯</span>
            <h3>Hunting Tactics &amp; RNG Manipulation</h3>
          </div>
          <div className="guide-tactics-grid">
            <div className="tactic-item">
              <h4>⚡ The Fast-Forward Flee</h4>
              <p>
                You do not need to fight every battle. Fleeing immediately
                advances the pack counter by <strong>+1</strong>, allowing you
                to burn through unwanted packs in seconds without risking party
                health or wasting time.
              </p>
            </div>

            <div className="tactic-item">
              <h4>📍 Position Tracking</h4>
              <p>
                Because packs cycle in a strict numerical sequence, logging
                just 1–2 monster encounters in this tracker allows the engine to
                disambiguate formations and lock your exact current position in
                the 64-pack loop.
              </p>
            </div>

            <div className="tactic-item">
              <h4>💾 The Save &amp; Reload Strategy</h4>
              <p>
                Once this tracker shows you are 1–2 packs away from a desired
                formation, save your game on the overworld. Trigger the encounter
                on the Veldt; if the game rolls the wrong slot or a duplicate,
                reload your save.
              </p>
              <p style={{ marginTop: "0.5rem" }}>
                <strong>Post-Leap Safety Save:</strong> You can also save on
                the overworld immediately after Gau leaps. This ensures you can
                retrieve him safely without risk, stop the pack counter, or
                reload/reset the RNG seed if you want Gau to return during a
                specific high-priority formation.
              </p>
            </div>

            <div className="tactic-item">
              <h4>🎲 The Off-Veldt RNG Reshuffle</h4>
              <p>
                In the Pixel Remaster and classic versions, simply reloading a
                save can repeat the exact same RNG slot seed. To reroll the
                slot:
              </p>
              <ol className="tactic-steps">
                <li>Reload your save before the target pack.</li>
                <li>
                  Step off the Veldt and fight <strong>1 random encounter</strong>{" "}
                  on adjacent terrain (e.g. the plains near Crescent Mountain).
                </li>
                <li>
                  Step back onto the Veldt. The off-Veldt battle advances the RNG
                  seed <em>without</em> advancing the Veldt pack counter!
                </li>
              </ol>
            </div>

            <div className="tactic-item">
              <h4>🐾 Safe Gau Leaping &amp; Retrieval</h4>
              <p>
                When Gau uses <strong>Leap</strong>, he learns the rages from{" "}
                <em>both</em> the leap battle and the battle where he returns.
                To safely retrieve him without risking dangerous high-tier
                formations (like Trappers), flee unwanted packs until you hit an
                easy group (like Stray Cats or Leaf Bunnies), then defeat them to
                let Gau rejoin safely.
              </p>
            </div>
          </div>
        </div>

        {/* How to Use This Tracker */}
        <div className="guide-card guide-card--wide">
          <div className="guide-card__header">
            <span className="guide-card__icon">🗺️</span>
            <h3>How to Use This Tracker</h3>
          </div>
          <div className="guide-workflow-steps">
            <div className="workflow-step">
              <span className="workflow-step__num">1</span>
              <div>
                <strong>Mark Your Want List:</strong>
                <p>
                  Use the <em>Select High-Value</em> button on the tracker to
                  instantly flag the top 20 rages, or check individual rages you
                  want to hunt down.
                </p>
              </div>
            </div>

            <div className="workflow-step">
              <span className="workflow-step__num">2</span>
              <div>
                <strong>Log Encounters as You Fight:</strong>
                <p>
                  On the Veldt Tracker tab, select the monsters appearing in
                  your current battle. The tracker will narrow down candidate
                  packs until your position is locked.
                </p>
              </div>
            </div>

            <div className="workflow-step">
              <span className="workflow-step__num">3</span>
              <div>
                <strong>Follow the Forecast &amp; Countdowns:</strong>
                <p>
                  Once locked, click upcoming formations to advance the pack
                  pointer in one click. The <em>Want Countdown</em> sidebar shows
                  exactly how many encounters remain before your target rages
                  appear!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
