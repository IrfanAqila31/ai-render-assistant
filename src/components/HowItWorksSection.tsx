// src/components/HowItWorksSection.tsx
import { UploadCloud, PenTool, Image as ImageIcon } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Judul Bagian */}
        <header className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Cara Kerja yang Sangat Mudah
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Ubah ide desain Anda menjadi mahakarya visual hanya dalam tiga langkah sederhana.
          </p>
        </header>

        <div className="relative">
          {/* Garis penghubung gradient (hanya desktop) */}
          <div className="hidden md:block absolute top-18 left-[10%] right-[10%] h-1 bg-linear-to-r from-blue-100 via-blue-500 to-indigo-100 z-0 rounded-full"></div>

          {/* Daftar Langkah Berurutan */}
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative z-10 text-center mx-auto">
            
            {/* Langkah 1 */}
            <li className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white shadow-xl shadow-blue-900/10 text-blue-600 rounded-full flex items-center justify-center mb-8 border border-blue-50 relative group">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">1</span>
                <UploadCloud className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Unggah Desain</h3>
              <p className="text-gray-600 leading-relaxed">
                Ambil tangkapan layar atau ekspor gambar 2D dari model SketchUp mentah Anda, lalu unggah.
              </p>
            </li>

            {/* Langkah 2 */}
            <li className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white shadow-xl shadow-blue-900/10 text-blue-600 rounded-full flex items-center justify-center mb-8 border border-blue-50 relative group">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">2</span>
                <PenTool className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tulis Instruksi</h3>
              <p className="text-gray-600 leading-relaxed">
                Berikan deskripsi detail (prompt) material dan suasana. Misalnya: "industrial, bata ekspos".
              </p>
            </li>

            {/* Langkah 3 */}
            <li className="flex flex-col items-center">
              <div className="w-20 h-20 bg-white shadow-xl shadow-blue-900/10 text-blue-600 rounded-full flex items-center justify-center mb-8 border border-blue-50 relative group">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">3</span>
                <ImageIcon className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Terima Hasil</h3>
              <p className="text-gray-600 leading-relaxed">
                Sistem akan memproses dan menyajikan hasil render fotorealistik sambil mempertahankan presisi asli.
              </p>
            </li>

          </ol>
        </div>
      </div>
    </section>
  );
}