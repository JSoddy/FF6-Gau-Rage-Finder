import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tsv = readFileSync(join(__dirname, "../data/veldt-table.tsv"), "utf-8");
const lines = tsv.trim().split("\n");

function parseMonsterPart(part) {
  const trimmed = part.trim();

  // "Magna Roader x2 (Yellow)" → name + count with variant suffix
  const variantCountFirst = trimmed.match(/^(.+?) x(\d+) \((.+)\)$/i);
  if (variantCountFirst) {
    const base = variantCountFirst[1].trim();
    const count = parseInt(variantCountFirst[2], 10);
    const variant = variantCountFirst[3].trim();
    return { name: `${base} (${variant})`, count };
  }

  // "Magna Roader (Yellow) x2" or "Silver Lobo x2"
  const countLast = trimmed.match(/^(.+?) x(\d+)$/i);
  if (countLast) {
    return { name: countLast[1].trim(), count: parseInt(countLast[2], 10) };
  }

  return { name: trimmed, count: 1 };
}

function parseMonsters(label) {
  if (label === "None" || !label.trim()) return [];
  return label.split(",").map(parseMonsterPart);
}

function formatMonster({ name, count }) {
  return count === 1 ? name : `${name} x${count}`;
}

function formatLabel(monsters) {
  return monsters.map(formatMonster).join(", ");
}

function multisetKey(monsters) {
  return monsters
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name) || a.count - b.count)
    .map((m) => `${m.name}:${m.count}`)
    .join("|");
}

const formations = [];

for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split("\t");
  const pack = parseInt(cols[0], 10);
  for (let slot = 0; slot < 8; slot++) {
    const rawLabel = cols[slot + 1]?.trim() ?? "None";
    const empty = rawLabel === "None";
    const monsters = empty ? [] : parseMonsters(rawLabel);
    const label = empty ? rawLabel : formatLabel(monsters);
    formations.push({
      pack,
      slot,
      label,
      monsters,
      empty,
      multisetKey: empty ? "" : multisetKey(monsters),
    });
  }
}

const monsterNames = [
  ...new Set(formations.flatMap((f) => f.monsters.map((m) => m.name))),
].sort();

writeFileSync(
  join(__dirname, "../data/formations.json"),
  JSON.stringify({ formations, monsterNames }, null, 2)
);

console.log(`Wrote ${formations.length} formations, ${monsterNames.length} monsters`);
