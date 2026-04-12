// src/services/aiService.ts
import axios from "axios";
import { z } from "zod";

const RenderResponseSchema = z.object({
  success: z.boolean(),
  imageUrl: z.string().url({ message: "URL gambar dari server ga valid" }),
});

export const generateRender = async (
  imageFile: File,
  prompt: string,
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("prompt", prompt);

    console.log("Mengirim data ke server backend localhost:3000...");

    // NEMBAK LANGSUNG KE BACKEND EXPRESS
    const response = await axios.post(
      "http://localhost:3000/api/render",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    // Validasi format kembalian dari server pakai Zod
    const safeData = RenderResponseSchema.parse(response.data);
    return safeData.imageUrl;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Wah format data dari server ngaco:", error.message);
      throw new Error("Sistem AI mengembalikan format data yang salah.");
    }
    if (axios.isAxiosError(error)) {
      console.error("Axios gagal nembak:", error.message);
      throw new Error(
        "Gagal terhubung ke server Backend. Pastikan node server.js sudah jalan.",
      );
    }
    const unknownError = error as Error;
    console.error("Error tidak terduga:", unknownError.message);
    throw new Error(unknownError.message || "Terjadi kesalahan misterius.");
  }
};
