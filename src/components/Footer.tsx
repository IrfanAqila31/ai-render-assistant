import { Link } from "react-router";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Info Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block text-2xl font-extrabold text-gray-900 mb-6">
              AI Render <span className="text-blue-600">Assistant</span>
            </Link>
            <p className="text-gray-500 leading-relaxed max-w-sm mb-6">
              Platform AI canggih untuk mengubah ide arsitektur Anda menjadi visualisasi realistis dalam hitungan detik. Tanpa batas, tanpa antre.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links Nav */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-5">Navigasi</h3>
            <ul className="space-y-4 text-base text-gray-500">
              <li>
                <a href="#features" className="hover:text-blue-600 transition-colors">Fitur Kami</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-600 transition-colors">Cara Kerja</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-600 transition-colors">Harga & Paket</a>
              </li>
              <li>
                <Link to="/workspace" className="hover:text-blue-600 transition-colors">Coba Workspace</Link>
              </li>
            </ul>
          </div>

          {/* Legal Nav */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-5">Legalitas</h3>
            <ul className="space-y-4 text-base text-gray-500">
              <li>
                <Link to="/about" className="hover:text-blue-600 transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-600 transition-colors">Kebijakan Privasi</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-600 transition-colors">Syarat & Ketentuan</Link>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="mt-16 border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-base text-gray-500 text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} Arc One Studio. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center text-sm text-gray-400">
            Dibuat dengan <span className="text-red-500 mx-1">♥</span> di Indonesia
          </div>
        </div>
      </div>
    </footer>
  );
}