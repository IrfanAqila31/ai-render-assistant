// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import PresetSelector from "./PresetSelector";
import { PRESETS, PRESET_CATEGORIES } from "../data/presets";
import type { Preset } from "../data/presets";

// A small subset of presets for focused tests
const SAMPLE_PRESETS: Preset[] = [
  {
    id: "pagi-hari",
    name: "Pagi Hari",
    description: "Cahaya matahari pagi hangat, bayangan panjang",
    category: "nuansa-waktu",
    promptText: "Prompt pagi hari. PENTING: Jangan tambahkan elemen baru.",
  },
  {
    id: "siang-hari",
    name: "Siang Hari",
    description: "Cahaya matahari terik, bayangan pendek tajam",
    category: "nuansa-waktu",
    promptText: "Prompt siang hari. PENTING: Jangan tambahkan elemen baru.",
  },
  {
    id: "berawan",
    name: "Berawan",
    description: "Langit awan, cahaya difus, tone abu-abu netral",
    category: "nuansa-cuaca",
    promptText: "Prompt berawan. PENTING: Jangan tambahkan elemen baru.",
  },
];

describe("PresetSelector", () => {
  const onPresetSelect = vi.fn();

  beforeEach(() => {
    onPresetSelect.mockClear();
  });

  // Requirement 5.1 — uses <button> elements
  it("merender semua preset yang diberikan sebagai tombol", () => {
    render(
      <PresetSelector
        presets={SAMPLE_PRESETS}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={false}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(SAMPLE_PRESETS.length);

    for (const preset of SAMPLE_PRESETS) {
      expect(
        screen.getByRole("button", { name: new RegExp(preset.name) }),
      ).toBeInTheDocument();
    }
  });

  // Requirement 2.3, 5.2 — aria-pressed reflects active state
  it("tombol dengan activePresetId yang cocok memiliki aria-pressed='true', tombol lain aria-pressed='false'", () => {
    render(
      <PresetSelector
        presets={SAMPLE_PRESETS}
        activePresetId="siang-hari"
        onPresetSelect={onPresetSelect}
        isLoading={false}
      />,
    );

    const activeButton = screen.getByRole("button", {
      name: /Siang Hari/,
    });
    expect(activeButton).toHaveAttribute("aria-pressed", "true");

    const inactiveIds = SAMPLE_PRESETS.filter((p) => p.id !== "siang-hari");
    for (const preset of inactiveIds) {
      const btn = screen.getByRole("button", { name: new RegExp(preset.name) });
      expect(btn).toHaveAttribute("aria-pressed", "false");
    }
  });

  // Requirement 3.3, 5.4 — all buttons disabled when isLoading=true
  it("semua tombol memiliki atribut disabled ketika isLoading={true}", () => {
    render(
      <PresetSelector
        presets={SAMPLE_PRESETS}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={true}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(SAMPLE_PRESETS.length);
    for (const button of buttons) {
      expect(button).toBeDisabled();
    }
  });

  // Requirement 5.1 — buttons are enabled when isLoading=false
  it("semua tombol tidak disabled ketika isLoading={false}", () => {
    render(
      <PresetSelector
        presets={SAMPLE_PRESETS}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={false}
      />,
    );

    const buttons = screen.getAllByRole("button");
    for (const button of buttons) {
      expect(button).not.toBeDisabled();
    }
  });

  // Requirement 5.1 — onPresetSelect called with correct id on click
  it("onPresetSelect dipanggil dengan id yang benar saat tombol diklik", async () => {
    const user = userEvent.setup();
    render(
      <PresetSelector
        presets={SAMPLE_PRESETS}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={false}
      />,
    );

    const berawanButton = screen.getByRole("button", { name: /Berawan/ });
    await user.click(berawanButton);
    expect(onPresetSelect).toHaveBeenCalledTimes(1);
    expect(onPresetSelect).toHaveBeenCalledWith("berawan");
  });

  it("onPresetSelect tidak dipanggil saat tombol diklik ketika isLoading={true}", async () => {
    const user = userEvent.setup();
    render(
      <PresetSelector
        presets={SAMPLE_PRESETS}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={true}
      />,
    );

    const pagiButton = screen.getByRole("button", { name: /Pagi Hari/ });
    await user.click(pagiButton);
    expect(onPresetSelect).not.toHaveBeenCalled();
  });

  // Requirement 5.3 — all buttons have non-empty aria-label
  it("semua tombol memiliki aria-label yang non-empty", () => {
    render(
      <PresetSelector
        presets={SAMPLE_PRESETS}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={false}
      />,
    );

    const buttons = screen.getAllByRole("button");
    for (const button of buttons) {
      const label = button.getAttribute("aria-label");
      expect(label).toBeTruthy();
      expect(label!.trim().length).toBeGreaterThan(0);
    }
  });

  // Requirement 1.3 — presets grouped by category with correct headings
  it("preset dikelompokkan per kategori dengan heading yang benar", () => {
    render(
      <PresetSelector
        presets={SAMPLE_PRESETS}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={false}
      />,
    );

    // Both category headings should be present
    expect(
      screen.getByText(PRESET_CATEGORIES["nuansa-waktu"]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(PRESET_CATEGORIES["nuansa-cuaca"]),
    ).toBeInTheDocument();

    // Headings should be h3 elements
    const headings = screen.getAllByRole("heading", { level: 3 });
    const headingTexts = headings.map((h) => h.textContent);
    expect(headingTexts).toContain(PRESET_CATEGORIES["nuansa-waktu"]);
    expect(headingTexts).toContain(PRESET_CATEGORIES["nuansa-cuaca"]);
  });

  it("hanya menampilkan heading kategori yang memiliki preset", () => {
    const onlyWaktuPresets = SAMPLE_PRESETS.filter(
      (p) => p.category === "nuansa-waktu",
    );
    render(
      <PresetSelector
        presets={onlyWaktuPresets}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={false}
      />,
    );

    expect(
      screen.getByText(PRESET_CATEGORIES["nuansa-waktu"]),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(PRESET_CATEGORIES["nuansa-cuaca"]),
    ).not.toBeInTheDocument();
  });

  // Integration test with full PRESETS data
  it("merender semua 7 preset dari data PRESETS nyata", () => {
    render(
      <PresetSelector
        presets={PRESETS}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={false}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(PRESETS.length);
  });

  it("aria-label setiap tombol mengandung nama dan deskripsi preset", () => {
    render(
      <PresetSelector
        presets={SAMPLE_PRESETS}
        activePresetId={null}
        onPresetSelect={onPresetSelect}
        isLoading={false}
      />,
    );

    for (const preset of SAMPLE_PRESETS) {
      const button = screen.getByRole("button", {
        name: new RegExp(preset.name),
      });
      const label = button.getAttribute("aria-label") ?? "";
      expect(label).toContain(preset.name);
      expect(label).toContain(preset.description);
    }
  });
});
