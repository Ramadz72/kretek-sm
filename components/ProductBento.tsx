'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, Check, Clock, Wind } from 'lucide-react';
import { PRODUCTS, ProductVariant } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/site-config';

export default function ProductBento() {
  const [selectedProduct, setSelectedProduct] = useState<ProductVariant | null>(null);

  const heroProduct = PRODUCTS.find((p) => p.id === 'beta') || PRODUCTS[0];
  const secondaryProducts = PRODUCTS.filter((p) => p.id !== 'beta');

  return (
    <section id="koleksi" className="relative w-full py-28 sm:py-36 bg-obsidian">
      {/* Glow decorations */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-botanical/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-botanical" />
              <span className="font-mono text-xs uppercase tracking-editorial text-botanical">
                Koleksi Resmi Terverifikasi
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-tight">
              Koleksi Varian <span className="text-gradient-gold">Kretek Rempah SM</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-ivory-muted leading-relaxed font-light">
            Setiap varian dirancang dengan kecocokan antara tembakau pilihan dan perpaduan rempah terukur untuk menghasilkan karakter rasa yang selaras.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1. Large Hero Bento Card: BETA (Masterpiece Srintil) */}
          <div className="md:col-span-12 lg:col-span-8 group relative rounded-3xl bg-charcoal-200 border border-botanical/30 p-6 sm:p-10 overflow-hidden flex flex-col justify-between hover:border-botanical transition-all duration-500 shadow-luxury">
            <div className="absolute inset-0 bg-gradient-to-br from-botanical/10 via-transparent to-black/60 pointer-events-none" />

            {/* Top row */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-8">
              <span className="px-3.5 py-1.5 rounded-full bg-botanical/15 border border-botanical/40 text-botanical font-mono text-xs uppercase tracking-wider font-semibold">
                {heroProduct.badge}
              </span>
              <span className="font-mono text-xs text-ivory-dark">
                {heroProduct.category} • 12 Batang
              </span>
            </div>

            {/* Middle: Content + Image presentation */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-auto">
              <div className="space-y-4">
                <span className="text-xs font-mono text-gold uppercase tracking-widest block">
                  Tembakau Srintil Temanggung
                </span>
                <h3 className="font-display font-black text-3xl sm:text-5xl text-ivory tracking-tight">
                  {heroProduct.name}
                </h3>
                <p className="text-sm text-ivory-muted leading-relaxed">
                  {heroProduct.shortDescription}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {heroProduct.tobaccoBase.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-charcoal-50 text-ivory-muted border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product Pack Artwork */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] max-w-xs mx-auto w-full rounded-2xl overflow-hidden border border-white/10 group-hover:scale-[1.02] transition-transform duration-700 shadow-2xl">
                <Image
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-botanical">
                    Kemasan Resmi dari Katalog
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs font-mono text-ivory-dark">
                <span>Nikotin: <strong className="text-gold">0,9 mg</strong></span>
                <span>•</span>
                <span>Tar: <strong className="text-gold">37,3 mg</strong></span>
              </div>

              <button
                onClick={() => setSelectedProduct(heroProduct)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-botanical text-obsidian font-display font-bold text-xs uppercase tracking-wider hover:bg-botanical-light transition-all shadow-md group-hover:scale-105"
              >
                <span>Lihat Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Medium Card: CIGAR (Artisanal Ambri) */}
          {secondaryProducts.find((p) => p.id === 'cigar') && (() => {
            const cigar = secondaryProducts.find((p) => p.id === 'cigar')!;
            return (
              <div className="md:col-span-12 lg:col-span-4 group relative rounded-3xl bg-charcoal-200 border border-white/10 p-6 sm:p-8 overflow-hidden flex flex-col justify-between hover:border-gold/60 transition-all duration-500 shadow-luxury">
                <div className="absolute inset-0 bg-gradient-to-b from-[#70462D]/15 via-transparent to-black/60 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold font-mono text-[11px] uppercase tracking-wider font-semibold">
                    {cigar.badge}
                  </span>
                  <span className="font-mono text-[11px] text-ivory-dark">Sigaret Kretek</span>
                </div>

                <div className="relative z-10 my-4 text-center">
                  <div className="relative w-44 h-52 mx-auto rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:scale-105 transition-transform duration-500 mb-4">
                    <Image src={cigar.image} alt={cigar.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-ivory tracking-tight mb-2">
                    {cigar.name}
                  </h3>
                  <p className="text-xs text-ivory-muted line-clamp-2">
                    {cigar.tagline}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-ivory-dark">
                    Ambri Daun Tembakau
                  </span>
                  <button
                    onClick={() => setSelectedProduct(cigar)}
                    className="p-2.5 rounded-full bg-charcoal-50 hover:bg-gold hover:text-obsidian text-gold transition-colors"
                    aria-label={`Detail ${cigar.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* 3. Medium Card: APEL MINT */}
          {secondaryProducts.find((p) => p.id === 'apel-mint') && (() => {
            const item = secondaryProducts.find((p) => p.id === 'apel-mint')!;
            return (
              <div className="md:col-span-6 lg:col-span-4 group relative rounded-3xl bg-charcoal-200 border border-white/10 p-6 sm:p-8 overflow-hidden flex flex-col justify-between hover:border-botanical/60 transition-all duration-500 shadow-luxury">
                <div className="absolute inset-0 bg-gradient-to-b from-[#8BCB25]/15 via-transparent to-black/60 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-botanical/15 border border-botanical/30 text-botanical font-mono text-[11px] uppercase tracking-wider font-semibold">
                    {item.badge}
                  </span>
                  <span className="font-mono text-[11px] text-ivory-dark">SKT 12 Batang</span>
                </div>

                <div className="relative z-10 my-4 text-center">
                  <div className="relative w-44 h-52 mx-auto rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:scale-105 transition-transform duration-500 mb-4">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ivory tracking-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-ivory-muted line-clamp-2">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-botanical">
                    Apel & Mint Pakistan
                  </span>
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="p-2.5 rounded-full bg-charcoal-50 hover:bg-botanical hover:text-obsidian text-botanical transition-colors"
                    aria-label={`Detail ${item.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* 4. Medium Card: MANGGA MINT */}
          {secondaryProducts.find((p) => p.id === 'mangga-mint') && (() => {
            const item = secondaryProducts.find((p) => p.id === 'mangga-mint')!;
            return (
              <div className="md:col-span-6 lg:col-span-4 group relative rounded-3xl bg-charcoal-200 border border-white/10 p-6 sm:p-8 overflow-hidden flex flex-col justify-between hover:border-gold/60 transition-all duration-500 shadow-luxury">
                <div className="absolute inset-0 bg-gradient-to-b from-[#E8C83E]/15 via-transparent to-black/60 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold font-mono text-[11px] uppercase tracking-wider font-semibold">
                    {item.badge}
                  </span>
                  <span className="font-mono text-[11px] text-ivory-dark">SKT 12 Batang</span>
                </div>

                <div className="relative z-10 my-4 text-center">
                  <div className="relative w-44 h-52 mx-auto rounded-xl overflow-hidden border border-white/10 shadow-xl group-hover:scale-105 transition-transform duration-500 mb-4">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ivory tracking-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-ivory-muted line-clamp-2">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gold">
                    Mangga Gedong & Mint
                  </span>
                  <button
                    onClick={() => setSelectedProduct(item)}
                    className="p-2.5 rounded-full bg-charcoal-50 hover:bg-gold hover:text-obsidian text-gold transition-colors"
                    aria-label={`Detail ${item.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* 5. Supporting Bento Card: APEL ORI & MANGGA ORI */}
          <div className="md:col-span-12 lg:col-span-4 rounded-3xl bg-charcoal-200 border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-luxury">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-botanical block mb-2">
                Edisi Tanpa Mint
              </span>
              <h3 className="font-display font-bold text-2xl text-ivory mb-3">
                Apel Ori & Mangga Ori
              </h3>
              <p className="text-xs text-ivory-muted leading-relaxed mb-6">
                Bagi penikmat yang mengutamakan karakter tembakau dan kehangatan rasa buah tropis murni tanpa sensasi dingin mint.
              </p>

              <div className="space-y-3">
                {secondaryProducts
                  .filter((p) => p.id === 'apel-ori' || p.id === 'mangga-ori')
                  .map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className="w-full text-left p-3 rounded-xl bg-charcoal-100 hover:bg-charcoal border border-white/5 hover:border-gold/30 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="font-display font-semibold text-sm text-ivory block">
                          {p.name}
                        </span>
                        <span className="text-[10px] font-mono text-ivory-dark">
                          {p.tagline}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gold" />
                    </button>
                  ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-mono text-ivory-dark flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-botanical" />
              <span>Karakter Buah Alami & Tembakau Pilihan</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PRODUCT DETAIL MODAL / SLIDE-OVER
         ========================================================================= */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-obsidian/90 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-charcoal-200 border border-botanical/40 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-charcoal-100 border border-white/10 hover:bg-charcoal text-ivory hover:text-gold transition-colors z-20"
                aria-label="Tutup Detail"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left: Product Imagery Showcase */}
                <div className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-charcoal-300">
                  <Image
                    src={selectedProduct.lifestyleImage || selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-botanical block mb-1">
                      Foto Resmi Katalog
                    </span>
                    <span className="text-xs font-display text-ivory font-medium">
                      {selectedProduct.category}
                    </span>
                  </div>
                </div>

                {/* Right: Detailed Product Specs & Grounded Heritage */}
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-botanical/20 border border-botanical/40 text-botanical font-mono text-[11px] uppercase tracking-wider font-semibold">
                        {selectedProduct.badge}
                      </span>
                      <span className="text-xs font-mono text-ivory-dark">
                        {selectedProduct.specs.format}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-ivory tracking-tight">
                      {selectedProduct.name}
                    </h3>

                    <p className="text-sm font-mono text-gold mt-1">
                      {selectedProduct.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-ivory-muted leading-relaxed font-light">
                    {selectedProduct.fullDescription}
                  </p>

                  {/* Tobacco Base & Botanical Ingredients */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                    <div>
                      <span className="font-mono uppercase text-botanical tracking-wider text-[11px] block mb-2 flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5" /> Fondasi Tembakau
                      </span>
                      <ul className="space-y-1.5 text-ivory-muted">
                        {selectedProduct.tobaccoBase.map((t, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-botanical shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-mono uppercase text-gold tracking-wider text-[11px] block mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Komposisi Rempah
                      </span>
                      <ul className="space-y-1.5 text-ivory-muted">
                        {selectedProduct.herbalIngredients.map((h, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recommended Moment */}
                  <div className="p-4 rounded-xl bg-charcoal-100/80 border border-white/5 space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-gold font-mono uppercase tracking-wider text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedProduct.recommendedMoments.atmosphere}</span>
                    </div>
                    <p className="text-ivory-muted">
                      {selectedProduct.recommendedMoments.description}
                    </p>
                    <p className="text-ivory-dark font-mono text-[10px] pt-1">
                      Waktu Ideal: {selectedProduct.recommendedMoments.idealTime}
                    </p>
                  </div>

                  {/* Specifications and CTA */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 font-mono text-xs text-ivory-dark">
                      <span>Nikotin: <strong className="text-ivory font-bold">{selectedProduct.specs.nicotine}</strong></span>
                      <span>•</span>
                      <span>Tar: <strong className="text-ivory font-bold">{selectedProduct.specs.tar}</strong></span>
                    </div>

                    <a
                      href={SITE_CONFIG.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-botanical text-obsidian font-display font-bold text-xs uppercase tracking-wider hover:bg-botanical-light transition-all shadow-md"
                    >
                      <span>Hubungi Kanal Resmi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
