// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { RageAbilities } from "./RageAbilities";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("RageAbilities component", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders all categories and abilities by default", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<RageAbilities />);
    });

    expect(container.textContent).toContain("Rage Ability Compendium");
    expect(container.textContent).toContain("Direct Offensive Magic & Lore");
    expect(container.textContent).toContain("High-Multiplier Physical Attacks & Techniques");
    expect(container.textContent).toContain("Debuffs, Status Ailments & Control");
    expect(container.textContent).toContain("Defensive, Recovery & Support");

    // Check iconic abilities
    expect(container.textContent).toContain("Aqua Breath");
    expect(container.textContent).toContain("Catscratch");
    expect(container.textContent).toContain("Entice");
    expect(container.textContent).toContain("Meltdown (Merton)");

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("filters abilities by category pill", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<RageAbilities />);
    });

    const buttons = container.querySelectorAll("button.pill-btn");
    expect(buttons.length).toBe(5); // All + 4 categories

    // Click "Physical Attacks" (index 2)
    act(() => {
      (buttons[2] as HTMLButtonElement).click();
    });

    expect(container.textContent).toContain("Catscratch");
    expect(container.textContent).not.toContain("Aqua Breath");
    expect(container.textContent).not.toContain("Entice");

    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("filters abilities by search input query", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<RageAbilities />);
    });

    const searchInput = container.querySelector(
      'input[type="search"]'
    ) as HTMLInputElement;

    act(() => {
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeSetter?.call(searchInput, "General Leo");
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      searchInput.dispatchEvent(new Event("change", { bubbles: true }));
    });

    expect(container.textContent).toContain("Shock");
    expect(container.textContent).toContain("Yojimbo");
    expect(container.textContent).not.toContain("Catscratch");

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
