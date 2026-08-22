export interface AbilityEntry {
  name: string;
  effect: string;
  monsters: string;
}

export interface AbilityCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  abilities: AbilityEntry[];
}

export const RAGE_ABILITY_CATEGORIES: AbilityCategory[] = [
  {
    "id": "offensive-magic",
    "title": "Direct Offensive Magic & Lore",
    "icon": "🪄",
    "description": "Elemental nukes, lore spells, defense-ignoring bursts, and screen-wide destructive magic.",
    "abilities": [
      {
        "name": "1000 Needles (Blow Fish)",
        "effect": "Deals an exact, fixed 1,000 HP non-elemental damage regardless of defense.",
        "monsters": "Brainpan — Floating Continent; Cactuar (Cactrot) — Maranda Desert (WoR); Face (Phase) — Kefka's Tower"
      },
      {
        "name": "Acid Rain",
        "effect": "Water/Poison magic AoE damage with a chance to inflict Sap.",
        "monsters": "Caladrius (Vindr) — WoR Overworld; Adamankary (Adamanchyt) — Floating Continent; Skeletal Horror — Cave to Sealed Gate"
      },
      {
        "name": "Aero",
        "effect": "Multi-target Wind-elemental magic damage.",
        "monsters": "Sprinter — Dinosaur Forest; Marchosias (Harpiai) — Desert near Coliseum (WoR)"
      },
      {
        "name": "Aqua Breath",
        "effect": "Multi-target Water/Wind-elemental magic damage (bypasses rows, ignores Reflect).",
        "monsters": "Suriander — Mobliz area (WoR); Chimera — Forests near Thamasa; Anguiform — Serpent Trench; Vector Chimera (Vectagoyle) — Magitek Research Facility"
      },
      {
        "name": "Avalanche (Snowstorm / Blizzard)",
        "effect": "Heavy Ice-elemental AoE magic damage.",
        "monsters": "Gorgimera (Rhyos) — Cave on the Veldt"
      },
      {
        "name": "Bio",
        "effect": "Heavy single-target Poison-elemental magic damage + Poison status.",
        "monsters": "Magna Roader (Purple) (Mag Roader) — Magitek Research Facility; Trillium (Trilium) — Mt. Kolts; Vampire Thorn (Bloompire) — Kohlingen area (WoB); Great Malboro (Evil Oscar) — Kefka's Tower"
      },
      {
        "name": "Blaze",
        "effect": "Fire-elemental magic AoE attack with base spell power (Power = 68).",
        "monsters": "Spritzer (Vaporite) — Narshe Mines; Bomb — Forests near Vector; Grenade — Forests near Vector"
      },
      {
        "name": "Blizzaga (Ice 3)",
        "effect": "High-tier Ice magic damage (single or multi-target).",
        "monsters": "Baalzephon (Woolly) — Kefka's Tower"
      },
      {
        "name": "Blizzara (Ice 2)",
        "effect": "Mid-tier Ice magic damage.",
        "monsters": "Veil Dancer (SlamDancer) — Zozo; Darkside (Dark Side) — Narshe Mines (WoB)"
      },
      {
        "name": "Cyclonic",
        "effect": "Wind-elemental storm that removes 93.75% (15/16) of targets' current HP.",
        "monsters": "Briareus (Baskervor) — WoR Overworld; Vasegiatta (Harpy) — Zozo (WoB); Wyvern — Cave to Sealed Gate; Platinum Dragon (Wirey Drgn) — Floating Continent; Galypdes (Aquila) — Phoenix Cave"
      },
      {
        "name": "Disaster",
        "effect": "Inflicts multiple catastrophic status ailments at once (Blind, Doom, Float, Imp, Silence, Confuse).",
        "monsters": "Brachiosaur (Brachosaur) — Dinosaur Forest; Chaos Dragon (Chaos Drgn) — Phoenix Cave"
      },
      {
        "name": "Fira (Fire 2)",
        "effect": "Mid-tier Fire magic damage.",
        "monsters": "Templar — Imperial Camp; Lich — Cave to Sealed Gate; Clymenus (Trixter) — Cyan's Dream"
      },
      {
        "name": "Firaga (Fire 3)",
        "effect": "High-tier Fire magic damage.",
        "monsters": "Behemoth King (Living) (SrBehemoth) — Cave on the Veldt (Boss); Behemoth King (Undead) (SrBehemoth) — Cave on the Veldt (Undead); Primeval Dragon (Brontaur) — Dragon's Den / Kefka's Tower"
      },
      {
        "name": "Fire",
        "effect": "Basic Tier-1 Fire-elemental magic damage.",
        "monsters": "Imperial Soldier (Soldier) — Narshe Prologue / Doma Castle; Specter (Spectre) — Phantom Train; Eukaryote (Rinn) — Cyan's Dream"
      },
      {
        "name": "Fireball",
        "effect": "Fire-elemental magic AoE damage.",
        "monsters": "Lesser Lopros (Pterodon) — Lethe River; Fortis — Kefka's Tower"
      },
      {
        "name": "Flare",
        "effect": "Defense-ignoring non-elemental single-target magic damage.",
        "monsters": "Cloudwraith (PowerDemon) — Cyan's Dream"
      },
      {
        "name": "Flare Star",
        "effect": "Fire AoE magic damage scaled directly off enemy level (Level × 80).",
        "monsters": "Io (Lo) — Cyan's Dream"
      },
      {
        "name": "Flash Rain",
        "effect": "Water and Lightning split-elemental magic AoE damage.",
        "monsters": "Test Rider — Floating Continent; Moonform (Hipocampus) — Crescent Mountain area; Zeveak (Parasoul) — Zozo"
      },
      {
        "name": "Gigavolt",
        "effect": "Severe Tier-3 Lightning AoE magic damage.",
        "monsters": "Aspiran (Aspik) — Serpent Trench; Parasite — Cyan's Dream; Anemone — Cave on the Veldt; Illuyankas (Ceritops) — Zone Eater's Belly"
      },
      {
        "name": "Gravity (Demi)",
        "effect": "Halves the target's current HP.",
        "monsters": "Wizard — Magitek Research Facility; Belzecue (Garm) — Southern Continent; Angel Whisper (Whisper) — Phantom Train / Mt. Kolts"
      },
      {
        "name": "Gravity Bomb",
        "effect": "Heavy single-target gravity strike that inflicts damage equal to 50% (1/2) of target's current HP.",
        "monsters": "Armored Weapon (Lethal Wpn) — Kefka's Tower"
      },
      {
        "name": "Holy (Pearl)",
        "effect": "Massive single-target Holy-elemental magic damage.",
        "monsters": "Borghese (Orog) — Zozo (WoR); Holy Dragon (White Drgn) — Cultists' Tower; Warlock — Ancient Castle; Cherry (Madam) — Kefka's Tower; Outsider — Kefka's Tower"
      },
      {
        "name": "Lv.4 Flare",
        "effect": "Defense-ignoring Fire magic against all targets whose level is a multiple of 4.",
        "monsters": "Magna Roader (Brown) (Mag Roader) — Magitek Research Facility"
      },
      {
        "name": "Magitek Laser",
        "effect": "Non-elemental magical energy beam.",
        "monsters": "Magitek Armor (M-TekArmor) — Narshe Prologue; Sky Armor — Airship Blackjack battle; Pluto Armor (PlutoArmor) — Cyan's Dream; Heavy Armor (HeavyArmor) — South Figaro Escape; Spitfire (Spit Fire) — Airship Blackjack battle; Proto Armor (ProtoArmor) — Magitek Research Facility"
      },
      {
        "name": "Magnitude 8",
        "effect": "Heavy Earth AoE magic damage (does not hit party members).",
        "monsters": "Hill Gigas (HadesGigas) — Zozo; Landworm (Land Worm) — Maranda Desert (WoR); Gigantos — Floating Continent; Antares (Coelecite) — Cave to Sealed Gate; Oceanus (Latimeria) — Zone Eater's Belly"
      },
      {
        "name": "Megavolt",
        "effect": "Lightning-elemental magic AoE damage.",
        "monsters": "Belmodar (Rhinotaur) — Figaro Desert (WoB); Delta Beetle (Delta Bug) — Crescent Mountain (WoB); Duel Armor (Dueller) — Magitek Research Facility"
      },
      {
        "name": "Meltdown (Merton)",
        "effect": "Extreme unblockable Fire/Wind AoE to all combatants (absorb with Flame Shields).",
        "monsters": "Mover — Kefka's Tower; Daedalus (Didalos) — Ancient Castle"
      },
      {
        "name": "Metal Cutter (Shrapnel)",
        "effect": "Magical multi-target blade wave (checks Magic Power and Magic Defense).",
        "monsters": "Killer Mantis (Gilomantis) — WoR Overworld; Twinscythe (Toe Cutter) — Cave on the Veldt"
      },
      {
        "name": "Meteor",
        "effect": "Defense-piercing non-elemental magic damage across all enemies.",
        "monsters": "Behemoth — Floating Continent; Tyrannosaur (Tyranosaur) — Dinosaur Forest; Lunatys (Boxed Set) — Zone Eater's Belly; Great Behemoth (GtBehemoth) — Kefka's Tower"
      },
      {
        "name": "Northern Cross",
        "effect": "Deals 0 damage and attempts to freeze all targets solid in ice (Freeze status).",
        "monsters": "Fiend Dragon (Doom Drgn) — Kefka's Tower"
      },
      {
        "name": "Plasma",
        "effect": "High-damage single-target Lightning magical strike.",
        "monsters": "Chaser — Magitek Research Facility"
      },
      {
        "name": "Quake",
        "effect": "Screen-wide Earth magic damage (hits allies and enemies; absorb with Gaia Gear).",
        "monsters": "Litwor Chicken (ChickenLip) — Southern Continent (WoB); Ouroboros (Uroburos) — World Map (WoR); Death Warden (Allo Ver) — Cave on the Veldt"
      },
      {
        "name": "Rockslide (Landslide)",
        "effect": "Unblockable, non-reflectable, defense-piercing single-target magic damage.",
        "monsters": "Purusa (Prussian) — Mt. Zozo (WoR); Luridan — Mt. Zozo (WoR); Aspidochelon (Opinicus) — Cyan's Dream"
      },
      {
        "name": "Sandstorm",
        "effect": "Multi-target Earth/Wind magic damage.",
        "monsters": "Fossil Dragon (FossilFang) — Desert near Vector (WoB); Slagworm (Hoover) — Maranda Desert (WoR); Sandhorse (Sand Horse) — Tzen Desert (WoR)"
      },
      {
        "name": "Shock",
        "effect": "General Leo's signature ability; massive defense-ignoring non-elemental AoE damage.",
        "monsters": "Yojimbo (Retainer) — Kefka's Tower"
      },
      {
        "name": "Snowstorm (Avalanche)",
        "effect": "Ice-elemental AoE magic damage.",
        "monsters": "Muud Suud (Steroidite) — WoR Overworld; Megalodoth (Vomammoth) — Narshe Cliffs (WoB); Kamui (Ogor) — Kefka's Tower; Gorgias (Tusker) — WoR Overworld; Lukhavi (Nastidon) — WoR Overworld; Black Dragon (Black Drgn) — Ancient Castle"
      },
      {
        "name": "Sonic Boom",
        "effect": "Wind-elemental slicing attack that cuts 62.5% (5/8) of target's current HP.",
        "monsters": "Satellite (Telstar) — Imperial Camp chests"
      },
      {
        "name": "Stone",
        "effect": "Non-elemental magic damage + Confusion; deals 8× damage if target level equals user level.",
        "monsters": "Zaghrem (Brawler) — Mt. Kolts area; Iron Fist — Mt. Kolts; Knotty (Poppers) — WoR Overworld; Valeor (1st Class) — Imperial Camp (WoB)"
      },
      {
        "name": "Thundaga (Bolt 3)",
        "effect": "High-tier Lightning magic damage.",
        "monsters": "Al Jabr (Rain Man) — Kefka's Tower; Devil (Goblin) — Ancient Castle; Shambling Corpse (Karkass) — WoR Overworld; Punisher — WoR Overworld"
      },
      {
        "name": "Thundara (Bolt 2)",
        "effect": "Mid-tier Lightning magic damage.",
        "monsters": "Cloud (Hazer) — Imperial Camp area; Ghost — Phantom Forest / Train; Joker — Zozo"
      },
      {
        "name": "Tsunami (CleanSweep)",
        "effect": "High-tier Water AoE magic damage (ignores multi-target damage split).",
        "monsters": "Enuo — Ancient Castle; Dark Force — Kefka's Tower"
      },
      {
        "name": "Venomist",
        "effect": "Poison-elemental magic AoE damage with high poison chance.",
        "monsters": "Hell's Rider (Rider) — Imperial Camp Escape (WoB); Exoray — Cave to Sealed Gate; InnoSent (Innoc) — Kefka's Tower"
      },
      {
        "name": "Water Scroll",
        "effect": "Ninja Water-elemental magic AoE scroll attack.",
        "monsters": "Ninja — Cave to Sealed Gate"
      },
      {
        "name": "Will o' the Wisp",
        "effect": "Unblockable single-target Fire magical attack.",
        "monsters": "Devil Fist (Scrapper) — Cyan's Dream; Oversoul — Phantom Train"
      },
      {
        "name": "Wind Slash",
        "effect": "Full-screen Wind-elemental magic damage.",
        "monsters": "Guard Leader (Marshal) — Narshe Mines (Prologue); Covert — Kefka's Tower; Greater Mantis (Mantodea) — Cyan's Dream"
      }
    ]
  },
  {
    "id": "physical-attacks",
    "title": "High-Multiplier Physical Attacks & Techniques",
    "icon": "⚔️",
    "description": "High-multiplier physical strikes, defense-piercing weapons, HP-halving cuts, and slicing attacks.",
    "abilities": [
      {
        "name": "Bite",
        "effect": "Physical strike dealing 2× standard damage.",
        "monsters": "Doberman — Imperial Camp chests; Vector Hound (Vector Pup) — Magitek Research Facility; Hunting Hound (Bounty Man) — WoR Overworld"
      },
      {
        "name": "Bodyslam",
        "effect": "Heavy physical impact dealing 2× standard damage.",
        "monsters": "Garm (Red Wolf) — Cyan's Dream"
      },
      {
        "name": "Catscratch (Cat Scratch)",
        "effect": "Deals 4× standard physical attack damage.",
        "monsters": "Stray Cat — Overworld around Doma Castle"
      },
      {
        "name": "Cave In",
        "effect": "Heavy physical rock collapse dealing 2.5× damage.",
        "monsters": "Sorath (Slatter) — Cyan's Dream"
      },
      {
        "name": "Chomp",
        "effect": "Physical strike dealing 1.5× to 2× standard damage.",
        "monsters": "Silver Lobo (Lobo) — Narshe Snowfield"
      },
      {
        "name": "Clamp",
        "effect": "Physical clamp attack dealing damage and immobilizing.",
        "monsters": "Actinian (Actaneon) — Serpent Trench"
      },
      {
        "name": "Cling",
        "effect": "Physical grasp dealing damage with slow effect.",
        "monsters": "Poplium — Phantom Forest"
      },
      {
        "name": "Critical",
        "effect": "Guaranteed critical physical strike dealing 2× damage.",
        "monsters": "Guard — Narshe Prologue"
      },
      {
        "name": "Digestive Fluid",
        "effect": "Acidic physical bite that inflicts Sap.",
        "monsters": "Urok (Crawly) — Serpent Trench"
      },
      {
        "name": "Drain",
        "effect": "Physical strike that drains HP from the target to heal Gau.",
        "monsters": "Bloodfang (Red Fang) — Phantom Train; Nightwalker (Pm Stalker) — Owzer's Mansion"
      },
      {
        "name": "Face Chomp",
        "effect": "Vicious physical bite dealing 2× damage.",
        "monsters": "Luna Wolf (Lunaris) — Cyan's Dream"
      },
      {
        "name": "Featherdust",
        "effect": "Physical multi-hit flurry.",
        "monsters": "Aepyornis (Beakor) — Kohlingen area (WoB)"
      },
      {
        "name": "Gouge",
        "effect": "Physical clawing attack dealing 2× damage.",
        "monsters": "Gold Bear — South Figaro area"
      },
      {
        "name": "Incisor",
        "effect": "Heavy physical bite dealing 1.5× standard damage.",
        "monsters": "Leaf Bunny (Leafer) — Narshe / Mt. Kolts area; Stunner (Sewer Rat) — Cave to South Figaro"
      },
      {
        "name": "Iron Stinger",
        "effect": "Heavy physical piercing strike.",
        "monsters": "Hornet — South Figaro Plains"
      },
      {
        "name": "Knife",
        "effect": "High-critical defense-piercing physical strike.",
        "monsters": "Tonberries (Pugs) — Umaro's Cave"
      },
      {
        "name": "Leech",
        "effect": "Drains HP from the target to restore user HP.",
        "monsters": "Mandrake — Crescent Mountain (WoR)"
      },
      {
        "name": "Numbclaw",
        "effect": "Physical claw strike with a chance to paralyze.",
        "monsters": "Acrophies (Primorbite) — Baren Falls"
      },
      {
        "name": "Pincer",
        "effect": "Crushing physical grip dealing damage.",
        "monsters": "Exocite — Lethe River"
      },
      {
        "name": "Poison Barb",
        "effect": "Physical tail sting with high poison chance.",
        "monsters": "Cartagra (Trilobiter) — South Figaro Caves"
      },
      {
        "name": "Poison Touch",
        "effect": "Physical strike with poison touch.",
        "monsters": "Paraladia (Over Grunk) — Cyan's Dream"
      },
      {
        "name": "Pounce",
        "effect": "Physical lunging strike dealing 2× standard damage.",
        "monsters": "Fidor — South Figaro area"
      },
      {
        "name": "Scratch",
        "effect": "Physical claw strike dealing 1.5× damage.",
        "monsters": "Wild Rat — Narshe Prologue"
      },
      {
        "name": "Shamshir",
        "effect": "Slices target's current HP by 50%.",
        "monsters": "Vulture — Kohlingen area (WoB); Lenergia (Gobbler) — Crescent Mountain (WoR); Rukh (Osprey) — WoR Overworld"
      },
      {
        "name": "Shell Slam",
        "effect": "Heavy armored shell impact dealing 2× physical damage.",
        "monsters": "Devourer (Cephaler) — Phantom Forest"
      },
      {
        "name": "Shockwave",
        "effect": "Physical shockwave burst hitting enemy line.",
        "monsters": "Demon Knight (Hemophyte) — Ancient Castle"
      },
      {
        "name": "Sleepsting",
        "effect": "Physical piercing attack that inflicts Sleep.",
        "monsters": "Rock Wasp (Mind Candy) — WoB Plains"
      },
      {
        "name": "Swing",
        "effect": "Physical weapon sweep dealing 1.5× damage.",
        "monsters": "Corporal (Trooper) — Imperial Camp"
      },
      {
        "name": "Tackle",
        "effect": "Heavy physical body slam dealing 2× standard damage.",
        "monsters": "Don (Ralph) — Cyan's Dream"
      },
      {
        "name": "Tail",
        "effect": "Physical tail lash dealing 1.5× damage.",
        "monsters": "Sand Ray — Figaro Desert (WoB)"
      },
      {
        "name": "Wing Snap",
        "effect": "Physical wing strike dealing 1.5× damage.",
        "monsters": "Land Grillon (Insecare) — Cyan's Dream"
      }
    ]
  },
  {
    "id": "debuffs-status",
    "title": "Debuffs, Status Ailments & Control",
    "icon": "☠️",
    "description": "Instant death, petrification, charm/confusion, ATB freezing, stat crippling, and status ailments.",
    "abilities": [
      {
        "name": "Bad Breath",
        "effect": "Inflicts multiple catastrophic status ailments at once (Poison, Blind, Silence, Sleep, Confuse, Imp).",
        "monsters": "Malboro (Mad Oscar) — Darill's Tomb area (WoR)"
      },
      {
        "name": "Berserk",
        "effect": "Inflicts Berserk, boosting physical attack power while removing action control.",
        "monsters": "Nettlehopper (CrassHoppr) — Crescent Mountain (WoB); Grasswyrm (WeedFeeder) — South Figaro Plains"
      },
      {
        "name": "Blaster",
        "effect": "Inflicts either Instant KO or Paralysis (Stop).",
        "monsters": "Coeurl Cat (Wild Cat) — Cave on the Veldt (WoR); Lycaon (Spek Tor) — Cyan's Dream"
      },
      {
        "name": "Break (Petrify)",
        "effect": "Single-target instant Petrify status.",
        "monsters": "Commander — Imperial Camp; Darkwind (Dark Wind) — Narshe Overworld (WoB); Lizard — Cave to Sealed Gate; Tonberry (Pug) — Umaro's Cave; Basilisk (Geckorex) — Cave to Sealed Gate; Medusa Chicken (Cluck) — Cyan's Dream"
      },
      {
        "name": "Confuse",
        "effect": "Inflicts Confusion on the target.",
        "monsters": "Dropper (Drop) — Cyan's Dream"
      },
      {
        "name": "Death (Doom)",
        "effect": "Single-target instant KO.",
        "monsters": "Foper (Bleary) — Southern Continent (WoB); Mahadeva (Displayer) — Cyan's Dream; Weredragon (Allosaurus) — Cyan's Dream; Necromancer (Necromancr) — Kefka's Tower; Death Machine (Sky Base) — Kefka's Tower"
      },
      {
        "name": "Dischord",
        "effect": "Halves the target's current Level, crippling stats and level-check defenses.",
        "monsters": "Figaro Lizard (Figaliz) — Cave to South Figaro; Gamma (Scullion) — Kefka's Tower; Metal Hitman (IronHitman) — Kefka's Tower"
      },
      {
        "name": "Doom",
        "effect": "Inflicts a countdown timer; target is KO'd when timer reaches zero.",
        "monsters": "Zombie Dragon (Zombone) — Cave to Sealed Gate; Alluring Rider (Critic) — Cyan's Dream"
      },
      {
        "name": "Dread Gaze",
        "effect": "Petrifying gaze that turns the target to Stone.",
        "monsters": "Deepeye (Deep Eye) — Cave on the Veldt"
      },
      {
        "name": "Entice",
        "effect": "Irresistible, permanent confusion/charm status that cannot be cured by attacks and bypasses boss immunities.",
        "monsters": "Rafflesia (Nightshade) — Owzer's Mansion"
      },
      {
        "name": "Growl",
        "effect": "Intimidating roar that lowers enemy physical attack power.",
        "monsters": "Bogy — Phantom Forest"
      },
      {
        "name": "Imp",
        "effect": "Transforms the target into an Imp, stripping spells and equipment perks.",
        "monsters": "Onion Knight (Pipsqueak) — Magitek Research Facility; Provoker (Apparite) — Cyan's Dream; Neck Hunter (NeckHunter) — Cyan's Dream; Tzakmaqiel (Kiwok) — WoR Overworld"
      },
      {
        "name": "Ink",
        "effect": "Blinds target with an ink burst (Darkness status).",
        "monsters": "Nautiloid — Lethe River"
      },
      {
        "name": "Lv.3 Confuse",
        "effect": "Inflicts Confusion on all targets whose Level is a multiple of 3.",
        "monsters": "Apocrypha (Apokryphos) — Floating Continent; Trapper — Magitek Research Facility; Dante — Kefka's Tower"
      },
      {
        "name": "Mega Berserk",
        "effect": "Inflicts Berserk on the target with increased attack potency.",
        "monsters": "Schmidt (Sky Cap) — Airship Blackjack battle"
      },
      {
        "name": "Net",
        "effect": "Entangles the target in a net, inflicting Stop (freeze ATB).",
        "monsters": "Mugbear (Ursus) — Jidoor area (WoB); Zokka (HermitCrab) — South Figaro Caves; Gloomwind (GloomShell) — Cyan's Dream"
      },
      {
        "name": "Numb",
        "effect": "Paralyzes the target, preventing actions.",
        "monsters": "Alacran (Areneid) — Figaro Desert (WoB)"
      },
      {
        "name": "Poison",
        "effect": "Inflicts the Poison status on the target.",
        "monsters": "Wererat (Were-Rat) — Narshe Mines (Prologue); Humpty — Cyan's Dream; Scorpion — WoR Overworld; Venobennu (Abolisher) — Cyan's Dream"
      },
      {
        "name": "Rasp",
        "effect": "Drains MP directly from the target.",
        "monsters": "Wartpuck (Wart Puck) — WoR Overworld"
      },
      {
        "name": "Roulette",
        "effect": "Spins a cursor that randomly and instantly KOs any combatant on either team.",
        "monsters": "Ahriman (Veteran) — Kefka's Tower"
      },
      {
        "name": "Silence",
        "effect": "Mutes the target, preventing spellcasting.",
        "monsters": "Magna Roader (Red) (Mag Roader) — Magitek Research Facility"
      },
      {
        "name": "Sleep",
        "effect": "Puts the target to sleep until struck.",
        "monsters": "Seaflower (Sea Flower) — Cyan's Dream"
      },
      {
        "name": "Slowga",
        "effect": "Slows ATB gauge fill speed for targets.",
        "monsters": "Devoahan (Buffalax) — WoR Overworld; Amduscias (Tap Dancer) — Kefka's Tower"
      },
      {
        "name": "Snare",
        "effect": "Instant ejection pit / death trap effect.",
        "monsters": "Mu (Rhodox) — Overworld plains (WoB)"
      },
      {
        "name": "Sticky Goo",
        "effect": "Deals minor damage and inflicts Slow.",
        "monsters": "Leap Frog (Reach Frog) — WoR Overworld; Flan — Magitek Research Facility; Cruller — Cyan's Dream; Gigantoad (Gigan Toad) — Crescent Mountain area; Bonnacon (Slurm) — WoR Overworld"
      },
      {
        "name": "Stop",
        "effect": "Freezes the target's ATB gauge completely.",
        "monsters": "Murussu (Chitonid) — WoR Overworld; Bug — Magitek Research Facility"
      }
    ]
  },
  {
    "id": "defensive-support",
    "title": "Defensive, Recovery & Support",
    "icon": "🛡️",
    "description": "Party recovery, automatic revives, ATB acceleration, damage mitigation, and utility buffs.",
    "abilities": [
      {
        "name": "Cura (Cure 2)",
        "effect": "Mid-tier single or multi-target HP recovery.",
        "monsters": "Misty (Dahling) — Zozo; General — Imperial Camp / Vector; Desert Hare (Nohrabbit) — Figaro Desert (WoR)"
      },
      {
        "name": "Curaga (Cure 3)",
        "effect": "Full-party high-tier HP recovery.",
        "monsters": "Magic Urn — Cultists' Tower"
      },
      {
        "name": "Esuna",
        "effect": "Cures almost all negative status ailments on an ally.",
        "monsters": "Cancer (Maliga) — Baren Falls"
      },
      {
        "name": "Haste",
        "effect": "Increases target ATB gauge speed by 33%.",
        "monsters": "Harvester — Zozo; Magna Roader (Yellow) (Mag Roader) — Magitek Research Facility"
      },
      {
        "name": "Hastega",
        "effect": "Increases ATB gauge speed for the entire party.",
        "monsters": "Cirpius — Mt. Kolts"
      },
      {
        "name": "Invisible (Vanish)",
        "effect": "Grants Vanish status (complete physical immunity, 100% vulnerability to magic).",
        "monsters": "Gobbledygook (Gabbldegak) — WoR Overworld"
      },
      {
        "name": "Libra",
        "effect": "Analyzes target to reveal HP, MP, and elemental weaknesses.",
        "monsters": "Goetia (Vermin) — Cyan's Dream"
      },
      {
        "name": "Lifeshaver (Mega Drain)",
        "effect": "Drains large amounts of HP from target to heal Gau.",
        "monsters": "Tumbleweed (TumbleWeed) — WoR Overworld; Outcast (Ing) — Floating Continent; Crusher — Cyan's Dream; Misfit — Floating Continent; Creature (Eland) — Darill's Tomb; Psychos (Psychot) — Darill's Tomb"
      },
      {
        "name": "Lullaby",
        "effect": "Plays a soothing song that puts all enemies to sleep.",
        "monsters": "Samurai — Ancient Castle; Still Life — Owzer's Mansion"
      },
      {
        "name": "Mighty Guard",
        "effect": "Grants both Protect and Shell to the entire party simultaneously.",
        "monsters": "Land Ray (EarthGuard) — Maranda Desert (WoR)"
      },
      {
        "name": "Osmose",
        "effect": "Drains MP from target to replenish Gau's MP.",
        "monsters": "Blade Dancer (SoulDancer) — Owzer's Mansion; Living Dead (StillGoing) — Phantom Train"
      },
      {
        "name": "Overture",
        "effect": "Charm song that forces the target to redirect their physical attacks to protect Gau's team.",
        "monsters": "Coco (Barb-e) — Cyan's Dream"
      },
      {
        "name": "Protect",
        "effect": "Reduces incoming physical damage by 33%.",
        "monsters": "Imperial Elite (Sp Forces) — Imperial Camp / Vector"
      },
      {
        "name": "Raise (Life)",
        "effect": "Revives a fallen ally from KO.",
        "monsters": "Chippirabbit (Rhobite) — WoR Overworld"
      },
      {
        "name": "Reflect",
        "effect": "Creates a barrier that bounces single-target spells back at the opposing side.",
        "monsters": "Sergeant (Commando) — Imperial Camp / Vector"
      },
      {
        "name": "Reraise (Life 3)",
        "effect": "Automatically revives the target upon death with a fraction of HP.",
        "monsters": "Destroyer (Rhinox) — Magitek Research Facility"
      },
      {
        "name": "Revenge Blast",
        "effect": "Deals damage equal to (Max HP - Current HP).",
        "monsters": "Dragon — Floating Continent; Pandora (Pan Dora) — Cyan's Dream; Glasya Labolas (Borras) — Cyan's Dream"
      },
      {
        "name": "Self-Destruct",
        "effect": "Sacrifices Gau to deal current HP as direct unblockable damage to target.",
        "monsters": "Bandit (Repo Man) — South Figaro area; Balloon — Burning Building (Thamasa)"
      },
      {
        "name": "Shell",
        "effect": "Reduces incoming magical damage by 33%.",
        "monsters": "Unseelie (GreaseMonk) — Figaro Plains"
      },
      {
        "name": "Transfusion",
        "effect": "Sacrifices Gau to completely restore one ally's HP, MP, and cure all statuses.",
        "monsters": "Intangir — Triangle Island (WoB); Mousse (Muus) — Kefka's Tower; Junk — Kefka's Tower"
      },
      {
        "name": "Traveler (Step Mine)",
        "effect": "Deals non-elemental defense-ignoring damage based on the total steps taken in the game.",
        "monsters": "Fafnir (Mesosaur) — Mt. Zozo / WoR Overworld; Crawler — WoR Overworld; Onion Dasher (Tomb Thumb) — Ancient Castle"
      },
      {
        "name": "White Wind",
        "effect": "Heals the entire party for HP equal to Gau's current HP (ignores magic defense and split).",
        "monsters": "Peeper (Peepers) — World Map (WoR); Vector Lythos (Vectaur) — Magitek Research Facility"
      }
    ]
  }
];

export const ALL_RAGE_ABILITIES: AbilityEntry[] =
  RAGE_ABILITY_CATEGORIES.flatMap((c) => c.abilities);
