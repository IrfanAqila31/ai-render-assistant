// src/components/HeroSection.tsx
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative bg-white pt-32 pb-24 overflow-hidden">
      {/* Decorative Gradients / Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] opacity-30 select-none pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Ubah SketchUp Mentah Jadi Render Realistis dalam{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Hitungan Detik
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Tingkatkan efisiensi kerja arsitektur Anda dengan AI. Dapatkan hasil
          render memukau tanpa perlu spesifikasi komputer dewa atau menunggu
          berjam-jam.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            Coba Gratis Sekarang
          </button>
          <button className="bg-white text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
            Lihat Fitur & Harga
          </button>
        </motion.div>

        {/* Visual Showcase (Before/After placeholder) */}
        <motion.div 
          className="mt-20 mx-auto max-w-4xl relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <div className="aspect-video bg-gray-100 relative group flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300" />
            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden border-r-2 border-white shadow-[2px_0_15px_rgba(0,0,0,0.5)]">
               <div className="absolute inset-0 flex items-center justify-center opacity-70">
                 <span className="text-white font-bold bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">Hasil Render AI</span>
               </div>
            </div>
            <div className="absolute inset-0 left-1/2 right-0 flex items-center justify-center opacity-70">
               <span className="text-gray-800 font-bold bg-white/70 px-4 py-2 rounded-lg backdrop-blur-sm">Aplikasi SketchUp</span>
            </div>
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer z-10 text-gray-600">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
