# Kretek Rempah SM — High-End Cinematic Landing Page

Situs web pengalaman digital premium dan sinematik berskala Awwwards untuk **Kretek Rempah SM**, merek kretek multiherbal Indonesia yang memadukan tembakau pilihan (*Srintil Temanggung, Kemloko, Podeng, Kasturi, Virgin*) dan 17 ramuan botani rempah-rempah Nusantara.

---

## 💎 Fitur Utama & Art Direction

1. **Cinematic Scrollytelling Product Reveal (`components/SequenceScroll.tsx`)**
   - Menggunakan HTML5 Canvas berkinerja tinggi dengan DPR support.
   - 240 frame animasi visual produk berkualitas HD asli yang dipetakan langsung ke progres scroll pengguna.
   - Formula cover-rendering responsif tanpa distorsi pada perangkat mobile maupun desktop.
   - Text overlay bertingkat dengan kurva *luxury cubic-bezier*.
   - Branded preloader dengan indikator persentase pemuatan aset.

2. **Tipografi Editorial & Text Reveal (`components/TextReveal.tsx`)**
   - Transisi visual mulus dengan kata demi kata yang terungkap secara *scroll-scrubbed*.
   - Tipografi Display *Outfit* tebal dan *Plus Jakarta Sans* untuk keterbacaan optimal.

3. **Product Bento Grid Interaktif (`components/ProductBento.tsx`)**
   - Pameran varian resmi: **Beta** (Srintil Temanggung Masterpiece), **Cigar** (Ambri Daun Tembakau Asli), **Apel Mint**, **Mangga Mint**, serta **Apel Ori** dan **Mangga Ori**.
   - Modal detail interaktif dengan spesifikasi terverifikasi (Nikotin 0,9 mg, Tar 37,3 mg), komposisi tembakau dasar, ramuan rempah, dan rekomendasi suasana menikmati.

4. **Arsip Botani Rempah Nusantara (`components/IngredientShowcase.tsx`)**
   - Eksplorasi 17 rempah dan tumbuhan botani berdasarkan katalog resmi.
   - Dilengkapi nama latin (*Syzygium aromaticum*, *Piper nigrum*, dsb.), senyawa bioaktif utama (*Eugenol*, *Piperine*, *Cinnamaldehyde*, dll.), filter kategori rasa (*Harum*, *Manis*, *Pedas*, *Gurih*, *Buah*).

5. **Fakta & Tiga Pilar Formulasi (`components/BrandDetails.tsx`)**
   - Statistik terverifikasi dengan animasi penghitung otomatis saat memasuki viewport (*viewport in-view trigger*).
   - Tiga pilar merek: *Inspirasi Rempah*, *Karakter Produk*, *Identitas Nusantara*.

6. **Galeri Visual & Lensa Sinematik (`components/VisualShowcase.tsx`)**
   - Dokumentasi kemasan produk asli dalam suasana alam pegunungan Temanggung, perkebunan teh, dan lanskap tropis Nusantara.

7. **Navigasi Layar Penuh Editorial (`components/FullscreenMenu.tsx` & `components/Navbar.tsx`)**
   - Menu layar penuh dengan animasi staggered text, preview dinamis pada hover, penguncian scroll saat aktif, dan dukungan tombol ESC serta aksesibilitas keyboard.

8. **Kepatuhan Regulasi Tembakau (`components/AgeNotice.tsx` & `components/Footer.tsx`)**
   - Modal verifikasi usia dewasa 21+ tahun yang tersimpan pada `localStorage`.
   - Banner peringatan kesehatan resmi Indonesia (*"PERINGATAN: KARENA MEROKOK, SAYA TERKENA KANKER TENGGOROKAN. LAYANAN BERHENTI MEROKOK (0800-177-6565)"*).
   - Menjunjung etika komunikasi produk tanpa klaim medis/kesehatan yang menyesatkan.

9. **Kehalusan Interaksi & Lenis Smooth Scroll**
   - Smooth scroll menggunakan Lenis yang terintegrasi rapi dengan motion scroll tracking tanpa konflik RAF.
   - Kursor magnetik desktop dengan efek expanding ring.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS (Custom Botanical Luxury Color Palette)
- **Animasi:** Motion for React (Framer Motion)
- **Smooth Scroll:** Lenis
- **Ikon:** Lucide React
- **Asset Rendering:** HTML5 2D Canvas

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### 1. Prasyarat
- Node.js versi 18+ atau 20+ atau 22+
- NPM

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka peramban di `http://localhost:3000`.

### 4. Build untuk Produksi
```bash
npm run build
npm run start
```

---

## 📋 Daftar Aset & Tautan yang Perlu Dilengkapi Pemilik Merek

Sebelum peluncuran ke publik (*production deployment*), mohon pemilik merek melengkapi data berikut pada `lib/site-config.ts`:

1. **Nomor WhatsApp Resmi:** Ganti placeholder `+62 812-XXXX-XXXX` dan link `https://wa.me/...`.
2. **Akun Instagram Resmi:** Ganti `@kretekrempahsm.id` dengan akun resmi yang aktif.
3. **Alamat Email Resmi:** Ganti `kontak@kretekrempahsm.com` dengan email bisnis resmi.
4. **Izin Operasional & Ketentuan Usaha:** Pastikan seluruh izin distribusi tembakau, pita cukai SKT/SK, dan regulasi lokal telah terdaftar sesuai peraturan perundang-undangan Republik Indonesia.
