import { describe, it, expect } from "vitest";
import { createId } from "./id";

describe("createId", () => {
  it("generates unique string ids", () => {
    const id1 = createId();
    const id2 = createId();
    expect(id1).toBeTruthy();
    expect(id2).toBeTruthy();
    expect(id1).not.toBe(id2);
  });
});
