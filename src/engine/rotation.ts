import { isPackAllEmpty } from "./formations";

export function nextNonEmptyPack(pack: number): number {
  let p = (pack % 64) + 1;
  let steps = 0;
  while (isPackAllEmpty(p) && steps < 64) {
    p = (p % 64) + 1;
    steps++;
  }
  return p;
}

export function advancePacks(fromPack: number, count: number): number {
  let p = fromPack;
  for (let i = 0; i < count; i++) {
    p = nextNonEmptyPack(p);
  }
  return p;
}

export function countNonEmptyPacksBetween(fromPack: number, toPack: number): number {
  let count = 0;
  let p = fromPack;
  const target = toPack;
  for (let i = 0; i < 64; i++) {
    p = nextNonEmptyPack(p);
    count++;
    if (p === target) return count;
  }
  return -1;
}
