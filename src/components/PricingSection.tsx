// src/components/PricingSection.tsx
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-20">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pilih Paket Sesuai Kebutuhan
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Dari trial gratis untuk pemula hingga akses penuh berkualitas dewa
            untuk profesional.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Paket Pemula */}
          <article className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pemula</h3>
            <p className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Rp0{" "}
              <span className="text-lg font-medium text-gray-500 tracking-normal">
                / selamanya
              </span>
            </p>
            <p className="text-gray-600 mb-8 text-lg">
              Cocok buat mencoba *prompt* AI dan melihat kualitas hasil awal.
            </p>

            <ul className="space-y-5 mb-10">
              <li className="flex items-center text-gray-700">
                <div className="bg-green-100 p-1 rounded-full mr-4">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                </div>
                <strong>5 kredit</strong>
                {""} render per bulan
              </li>
              <li className="flex items-center text-gray-700">
                <div className="bg-green-100 p-1 rounded-full mr-4">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                </div>
                Kualitas standar (720p)
              </li>
              <li className="flex items-center text-gray-700">
                <div className="bg-green-100 p-1 rounded-full mr-4">
                  <Check className="w-4 h-4 text-green-600" strokeWidth={3} />
                </div>
                Antrean server reguler
              </li>
            </ul>

            <button className="w-full bg-blue-50 text-blue-700 font-bold py-4 rounded-xl hover:bg-blue-100 transition-colors text-lg">
              Mulai Gratis
            </button>
          </article>

          {/* Paket Pro */}
          <article className="group bg-white p-10 rounded-3xl shadow-xl shadow-blue-900/10 border-2 border-blue-600 relative hover:-translate-y-2 transition-all duration-300">
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                Paling Laris
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pro Arsitek
            </h3>
            <p className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Rp99k{" "}
              <span className="text-lg font-medium text-gray-500 tracking-normal">
                / bulan
              </span>
            </p>
            <p className="text-gray-600 mb-8 text-lg">
              Akses penuh untuk visualisasi proyek klien tanpa batasan kualitas.
            </p>

            <ul className="space-y-5 mb-10">
              <li className="flex items-center text-gray-700">
                <div className="bg-blue-100 p-1 rounded-full mr-4">
                  <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />
                </div>
                <strong>100 kredit </strong>
                {""} render per bulan
              </li>
              <li className="flex items-center text-gray-700">
                <div className="bg-blue-100 p-1 rounded-full mr-4">
                  <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />
                </div>
                Resolusi super tinggi (4K & 8K)
              </li>
              <li className="flex items-center text-gray-700">
                <div className="bg-blue-100 p-1 rounded-full mr-4">
                  <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />
                </div>
                Jalur prioritas (tanpa antre)
              </li>
            </ul>

            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-600/30 text-lg">
              Langganan Sekarang
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
