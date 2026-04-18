# Requirements Document

## Introduction

Fitur **Prompt Presets** memungkinkan pengguna AI Render Assistant memilih preset prompt yang sudah dikurasi untuk menghasilkan render yang konsisten dengan gambar input. Preset dirancang khusus agar AI tidak menambahkan elemen baru (pohon, kendaraan, orang, objek dekoratif) yang tidak ada di gambar asli, melainkan hanya mengubah pencahayaan, suasana, dan kualitas fotorealistik sesuai nuansa waktu yang dipilih.

Fitur ini menyasar pengguna (arsitek, desainer interior) yang tidak familiar dengan teknik penulisan prompt AI, sehingga mereka bisa langsung mendapatkan hasil render berkualitas tanpa perlu memahami prompt engineering.

## Glossary

- **Preset**: Teks prompt yang sudah dikurasi dan siap pakai, mewakili satu skenario render tertentu.
- **Preset_Selector**: Komponen UI yang menampilkan daftar preset dan menangani pemilihan oleh pengguna.
- **PromptInput**: Komponen textarea yang sudah ada di `src/components/PromptInput.tsx`, tempat teks prompt ditampilkan dan diedit.
- **WorkspacePage**: Halaman utama di `src/pages/WorkspacePage.tsx` yang mengorkestrasikan state dan alur render.
- **Prompt_State**: Nilai string prompt yang disimpan di state `WorkspacePage` dan diteruskan ke `PromptInput`.
- **Active_Preset**: Preset yang sedang dipilih pengguna pada sesi saat ini.
- **Nuansa_Waktu**: Kategori suasana pencahayaan dalam preset — pagi hari, siang hari, atau malam hari.
- **Nuansa_Cuaca**: Kategori suasana atmosfer/cuaca dalam preset — berawan, mendung, hujan, atau berkabut — yang mempengaruhi kualitas cahaya dan suasana visual tanpa mengubah elemen arsitektur.
- **Custom_Prompt**: Teks prompt yang ditulis langsung oleh pengguna tanpa menggunakan preset.

---

## Requirements

### Requirement 1: Daftar Preset yang Tersedia

**User Story:** Sebagai pengguna yang tidak familiar dengan prompt AI, saya ingin melihat daftar preset prompt yang sudah dikurasi, agar saya bisa langsung memilih gaya render tanpa harus menulis prompt dari nol.

#### Acceptance Criteria

1. THE `Preset_Selector` SHALL menampilkan minimal tiga preset `Nuansa_Waktu` bawaan yang mencakup nuansa pagi hari, siang hari, dan malam hari.
2. THE `Preset_Selector` SHALL menampilkan minimal empat preset `Nuansa_Cuaca` bawaan yang mencakup berawan, mendung, hujan, dan berkabut.
3. THE `Preset_Selector` SHALL menampilkan nama singkat dan deskripsi ringkas untuk setiap preset agar pengguna memahami efek yang akan dihasilkan.
4. THE `Preset_Selector` SHALL merender semua preset dalam satu tampilan tanpa memerlukan scroll horizontal, pada lebar layar minimal 320px.
5. WHEN halaman Workspace dimuat, THE `Preset_Selector` SHALL ditampilkan di atas komponen `PromptInput` dalam area "Pengaturan Render".

---

### Requirement 2: Pemilihan Preset Mengisi Prompt

**User Story:** Sebagai pengguna, saya ingin mengklik sebuah preset dan melihat teks promptnya langsung muncul di textarea, agar saya tidak perlu mengetik ulang.

#### Acceptance Criteria

1. WHEN pengguna memilih sebuah preset, THE `WorkspacePage` SHALL memperbarui `Prompt_State` dengan teks lengkap preset tersebut.
2. WHEN `Prompt_State` diperbarui oleh pemilihan preset, THE `PromptInput` SHALL menampilkan teks preset tersebut di dalam textarea.
3. WHEN pengguna memilih sebuah preset, THE `Preset_Selector` SHALL menandai preset tersebut sebagai `Active_Preset` secara visual (misalnya dengan border atau background yang berbeda).
4. WHEN pengguna memilih preset yang berbeda dari `Active_Preset` saat ini, THE `WorkspacePage` SHALL mengganti `Prompt_State` dengan teks preset yang baru dipilih.

---

### Requirement 3: Teks Preset Dapat Diedit Setelah Dipilih

**User Story:** Sebagai pengguna tingkat lanjut, saya ingin bisa mengedit teks preset setelah memilihnya, agar saya bisa menyesuaikan detail render tanpa menulis prompt dari awal.

#### Acceptance Criteria

1. WHEN pengguna mengetik di dalam `PromptInput` setelah memilih sebuah preset, THE `WorkspacePage` SHALL memperbarui `Prompt_State` dengan teks yang dimodifikasi.
2. WHEN pengguna memodifikasi teks preset di `PromptInput`, THE `Preset_Selector` SHALL menghapus penanda `Active_Preset` dari semua preset untuk mengindikasikan bahwa prompt saat ini adalah `Custom_Prompt`.
3. WHILE `isLoading` bernilai `true`, THE `Preset_Selector` SHALL menonaktifkan semua tombol preset sehingga pengguna tidak dapat mengubah pilihan selama proses render berlangsung.

---

### Requirement 4: Konsistensi Konten Preset

**User Story:** Sebagai pengguna, saya ingin preset yang tersedia memastikan AI tidak menambahkan elemen baru ke gambar saya, agar hasil render tetap konsisten dengan desain asli saya.

#### Acceptance Criteria

1. THE `Preset_Selector` SHALL menyediakan teks preset yang secara eksplisit menginstruksikan AI untuk tidak menambahkan elemen baru yang tidak ada di gambar input (seperti pohon, kendaraan, orang, atau objek dekoratif lainnya).
2. THE `Preset_Selector` SHALL menyediakan preset untuk nuansa pagi hari dengan instruksi pencahayaan matahari pagi yang hangat dan bayangan panjang.
3. THE `Preset_Selector` SHALL menyediakan preset untuk nuansa siang hari dengan instruksi pencahayaan matahari terik dan bayangan pendek.
4. THE `Preset_Selector` SHALL menyediakan preset untuk nuansa malam hari dengan instruksi pencahayaan buatan (lampu eksterior) dan suasana malam yang realistis.
5. THE `Preset_Selector` SHALL menyimpan data preset sebagai konstanta statis di dalam kode (tidak memerlukan pemanggilan API atau backend baru).
6. THE `Preset_Selector` SHALL menyediakan preset untuk `Nuansa_Cuaca` berawan dengan instruksi langit tertutup awan, cahaya difus merata tanpa bayangan tajam, dan tone warna netral keabu-abuan.
7. THE `Preset_Selector` SHALL menyediakan preset untuk `Nuansa_Cuaca` mendung dengan instruksi langit gelap dramatis, cahaya redup merata, dan suasana atmosfer yang berat dan kontras rendah.
8. THE `Preset_Selector` SHALL menyediakan preset untuk `Nuansa_Cuaca` hujan dengan instruksi permukaan basah memantulkan cahaya, langit abu-abu gelap, efek hujan ringan di udara, dan pencahayaan redup difus.
9. THE `Preset_Selector` SHALL menyediakan preset untuk `Nuansa_Cuaca` berkabut dengan instruksi kabut tipis yang mengaburkan kedalaman, cahaya tersebar lembut, visibilitas jarak jauh berkurang, dan suasana misterius tenang.

---

### Requirement 5: Aksesibilitas dan Responsivitas

**User Story:** Sebagai pengguna dengan berbagai perangkat dan kebutuhan aksesibilitas, saya ingin `Preset_Selector` dapat digunakan dengan keyboard dan tampil baik di layar mobile maupun desktop.

#### Acceptance Criteria

1. THE `Preset_Selector` SHALL menggunakan elemen `<button>` untuk setiap preset sehingga dapat diakses dan diaktifkan melalui keyboard (Tab + Enter/Space).
2. THE `Preset_Selector` SHALL menyertakan atribut `aria-pressed` pada setiap tombol preset yang bernilai `true` ketika preset tersebut adalah `Active_Preset` dan `false` ketika tidak aktif.
3. THE `Preset_Selector` SHALL menyertakan atribut `aria-label` yang deskriptif pada setiap tombol preset.
4. WHEN `isLoading` bernilai `true`, THE `Preset_Selector` SHALL menyertakan atribut `disabled` pada semua tombol preset sehingga screen reader mengumumkan tombol sebagai tidak tersedia.
5. THE `Preset_Selector` SHALL menampilkan preset dalam layout yang responsif — satu kolom pada layar kecil (< 640px) dan multi-kolom pada layar yang lebih lebar.
