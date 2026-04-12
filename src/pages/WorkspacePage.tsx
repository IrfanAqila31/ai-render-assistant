// src/pages/WorkspacePage.tsx
import { useState } from "react";
import Header from "../components/Header";
import ImageUpload from "../components/ImageUpload";
import PromptInput from "../components/PromptInput";
import RenderResult from "../components/RenderResult";
// IMPORT BARU: Panggil service API yang barusan kita buat
import { generateRender } from "../services/aiServices";

export type RenderStatus = "idle" | "loading" | "success" | "error";

export default function WorkspacePage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [renderStatus, setRenderStatus] = useState<RenderStatus>("idle");
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileSelect = (file: File | null) => {
    setImageFile(file);
    if (renderStatus === "success" || renderStatus === "error") {
      setRenderStatus("idle");
      setResultImageUrl(null);
    }
  };

  const handleStartRender = async () => {
    if (!imageFile || !prompt.trim()) {
      alert("Gambar sama instruksinya diisi dulu ya!");
      return;
    }

    setRenderStatus("loading");
    setErrorMessage("");
    setResultImageUrl(null);

    // --- PERUBAHAN UTAMA DI SINI ---
    try {
      // Kita panggil fungsi generateRender dari aiService.
      // Fungsi ini udah dibungkus Axios + Zod, jadi kita tinggal terima URL gambarnya aja.
      // Await ini bakal nungguin proses di aiService sampai selesai.
      const returnedImageUrl = await generateRender(imageFile, prompt);

      // Kalo sukses dan datanya valid, tampilkan hasilnya!
      setResultImageUrl(returnedImageUrl);
      setRenderStatus("success");
    } catch (error) {
      // Kita cek dulu secara elegan, apakah ini objek Error beneran?
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        // Kalau bentuk errornya aneh-aneh (bukan Error object)
        setErrorMessage(
          "Gagal merender gambar karena alasan yang tidak diketahui.",
        );
      }
      setRenderStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Workspace Studio</h1>
          <p className="text-gray-500 text-sm mt-1">
            Unggah desain mentah dan biarkan AI bekerja.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              1. Pengaturan Render
            </h2>

            <div className="mb-6">
              <ImageUpload onFileSelect={handleFileSelect} />
            </div>

            <div>
              <PromptInput
                prompt={prompt}
                onPromptChange={setPrompt}
                onSubmit={handleStartRender}
                isLoading={renderStatus === "loading"}
              />
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              2. Hasil Render AI
            </h2>

            <div className="grow">
              <RenderResult
                status={renderStatus}
                resultUrl={resultImageUrl}
                error={errorMessage}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
