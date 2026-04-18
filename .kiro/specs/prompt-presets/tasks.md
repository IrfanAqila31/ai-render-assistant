# Implementation Plan: Prompt Presets

## Overview

Implementasi fitur Prompt Presets secara bertahap: mulai dari data layer (konstanta preset), lalu komponen UI `PresetSelector`, kemudian integrasi ke `WorkspacePage`, dan diakhiri dengan test suite (unit + property-based tests). Setiap langkah langsung terintegrasi ke langkah sebelumnya — tidak ada kode yang menggantung.

## Tasks

- [x] 1. Buat data layer preset di `src/data/presets.ts`
  - Definisikan union type `PresetCategory = "nuansa-waktu" | "nuansa-cuaca"`
  - Definisikan interface `Preset` dengan field: `id`, `name`, `description`, `category`, `promptText`
  - Ekspor konstanta `PRESET_CATEGORIES: Record<PresetCategory, string>` sebagai label display
  - Implementasikan array `PRESETS` dengan 7 preset statis:
    - 3 preset `nuansa-waktu`: `pagi-hari`, `siang-hari`, `malam-hari`
    - 4 preset `nuansa-cuaca`: `berawan`, `mendung`, `hujan`, `berkabut`
  - Setiap `promptText` harus mengikuti pola desain: deskripsi pencahayaan/suasana + klausa PENTING yang melarang penambahan pohon, tanaman, kendaraan, orang, furnitur luar ruangan, dan objek dekoratif
  - Gunakan `named export` untuk semua tipe dan konstanta (bukan `default export`)
  - _Requirements: 1.1, 1.2, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_

  - [x] 1.1 Tulis unit tests untuk data preset di `src/data/presets.test.ts`
    - Test: semua 7 preset ada dan memiliki field `id`, `name`, `description`, `category`, `promptText` yang non-empty
    - Test: tidak ada `id` duplikat di seluruh array `PRESETS`
    - Test: tepat 3 preset berkategori `nuansa-waktu` dan tepat 4 preset berkategori `nuansa-cuaca`
    - Test: setiap `promptText` mengandung kata kunci larangan (misalnya "Jangan tambahkan")
    - _Requirements: 1.1, 1.2, 4.1_

  - [x] 1.2 Tulis property-based tests untuk data preset di `src/data/presets.property.test.ts`
    - **Property 5: Semua preset memiliki teks larangan elemen baru**
    - Gunakan `fc.constantFrom(...PRESETS)` untuk mengambil preset secara acak, verifikasi `promptText` mengandung instruksi larangan
    - **Validates: Requirements 4.1**
    - **Property 6: Setiap kategori terwakili dengan jumlah preset yang benar**
    - Verifikasi filter `nuansa-waktu` ≥ 3 dan filter `nuansa-cuaca` ≥ 4 — jalankan minimal 100 iterasi
    - **Validates: Requirements 1.1, 1.2**
    - **Property 7: Integritas struktural setiap preset**
    - Gunakan `fc.constantFrom(...PRESETS)`, verifikasi setiap field non-empty dan `category` adalah nilai valid `PresetCategory`
    - **Validates: Requirements 1.3, 5.1, 5.3**

- [x] 2. Checkpoint — Pastikan semua tests di task 1 lulus
  - Jalankan `npx vitest run src/data/` dan pastikan tidak ada error
  - Tanyakan ke user jika ada pertanyaan sebelum melanjutkan

- [x] 3. Buat komponen `src/components/PresetSelector.tsx`
  - Definisikan `interface PresetSelectorProps` dengan props: `presets: Preset[]`, `activePresetId: string | null`, `onPresetSelect: (id: string) => void`, `isLoading: boolean`
  - Implementasikan grouping preset per kategori menggunakan `reduce` (karena `Object.groupBy` belum tersedia di semua target)
  - Iterasi `PRESET_CATEGORIES` untuk urutan tampil yang konsisten
  - Render wrapper `<section>` dengan label "Pilih Nuansa"
  - Per kategori: render `<div>` dengan heading `<h3>` dan grid tombol responsif (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`)
  - Setiap preset dirender sebagai `<button>` dengan:
    - `aria-pressed={activePresetId === preset.id}` (boolean, bukan string)
    - `aria-label` deskriptif yang menyertakan nama dan deskripsi preset
    - `disabled={isLoading}`
    - Visual aktif: border biru + background biru muda (Tailwind classes)
    - Visual disabled: opacity berkurang + `cursor-not-allowed`
  - Gunakan `default export` untuk komponen
  - _Requirements: 1.3, 1.4, 1.5, 2.3, 3.3, 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 3.1 Tulis unit tests untuk `PresetSelector` di `src/components/PresetSelector.test.tsx`
    - Test: merender semua preset yang diberikan sebagai tombol
    - Test: tombol dengan `activePresetId` yang cocok memiliki `aria-pressed="true"`, tombol lain `aria-pressed="false"`
    - Test: semua tombol memiliki atribut `disabled` ketika `isLoading={true}`
    - Test: `onPresetSelect` dipanggil dengan `id` yang benar saat tombol diklik
    - Test: semua tombol memiliki `aria-label` yang non-empty
    - Test: preset dikelompokkan per kategori dengan heading yang benar
    - _Requirements: 1.3, 2.3, 3.3, 5.1, 5.2, 5.3, 5.4_

  - [x] 3.2 Tulis property-based tests untuk `PresetSelector` di `src/components/PresetSelector.property.test.tsx`
    - **Property 2: Preset aktif ditandai dengan aria-pressed yang benar**
    - Gunakan `fc.constantFrom(...PRESETS)` untuk memilih preset acak sebagai `activePresetId`, render `PresetSelector`, verifikasi hanya tombol yang sesuai memiliki `aria-pressed="true"` dan semua lainnya `aria-pressed="false"`
    - **Validates: Requirements 2.3, 5.2**
    - **Property 4: isLoading menonaktifkan semua tombol preset**
    - Render `PresetSelector` dengan `isLoading={true}` dan array preset acak (gunakan `fc.array(fc.constantFrom(...PRESETS))`), verifikasi semua `<button>` memiliki atribut `disabled`
    - **Validates: Requirements 3.3, 5.4**
    - **Property 7 (rendering): Integritas struktural rendering preset**
    - Untuk setiap preset dalam `PRESETS`, verifikasi dirender sebagai `<button>` dengan `aria-label` non-empty
    - **Validates: Requirements 1.3, 5.1, 5.3**

- [x] 4. Checkpoint — Pastikan semua tests di task 3 lulus
  - Jalankan `npx vitest run src/components/PresetSelector` dan pastikan tidak ada error
  - Tanyakan ke user jika ada pertanyaan sebelum melanjutkan

- [x] 5. Integrasikan `PresetSelector` ke `src/pages/WorkspacePage.tsx`
  - Tambahkan state baru: `const [activePresetId, setActivePresetId] = useState<string | null>(null)`
  - Tambahkan handler `handlePresetSelect(id: string)`:
    - Cari preset di `PRESETS` berdasarkan `id`
    - Jika tidak ditemukan, early return (tidak ada perubahan state)
    - Set `prompt` ke `preset.promptText` dan `activePresetId` ke `id`
  - Modifikasi handler `handlePromptChange(text: string)` (ganti `setPrompt` langsung):
    - Set `prompt` ke `text`
    - Jika `activePresetId !== null` dan `text !== activePreset.promptText`, set `activePresetId` ke `null`
  - Sisipkan `<PresetSelector>` di JSX antara `<ImageUpload>` dan `<PromptInput>` dalam section "Pengaturan Render"
  - Teruskan props: `presets={PRESETS}`, `activePresetId={activePresetId}`, `onPresetSelect={handlePresetSelect}`, `isLoading={renderStatus === "loading"}`
  - Ganti `onPromptChange={setPrompt}` di `<PromptInput>` dengan `onPromptChange={handlePromptChange}`
  - Import `PresetSelector` dari `../components/PresetSelector` dan `PRESETS` dari `../data/presets`
  - _Requirements: 1.5, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_

  - [x] 5.1 Tulis property-based tests untuk integrasi state di `src/data/presets.property.test.ts` (tambahkan ke file yang sudah ada)
    - **Property 1: Pemilihan preset mengisi prompt dan textarea**
    - Gunakan `fc.constantFrom(...PRESETS)`, simulasikan `handlePresetSelect`, verifikasi `prompt` state identik dengan `preset.promptText`
    - **Validates: Requirements 2.1, 2.2**
    - **Property 3: Pengeditan manual menghapus penanda active preset**
    - Untuk setiap preset aktif, simulasikan `handlePromptChange` dengan teks yang berbeda dari `promptText`, verifikasi `activePresetId` menjadi `null`
    - Gunakan `fc.string()` yang difilter untuk memastikan teks berbeda dari `promptText` preset aktif
    - **Validates: Requirements 3.2**

- [x] 6. Checkpoint final — Pastikan semua tests lulus dan build bersih
  - Jalankan `npx vitest run` untuk semua test suite
  - Jalankan `npm run build` untuk memastikan tidak ada TypeScript error atau build failure
  - Tanyakan ke user jika ada pertanyaan sebelum mendeklarasikan selesai

## Notes

- Tasks bertanda `*` bersifat opsional dan bisa dilewati untuk MVP yang lebih cepat
- Setiap task mereferensikan requirement spesifik untuk traceability
- Checkpoint memastikan validasi inkremental sebelum melanjutkan ke task berikutnya
- Property tests menggunakan `fc.constantFrom(...PRESETS)` untuk sampling dari data nyata, bukan data sintetis
- Semua property tests dikonfigurasi dengan minimal 100 iterasi (`{ numRuns: 100 }`)
- `fast-check` perlu diinstall sebagai dev dependency: `npm install --save-dev fast-check`
- Gunakan `verbatimModuleSyntax` — import tipe harus menggunakan `import type { ... }`
