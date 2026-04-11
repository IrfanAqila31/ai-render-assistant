// src/components/ImageUpload.tsx
import { useState } from 'react';
import { UploadCloud } from 'lucide-react';

// Definisin tipe props yang harus dikasih sama parentnya
interface ImageUploadProps {
  onFileSelect: (file: File | null) => void; // Fungsi callback buat ngirim file
}

export default function ImageUpload({ onFileSelect }: ImageUploadProps) { // Terima props di sini
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 1. Kirim file asli ke parent (WorkspacePage)
      onFileSelect(file); 
      
      // 2. Bikin preview lokal kayak sebelumnya
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Fungsi buat hapus gambar
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onFileSelect(null); // Kasih tahu parent kalo gambarnya diapus
  };

  return (
    // Bagian JSX-nya sama persis, cuma ganti fungsi di tombol hapus aja
    <fieldset className="w-full">
      <legend className="sr-only">Unggah Gambar SketchUp Mentah</legend>

      {!previewUrl ? (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-all group"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-10 h-10 mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold text-blue-600">Klik untuk unggah</span> atau seret file ke sini
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, atau JPEG (Maks. 5MB)</p>
          </div>
          <input id="file-upload" type="file" accept="image/png, image/jpeg, image/jpg" className="hidden" onChange={handleFileChange} />
        </label>
      ) : (
        <figure className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-200 group shadow-sm">
          <img src={previewUrl} alt="Preview SketchUp Mentah" className="w-full h-full object-cover" />
          <figcaption className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <button
              type="button"
              onClick={handleRemoveImage} // Pake fungsi remove yang baru
              className="bg-white text-red-600 px-5 py-2.5 rounded-lg font-bold hover:bg-red-50 transition-colors shadow-lg transform hover:scale-105"
            >
              Hapus & Ganti Gambar
            </button>
          </figcaption>
        </figure>
      )}
    </fieldset>
  );
}