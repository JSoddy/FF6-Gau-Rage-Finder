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

export function prevNonEmptyPack(pack: number): number {
  let p = pack === 1 ? 64 : pack - 1;
  let steps = 0;
  while (isPackAllEmpty(p) && steps < 64) {
    p = p === 1 ? 64 : p - 1;
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

