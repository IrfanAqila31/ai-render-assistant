// @vitest-environment jsdom
import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as fc from "fast-check";
import PresetSelector from "./PresetSelector";
import { PRESETS } from "../data/presets";

const noop = vi.fn();

/**
 * Property 2: Preset aktif ditandai dengan aria-pressed yang benar
 * Validates: Requirements 2.3, 5.2
 */
describe("Property 2: Preset aktif ditandai dengan aria-pressed yang benar", () => {
  it("hanya tombol yang sesuai memiliki aria-pressed='true', semua lainnya aria-pressed='false'", () => {
    fc.assert(
      fc.property(fc.constantFrom(...PRESETS), (activePreset) => {
        const { unmount } = render(
          <PresetSelector
            presets={PRESETS}
            activePresetId={activePreset.id}
            onPresetSelect={noop}
            isLoading={false}
          />,
        );

        const buttons = screen.getAllByRole("button");

        let result = true;
        for (const button of buttons) {
          const label = button.getAttribute("aria-label") ?? "";
          const isActiveButton = label.startsWith(activePreset.name);
          const ariaPressed = button.getAttribute("aria-pressed");

          if (isActiveButton) {
            if (ariaPressed !== "true") {
              result = false;
              break;
            }
          } else {
            if (ariaPressed !== "false") {
              result = false;
              break;
            }
          }
        }

        unmount();
        return result;
      }),
      { numRuns: 20 },
    );
  });
});

/**
 * Property 4: isLoading menonaktifkan semua tombol preset
 * Validates: Requirements 3.3, 5.4
 */
describe("Property 4: isLoading menonaktifkan semua tombol preset", () => {
  it("semua <button> memiliki atribut disabled ketika isLoading={true}", () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...PRESETS), { minLength: 1 }),
        (presets) => {
          // Deduplicate by id to avoid React key warnings and duplicate renders
          const uniquePresets = presets.filter(
            (p, idx, arr) => arr.findIndex((q) => q.id === p.id) === idx,
          );

          const { unmount } = render(
            <PresetSelector
              presets={uniquePresets}
              activePresetId={null}
              onPresetSelect={noop}
              isLoading={true}
            />,
          );

          const buttons = screen.getAllByRole("button");
          const allDisabled = buttons.every((btn) =>
            btn.hasAttribute("disabled"),
          );

          unmount();
          return allDisabled;
        },
      ),
      { numRuns: 20 },
    );
  });
});

/**
 * Property 7 (rendering): Integritas struktural rendering preset
 * Validates: Requirements 1.3, 5.1, 5.3
 */
describe("Property 7 (rendering): Integritas struktural rendering preset", () => {
  it("setiap preset dirender sebagai <button> dengan aria-label non-empty", () => {
    fc.assert(
      fc.property(fc.constantFrom(...PRESETS), (targetPreset) => {
        const { unmount } = render(
          <PresetSelector
            presets={PRESETS}
            activePresetId={null}
            onPresetSelect={noop}
            isLoading={false}
          />,
        );

        // Find the button for this preset by its aria-label
        const expectedLabel = `${targetPreset.name}: ${targetPreset.description}`;
        const button = screen.queryByRole("button", { name: expectedLabel });

        const result =
          button !== null &&
          button.tagName.toLowerCase() === "button" &&
          (button.getAttribute("aria-label") ?? "").trim().length > 0;

        unmount();
        return result;
      }),
      { numRuns: 20 },
    );
  });
});
