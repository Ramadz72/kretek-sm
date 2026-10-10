export interface ProductVariant {
  id: string;
  name: string;
  category: string;
  badge: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  character: string;
  tobaccoBase: string[];
  herbalIngredients: string[];
  specs: {
    format: string;
    nicotine: string;
    tar: string;
    content: string;
  };
  recommendedMoments: {
    atmosphere: string;
    description: string;
    idealTime: string;
  };
  image: string;
  lifestyleImage: string;
  accentColor: string;
  bgGradient: string;
  featured?: boolean;
}

export const PRODUCTS: ProductVariant[] = [
  {
    id: 'apel-mint',
    name: 'Apel Mint',
    category: '12 Sigaret Kretek Tangan',
    badge: 'Signature Blend',
    tagline: 'Sensasi Segar Apel & Mint Pakistan yang Halus',
    shortDescription:
      'Perpaduan tembakau Kemloko dan Virgin dengan ekstrak apel segar dan sensasi dingin Mint Pakistan.',
    fullDescription:
      'Varian Apel Mint dirancang melalui perpaduan tembakau Kemloko dan tembakau Virgin sebagai dasar, diperkaya dengan kayu manis, ekstrak apel, Mint Pakistan, cengkeh Maluku, bunga cengkeh, serta madu randu. Menghadirkan keseimbangan rasa buah yang manis lembut dan sensasi dingin menyegarkan.',
    character: 'Dingin, segar, fruity halus, berpadu aroma rempah hangat.',
    tobaccoBase: ['Tembakau Kemloko', 'Tembakau Virgin'],
    herbalIngredients: [
      'Ekstrak Apel Granny Smith',
      'Mint Pakistan',
      'Cengkeh Maluku & Bunga Cengkeh',
      'Kayu Manis',
      'Madu Randu',
    ],
    specs: {
      format: 'Sigaret Kretek Tangan (SKT)',
      nicotine: '0,9 mg',
      tar: '37,3 mg',
      content: '12 Batang / Bungkus',
    },
    recommendedMoments: {
      atmosphere: 'Momen Santai & Suasana Segar',
      description:
        'Cocok untuk menemani suasana ringan, waktu istirahat, atau bersantai di sore hari.',
      idealTime: 'Sore hari, waktu istirahat, berkumpul santai',
    },
    image: '/images/products/apel-mint.jpg',
    lifestyleImage: '/images/products/lifestyle-apel.jpg',
    accentColor: '#8BCB25',
    bgGradient: 'from-[#8BCB25]/20 via-[#151711] to-[#0B0C09]',
    featured: true,
  },
  {
    id: 'beta',
    name: 'Beta',
    category: '12 Sigaret Kretek Tangan',
    badge: 'Masterpiece Srintil',
    tagline: 'Keagungan Tembakau Srintil Temanggung & Rempah Nusantara',
    shortDescription:
      'Varian premium dengan jantung tembakau Srintil langka, jahe merah, sirih merah, benalu, dan madu murni.',
    fullDescription:
      'Di antara seluruh varian, Beta memiliki identitas paling kuat dan kompleks. Menggunakan tembakau Srintil khas Temanggung yang legendaris, dipadukan dengan tembakau Podeng, madu, melati, benalu, jahe merah, sirih merah, serta cengkeh pilihan. Menghadirkan karakter rempah yang kaya, tegas, dan aroma hangat pedas yang berkelas.',
    character: 'Aroma kuat, hangat pedas berkarakter, rempah autentik berlapis.',
    tobaccoBase: ['Tembakau Srintil Temanggung', 'Tembakau Podeng'],
    herbalIngredients: [
      'Jahe Merah',
      'Sirih Merah',
      'Benalu Pilihan',
      'Bunga Melati',
      'Madu Murni',
      'Cengkeh & Bunga Cengkeh',
    ],
    specs: {
      format: 'Sigaret Kretek Tangan (SKT)',
      nicotine: '0,9 mg',
      tar: '37,3 mg',
      content: '12 Batang / Bungkus',
    },
    recommendedMoments: {
      atmosphere: 'Momen Tenang & Menyendiri',
      description:
        'Cocok untuk suasana kontemplatif, refleksi malam, atau momen ketenangan pribadi.',
      idealTime: 'Malam hari, suasana tenang, me-time',
    },
    image: '/images/products/beta.jpg',
    lifestyleImage: '/images/products/lifestyle-beta.jpg',
    accentColor: '#10B981',
    bgGradient: 'from-[#10B981]/20 via-[#151711] to-[#0B0C09]',
    featured: true,
  },
  {
    id: 'cigar',
    name: 'Cigar',
    category: '12 Sigaret Kretek',
    badge: 'Artisanal Ambri',
    tagline: 'Konsep Inovatif "Tembakau dalam Tembakau"',
    shortDescription:
      'Pembungkus ambri khusus dari campuran daun tembakau asli, menyajikan karakter tembakau dalam dan elegan.',
    fullDescription:
      'Cigar Rempah SM memiliki keunikan eksklusif: jika kretek umum menggunakan kertas ambri biasa, varian ini menggunakan ambri yang dibuat langsung dari campuran daun tembakau pilihan ("tembakau dalam tembakau"). Di dalamnya terdapat perpaduan tembakau Virgin & Podeng, kapulaga, buah pala, kayu manis, bunga lengkuas, melati, dan ekstrak apel.',
    character: 'Kuat, dalam, kematangan klasik, aroma rempah hangat berlapis bunga.',
    tobaccoBase: ['Tembakau Virgin', 'Tembakau Podeng', 'Ambri Daun Tembakau Asli'],
    herbalIngredients: [
      'Kapulaga Jawa',
      'Buah Pala',
      'Bunga Lengkuas',
      'Bunga Melati',
      'Kayu Manis & Daun Mint',
      'Madu & Ekstrak Apel',
    ],
    specs: {
      format: 'Sigaret Kretek (SK)',
      nicotine: '0,9 mg',
      tar: '37,3 mg',
      content: '12 Batang / Bungkus',
    },
    recommendedMoments: {
      atmosphere: 'Momen Tenang & Berkelas',
      description:
        'Nuansa cigar yang elegan, cocok untuk suasana berkelas saat cuaca dingin atau usai aktivitas.',
      idealTime: 'Malam hari, cuaca dingin, suasana elegan',
    },
    image: '/images/products/cigar.jpg',
    lifestyleImage: '/images/products/lifestyle-cigar.jpg',
    accentColor: '#70462D',
    bgGradient: 'from-[#70462D]/30 via-[#151711] to-[#0B0C09]',
    featured: true,
  },
  {
    id: 'mangga-mint',
    name: 'Mangga Mint',
    category: '12 Sigaret Kretek Tangan',
    badge: 'Tropical Edition',
    tagline: 'Perpaduan Tropis Mangga Gedong & Kesejukan Mint',
    shortDescription:
      'Karakter ekspresif dan playful memadukan manisnya buah mangga tropis dengan segarnya Mint Pakistan.',
    fullDescription:
      'Mangga Mint hadir dengan profil rasa ekspresif. Dibangun dari fondasi tembakau Kemloko dan Podeng, diperkaya ekstrak mangga gedong, ekstrak buah manis, kayu manis, cengkeh Maluku, dan sentuhan kesegaran Mint Pakistan. Menghadirkan sensasi rasa buah tropis yang kaya, berani, dan menyegarkan.',
    character: 'Manis buah tropis, juicy, bersemangat dengan sensasi dingin segar.',
    tobaccoBase: ['Tembakau Kemloko', 'Tembakau Podeng'],
    herbalIngredients: [
      'Ekstrak Mangga Gedong',
      'Mint Pakistan',
      'Kayu Manis',
      'Cengkeh & Bunga Cengkeh',
      'Ekstrak Buah Manis',
    ],
    specs: {
      format: 'Sigaret Kretek Tangan (SKT)',
      nicotine: '0,9 mg',
      tar: '37,3 mg',
      content: '12 Batang / Bungkus',
    },
    recommendedMoments: {
      atmosphere: 'Teman Berkumpul & Suasana Ceria',
      description:
        'Cocok untuk suasana penuh energi, interaksi hangat, dan diskusi kreatif.',
      idealTime: 'Sore hingga malam, berkumpul dengan kawan, ngopi santai',
    },
    image: '/images/products/mangga-mint.jpg',
    lifestyleImage: '/images/products/lifestyle-mangga.jpg',
    accentColor: '#E8C83E',
    bgGradient: 'from-[#E8C83E]/20 via-[#151711] to-[#0B0C09]',
    featured: true,
  },
  {
    id: 'apel-ori',
    name: 'Apel Ori',
    category: '12 Sigaret Kretek Tangan',
    badge: 'Classic Fruity',
    tagline: 'Karakter Apel Murni Tanpa Sensasi Mint',
    shortDescription:
      'Cita rasa apel segar yang familiar berpadu dengan tembakau pilihan untuk pengalaman rasa buah yang lembut.',
    fullDescription:
      'Apel Ori ditujukan bagi konsumen yang menyukai kehangatan kretek dengan sentuhan rasa apel murni tanpa sensasi dingin mint. Memadukan tembakau Kemloko dan Virgin dengan kayu manis, cengkeh, dan madu randu untuk keseimbangan rasa manis yang hangat.',
    character: 'Fruity lembut, hangat rempah manis, tanpa sentuhan dingin.',
    tobaccoBase: ['Tembakau Kemloko', 'Tembakau Virgin'],
    herbalIngredients: [
      'Ekstrak Apel Granny Smith',
      'Kayu Manis',
      'Cengkeh Maluku',
      'Madu Randu',
    ],
    specs: {
      format: 'Sigaret Kretek Tangan (SKT)',
      nicotine: '0,9 mg',
      tar: '37,3 mg',
      content: '12 Batang / Bungkus',
    },
    recommendedMoments: {
      atmosphere: 'Momen Hangat Keseharian',
      description:
        'Pilihan bagi yang menyukai rasa buah familiar dengan karakter tembakau klasik.',
      idealTime: 'Kapan saja sepanjang hari',
    },
    image: '/images/products/apel-mint.jpg',
    lifestyleImage: '/images/products/lifestyle-apel.jpg',
    accentColor: '#84CC16',
    bgGradient: 'from-[#84CC16]/20 via-[#151711] to-[#0B0C09]',
    featured: false,
  },
  {
    id: 'mangga-ori',
    name: 'Mangga Ori',
    category: '12 Sigaret Kretek Tangan',
    badge: 'Pure Tropical',
    tagline: 'Aroma Eksotis Mangga Tropis Tanpa Mint',
    shortDescription:
      'Karakter mangga tropis yang lebih menonjol dan ekspresif untuk penikmat profil rasa berani.',
    fullDescription:
      'Mangga Ori menonjolkan aroma dan cita rasa mangga gedong matang secara utuh dan hangat tanpa mint. Dipadukan dengan tembakau Kemloko dan Podeng serta rempah-rempah pilihan yang memperkuat kehangatan rasa.',
    character: 'Tropis harum, manis lembut, karakter tembakau berpadu hangat.',
    tobaccoBase: ['Tembakau Kemloko', 'Tembakau Podeng'],
    herbalIngredients: [
      'Ekstrak Mangga Gedong',
      'Kayu Manis',
      'Cengkeh Pilihan',
      'Madu Alami',
    ],
    specs: {
      format: 'Sigaret Kretek Tangan (SKT)',
      nicotine: '0,9 mg',
      tar: '37,3 mg',
      content: '12 Batang / Bungkus',
    },
    recommendedMoments: {
      atmosphere: 'Momen Diskusi Santai',
      description:
        'Profil rasa buah tropis yang unik dan mengundang inspirasi.',
      idealTime: 'Sore hari dan malam hari',
    },
    image: '/images/products/mangga-mint.jpg',
    lifestyleImage: '/images/products/lifestyle-mangga.jpg',
    accentColor: '#F59E0B',
    bgGradient: 'from-[#F59E0B]/20 via-[#151711] to-[#0B0C09]',
    featured: false,
  },
];
