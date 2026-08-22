// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { RageGuide } from "./RageGuide";
import { HIGH_VALUE_RAGES } from "../data/highValueRages";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("RageGuide component (Informational)", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders all 20 high-value rages in the informational table", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<RageGuide />);
    });

    const rows = container.querySelectorAll("tbody tr.guide-row");
    expect(rows.length).toBe(HIGH_VALUE_RAGES.length);
    expect(container.textContent).toContain("Stray Cat");
    expect(container.textContent).toContain("Catscratch");
    expect(container.textContent).toContain("Gorgimera");
    expect(container.textContent).toContain("Avalanche");
    expect(container.textContent).toContain("Role & Tactical Impact");

    // Informational only: no checkboxes or search inputs
    const checkboxes = container.querySelectorAll('tbody input[type="checkbox"]');
    expect(checkboxes.length).toBe(0);
    const searchInputs = container.querySelectorAll('input[type="search"]');
    expect(searchInputs.length).toBe(0);

    // Verify Djibriel guide link
    const link = container.querySelector("a") as HTMLAnchorElement;
    expect(link).toBeTruthy();
    expect(link.href).toBe(
      "https://gamefaqs.gamespot.com/snes/554041-final-fantasy-iii/faqs/35118"
    );
    expect(container.textContent).toContain("Djibriel's Rage Guide");

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
