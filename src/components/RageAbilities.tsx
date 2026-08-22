import { useMemo, useState } from "react";
import {
  RAGE_ABILITY_CATEGORIES,
  type AbilityCategory,
} from "../data/rageAbilities";

export function RageAbilities() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return RAGE_ABILITY_CATEGORIES.map((cat: AbilityCategory) => {
      // If user selected a specific category, filter out other categories
      if (activeCategory !== "all" && cat.id !== activeCategory) {
        return { ...cat, abilities: [] };
      }

      if (!query) return cat;

      const matchedAbilities = cat.abilities.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.effect.toLowerCase().includes(query) ||
          a.monsters.toLowerCase().includes(query)
      );

      return { ...cat, abilities: matchedAbilities };
    }).filter((cat) => cat.abilities.length > 0);
  }, [activeCategory, search]);

  return (
    <div className="abilities-view">
      <section className="guide-hero">
        <h2>Rage Ability Compendium</h2>
        <p>
          Gau&apos;s Rage command gives him access to over 250 monster moves,
          ranging from basic Tier-1 spells to endgame Lores and signature boss
          attacks. Browse below to discover key abilities by category, their
          combat effects, and which monsters provide them.
        </p>
      </section>

      <div className="abilities-toolbar">
        <div className="category-pills">
          <button
            type="button"
            className={`pill-btn ${activeCategory === "all" ? "pill-btn--active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Abilities
          </button>
          {RAGE_ABILITY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`pill-btn ${
                activeCategory === cat.id ? "pill-btn--active" : ""
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>

        <input
          type="search"
          className="rage-search abilities-search"
          placeholder="Search abilities, effects, or monsters…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search rage abilities"
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="abilities-empty">
          <p>No abilities match &quot;{search}&quot;.</p>
        </div>
      ) : (
        <div className="abilities-container">
          {filteredCategories.map((category) => (
            <section key={category.id} className="ability-category-section">
              <div className="category-header">
                <span className="category-header__icon">{category.icon}</span>
                <div>
                  <h3>{category.title}</h3>
                  <p className="category-header__desc">
                    {category.description} ({category.abilities.length})
                  </p>
                </div>
              </div>

              <div className="ability-table-wrap">
                <table className="guide-table ability-table">
                  <thead>
                    <tr>
                      <th style={{ minWidth: "180px", width: "22%" }}>
                        Ability
                      </th>
                      <th style={{ minWidth: "220px", width: "38%" }}>
                        Effect &amp; Properties
                      </th>
                      <th style={{ minWidth: "240px", width: "40%" }}>
                        Source Monsters &amp; Locations
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.abilities.map((ability) => (
                      <tr key={ability.name} className="guide-row">
                        <td className="ability-cell__name">
                          <strong>{ability.name}</strong>
                        </td>
                        <td className="ability-cell__effect">
                          {ability.effect}
                        </td>
                        <td className="ability-cell__monsters">
                          <span className="ability-monsters-text">
                            {ability.monsters}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
