// src/components/FeaturesSection.tsx
import { Zap, Target, Cloud } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Judul Bagian */}
        <header className="text-center mb-20 relative">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
            Kenapa Memilih{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              AI Render Assistant?
            </span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Solusi cerdas untuk visualisasi arsitektur yang cepat, presisi, dan
            sangat menghemat biaya operasional studio Anda.
          </p>
        </header>

        {/* Grid Fitur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Fitur 1 */}
          <article className="group bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-linear-to-br from-blue-100 to-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Kecepatan Instan
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Render selesai dalam hitungan detik. Tidak perlu lagi membuang
              waktu berharga menunggu siklus *render* tradisional.
            </p>
          </article>

          {/* Fitur 2 */}
          <article className="group bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-linear-to-br from-indigo-100 to-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Presisi Geometri
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Struktur dan proporsi bangunan Anda terkunci sempurna. Tampilkan
              visi arsitektur dengan akurasi 100%.
            </p>
          </article>

          {/* Fitur 3 */}
          <article className="group bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 bg-linear-to-br from-purple-100 to-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Cloud className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tanpa Komputer Mahal
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Pemrosesan berat dilakukan di *cloud*. Gunakan laptop ringan Anda
              untuk bekerja dari mana saja tanpa kendala.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
