import type { Preset } from "../data/presets";
import { PRESET_CATEGORIES } from "../data/presets";
import type { PresetCategory } from "../data/presets";

interface PresetSelectorProps {
  presets: Preset[];
  activePresetId: string | null;
  onPresetSelect: (id: string) => void;
  isLoading: boolean;
}

export default function PresetSelector({
  presets,
  activePresetId,
  onPresetSelect,
  isLoading,
}: PresetSelectorProps) {
  // Group presets by category using reduce (Object.groupBy not available in all targets)
  const grouped = presets.reduce<Record<PresetCategory, Preset[]>>(
    (acc, preset) => {
      if (!acc[preset.category]) {
        acc[preset.category] = [];
      }
      acc[preset.category].push(preset);
      return acc;
    },
    {} as Record<PresetCategory, Preset[]>,
  );

  return (
    <section aria-label="Pilih Nuansa" className="space-y-4">
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Pilih Nuansa
      </h2>

      {(Object.keys(PRESET_CATEGORIES) as PresetCategory[]).map((category) => {
        const categoryPresets = grouped[category];
        if (!categoryPresets || categoryPresets.length === 0) return null;

        return (
          <div key={category} className="space-y-2">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {PRESET_CATEGORIES[category]}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {categoryPresets.map((preset) => {
                const isActive = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={`${preset.name}: ${preset.description}`}
                    disabled={isLoading}
                    onClick={() => onPresetSelect(preset.id)}
                    className={[
                      "text-left px-3 py-2 rounded-lg border text-sm transition-colors",
                      isActive
                        ? "border-blue-500 bg-blue-50 text-blue-900"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
                      isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer",
                    ].join(" ")}
                  >
                    <span className="block font-medium">{preset.name}</span>
                    <span className="block text-xs text-gray-500 mt-0.5 leading-snug">
                      {preset.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
