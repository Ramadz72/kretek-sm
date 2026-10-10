'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Leaf, Award, Compass } from 'lucide-react';

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(
    progress,
    range,
    ['rgba(243, 240, 229, 0.25)', 'rgba(243, 240, 229, 1)']
  );

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.25em] transition-colors">
      {children}
    </motion.span>
  );
}

export default function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const headline = 'Karakter yang berakar pada rempah Nusantara.';
  const headlineWords = headline.split(' ');

  const bodyText =
    'Kretek Rempah SM menghadirkan identitas yang terinspirasi dari kekayaan bahan dan rempah Indonesia, dikemas dengan pendekatan visual yang khas.';
  const bodyWords = bodyText.split(' ');

  // Parallax transform for botanical imagery
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full py-28 sm:py-40 bg-charcoal-400 border-t border-botanical/15 overflow-hidden"
    >
      {/* Decorative background grid and gradients */}
      <div className="absolute inset-0 bg-dark-botanical opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-botanical/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-10 h-[1px] bg-botanical" />
          <span className="font-mono text-xs uppercase tracking-editorial text-botanical">
            Identitas & Kisah Merek
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Scrubbed Editorial Typography */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight">
              {headlineWords.map((word, i) => {
                const start = i / headlineWords.length;
                const end = start + 1 / headlineWords.length;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start * 0.5, end * 0.5]}>
                    {word}
                  </Word>
                );
              })}
            </h2>

            <div className="w-24 h-[1px] bg-gradient-to-r from-gold to-transparent" />

            <p className="text-xl sm:text-2xl font-sans font-light leading-relaxed">
              {bodyWords.map((word, i) => {
                const start = 0.4 + (i / bodyWords.length) * 0.5;
                const end = start + 0.5 / bodyWords.length;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, Math.min(1, end)]}>
                    {word}
                  </Word>
                );
              })}
            </p>

            {/* Three key pillars preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-botanical">
                  <Leaf className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-ivory">
                    17 Rempah Alami
                  </span>
                </div>
                <p className="text-xs text-ivory-dark leading-relaxed">
                  Perpaduan seimbang antara karakter manis, gurih, pedas, dan harum.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gold">
                  <Award className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-ivory">
                    5 Tembakau Pilihan
                  </span>
                </div>
                <p className="text-xs text-ivory-dark leading-relaxed">
                  Kemloko, Kasturi, Podeng, Virgin, dan Srintil Temanggung legendaris.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-ivory">
                  <Compass className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-ivory">
                    Asap Halus & Harum
                  </span>
                </div>
                <p className="text-xs text-ivory-dark leading-relaxed">
                  Aroma lembut alami yang tidak meninggalkan bau apek menyengat.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Asymmetrical Macro Botanical Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-botanical/30 shadow-luxury group"
            >
              <Image
                src="/images/tobacco-macro.jpg"
                alt="Makro Daun Tembakau Alami Kretek Rempah SM"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

              {/* Editorial Tag Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-charcoal-200/90 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-botanical">
                    Arsip Botani
                  </span>
                  <span className="text-[10px] font-mono text-gold">Srintil & Kemloko</span>
                </div>
                <p className="text-xs text-ivory-muted leading-relaxed font-sans">
                  "Menghadirkan pengalaman menikmati kekayaan rasa Nusantara dalam balutan kretek yang memiliki karakter tersendiri."
                </p>
              </div>
            </motion.div>

            {/* Decorative Gold Accent Badge */}
            <div className="absolute -top-5 -right-5 w-20 h-20 rounded-2xl bg-charcoal-100 border border-gold/40 flex items-center justify-center p-3 shadow-luxury-gold rotate-6 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/logo-emblem.png"
                alt="Emblem"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
