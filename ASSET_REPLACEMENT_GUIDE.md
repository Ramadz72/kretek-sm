# Panduan Penggantian Aset & Manajemen Media — Kretek Rempah SM

Dokumen ini memandu pemilik merek atau tim kreatif dalam mengganti, memperbarui, atau menambahkan aset visual (logo, kemasan, fotografi botani, dan rangkaian frame animasi canvas) tanpa merusak atau mengubah logika kode inti landing page.

---

## 1. Lokasi Folder Aset (`public/`)

Semua file statis terletak di dalam direktori `public/`:

```
public/
├── images/
│   ├── logo/
│   │   ├── logo-horizontal.png    # Logo horizontal untuk Navbar
│   │   ├── logo-stacked.png       # Logo vertikal bertingkat untuk Footer & Hero
│   │   └── logo-emblem.png        # Monogram lambang botani SM emas
│   ├── products/
│   │   ├── apel-mint.jpg          # Foto kemasan packshot Apel Mint
│   │   ├── mangga-mint.jpg        # Foto kemasan packshot Mangga Mint
│   │   ├── cigar.jpg              # Foto kemasan packshot Cigar
│   │   ├── beta.jpg               # Foto kemasan packshot Beta
│   │   ├── lifestyle-apel.jpg     # Foto suasana/lifestyle Apel Mint
│   │   ├── lifestyle-mangga.jpg   # Foto suasana/lifestyle Mangga Mint
│   │   ├── lifestyle-cigar.jpg    # Foto suasana/lifestyle Cigar
│   │   └── lifestyle-beta.jpg     # Foto suasana/lifestyle Beta
│   ├── ingredients/
│   │   ├── cengkeh.jpg            # Fotografi makro Cengkeh
│   │   ├── lada.jpg               # Fotografi makro Lada Hitam
│   │   ├── kapulaga.jpg           # Fotografi makro Kapulaga
│   │   ├── jahe.jpg               # Fotografi makro Jahe Merah
│   │   ├── kencur.jpg             # Fotografi makro Kencur
│   │   ├── kelor.jpg              # Fotografi makro Daun Kelor
│   │   ├── kayu-manis.jpg         # Fotografi makro Kayu Manis
│   │   ├── sirih-merah.jpg        # Fotografi makro Sirih Merah
│   │   ├── benalu.jpg             # Fotografi makro Benalu
│   │   ├── jintan.jpg             # Fotografi makro Jintan
│   │   ├── bunga-lawang.jpg       # Fotografi makro Bunga Lawang
│   │   ├── melati.jpg             # Fotografi makro Bunga Melati
│   │   ├── apel-smith.jpg         # Fotografi Apel Hijau Granny Smith
│   │   ├── mangga-gedong.jpg      # Fotografi Buah Mangga Gedong
│   │   ├── kemukus.jpg            # Fotografi makro Kemukus
│   │   ├── valerian.jpg           # Fotografi makro Akar Valerian
│   │   └── alang-alang.jpg        # Fotografi makro Akar Alang-Alang
│   └── tobacco-macro.jpg          # Latar visual makro dedaunan tembakau alami
└── sequence/
    ├── frame-001.jpg              # Frame pertama (latar partikel gelap)
    ├── ...                        # Frame transisi gerak
    └── frame-240.jpg              # Frame puncak produk reveal (Apel Mint)
```

---

## 2. Cara Mengganti atau Memperbarui Image Sequence

Komponen scrollytelling `components/SequenceScroll.tsx` membaca frame secara dinamis berdasarkan konfigurasi di `lib/site-config.ts`.

### Spesifikasi Frame yang Dianjurkan:
* **Format:** JPG berkualitas web (kompresi 80–85%) atau WebP.
* **Resolusi:** 1280x720 (720p) atau 1920x1080 (1080p).
* **Penamaan Standar:** `frame-001.jpg`, `frame-002.jpg`, ... `frame-240.jpg` (3 digit angka berurutan).
* **Latar Belakang:** Lingkungan hitam arang / obsidian gelap (`#0B0C09` – `#151711`) agar menyatu sempurna dengan latar belakang web.

### Jika Ingin Mengubah Jumlah Frame:
Buka file `lib/site-config.ts`, cari bagian `sequence`:
```typescript
sequence: {
  totalFrames: 240,               // Ubah sesuai jumlah frame yang dimiliki
  folder: '/sequence',           // Folder penyimpanan di public
  fileNamePrefix: 'frame-',      // Awalan nama file
  fileExtension: '.jpg',         // Ekstensi file
  scrollDistanceVh: 380,         // Panjang container gulir (350vh - 450vh)
}
```
Komponen `SequenceScroll.tsx` akan secara otomatis mengkalkulasi ulang rasio scroll, frame buffer, dan preloader tanpa perlu menulis ulang fungsi Canvas.

---

## 3. Cara Mengubah Data Produk (Varian Baru / Edit Deskripsi)

Semua data produk diatur secara fleksibel melalui satu file sumber: `lib/products.ts`.

Untuk menambahkan varian baru atau memperbarui data:
```typescript
{
  id: 'nama-varian',
  name: 'Nama Varian',
  category: '12 Sigaret Kretek Tangan',
  badge: 'Signature Blend',
  tagline: 'Tagline Produk',
  shortDescription: 'Deskripsi singkat...',
  fullDescription: 'Deskripsi lengkap...',
  character: 'Profil rasa dan aroma...',
  tobaccoBase: ['Tembakau Srintil', 'Tembakau Kemloko'],
  herbalIngredients: ['Cengkeh', 'Jahe Merah', 'Madu'],
  specs: {
    format: 'Sigaret Kretek Tangan (SKT)',
    nicotine: '0,9 mg',
    tar: '37,3 mg',
    content: '12 Batang / Bungkus',
  },
  recommendedMoments: {
    atmosphere: 'Momen Santai Sore',
    description: 'Cocok dinikmati saat...',
    idealTime: 'Sore hari',
  },
  image: '/images/products/nama-file.jpg',
  lifestyleImage: '/images/products/nama-lifestyle.jpg',
  accentColor: '#8BCB25',
  bgGradient: 'from-[#8BCB25]/20 via-[#151711] to-[#0B0C09]',
  featured: true,
}
```

---

## 4. Cara Mengubah Informasi Kontak & Tautan Resmi

Buka file `lib/site-config.ts`, ubah data di objek `contact`:
```typescript
contact: {
  whatsapp: '+62 812-XXXX-XXXX',
  whatsappLink: 'https://wa.me/6281200000000',
  instagram: '@kretekrempahsm.id',
  instagramLink: 'https://instagram.com/kretekrempahsm.id',
  email: 'kontak@kretekrempahsm.com',
  address: 'Indonesia',
}
```

Perubahan akan otomatis terdistribusi ke Navbar, Fullscreen Menu, Kartu Produk, Final CTA, dan Footer.
