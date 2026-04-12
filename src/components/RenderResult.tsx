// src/components/RenderResult.tsx
import type { RenderStatus } from '../pages/WorkspacePage'; 
import { Download, ImageIcon, Loader2, XCircle,} from 'lucide-react';
import { useState } from 'react';

interface RenderResultProps {
  status: RenderStatus;
  resultUrl: string | null;
  error: string;
}

export default function RenderResult({ status, resultUrl, error }: RenderResultProps) {
  // Tambahin state kecil buat nampilin teks 'Mengunduh...' pas lagi proses download
  const [isDownloading, setIsDownloading] = useState(false);

  // Fungsi sakti buat maksa browser nge-download gambar
  const handleDownload = async () => {
    if (!resultUrl) return;
    
    setIsDownloading(true);
    try {
      // 1. Ambil data gambar dari URL
      const response = await fetch(resultUrl);
      const blob = await response.blob(); // Ubah jadi format Blob (binary large object)
      
      // 2. Bikin URL lokal sementara dari Blob tadi
      const blobUrl = URL.createObjectURL(blob);
      
      // 3. Bikin elemen <a> gaib (nggak kelihatan di layar)
      const link = document.createElement('a');
      link.href = blobUrl;
      // Kasih nama file dinamis pake timestamp biar ga nimpa file lama
      link.download = `ai-render-${Date.now()}.jpg`; 
      
      // 4. Tempelin ke body, klik paksa, terus hapus lagi hahaha
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 5. Bersihin memori biar browser ga lemot
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Gagal download nih:", err);
      // Kalau kena block CORS dari server gambar, fallback aja buka di tab baru
      window.open(resultUrl, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <figure className="grow border border-gray-200 rounded-2xl bg-gray-100 flex flex-col items-center justify-center min-h-[400px] overflow-hidden relative shadow-inner">
        
        {/* Kondisi 1: Idle */}
        {status === 'idle' && (
          <div className="text-center px-6 text-gray-400">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="font-medium">Area Hasil Render</p>
            <p className="text-sm mt-1">Unggah gambar dan klik "Mulai Render AI" di sebelah kiri untuk melihat hasilnya di sini.</p>
          </div>
        )}

        {/* Kondisi 2: Loading */}
        {status === 'loading' && (
          <div className="text-center text-blue-600 flex flex-col items-center">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-bold text-lg animate-pulse">AI sedang merender...</p>
            <p className="text-sm text-gray-500 mt-2">Memproses geometri dan pencahayaan (estimasi 10-15 detik)</p>
          </div>
        )}

        {/* Kondisi 3: Error */}
        {status === 'error' && (
          <div className="text-center text-red-600 flex flex-col items-center px-6">
            <XCircle className="w-16 h-16 mb-4 opacity-80" />
            <p className="font-bold text-lg">Gagal Merender</p>
            <p className="text-sm text-gray-700 bg-red-100 p-3 rounded-lg mt-3 wrap-break-words max-w-sm border border-red-200">
               {error}
            </p>
          </div>
        )}

        {/* Kondisi 4: Success (Hasil Render) */}
        {status === 'success' && resultUrl && (
          <div className="w-full h-full group relative">
            <img 
              src={resultUrl} 
              alt="Hasil Render Fotorealistik AI" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <figcaption className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
              <div className="text-white">
                <p className="font-bold">Render Sukses</p>
                <p className="text-xs text-gray-300">Resolusi: 2048x2048px</p>
              </div>
              <div className="flex gap-2">
                {/* Tombol Download yang beneran jalan! */}
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-transform hover:scale-105 shadow-lg active:scale-95"
                >
                  {isDownloading ? (
                     <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                     <Download className="w-5 h-5" />
                  )}
                  {isDownloading ? "Mengunduh..." : "Unduh HD"}
                </button>
              </div>
            </figcaption>
          </div>
        )}

      </figure>
    </div>
  );
}