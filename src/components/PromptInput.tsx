// src/components/PromptInput.tsx
// useState diapus ya ges, karena kita udah ga pake state lokal lagi
import { Wand2 } from "lucide-react";

// Definisin tipe propsnya
interface PromptInputProps {
  prompt: string; // Teks prompt dari parent
  onPromptChange: (text: string) => void; // Fungsi buat ngupdate teks di parent
  onSubmit: () => void; // Fungsi buat trigger render di parent
  isLoading: boolean; // Status loading biar tombolnya bisa dinamis
}

export default function PromptInput({
  prompt,
  onPromptChange,
  onSubmit,
  isLoading,
}: PromptInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Panggil fungsi submit dari parent
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <label htmlFor="prompt-input" className="sr-only">
        Instruksi Render AI
      </label>
      <textarea
        id="prompt-input"
        rows={3}
        className="w-full p-4 text-gray-700 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none bg-white transition-all shadow-inner"
        placeholder="Contoh: Ubah fasad menjadi gaya industrial dengan dinding bata terekspos, jendela kaca besar, dan suasana sore hari..."
        // Pake nilai sama fungsi dari props parent
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        // Matiin input kalo lagi loading
        disabled={isLoading}
      />

      <button
        type="submit"
        // Tombol mati kalo prompt kosong ATAU lagi loading
        disabled={!prompt.trim() || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:transform active:scale-95"
      >
        {/* Kalo loading icon-nya ganti jadi spinner buatan tailwind haha */}
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Wand2 className="w-5 h-5" />
        )}
        {/* Teks tombolnya juga ganti */}
        {isLoading ? "Sedang Merender..." : "Mulai Render AI"}
      </button>
    </form>
  );
}
    