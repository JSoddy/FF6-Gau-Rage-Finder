export interface HighValueRage {
  monster: string;
  displayName: string;
  firstEncounter: string;
  ability: string;
  roleImpact: string;
}

export const HIGH_VALUE_RAGES: HighValueRage[] = [
  {
    monster: "Guard Leader",
    displayName: "Guard Leader",
    firstEncounter: "Narshe Mines (Prologue / Locke's scenario)",
    ability: "Wind Slash",
    roleImpact:
      "Full-party Wind-elemental AoE magic. Available immediately upon unlocking Gau on the Veldt.",
  },
  {
    monster: "Trillium",
    displayName: "Trillium",
    firstEncounter: "Mt. Kolts (Prologue / Terra's scenario)",
    ability: "Bio",
    roleImpact:
      "Single-target Poison magic. Massive burst damage early in the game long before Bio is learned via Magicite.",
  },
  {
    monster: "Templar",
    displayName: "Templar",
    firstEncounter: "Imperial Camp (Sabin's scenario)",
    ability: "Fira + Auto-Protect",
    roleImpact:
      "Mid-tier Fire damage paired with innate physical defense.",
  },
  {
    monster: "Stray Cat",
    displayName: "Stray Cat",
    firstEncounter: "Overworld plains around Doma Castle (Sabin's scenario)",
    ability: "Catscratch",
    roleImpact:
      "Deals 4× standard physical damage. The premier single-target physical boss killer for the entire first half of the game.",
  },
  {
    monster: "Anguiform",
    displayName: "Anguiform",
    firstEncounter: "Phantom Forest / Serpent Trench (Sabin's scenario)",
    ability: "Aqua Breath",
    roleImpact:
      "Multi-target Water/Wind magic that ignores row penalties and hits through Reflect.",
  },
  {
    monster: "Aspiran",
    displayName: "Aspiran (Aspik)",
    firstEncounter: "Serpent Trench (Sabin's scenario)",
    ability: "Gigavolt",
    roleImpact:
      "Heavy Tier-3 Lightning AoE magic that obliterates mechanical enemies and mid-game packs.",
  },
  {
    monster: "Hill Gigas",
    displayName: "Hill Gigas",
    firstEncounter: "Zozo",
    ability: "Magnitude 8",
    roleImpact:
      "Heavy Earth AoE damage that hits all enemies without damaging your own party.",
  },
  {
    monster: "Litwor Chicken",
    displayName: "Litwor Chicken",
    firstEncounter: "Southern Continent (plains/forests around Vector & Albrook)",
    ability: "Quake",
    roleImpact:
      "Full-screen Earth magic. When party members wear Gaia Gear, it damages enemies while full-healing your team.",
  },
  {
    monster: "Destroyer",
    displayName: "Destroyer (Rhinox)",
    firstEncounter: "Magitek Research Facility (Vector)",
    ability: "Reraise",
    roleImpact:
      "Auto-revives Gau or an ally upon KO. Accessible dozens of hours before obtaining Phoenix Magicite.",
  },
  {
    monster: "Chimera",
    displayName: "Chimera",
    firstEncounter: "Forests near Thamasa / Eastern Continent",
    ability: "Aqua Breath",
    roleImpact:
      "High-potency Aqua Breath with broad elemental resistances.",
  },
  {
    monster: "Purusa",
    displayName: "Purusa (Luridan)",
    firstEncounter: "Mt. Zozo (World of Ruin)",
    ability: "Rockslide",
    roleImpact:
      "Unblockable, non-elemental single-target burst that pierces magic defense and cannot be reflected.",
  },
  {
    monster: "Marchosias",
    displayName: "Marchosias",
    firstEncounter: "World Map (Desert/plains around Dragon's Neck Coliseum)",
    ability: "Aero",
    roleImpact:
      "High-multiplier Wind-elemental AoE magic. Nullify its innate Wind weakness with a Thunder Shield.",
  },
  {
    monster: "Gorgimera",
    displayName: "Gorgimera",
    firstEncounter: "Cave on the Veldt (World of Ruin)",
    ability: "Avalanche",
    roleImpact:
      "High-potency Ice AoE that ignores split damage reduction across multiple targets.",
  },
  {
    monster: "Rafflesia",
    displayName: "Rafflesia",
    firstEncounter: "Owzer’s Mansion (Jidoor)",
    ability: "Entice",
    roleImpact:
      "Inflicts an unblockable, permanent charm that works on almost every boss in the game.",
  },
  {
    monster: "Io",
    displayName: "Io (Lo)",
    firstEncounter: "Cyan's Dreamscape (Doma Castle)",
    ability: "Flare Star",
    roleImpact:
      "AoE Fire burst that scales directly off target level.",
  },
  {
    monster: "Magic Urn",
    displayName: "Magic Urn",
    firstEncounter: "Cultists' Tower (Tower of Fanatics)",
    ability: "Curaga + Full Elemental/Status Immunity",
    roleImpact:
      "The ultimate defensive tank Rage. Gau absorbs nearly all elements and statuses while spamming full-party heals.",
  },
  {
    monster: "Tyrannosaur",
    displayName: "Tyrannosaur",
    firstEncounter: "Dinosaur Forest (Northeast of the Veldt)",
    ability: "Meteor",
    roleImpact:
      "Defense-piercing, non-elemental magic that pulverizes large late-game formations.",
  },
  {
    monster: "Yojimbo",
    displayName: "Yojimbo",
    firstEncounter: "Kefka’s Tower",
    ability: "Shock",
    roleImpact:
      "General Leo's signature ability. Massive defense-ignoring, non-elemental AoE burst.",
  },
  {
    monster: "Mover",
    displayName: "Mover",
    firstEncounter: "Kefka’s Tower",
    ability: "Meltdown",
    roleImpact:
      "Catastrophic unblockable Fire/Wind AoE across the entire field (absorb with Flame Shields).",
  },
  {
    monster: "Dark Force",
    displayName: "Dark Force",
    firstEncounter: "Kefka’s Tower",
    ability: "Tsunami",
    roleImpact:
      "High-tier Water AoE magic that ignores multi-target damage falloff.",
  },
];

export const HIGH_VALUE_MONSTER_NAMES: string[] = HIGH_VALUE_RAGES.map(
  (r) => r.monster
);
