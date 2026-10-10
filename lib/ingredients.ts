export type IngredientCategory = 'manis' | 'gurih' | 'pedas' | 'harum' | 'buah';

export interface Ingredient {
  id: string;
  name: string;
  latinName: string;
  activeCompound: string;
  character: string;
  category: IngredientCategory;
  categoryLabel: string;
  description: string;
  botanicalHeritage: string;
  image: string;
}

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'cengkeh',
    name: 'Cengkeh',
    latinName: 'Syzygium aromaticum',
    activeCompound: 'Eugenol, Eugenyl Acetate, β-Caryophyllene',
    character: 'Aroma kuat, hangat, tajam, sedikit manis, dan khas cengkeh Nusantara.',
    category: 'harum',
    categoryLabel: 'Rempah Harum & Pedas',
    description:
      'Komponen utama kretek khas Nusantara dengan minyak atsiri dominan eugenol yang memberikan aroma harum yang kaya dan sensasi hangat.',
    botanicalHeritage:
      'Bahan aromatik dan penghangat tradisional Indonesia yang menjadi fondasi cita rasa kretek sejak berabad-abad lampau.',
    image: '/images/ingredients/cengkeh.jpg',
  },
  {
    id: 'lada',
    name: 'Lada Hitam',
    latinName: 'Piper nigrum',
    activeCompound: 'Piperine, Piperanine, Volatile Oils',
    character: 'Pedas, hangat, tajam, dengan aroma khas lada tropis.',
    category: 'pedas',
    categoryLabel: 'Rempah Pedas',
    description:
      'Menghadirkan ketegasan karakter pedas dan kehangatan yang memperkaya intensitas cita rasa tembakau pilihan.',
    botanicalHeritage:
      'Dikenal sebagai "Raja Rempah" bumi Nusantara, lada menyumbangkan kedalaman rasa dan aroma khas.',
    image: '/images/ingredients/lada.jpg',
  },
  {
    id: 'kapulaga',
    name: 'Kapulaga',
    latinName: 'Amomum compactum',
    activeCompound: '1,8-Cineole, α-Terpinyl Acetate, Limonene',
    character: 'Aromatik, segar, sedikit manis, dengan sensasi hangat bersahaja.',
    category: 'harum',
    categoryLabel: 'Rempah Harum',
    description:
      'Minyak atsiri kapulaga memberikan sentuhan aroma herbal segar yang lembut dan membangkitkan suasana tenang.',
    botanicalHeritage:
      'Secara tradisional digunakan sebagai rempah aromatik yang memberikan kesegaran dan kenyamanan indera penciuman.',
    image: '/images/ingredients/kapulaga.jpg',
  },
  {
    id: 'jahe',
    name: 'Jahe Merah',
    latinName: 'Zingiber officinale',
    activeCompound: 'Gingerol, Shogaol, Zingerone, Zingiberene',
    character: 'Hangat, pedas, aromatik, memberikan sensasi menghangatkan yang mantap.',
    category: 'pedas',
    categoryLabel: 'Rempah Pedas',
    description:
      'Jahe merah pilihan memberikan tendangan kehangatan rempah yang khas pada varian Beta.',
    botanicalHeritage:
      'Tanaman rimpang Nusantara dengan sejarah panjang sebagai simbol kehangatan herbal alami.',
    image: '/images/ingredients/jahe.jpg',
  },
  {
    id: 'kencur',
    name: 'Kencur',
    latinName: 'Kaempferia galanga',
    activeCompound: 'Ethyl p-Methoxycinnamate, Ethyl Cinnamate, Kaempferol',
    character: 'Aroma khas tajam, hangat, bersahaja, dan sedikit pedas.',
    category: 'gurih',
    categoryLabel: 'Rempah Gurih',
    description:
      'Memberikan aksen rasa gurih bumi (earthy) yang memperkuat dimensi rasa alami racikan kretek.',
    botanicalHeritage:
      'Rempah tradisional jamu Nusantara yang memiliki karakter aroma tajam yang tak tertandingi.',
    image: '/images/ingredients/kencur.jpg',
  },
  {
    id: 'kelor',
    name: 'Kelor',
    latinName: 'Moringa oleifera',
    activeCompound: 'Quercetin, Kaempferol, Chlorogenic Acid, Polifenol',
    character: 'Aroma herbal botanik, sedikit pahit elegan, khas daun hijau.',
    category: 'gurih',
    categoryLabel: 'Rempah Gurih & Herbal',
    description:
      'Daun kelor menyumbangkan unsur botani hijau alami yang menjaga keseimbangan keharuman herbal.',
    botanicalHeritage:
      'Tumbuhan legendaris Nusantara yang dihargai karena kekayaan kandungan fitokimia dan karakter alaminya.',
    image: '/images/ingredients/kelor.jpg',
  },
  {
    id: 'kayu-manis',
    name: 'Kayu Manis',
    latinName: 'Cinnamomum burmannii',
    activeCompound: 'Cinnamaldehyde, Cinnamic Acid, Cinnamyl Alcohol',
    character: 'Manis, hangat, bernuansa kayu (woody), dan sangat aromatik.',
    category: 'manis',
    categoryLabel: 'Rempah Manis',
    description:
      'Memberikan sentuhan rasa manis alami yang lembut tanpa mendominasi, merajut harmoni antara tembakau dan aroma buah.',
    botanicalHeritage:
      'Kayu manis khas tanah Sumatera dan Jawa yang telah menjadi primadona perdagangan rempah dunia.',
    image: '/images/ingredients/kayu-manis.jpg',
  },
  {
    id: 'sirih-merah',
    name: 'Sirih Merah',
    latinName: 'Piper crocatum',
    activeCompound: 'Flavonoid, Alkaloid, Tanin, Saponin, Polifenol',
    character: 'Aroma herbal khas, agak tajam, sedikit getir berwibawa.',
    category: 'gurih',
    categoryLabel: 'Rempah Gurih & Herbal',
    description:
      'Menjadi salah satu pilar botani dalam varian Beta, memberikan dimensi rasa yang dalam dan berakar pada tradisi.',
    botanicalHeritage:
      'Tanaman herbal keraton yang secara turun-temurun dihormati dalam berbagai racikan herbal luhur.',
    image: '/images/ingredients/sirih-merah.jpg',
  },
  {
    id: 'benalu',
    name: 'Benalu Pilihan',
    latinName: 'Scurrula spp.',
    activeCompound: 'Flavonoid, Tanin, Fenolik, Senyawa Metabolit Sekunder',
    character: 'Herbal, earthy, dan khas aroma tanaman dedaunan kering.',
    category: 'gurih',
    categoryLabel: 'Rempah Gurih',
    description:
      'Hadir dalam formulasi varian Beta untuk melengkapi spektrum aroma bumi yang kaya dan unik.',
    botanicalHeritage:
      'Bahan botani tradisional yang menyimpan keunikan karakter tanaman inang alami Nusantara.',
    image: '/images/ingredients/benalu.jpg',
  },
  {
    id: 'jintan',
    name: 'Jintan',
    latinName: 'Cuminum cyminum',
    activeCompound: 'Cuminaldehyde, γ-Terpinene, p-Cymene',
    character: 'Hangat, earthy, tajam bersahabat, dan sangat berkarakter.',
    category: 'pedas',
    categoryLabel: 'Rempah Pedas & Gurih',
    description:
      'Menghadirkan kehangatan rempah kering yang menyatu dengan tembakau untuk profil hisapan yang utuh.',
    botanicalHeritage:
      'Rempah aromatik dengan profil bau khas yang telah memperkaya racikan dapur dan tembakau Nusantara.',
    image: '/images/ingredients/jintan.jpg',
  },
  {
    id: 'bunga-lawang',
    name: 'Bunga Lawang',
    latinName: 'Illicium verum',
    activeCompound: 'Trans-Anethole (hingga 92%), Minyak Atsiri',
    character: 'Manis aniseed, licorice-like, hangat, dan sangat harum semerbak.',
    category: 'manis',
    categoryLabel: 'Rempah Manis & Harum',
    description:
      'Bentuk bintangnya menyimpan minyak atsiri beraroma manis hangat yang memberikan nuansa kemewahan klasik.',
    botanicalHeritage:
      'Rempah eksotis pembawa keharuman manis alami yang memanjakan indera penciuman.',
    image: '/images/ingredients/bunga-lawang.jpg',
  },
  {
    id: 'melati',
    name: 'Bunga Melati',
    latinName: 'Jasminum sambac',
    activeCompound: 'Benzyl Acetate, Linalool, Benzyl Alcohol, Indole',
    character: 'Floral, lembut, manis feminin, dan sangat harum memikat.',
    category: 'harum',
    categoryLabel: 'Rempah Harum / Floral',
    description:
      'Memberikan sentuhan floral anggun pada varian Cigar dan Beta, menciptakan sensasi asap yang wangi dan lembut.',
    botanicalHeritage:
      'Puspa bangsa Indonesia yang melambangkan keanggunan, ketenangan, dan kesucian tradisi.',
    image: '/images/ingredients/melati.jpg',
  },
  {
    id: 'apel-smith',
    name: 'Ekstrak Apel',
    latinName: 'Malus domestica (Granny Smith)',
    activeCompound: 'Quercetin, Chlorogenic Acid, Catechin, Vitamin C',
    character: 'Aroma buah segar, asam crisp, segar, dan sedikit manis.',
    category: 'buah',
    categoryLabel: 'Buah & Botanical',
    description:
      'Menjadi identitas utama varian Apel Mint, memberikan sentuhan fruity modern yang segar dan renyah.',
    botanicalHeritage:
      'Sentuhan buah segar modern yang memperkaya tradisi kretek dengan karakter kontemporer.',
    image: '/images/ingredients/apel-smith.jpg',
  },
  {
    id: 'mangga-gedong',
    name: 'Mangga Gedong',
    latinName: 'Mangifera indica',
    activeCompound: 'Mangiferin, Quercetin, Karotenoid, Senyawa Fenolik',
    character: 'Manis buah tropis, juicy, sedikit asam segar, dan harum mangga ranum.',
    category: 'buah',
    categoryLabel: 'Buah & Botanical',
    description:
      'Membawa jiwa buah tropis Nusantara ke dalam varian Mangga Mint dengan sensasi manis harum yang memikat.',
    botanicalHeritage:
      'Buah khas tropis kebanggaan Indonesia dengan cita rasa manis harum yang khas tak terlupakan.',
    image: '/images/ingredients/mangga-gedong.jpg',
  },
  {
    id: 'kemukus',
    name: 'Kemukus',
    latinName: 'Piper cubeba',
    activeCompound: 'Cubebin, Cubebol, β-Caryophyllene',
    character: 'Pedas, hangat, beraksen kayu (woody) dan sedikit balsam/camphoraceous.',
    category: 'pedas',
    categoryLabel: 'Rempah Pedas & Harum',
    description:
      'Rempah asli Jawa yang memberikan kehangatan khusus dan aroma rempah eksotis pada racikan.',
    botanicalHeritage:
      'Tumbuhan rempah endemik Indonesia yang dikenal sejak zaman kuno dalam perdagangan rempah rempah dunia.',
    image: '/images/ingredients/kemukus.jpg',
  },
  {
    id: 'valerian',
    name: 'Akar Valerian',
    latinName: 'Valeriana officinalis',
    activeCompound: 'Valerenic Acid, Valerenol, Valeranone, Iridoid',
    character: 'Aroma akar khas (rooty), earthy, dalam, dan menenangkan.',
    category: 'harum',
    categoryLabel: 'Botanical Harum & Akar',
    description:
      'Minyak atsiri akar valerian menghadirkan karakter aroma bumi yang dalam dan rileks.',
    botanicalHeritage:
      'Botanikal aromatik klasik yang dikenal secara tradisional membantu menghadirkan suasana santai dan relaksasi.',
    image: '/images/ingredients/valerian.jpg',
  },
  {
    id: 'alang-alang',
    name: 'Akar Alang-Alang',
    latinName: 'Imperata cylindrica',
    activeCompound: 'Flavonoid, Senyawa Fenolik, Triterpenoid',
    character: 'Herbal, earthy, bersih, dan beraroma ringan alami.',
    category: 'gurih',
    categoryLabel: 'Rempah Gurih & Herbal',
    description:
      'Menyumbangkan sentuhan rasa dasar yang gurih dan netral untuk menyatukan aroma rempah kompleks.',
    botanicalHeritage:
      'Akar rimpang tradisional yang digunakan luas dalam ramuan penyegar alami Nusantara.',
    image: '/images/ingredients/alang-alang.jpg',
  },
];
