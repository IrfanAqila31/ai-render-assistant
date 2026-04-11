// src/services/aiService.ts
import axios from "axios";
import { z } from "zod";

// 1. Kita bikin "Satpam" pake Zod
// Biar kalo backend AI (misal Replicate/Midjourney) ngirim data yang aneh, aplikasi kita ga langsung meledak
const RenderResponseSchema = z.object({
  success: z.boolean(),
  // Validasi ketat: harus berupa string dan formatnya harus URL yang valid!
  imageUrl: z
    .string()
    .url({ message: "Waduh, URL gambar dari server ga valid ges" }),
});

// Bikin tipe typescript otomatis dari skema Zod di atas
export type RenderResponse = z.infer<typeof RenderResponseSchema>;

// 2. Fungsi utama buat nembak API pake Axios
export const generateRender = async (
  imageFile: File,
  prompt: string,
): Promise<string> => {
  try {
    // Siapin data format FormData karena kita ngirim file gambar beneran (bukan JSON doang)
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("prompt", prompt);

    console.log("Axios siap-siap nembak API dengan prompt:", prompt);

    /* ======================================================================
    --- KODE ASLI BUAT NEMBAK API ---
    (Saya comment dulu ya, nanti tinggal dibuka kalo backendnya udah siap)
    
    const API_URL = 'https://api.backend-kamu.com/v1/render'; 
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer TOKEN_RAHASIA_DI_SINI`
      }
    });

    // Validasi data dari backend pake Zod (Satpam kita kerja nih)
    const safeData = RenderResponseSchema.parse(response.data);
    return safeData.imageUrl;
    ======================================================================
    */

    // --- KODE BOHONGAN (MOCK) BUAT NGETES ALUR AXIOS & ZOD ---
    // Karena kita belum punya API beneran, kita simulasikan aja
    await new Promise((resolve) => setTimeout(resolve, 3500)); // Pura-puranya loading 3.5 detik

    // Kita bikin seolah-olah nerima data JSON dari server
    const mockServerResponse = {
      success: true,
      // Pake gambar Unsplash sebagai hasil render pura-pura
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    };

    // Nah, data mock tadi kita paksa lewatin Zod.
    // Kalo strukturnya beda dari schema di atas, dia bakal otomatis error!
    const safeData = RenderResponseSchema.parse(mockServerResponse);

    return safeData.imageUrl;
  } catch (error) {
    // Tangkep error spesifik dari Zod
    if (error instanceof z.ZodError) {
      // PERBAIKAN DI SINI: Ganti error.errors jadi error.message
      console.error("Wah format data dari server ngaco:", error.message);
      throw new Error("Sistem AI mengembalikan format data yang salah.");
    }

    // Tangkep error spesifik dari Axios (misal RTO atau 404)
    if (axios.isAxiosError(error)) {
      console.error("Axios gagal nembak:", error.message);
      throw new Error(
        "Gagal terhubung ke server AI. Coba cek koneksi internetnya.",
      );
    }

    // Error lainnya
    // Biar aman dari TS, casting error-nya jadi Error standar pakai (error as Error).message
    const unknownError = error as Error;
    console.error("Error tidak terduga:", unknownError.message);
    throw new Error("Terjadi kesalahan misterius pas mau nge-render wkwk.");
  }
};
