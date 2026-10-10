'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Filter, UsersRound } from 'lucide-react';
import { INGREDIENTS, IngredientCategory } from '@/lib/ingredients';

export default function IngredientShowcase() {
  const [activeFilter, setActiveFilter] = useState<'all' | IngredientCategory>('all');

  const filterCategories: { key: 'all' | IngredientCategory; label: string }[] = [
    { key: 'all', label: 'Semua (17 Rempah)' },
    { key: 'harum', label: 'Rempah Harum' },
    { key: 'manis', label: 'Rempah Manis' },
    { key: 'pedas', label: 'Rempah Pedas' },
    { key: 'gurih', label: 'Rempah Gurih & Herbal' },
    { key: 'buah', label: 'Buah & Botanical' },
  ];

  const filteredIngredients =
    activeFilter === 'all'
      ? INGREDIENTS
      : INGREDIENTS.filter((item) => item.category === activeFilter);

  return (
    <section id="rempah" className="relative w-full py-28 sm:py-36 bg-charcoal-400 border-t border-botanical/15">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-botanical/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-botanical" />
              <span className="font-mono text-xs uppercase tracking-editorial text-botanical">
                Arsip Botani Nusantara
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-tight">
              17 Rempah & <span className="text-gradient-botanical">Kekayaan Botani</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-ivory-muted leading-relaxed font-light">
            Formulasi multiherbal Kretek Rempah SM memadukan 4 spektrum rasa rempah: manis, gurih, pedas, dan harum yang dirangkai secara harmonis.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mr-2 text-ivory-dark font-mono text-xs uppercase">
            <Filter className="w-3.5 h-3.5 text-botanical" />
            <span>Kategori:</span>
          </div>
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                activeFilter === cat.key
                  ? 'bg-botanical text-obsidian font-bold shadow-luxury scale-105'
                  : 'bg-charcoal-100 hover:bg-charcoal-50 text-ivory-muted border border-white/5 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Ingredients Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredIngredients.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl bg-charcoal-200 border border-white/10 hover:border-botanical/50 p-5 flex flex-col justify-between overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-charcoal-300 mb-4 border border-white/10 group-hover:scale-[1.02] transition-transform duration-500">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="px-2.5 py-1 rounded-full bg-obsidian/80 backdrop-blur-md text-[10px] font-mono text-botanical border border-botanical/30">
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Ingredient Title & Latin Name */}
                  <div className="mb-3">
                    <h3 className="font-display font-bold text-xl text-ivory group-hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-mono text-xs italic text-botanical/80">
                      {item.latinName}
                    </p>
                  </div>

                  {/* Key Active Compound */}
                  <div className="mb-3 p-2.5 rounded-lg bg-charcoal-100/90 border border-white/5 text-[11px] font-mono">
                    <span className="text-ivory-dark block text-[10px] uppercase">Senyawa Kunci:</span>
                    <span className="text-gold font-medium">{item.activeCompound}</span>
                  </div>

                  {/* Character Description */}
                  <p className="text-xs text-ivory-muted leading-relaxed font-light mb-3">
                    {item.character}
                  </p>
                </div>

                {/* Botanical Heritage Footer Note */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-ivory-dark">
                  <span className="flex items-center gap-1.5 text-botanical">
                    <Leaf className="w-3 h-3" />
                    <span>Warisan Rasa</span>
                  </span>
                  <span>Katalog SM</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Responsible Disclaimer Banner */}
        <div className="mt-16 p-5 rounded-2xl bg-charcoal-200/90 border border-gold/20 flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-ivory-muted text-center sm:text-left">
          <div className="p-2.5 rounded-xl bg-charcoal-50 text-gold border border-gold/30 shrink-0">
            <UsersRound className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-ivory block mb-0.5">Komitmen Komunikasi Bertanggung Jawab:</span>
            <p className="text-ivory-dark leading-relaxed">
              Informasi bahan botani dan rempah-rempah disajikan semata-mata untuk mengomunikasikan identitas racikan rasa dan warisan budaya kretek Indonesia. Penggunaan bahan herbal tidak dimaksudkan untuk mengklaim manfaat medis, penyembuhan penyakit, atau meniadakan risiko kesehatan tembakau.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
