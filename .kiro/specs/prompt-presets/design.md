# Design Document: Prompt Presets

## Overview

Fitur **Prompt Presets** menambahkan komponen `PresetSelector` ke halaman Workspace yang memungkinkan pengguna memilih preset prompt yang sudah dikurasi — tanpa perlu menulis prompt dari nol. Setiap preset berisi instruksi pencahayaan/suasana yang spesifik sekaligus secara eksplisit melarang AI menambahkan elemen baru ke gambar input.

Fitur ini murni frontend: tidak ada backend baru, tidak ada API call tambahan. Data preset disimpan sebagai konstanta statis di `src/data/presets.ts`. Alur render yang sudah ada di `WorkspacePage` tidak berubah — preset hanya memodifikasi nilai string `prompt` sebelum dikirim ke API yang sudah ada.

### Alur Utama

1. Pengguna membuka `/workspace`
2. `PresetSelector` ditampilkan di atas `PromptInput` dalam section "Pengaturan Render"
3. Pengguna mengklik salah satu preset → `WorkspacePage` memperbarui state `prompt` dengan teks preset, dan `activePresetId` dengan ID preset tersebut
4. Teks preset muncul di `PromptInput` textarea — bisa langsung diedit
5. Jika pengguna mengedit teks, `activePresetId` di-reset ke `null` (mode Custom Prompt)
6. Pengguna menekan "Mulai Render AI" → alur render berjalan seperti biasa

---

## Architecture

Fitur ini mengikuti pola arsitektur yang sudah ada: **Pages own state, Components are stateless UI units**.

```
WorkspacePage (state owner)
├── state: prompt (string)
├── state: activePresetId (string | null)  ← BARU
├── handler: handlePresetSelect(id: string) ← BARU
├── handler: handlePromptChange(text: string) ← DIMODIFIKASI
│
├── PresetSelector (komponen baru)
│   ├── props: presets, activePresetId, onPresetSelect, isLoading
│   └── renders: daftar tombol preset per kategori
│
└── PromptInput (komponen existing, tidak berubah)
    └── props: prompt, onPromptChange, onSubmit, isLoading
```

### Keputusan Desain

**Mengapa state `activePresetId` di `WorkspacePage`, bukan di `PresetSelector`?**
`WorkspacePage` perlu tahu apakah prompt saat ini berasal dari preset atau custom input, karena ia yang mengontrol `prompt` state. Menyimpan `activePresetId` di parent memastikan satu sumber kebenaran (single source of truth) dan memudahkan sinkronisasi antara `PresetSelector` dan `PromptInput`.

**Mengapa data preset di `src/data/presets.ts`, bukan co-located di komponen?**
Data preset adalah konstanta domain yang bisa digunakan di tempat lain (misalnya testing). Memisahkannya dari komponen mengikuti prinsip separation of concerns dan konsisten dengan pola `src/types/` yang sudah ada.

**Mengapa tidak ada state di `PresetSelector`?**
Konsisten dengan konvensi proyek: komponen adalah stateless UI units. Semua state dikelola di `WorkspacePage`.

---

## Components and Interfaces

### 1. `src/data/presets.ts` — Data & Types

File ini mengekspor tipe `Preset`, konstanta `PRESET_CATEGORIES`, dan array `PRESETS`.

```typescript
// Tipe kategori sebagai union type (bukan enum, sesuai erasableSyntaxOnly)
export type PresetCategory = "nuansa-waktu" | "nuansa-cuaca";

// Interface untuk satu preset
export interface Preset {
  id: string; // Slug unik, e.g. "pagi-hari"
  name: string; // Nama singkat, e.g. "Pagi Hari"
  description: string; // Deskripsi ringkas efek visual
  category: PresetCategory;
  promptText: string; // Teks prompt lengkap yang dikirim ke AI
}

// Label display per kategori
export const PRESET_CATEGORIES: Record<PresetCategory, string> = {
  "nuansa-waktu": "Nuansa Waktu",
  "nuansa-cuaca": "Nuansa Cuaca",
} as const;

// Array semua preset — urutan menentukan urutan tampil
export const PRESETS: Preset[] = [
  /* ... lihat Data Models */
];
```

### 2. `src/components/PresetSelector.tsx` — Komponen UI

```typescript
interface PresetSelectorProps {
  presets: Preset[];
  activePresetId: string | null;
  onPresetSelect: (id: string) => void;
  isLoading: boolean;
}

export default function PresetSelector({
  presets,
  activePresetId,
  onPresetSelect,
  isLoading,
}: PresetSelectorProps): JSX.Element;
```

**Rendering logic:**

- Group preset berdasarkan `category` menggunakan `Object.groupBy` atau `reduce`
- Iterasi `PRESET_CATEGORIES` untuk urutan tampil yang konsisten
- Setiap preset dirender sebagai `<button>` dengan `aria-pressed` dan `aria-label`
- Tombol aktif mendapat visual berbeda (border biru + background biru muda)
- Semua tombol `disabled` ketika `isLoading === true`

**Layout:**

- Wrapper: `<section>` dengan label "Pilih Nuansa"
- Per kategori: `<div>` dengan heading `<h3>` dan grid tombol
- Grid responsif: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

### 3. Modifikasi `src/pages/WorkspacePage.tsx`

Perubahan minimal — hanya menambah state dan handler baru:

```typescript
// State baru
const [activePresetId, setActivePresetId] = useState<string | null>(null);

// Handler baru: dipanggil oleh PresetSelector
const handlePresetSelect = (id: string) => {
  const preset = PRESETS.find((p) => p.id === id);
  if (!preset) return;
  setPrompt(preset.promptText);
  setActivePresetId(id);
};

// Handler yang dimodifikasi: reset activePresetId saat user mengetik manual
const handlePromptChange = (text: string) => {
  setPrompt(text);
  // Jika teks berubah dari teks preset aktif, hapus penanda active preset
  if (activePresetId !== null) {
    const activePreset = PRESETS.find((p) => p.id === activePresetId);
    if (activePreset && text !== activePreset.promptText) {
      setActivePresetId(null);
    }
  }
};
```

**Perubahan JSX:** `PresetSelector` disisipkan di antara `ImageUpload` dan `PromptInput` dalam section "Pengaturan Render".

---

## Data Models

### Preset Data (`src/data/presets.ts`)

Tujuh preset statis dengan teks prompt yang secara eksplisit melarang penambahan elemen baru.

#### Nuansa Waktu

| ID           | Name       | Description                                   |
| ------------ | ---------- | --------------------------------------------- |
| `pagi-hari`  | Pagi Hari  | Cahaya matahari pagi hangat, bayangan panjang |
| `siang-hari` | Siang Hari | Cahaya matahari terik, bayangan pendek tajam  |
| `malam-hari` | Malam Hari | Pencahayaan buatan eksterior, suasana malam   |

#### Nuansa Cuaca

| ID         | Name     | Description                                         |
| ---------- | -------- | --------------------------------------------------- |
| `berawan`  | Berawan  | Langit awan, cahaya difus, tone abu-abu netral      |
| `mendung`  | Mendung  | Langit gelap dramatis, cahaya redup, kontras rendah |
| `hujan`    | Hujan    | Permukaan basah, refleksi cahaya, efek hujan ringan |
| `berkabut` | Berkabut | Kabut tipis, cahaya tersebar, suasana misterius     |

#### Contoh Struktur Prompt Text

Setiap `promptText` mengikuti pola:

```
Render ulang gambar arsitektur ini menjadi visualisasi fotorealistis berkualitas tinggi
dengan [deskripsi pencahayaan/suasana spesifik].
PENTING: Jangan tambahkan elemen baru yang tidak ada di gambar asli —
jangan tambahkan pohon, tanaman, kendaraan, orang, furnitur luar ruangan,
atau objek dekoratif apapun. Hanya ubah pencahayaan, suasana, dan kualitas fotorealistik.
```

**Contoh lengkap untuk "Pagi Hari":**

```
Render ulang gambar arsitektur ini menjadi visualisasi fotorealistis berkualitas tinggi
dengan pencahayaan matahari pagi yang hangat (golden hour), bayangan panjang yang
dramatis dari sudut rendah, dan tone warna keemasan yang lembut.
PENTING: Jangan tambahkan elemen baru yang tidak ada di gambar asli —
jangan tambahkan pohon, tanaman, kendaraan, orang, furnitur luar ruangan,
atau objek dekoratif apapun. Hanya ubah pencahayaan, suasana, dan kualitas fotorealistik.
```

### State Shape di `WorkspacePage`

```typescript
// State yang sudah ada
const [prompt, setPrompt] = useState<string>("");
const [renderStatus, setRenderStatus] = useState<RenderStatus>("idle");
const [imageFile, setImageFile] = useState<File | null>(null);
const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
const [errorMessage, setErrorMessage] = useState<string>("");

// State baru
const [activePresetId, setActivePresetId] = useState<string | null>(null);
```

---

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property Reflection

Sebelum menulis properties final, dilakukan refleksi untuk menghilangkan redundansi:

- **2.1 dan 2.2** digabung: 2.2 (textarea menampilkan teks) adalah konsekuensi langsung dari 2.1 karena `PromptInput` adalah controlled component. Satu property mencakup keduanya.
- **2.3 dan 5.2** digabung: keduanya tentang `aria-pressed` — digabung menjadi satu property tentang penandaan visual + aksesibilitas.
- **3.3 dan 5.4** digabung: identik — keduanya tentang `disabled` saat `isLoading`. Satu property.
- **2.4** dihapus: subsumed oleh 2.1 — jika 2.1 berlaku untuk semua preset, memilih preset berbeda juga terpenuhi.
- **1.3, 5.1, 5.3** digabung: ketiganya tentang integritas struktural data dan rendering — digabung menjadi satu property tentang kelengkapan field dan rendering yang benar.

---

### Property 1: Pemilihan preset mengisi prompt dan textarea

_For any_ preset dalam array `PRESETS`, setelah `handlePresetSelect(preset.id)` dipanggil, state `prompt` harus identik dengan `preset.promptText`, dan textarea di `PromptInput` harus menampilkan teks yang sama.

**Validates: Requirements 2.1, 2.2**

---

### Property 2: Preset aktif ditandai dengan aria-pressed yang benar

_For any_ preset yang dipilih dari array `PRESETS`, tombol yang sesuai di `PresetSelector` harus memiliki `aria-pressed="true"`, sementara semua tombol preset lainnya harus memiliki `aria-pressed="false"`.

**Validates: Requirements 2.3, 5.2**

---

### Property 3: Pengeditan manual menghapus penanda active preset

_For any_ state di mana `activePresetId` tidak null (ada preset aktif), jika `handlePromptChange` dipanggil dengan teks apapun yang berbeda dari `promptText` preset aktif tersebut, maka `activePresetId` harus menjadi `null`.

**Validates: Requirements 3.2**

---

### Property 4: isLoading menonaktifkan semua tombol preset

_For any_ array preset yang diberikan ke `PresetSelector`, ketika prop `isLoading` bernilai `true`, semua elemen `<button>` yang dirender harus memiliki atribut `disabled`.

**Validates: Requirements 3.3, 5.4**

---

### Property 5: Semua preset memiliki teks larangan elemen baru

_For any_ preset dalam array `PRESETS`, `preset.promptText` harus mengandung instruksi eksplisit yang melarang penambahan elemen baru yang tidak ada di gambar input (pohon, kendaraan, orang, objek dekoratif).

**Validates: Requirements 4.1**

---

### Property 6: Setiap kategori terwakili dengan jumlah preset yang benar

_For any_ array `PRESETS`, filter berdasarkan `category === 'nuansa-waktu'` harus menghasilkan minimal 3 preset, dan filter berdasarkan `category === 'nuansa-cuaca'` harus menghasilkan minimal 4 preset.

**Validates: Requirements 1.1, 1.2**

---

### Property 7: Integritas struktural setiap preset

_For any_ preset dalam array `PRESETS`, preset tersebut harus memiliki: `id` yang non-empty dan unik di antara semua preset, `name` yang non-empty, `description` yang non-empty, `category` yang merupakan nilai valid dari `PresetCategory`, dan `promptText` yang non-empty. Selain itu, setiap preset harus dirender sebagai elemen `<button>` dengan `aria-label` yang non-empty.

**Validates: Requirements 1.3, 5.1, 5.3**

---

## Error Handling

Karena fitur ini murni frontend dengan data statis, skenario error sangat terbatas:

| Skenario                                                             | Penanganan                                                                                                                        |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `handlePresetSelect` dipanggil dengan ID yang tidak ada di `PRESETS` | Early return — tidak ada perubahan state. Tidak perlu error UI karena ini hanya bisa terjadi dari bug kode, bukan input pengguna. |
| `PRESETS` array kosong                                               | `PresetSelector` merender section kosong tanpa crash. Tidak ada tombol yang ditampilkan.                                          |
| Render gagal setelah preset dipilih                                  | Ditangani oleh error handling `WorkspacePage` yang sudah ada — tidak ada perubahan.                                               |

Tidak ada async operation baru, tidak ada network call baru, sehingga tidak ada error handling jaringan yang perlu ditambahkan.

---

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

Fokus pada contoh spesifik dan edge case:

1. **`presets.test.ts`** — Validasi data statis:
   - Semua preset memiliki field yang required (`id`, `name`, `description`, `category`, `promptText`)
   - Tidak ada ID duplikat
   - Jumlah preset per kategori sesuai requirement
   - Setiap `promptText` mengandung kata kunci larangan elemen baru

2. **`PresetSelector.test.tsx`** — Behavior komponen:
   - Merender semua preset yang diberikan
   - Tombol dengan `activePresetId` yang cocok memiliki `aria-pressed="true"`
   - Tombol lain memiliki `aria-pressed="false"`
   - Semua tombol `disabled` ketika `isLoading={true}`
   - `onPresetSelect` dipanggil dengan ID yang benar saat tombol diklik

3. **`WorkspacePage.test.tsx`** — Integrasi state:
   - Memilih preset memperbarui `prompt` dan `activePresetId`
   - Mengedit prompt setelah memilih preset me-reset `activePresetId` ke `null`
   - Memilih preset berbeda mengganti prompt

### Property-Based Tests (Vitest + fast-check)

Menggunakan [fast-check](https://fast-check.io/) sebagai library PBT untuk TypeScript/Vitest.

Setiap property test dikonfigurasi dengan minimum **100 iterasi**.

**`presets.property.test.ts`** — menguji data statis dan rendering:

```typescript
// Feature: prompt-presets, Property 1: Pemilihan preset mengisi prompt dan textarea
// Feature: prompt-presets, Property 2: Preset aktif ditandai dengan aria-pressed yang benar
// Feature: prompt-presets, Property 4: isLoading menonaktifkan semua tombol preset
// Feature: prompt-presets, Property 5: Semua preset memiliki teks larangan elemen baru
// Feature: prompt-presets, Property 6: Setiap kategori terwakili dengan jumlah preset yang benar
// Feature: prompt-presets, Property 7: Integritas struktural setiap preset
```

**`WorkspacePage.property.test.tsx`** — menguji state management:

```typescript
// Feature: prompt-presets, Property 1: Pemilihan preset mengisi prompt dan textarea
// Feature: prompt-presets, Property 3: Pengeditan manual menghapus penanda active preset
```

### Aksesibilitas

- Verifikasi manual dengan keyboard navigation (Tab + Enter/Space)
- Verifikasi `aria-pressed` dengan screen reader (NVDA/VoiceOver)
- Automated check dengan `jest-axe` atau `@testing-library/jest-dom` untuk atribut ARIA

> **Catatan:** Validasi aksesibilitas penuh memerlukan pengujian manual dengan assistive technologies dan expert accessibility review.
