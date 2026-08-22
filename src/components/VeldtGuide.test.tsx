// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { VeldtGuide } from "./VeldtGuide";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("VeldtGuide component", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders all Veldt mechanics and strategy sections", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<VeldtGuide />);
    });

    // Verify main headings
    expect(container.textContent).toContain("How the Veldt & Rages Work");
    expect(container.textContent).toContain("The Veldt Encounter Pool");
    expect(container.textContent).toContain("The 64-Pack Rotation Engine");
    expect(container.textContent).toContain("Hunting Tactics & RNG Manipulation");
    expect(container.textContent).toContain("How to Use This Tracker");

    // Verify key mechanics text
    expect(container.textContent).toContain("The Unlock Rule");
    expect(container.textContent).toContain("defeating it or fleeing from it");
    expect(container.textContent).toContain("Post-Leap Safety Save");
    expect(container.textContent).toContain("The Fast-Forward Flee");
    expect(container.textContent).toContain("The Off-Veldt RNG Reshuffle");
    expect(container.textContent).toContain("Safe Gau Leaping & Retrieval");

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
