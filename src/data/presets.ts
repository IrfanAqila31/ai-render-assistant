export type PresetCategory = "nuansa-waktu" | "nuansa-cuaca" | "latar-belakang";

export interface Preset {
  id: string;
  name: string;
  description: string;
  category: PresetCategory;
  promptText: string;
}

export const PRESET_CATEGORIES: Record<PresetCategory, string> = {
  "nuansa-waktu": "Nuansa Waktu",
  "nuansa-cuaca": "Nuansa Cuaca",
  "latar-belakang": "Latar Belakang",
} as const;

// ---------------------------------------------------------------------------
// Shared constraints — disertakan di setiap prompt untuk konsistensi
// ---------------------------------------------------------------------------

const GLASS_INSTRUCTION =
  "Render all glass surfaces as realistic architectural glass: " +
  "semi-transparent with soft, subtle reflections — NOT a perfect mirror. " +
  "Glass should show slight transparency, diffused glare, and natural light interaction.";

// Untuk preset nuansa: bangunan dipertahankan, hanya pencahayaan/suasana yang berubah
const buatPrompt = (isiGaya: string): string =>
  "Transform this architectural image into a high-quality photorealistic visualization. " +
  isiGaya +
  "\n\n" +
  GLASS_INSTRUCTION +
  "\n\n" +
  "STRICT CONSTRAINTS — DO NOT add, remove, or replace any objects or structures. " +
  "DO NOT add trees, plants, vehicles, people, outdoor furniture, or decorative objects. " +
  "Preserve ALL existing architectural elements exactly. " +
  "Only modify lighting, atmosphere, sky, and photorealistic quality.";

// Untuk preset latar belakang: background diganti, bangunan utama dipertahankan
const buatPromptLatar = (isiBg: string): string =>
  "Transform this architectural image into a high-quality photorealistic visualization. " +
  isiBg +
  "\n\n" +
  GLASS_INSTRUCTION +
  "\n\n" +
  "STRICT CONSTRAINTS — Preserve the main building/structure EXACTLY as shown. " +
  "Do NOT modify the architecture, materials, proportions, windows, or any foreground elements. " +
  "Only add or replace the background environment visible behind the building.";

// ---------------------------------------------------------------------------
// Preset data
// ---------------------------------------------------------------------------

export const PRESETS: Preset[] = [
  // ── Nuansa Waktu ──────────────────────────────────────────────────────────
  {
    id: "pagi-hari",
    name: "Pagi Hari",
    description: "Golden hour pagi, bayangan panjang, tone keemasan",
    category: "nuansa-waktu",
    promptText: buatPrompt(
      "Apply warm early-morning golden hour lighting: low-angle sunlight casting long dramatic shadows, " +
        "soft golden-orange tones on facade surfaces, gentle warm ambient fill in shaded areas, " +
        "and a clear sky transitioning from deep blue to warm orange near the horizon.",
    ),
  },
  {
    id: "siang-hari",
    name: "Siang Hari",
    description: "Cahaya matahari terik, bayangan pendek, kontras tinggi",
    category: "nuansa-waktu",
    promptText: buatPrompt(
      "Apply harsh midday sunlight: high-angle direct sun creating short, sharp shadows directly beneath overhangs, " +
        "bright neutral-white light on sun-facing surfaces, high contrast between lit and shaded areas, " +
        "and a clear bright blue sky with minimal haze.",
    ),
  },
  {
    id: "malam-hari",
    name: "Malam Hari",
    description: "Pencahayaan buatan eksterior, suasana malam elegan",
    category: "nuansa-waktu",
    promptText: buatPrompt(
      "Apply realistic nighttime exterior lighting: warm artificial light from facade spotlights and wall washers, " +
        "soft pools of light on ground surfaces, deep dark sky with subtle ambient glow, " +
        "interior lights visible through windows creating a warm inhabited feel, " +
        "and realistic light falloff into surrounding darkness.",
    ),
  },

  // ── Nuansa Cuaca ──────────────────────────────────────────────────────────
  {
    id: "berawan",
    name: "Berawan",
    description: "Langit berawan, cahaya difus merata, tone netral",
    category: "nuansa-cuaca",
    promptText: buatPrompt(
      "Apply overcast cloudy sky lighting: thick white cloud cover acting as a giant softbox, " +
        "even diffused light with no harsh shadows, neutral cool-grey color temperature across all surfaces, " +
        "and soft gradual transitions between lit and shaded areas.",
    ),
  },
  {
    id: "mendung",
    name: "Mendung",
    description: "Langit gelap dramatis, cahaya redup, suasana berat",
    category: "nuansa-cuaca",
    promptText: buatPrompt(
      "Apply dramatic stormy overcast lighting: dark heavy cloud cover with deep grey tones, " +
        "very low ambient light with flat minimal shadows, cool desaturated color palette, " +
        "oppressive atmospheric mood with reduced contrast and a sense of impending rain.",
    ),
  },
  {
    id: "hujan",
    name: "Hujan",
    description: "Permukaan basah, refleksi cahaya, efek hujan ringan",
    category: "nuansa-cuaca",
    promptText: buatPrompt(
      "Apply rainy weather conditions: wet ground and horizontal surfaces with realistic water reflections, " +
        "dark grey overcast sky, light rain streaks visible in the air, " +
        "diffused low-contrast lighting, and a cool desaturated atmosphere. " +
        "Wet surfaces should show specular highlights and mirror-like puddle reflections on the ground only.",
    ),
  },
  {
    id: "berkabut",
    name: "Berkabut",
    description: "Kabut tipis, cahaya tersebar lembut, suasana misterius",
    category: "nuansa-cuaca",
    promptText: buatPrompt(
      "Apply thin morning fog atmosphere: soft mist reducing visibility of distant elements, " +
        "scattered diffused light with no defined source, cool neutral color temperature, " +
        "gentle atmospheric depth haze increasing with distance, " +
        "and a calm mysterious mood with softened edges on far surfaces.",
    ),
  },

  // ── Latar Belakang ────────────────────────────────────────────────────────
  {
    id: "latar-perumahan",
    name: "Perumahan",
    description: "Lingkungan perumahan suburban di latar belakang",
    category: "latar-belakang",
    promptText: buatPromptLatar(
      "Replace the background with a realistic suburban residential neighborhood: " +
        "rows of houses at varying distances, tree-lined streets, parked cars, and manicured lawns. " +
        "The neighborhood should recede naturally with atmospheric perspective, " +
        "feel contextually appropriate for the architectural style of the main building, " +
        "and be lit consistently with the existing lighting in the foreground.",
    ),
  },
];
