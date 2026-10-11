
'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowDownRight,
  ArrowUpRight,
  Leaf,
  Award,
  Compass,
  Sparkles,
  ShieldCheck,
  Info,
} from 'lucide-react';

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.4, 1]);
  const color = useTransform(
    progress,
    range,
    ['rgba(243, 240, 229, 0.48)', 'rgba(243, 240, 229, 1)']
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-[0.24em] inline-block"
    >
      {children}
    </motion.span>
  );
}

const pillars = [
  {
    number: '01',
    title: 'Inspirasi Rempah',
    label: 'BOTANICAL HERITAGE',
    description:
      'Inspirasi kekayaan rempah Nusantara menjadi bagian dari cerita dan identitas Kretek Rempah SM.',
    Icon: Leaf,
    accent: '#b5d36c',
  },
  {
    number: '02',
    title: 'Karakter Tembakau',
    label: 'TOBACCO HERITAGE',
    description:
      'Kemloko, Kasturi, Podeng, Virgin, dan Srintil Temanggung merupakan jenis tembakau yang disebut dalam identitas produk.',
    Icon: Award,
    accent: '#c8a95e',
  },
  {
    number: '03',
    title: 'Identitas Nusantara',
    label: 'INDONESIAN CHARACTER',
    description:
      'Bahasa visual yang mempertemukan inspirasi tradisi kretek Indonesia dengan pendekatan desain kontemporer.',
    Icon: Compass,
    accent: '#d9d2bd',
  },
];

export default function TextReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const headline =
    'Berakar dari Nusantara. Dikenal lewat karakter.';
  const headlineWords = headline.split(' ');

  const bodyText =
    'KRETEK REMPAH ADALAH PRODUK HASIL RACIKAN REMPAH-REMPAH BERKHASIAT BERTUJUAN MERUBAH STIGMA ROKOK KONVENSIONAL.';
  const bodyWords = bodyText.split(' ');

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [28, -28]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.04, 1]
  );

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative isolate w-full overflow-hidden border-y border-white/[0.08] bg-[#0a0d09] py-24 text-[#f3f0e5] sm:py-32 lg:py-40"
    >
      {/* Dark botanical atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-48 top-24 h-[500px] w-[500px] rounded-full bg-[#718a3f]/10 blur-[150px]" />
        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#a98946]/[0.08] blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#b5d36c]/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Editorial section marker */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-wrap items-center justify-between gap-4 sm:mb-16"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#b5d36c]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#b5d36c] sm:text-xs">
              Identitas & Kisah Merek
            </span>
          </div>

          <span className="font-mono text-[9px] tracking-[0.18em] text-white/30">
            KRETEK REMPAH SM / 001
          </span>
        </motion.div>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-14">
          {/* LEFT: editorial brand narrative */}
          <div className="lg:col-span-7">

            <h2 className="max-w-4xl text-[clamp(2.65rem,6.1vw,5.8rem)] font-black leading-[0.99] tracking-[-0.055em]">
              {headlineWords.map((word, index) => {
                const start = (index / headlineWords.length) * 0.48;
                const end =
                  ((index + 1) / headlineWords.length) * 0.48;

                return (
                  <Word
                    key={`${word}-${index}`}
                    progress={scrollYProgress}
                    range={[start, end]}
                  >
                    {word}
                  </Word>
                );
              })}
            </h2>

            <motion.div
              initial={reduceMotion ? false : { width: 0 }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-8 h-px bg-gradient-to-r from-[#c8a95e] to-transparent"
            />

            <p className="mt-7 max-w-2xl text-base font-light leading-8 text-white/65 sm:text-lg sm:leading-9">
              {bodyWords.map((word, index) => {
                const start =
                  0.48 + (index / bodyWords.length) * 0.48;
                const end = Math.min(
                  1,
                  0.48 + ((index + 1) / bodyWords.length) * 0.48
                );

                return (
                  <Word
                    key={`${word}-${index}`}
                    progress={scrollYProgress}
                    range={[start, end]}
                  >
                    {word}
                  </Word>
                );
              })}
            </p>

            {/* Brand signature */}
            <div className="mt-9 flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c8a95e]/30 bg-[#c8a95e]/[0.06]">
                <ArrowDownRight
                  className="h-5 w-5 text-[#c8a95e]"
                  strokeWidth={1.3}
                />
              </div>
              <div className="space-y-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Heritage Line
                </p>
                <p className="text-sm text-white/70">
                  Berakar pada rempah, dikenal karena karakter.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: botanical visual */}
          <div className="relative lg:col-span-5">
            <motion.div
              style={{ y: imageY }}
              className="relative"
            >
              {/* Image index */}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#b5d36c]">
                  Visual Archive / 01
                </span>
                <span className="font-mono text-[9px] text-white/30">
                  NUSANTARA
                </span>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-botanical/25 bg-charcoal-200 shadow-luxury">
                <motion.div
                  style={{ scale: imageScale }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/tobacco-macro.jpg"
                    alt="Detail visual daun tembakau untuk identitas Kretek Rempah SM"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    priority={false}
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#080b08]/90 via-[#080b08]/10 to-[#080b08]/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080b08]/15 to-transparent" />

                {/* Fine editorial frame */}
                <div className="pointer-events-none absolute inset-4 border border-white/20" />

                <div className="absolute left-8 top-8">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/65">
                    Botanical Study
                  </p>
                  <div className="mt-3 h-px w-10 bg-[#c8a95e]" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#c8a95e]">
                    Karakter Bahan
                  </span>

                  <h3 className="mt-3 max-w-sm text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#f3f0e5] sm:text-4xl">
                    Terinspirasi
                    <br />
                    kekayaan alam.
                  </h3>

                  <p className="mt-4 max-w-sm text-xs leading-6 text-white/65 sm:text-sm">
                    Sebuah eksplorasi visual tentang bahan, tekstur,
                    dan warisan botani Nusantara.
                  </p>
                </div>
              </div>

              {/* Emblem card */}
              <div className="absolute -right-3 top-16 flex h-[68px] w-[68px] rotate-6 items-center justify-center border border-[#c8a95e]/50 bg-[#11150f] p-3 shadow-2xl sm:-right-5 sm:h-[84px] sm:w-[84px]">
                <Image
                  src="/images/logo/logo-emblem.png"
                  alt="Emblem Kretek Rempah SM"
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Caption under image */}
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">
                  Kretek Rempah SM
                </span>

                <span className="flex items-center gap-2 text-[10px] text-white/55">
                  Brand Identity
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#c8a95e]" />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      {/* Product information comparison */}
        <div className="mt-24 sm:mt-32">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              Memahami Komposisi
            </p>
            <h3 className="font-display text-3xl font-black leading-tight sm:text-5xl">
              Setiap produk memiliki
              <span className="text-gradient-gold"> karakter berbeda.</span>
            </h3>
            <p className="mt-5 text-sm leading-7 text-ivory-muted sm:text-base">
              Komposisi dan proses produksi dapat berbeda antara produk
              dan produsen. Karena itu, informasi bahan perlu dipahami
              berdasarkan dokumentasi masing-masing produk.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">

            {/* SM card */}
            <motion.article
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-botanical/35 bg-charcoal-200 p-6 sm:p-9"
            >
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-botanical/[0.07] blur-3xl" />

              <div className="relative">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-botanical/30 bg-botanical/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-botanical">
                    Informasi Produk
                  </span>
                  <Leaf className="h-5 w-5 text-botanical" />
                </div>

                <h4 className="mb-5 font-display text-2xl font-black sm:text-3xl">
                  Kretek Rempah SM
                </h4>

                <div className="space-y-5 text-sm leading-7 text-ivory-muted">
                  <p>
                    Produk ini dibuat dari rempah-rempah herbal berkualitas tinggi yang dipilih sesuai standar produksi CV Walatra / Acep Herbal.

                  </p>

                  <p>
                    Sebagai pelengkap, digunakan madu bunga randu alami yang dikenal luas sebagai salah satu bahan alami yang sering dimanfaatkan dalam menjaga kesehatan.
                  </p>

                  <p>
                    Seluruh proses pembuatannya dilakukan secara bertahap dan teliti berdasarkan pengalaman dalam mengolah bahan herbal. Hal ini bertujuan untuk menjaga kualitas dan karakter produk agar tetap konsisten.
                  </p>
                </div>

                <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-botanical" />
                  <p className="text-xs leading-6 text-ivory-dark">
                    Dengan perpaduan bahan alami dan proses produksi yang dilakukan secara cermat, produk ini hadir sebagai pilihan herbal untuk melengkapi GAYA HIDUP SEHAT.
                  </p>
                </div>
              </div>
            </motion.article>

            {/* Conventional tobacco card */}
            <motion.article
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-gold/20 bg-[#15140f] p-6 sm:p-9"
            >
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gold/[0.06] blur-3xl" />

              <div className="relative">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="rounded-full border border-gold/25 bg-gold/[0.07] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-gold">
                    Informasi Umum
                  </span>
                  <ShieldCheck className="h-5 w-5 text-gold" />
                </div>

                <h4 className="mb-5 font-display text-2xl font-black sm:text-3xl">
                  Rokok Konvensional
                </h4>

                <div className="space-y-5 text-sm leading-7 text-ivory-muted">
                  <p>
                    Rokok yang beredar secara umum diproduksi menggunakan berbagai bahan tambahan seperti perasa dan aroma.
                  </p>

                  <p>
                    Selain tembakau, beberapa produk menggunakan bahan pembawa aroma seperti propylene glycol.

                  </p>

                  <p>
                    Beberapa produk rokok konvensional juga menggunakan bahan tambahan yang dapat menimbulkan risiko kesehatan bagi konsumen.
                    mempengaruhi otak dan menyebabkan tingkat kecanduan (adiksi) fisik dan psikologis yang sangat tinggi
                  </p>
                </div>

                <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <p className="text-xs leading-6 text-ivory-dark">
                    Memilih produk secara bijak merupakan langkah penting bagi konsumen.
                  </p>
                </div>
              </div>
            </motion.article>

          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-gold/20 bg-charcoal-200 px-6 py-12 text-center sm:mt-28 sm:px-12 sm:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-botanical/[0.08] via-transparent to-gold/[0.06]"
          />

          <div className="relative mx-auto max-w-3xl">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-botanical">
              Filosofi Kretek Rempah SM
            </p>

            <h3 className="font-display text-3xl font-black leading-tight sm:text-5xl">
              Rempah.
              <span className="text-ivory-muted/50"> Karakter.</span>
              <span className="block text-gradient-gold">Kreasi.</span>
            </h3>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-ivory-muted sm:text-base">
              Sebuah identitas yang terinspirasi oleh keberagaman bahan
              dan kekayaan rempah Nusantara.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}