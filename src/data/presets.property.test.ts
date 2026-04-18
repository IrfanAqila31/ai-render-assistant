import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { PRESETS } from "./presets";
import type { PresetCategory } from "./presets";

const VALID_CATEGORIES: PresetCategory[] = [
  "nuansa-waktu",
  "nuansa-cuaca",
  "latar-belakang",
];

/**
 * Property 5: Semua preset memiliki instruksi preservasi bangunan utama
 * Validates: Requirements 4.1
 */
describe("Property 5: Semua preset memiliki teks instruksi preservasi", () => {
  it("setiap preset yang dipilih secara acak harus memiliki instruksi preservasi di promptText", () => {
    fc.assert(
      fc.property(fc.constantFrom(...PRESETS), (preset) => {
        return (
          preset.promptText.includes("Preserve") ||
          preset.promptText.includes("STRICT CONSTRAINTS")
        );
      }),
      { numRuns: 100 },
    );
  });
});

/**
 * Property 6: Setiap kategori terwakili dengan jumlah preset yang benar
 * Validates: Requirements 1.1, 1.2
 */
describe("Property 6: Setiap kategori terwakili dengan jumlah preset yang benar", () => {
  it("filter nuansa-waktu harus menghasilkan minimal 3 preset", () => {
    fc.assert(
      fc.property(fc.constant(PRESETS), (presets) => {
        const waktuPresets = presets.filter(
          (p) => p.category === "nuansa-waktu",
        );
        return waktuPresets.length >= 3;
      }),
      { numRuns: 100 },
    );
  });

  it("filter nuansa-cuaca harus menghasilkan minimal 4 preset", () => {
    fc.assert(
      fc.property(fc.constant(PRESETS), (presets) => {
        const cuacaPresets = presets.filter(
          (p) => p.category === "nuansa-cuaca",
        );
        return cuacaPresets.length >= 4;
      }),
      { numRuns: 100 },
    );
  });
});

/**
 * Property 7: Integritas struktural setiap preset
 * Validates: Requirements 1.3, 5.1, 5.3
 */
describe("Property 7: Integritas struktural setiap preset", () => {
  it("setiap preset yang dipilih secara acak harus memiliki semua field non-empty dan category yang valid", () => {
    fc.assert(
      fc.property(fc.constantFrom(...PRESETS), (preset) => {
        const hasNonEmptyId =
          typeof preset.id === "string" && preset.id.length > 0;
        const hasNonEmptyName =
          typeof preset.name === "string" && preset.name.length > 0;
        const hasNonEmptyDescription =
          typeof preset.description === "string" &&
          preset.description.length > 0;
        const hasValidCategory = VALID_CATEGORIES.includes(preset.category);
        const hasNonEmptyPromptText =
          typeof preset.promptText === "string" && preset.promptText.length > 0;

        return (
          hasNonEmptyId &&
          hasNonEmptyName &&
          hasNonEmptyDescription &&
          hasValidCategory &&
          hasNonEmptyPromptText
        );
      }),
      { numRuns: 100 },
    );
  });

  it("semua id preset harus unik di seluruh array PRESETS", () => {
    fc.assert(
      fc.property(fc.constant(PRESETS), (presets) => {
        const ids = presets.map((p) => p.id);
        const uniqueIds = new Set(ids);
        return uniqueIds.size === ids.length;
      }),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// State integration helpers — mirrors the logic in WorkspacePage
// ---------------------------------------------------------------------------

/**
 * Simulates WorkspacePage.handlePresetSelect:
 * Finds the preset by id and returns the new state, or null if not found.
 */
function simulateHandlePresetSelect(
  id: string,
): { prompt: string; activePresetId: string } | null {
  const preset = PRESETS.find((p) => p.id === id);
  if (!preset) return null;
  return { prompt: preset.promptText, activePresetId: id };
}

/**
 * Simulates WorkspacePage.handlePromptChange:
 * Updates prompt and clears activePresetId when the text differs from the
 * active preset's promptText.
 */
function simulateHandlePromptChange(
  text: string,
  currentActivePresetId: string | null,
): { prompt: string; activePresetId: string | null } {
  let nextActivePresetId = currentActivePresetId;
  if (currentActivePresetId !== null) {
    const activePreset = PRESETS.find((p) => p.id === currentActivePresetId);
    if (activePreset && text !== activePreset.promptText) {
      nextActivePresetId = null;
    }
  }
  return { prompt: text, activePresetId: nextActivePresetId };
}

// ---------------------------------------------------------------------------
// Property 1: Pemilihan preset mengisi prompt dan textarea
// Validates: Requirements 2.1, 2.2
// ---------------------------------------------------------------------------

describe("Property 1: Pemilihan preset mengisi prompt dan textarea", () => {
  it("setelah handlePresetSelect dipanggil, prompt state harus identik dengan preset.promptText", () => {
    fc.assert(
      fc.property(fc.constantFrom(...PRESETS), (preset) => {
        const result = simulateHandlePresetSelect(preset.id);

        // handlePresetSelect harus selalu menemukan preset yang valid
        expect(result).not.toBeNull();

        // prompt state harus identik dengan promptText preset yang dipilih
        expect(result!.prompt).toBe(preset.promptText);

        // activePresetId harus di-set ke id preset yang dipilih
        expect(result!.activePresetId).toBe(preset.id);

        return true;
      }),
      { numRuns: 100 },
    );
  });

  it("handlePresetSelect dengan id yang tidak ada harus mengembalikan null (tidak ada perubahan state)", () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => !PRESETS.some((p) => p.id === s)),
        (invalidId) => {
          const result = simulateHandlePresetSelect(invalidId);
          expect(result).toBeNull();
          return true;
        },
      ),
      { numRuns: 100 },
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3: Pengeditan manual menghapus penanda active preset
// Validates: Requirements 3.2
// ---------------------------------------------------------------------------

describe("Property 3: Pengeditan manual menghapus penanda active preset", () => {
  it("handlePromptChange dengan teks berbeda dari promptText preset aktif harus me-reset activePresetId ke null", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...PRESETS),
        fc.string().filter((s) => s !== ""),
        (activePreset, editedText) => {
          // Pastikan teks yang diedit berbeda dari promptText preset aktif
          fc.pre(editedText !== activePreset.promptText);

          const result = simulateHandlePromptChange(
            editedText,
            activePreset.id,
          );

          // prompt harus diperbarui dengan teks yang diedit
          expect(result.prompt).toBe(editedText);

          // activePresetId harus di-reset ke null karena teks berbeda
          expect(result.activePresetId).toBeNull();

          return true;
        },
      ),
      { numRuns: 100 },
    );
  });

  it("handlePromptChange dengan teks yang sama dengan promptText preset aktif harus mempertahankan activePresetId", () => {
    fc.assert(
      fc.property(fc.constantFrom(...PRESETS), (activePreset) => {
        // Mengetik ulang teks yang sama persis tidak boleh menghapus active preset
        const result = simulateHandlePromptChange(
          activePreset.promptText,
          activePreset.id,
        );

        expect(result.prompt).toBe(activePreset.promptText);
        expect(result.activePresetId).toBe(activePreset.id);

        return true;
      }),
      { numRuns: 100 },
    );
  });

  it("handlePromptChange ketika tidak ada preset aktif harus tetap mempertahankan activePresetId null", () => {
    fc.assert(
      fc.property(fc.string(), (text) => {
        const result = simulateHandlePromptChange(text, null);

        expect(result.prompt).toBe(text);
        expect(result.activePresetId).toBeNull();

        return true;
      }),
      { numRuns: 100 },
    );
  });
});
