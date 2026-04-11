// src/components/Header.tsx
import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Judul Aplikasi */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight text-gray-900 group"
            >
              AI Render{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-indigo-600 group-hover:to-blue-600 transition-all duration-500">
                Assistant
              </span>
            </Link>
          </div>

          {/* Navigasi Menu Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors duration-200"
            >
              Beranda
            </Link>
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors duration-200"
            >
              Fitur
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors duration-200"
            >
              Harga
            </a>
          </nav>

          {/* Tombol Aksi Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors duration-200"
            >
              Masuk
            </Link>
            <Link
              to="/workspace"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Coba Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="sr-only">Buka menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Beranda
            </Link>
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Fitur
            </a>
            <a
              href="#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Harga
            </a>
            <div className="border-t border-gray-100 my-4 pt-4">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-3 text-base font-semibold text-gray-800 hover:text-blue-600 rounded-lg transition-colors mb-2"
              >
                Masuk
              </Link>
              <Link
                to="/workspace"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-base font-bold transition-colors shadow-md"
              >
                Coba Gratis Sekarang
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
