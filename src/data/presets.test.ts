import { describe, it, expect } from "vitest";
import { PRESETS, PRESET_CATEGORIES } from "./presets";
import type { PresetCategory } from "./presets";

describe("PRESETS data", () => {
  it("should contain exactly 8 presets", () => {
    expect(PRESETS).toHaveLength(8);
  });

  it("should have all required non-empty fields on every preset", () => {
    for (const preset of PRESETS) {
      expect(preset.id, `id missing on preset`).toBeTruthy();
      expect(preset.name, `name missing on preset "${preset.id}"`).toBeTruthy();
      expect(
        preset.description,
        `description missing on preset "${preset.id}"`,
      ).toBeTruthy();
      expect(
        preset.category,
        `category missing on preset "${preset.id}"`,
      ).toBeTruthy();
      expect(
        preset.promptText,
        `promptText missing on preset "${preset.id}"`,
      ).toBeTruthy();
    }
  });

  it("should have no duplicate ids", () => {
    const ids = PRESETS.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have exactly 3 presets in the 'nuansa-waktu' category", () => {
    const waktuPresets = PRESETS.filter((p) => p.category === "nuansa-waktu");
    expect(waktuPresets).toHaveLength(3);
  });

  it("should have exactly 4 presets in the 'nuansa-cuaca' category", () => {
    const cuacaPresets = PRESETS.filter((p) => p.category === "nuansa-cuaca");
    expect(cuacaPresets).toHaveLength(4);
  });

  it("should have every promptText contain a preservation instruction", () => {
    for (const preset of PRESETS) {
      const hasPreservation =
        preset.promptText.includes("Preserve") ||
        preset.promptText.includes("STRICT CONSTRAINTS");
      expect(
        hasPreservation,
        `promptText of "${preset.id}" must contain a preservation instruction`,
      ).toBe(true);
    }
  });

  it("should have nuansa presets contain the element prohibition", () => {
    const nuansaPresets = PRESETS.filter(
      (p) => p.category === "nuansa-waktu" || p.category === "nuansa-cuaca",
    );
    for (const preset of nuansaPresets) {
      expect(
        preset.promptText,
        `promptText of "${preset.id}" must contain element prohibition`,
      ).toContain("DO NOT add");
    }
  });

  it("should only use valid PresetCategory values", () => {
    const validCategories: PresetCategory[] = [
      "nuansa-waktu",
      "nuansa-cuaca",
      "latar-belakang",
    ];
    for (const preset of PRESETS) {
      expect(validCategories).toContain(preset.category);
    }
  });
});

describe("PRESET_CATEGORIES", () => {
  it("should have a display label for every valid category", () => {
    expect(PRESET_CATEGORIES["nuansa-waktu"]).toBeTruthy();
    expect(PRESET_CATEGORIES["nuansa-cuaca"]).toBeTruthy();
    expect(PRESET_CATEGORIES["latar-belakang"]).toBeTruthy();
  });
});
