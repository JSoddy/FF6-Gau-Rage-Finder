// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HIGH_VALUE_MONSTER_NAMES } from "./data/highValueRages";

(globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("App Tab Navigation, Bulk Select & Compendium Flow", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = "";
  });

  it("allows selecting all high-value rages and navigating across all four tabs", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    act(() => {
      root.render(<App />);
    });

    // Verify initial Tracker tab has the high-value quick select button and hide acquired checkbox
    const selectBtn = container.querySelector(
      "button.btn-select-high-value"
    ) as HTMLButtonElement;
    expect(selectBtn).toBeTruthy();
    expect(selectBtn.textContent).toContain("Select High-Value (0/20)");

    // Click "Select High-Value" on the main tracker
    act(() => {
      selectBtn.click();
    });

    // Button updates to Clear High-Value
    expect(selectBtn.textContent).toContain("Clear High-Value from Want");

    // LocalStorage updated
    const storedState = JSON.parse(
      localStorage.getItem("ff6-rage-finder-state") || "{}"
    );
    expect(storedState.want).toEqual(
      expect.arrayContaining(HIGH_VALUE_MONSTER_NAMES)
    );

    // Verify Hide Acquired checkbox works on main tracker
    const checkboxes = container.querySelectorAll(
      '.filter-row input[type="checkbox"]'
    );
    expect(checkboxes.length).toBe(2); // "Show only Want" and "Hide acquired"

    const hideAcquiredCheckbox = checkboxes[1] as HTMLInputElement;
    act(() => {
      hideAcquiredCheckbox.click();
    });

    // Verify 4 navigation tabs exist
    const tabs = container.querySelectorAll("button.nav-tab");
    expect(tabs.length).toBe(4);

    // Switch to Tab 2: How the Veldt Works
    act(() => {
      (tabs[1] as HTMLButtonElement).click();
    });

    expect(container.textContent).toContain("How the Veldt & Rages Work");
    expect(container.textContent).toContain("The 64-Pack Rotation Engine");
    expect(container.textContent).toContain("The Off-Veldt RNG Reshuffle");
    expect(container.textContent).toContain("How to Use This Tracker");

    // Switch to Tab 3: High-Value Rages Guide
    act(() => {
      (tabs[2] as HTMLButtonElement).click();
    });

    expect(container.textContent).toContain("High-Value Rages Guide");
    expect(container.textContent).toContain("Role & Tactical Impact");
    expect(container.querySelectorAll("tbody tr.guide-row").length).toBe(20);

    // Switch to Tab 4: Rage Abilities Compendium
    act(() => {
      (tabs[3] as HTMLButtonElement).click();
    });

    expect(container.textContent).toContain("Rage Ability Compendium");
    expect(container.textContent).toContain("Direct Offensive Magic & Lore");
    expect(container.textContent).toContain(
      "High-Multiplier Physical Attacks & Techniques"
    );
    expect(container.textContent).toContain(
      "Debuffs, Status Ailments & Control"
    );
    expect(container.textContent).toContain("Defensive, Recovery & Support");

    act(() => {
      root.unmount();
    });
    container.remove();
  });
});
