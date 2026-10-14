'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface ShowcaseSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  caption: string;
  variantTag: string;
}

const SLIDES: ShowcaseSlide[] = [
  {
    id: 'beta-highland',
    image: '/images/products/lifestyle-beta.jpg',
    title: 'Srintil di Balik Kabut Pegunungan',
    subtitle: 'Varian Beta • Temanggung Heritage',
    caption:
      'Perpaduan tembakau Srintil pilihan berpadu dengan jahe merah dan sirih merah dalam suasana hening pegunungan Jawa Tengah.',
    variantTag: 'BETA SKT',
  },
  {
    id: 'cigar-plantation',
    image: '/images/products/g.jpg',
    title: 'Ambri Daun Tembakau yang Berkelas',
    subtitle: 'Varian Cigar • Tobacco in Tobacco',
    caption:
      'Menghadirkan karakter tembakau tidak hanya dari racikan isi, tetapi juga dari pembungkus luar yang dibuat dari daun tembakau asli.',
    variantTag: 'CIGAR SK',
  },
  {
    id: 'apel-orchard',
    image: '/images/products/e.jpg',
    title: 'Kesegaran Alam Apel & Kesejukan Mint',
    subtitle: 'Varian Apel Mint • Refreshing Botanical',
    caption:
      'Keseimbangan rasa buah apel yang manis lembut berpadu dengan sensasi sejuk Mint Pakistan dan aroma cengkeh Maluku.',
    variantTag: 'APEL MINT SKT',
  },
  {
    id: 'mangga-vista',
    image: '/images/products/mangga-mint.jpg',
    title: 'Eksotisme Buah Tropis Nusantara',
    subtitle: 'Varian Mangga Mint • Playful Harmony',
    caption:
      'Manisnya ekstrak mangga gedong tropis yang hidup, dipadukan kehangatan rempah dan kesegaran mint yang berani.',
    variantTag: 'MANGGA MINT SKT',
  },
];

export default function VisualShowcase() {
  const [current, setCurrent] = useState(0);

  // Auto transition every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  const activeSlide = SLIDES[current];

  return (
    <section className="relative w-full py-28 sm:py-36 bg-charcoal-400 overflow-hidden border-t border-botanical/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-botanical" />
              <span className="font-mono text-xs uppercase tracking-editorial text-botanical">
                Eksplorasi Visual
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ivory tracking-tight">
              Galeri Visual & <span className="text-gradient-gold">Suasana Produk</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-ivory-muted font-light leading-relaxed">
            Dokumentasi kemasan resmi Kretek Rempah SM dalam lanskap botani dan keindahan alam Indonesia.
          </p>
        </div>

        {/* Cinematic Showcase Frame */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-charcoal-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                priority
                className="object-cover"
              />

              {/* Cinematic Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-transparent hidden sm:block" />

              {/* Caption Overlay */}
              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 max-w-xl text-left z-20">
                <span className="inline-block px-3 py-1 rounded-full bg-botanical/20 border border-botanical/40 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-botanical font-bold mb-3">
                  {activeSlide.variantTag}
                </span>

                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-ivory tracking-tight mb-2">
                  {activeSlide.title}
                </h3>

                <p className="text-xs sm:text-sm text-ivory-muted font-light leading-relaxed max-w-md hidden sm:block">
                  {activeSlide.caption}
                </p>
              </div>

              {/* Tag bottom right */}
              <div className="absolute top-6 right-6 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-200/80 backdrop-blur-md border border-white/10 text-xs font-mono text-ivory-muted">
                <Eye className="w-3.5 h-3.5 text-gold" />
                <span>{activeSlide.subtitle}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-6 right-6 z-30 flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-charcoal-100/80 hover:bg-charcoal border border-white/15 text-ivory hover:text-gold transition-all backdrop-blur-md"
              aria-label="Slide sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-charcoal-100/80 hover:bg-charcoal border border-white/15 text-ivory hover:text-gold transition-all backdrop-blur-md"
              aria-label="Slide berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="absolute top-6 left-6 z-30 flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === i ? 'w-8 bg-gold' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Pindah ke slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
