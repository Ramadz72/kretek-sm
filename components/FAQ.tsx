'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full py-28 sm:py-36 bg-obsidian border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-100 border border-botanical/30 text-botanical font-mono text-[11px] uppercase tracking-editorial mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-botanical" />
            INFORMASI & PERTANYAAN UMUM
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ivory tracking-tight mb-4">
            Pertanyaan yang Sering <span className="text-gradient-gold">Diajukan</span>
          </h2>
          <p className="text-sm sm:text-base text-ivory-muted font-light leading-relaxed max-w-xl mx-auto">
            Jawaban terverifikasi mengenai racikan, varian produk, dan karakter unik Kretek Rempah SM.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {SITE_CONFIG.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-charcoal-200 border-gold/40 shadow-luxury-gold'
                    : 'bg-charcoal-300 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span className="font-display font-bold text-lg sm:text-xl text-ivory pr-2">
                    {faq.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-gold text-obsidian border-gold rotate-180'
                        : 'bg-charcoal-50 text-ivory-muted border-white/10'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-ivory-muted leading-relaxed font-light border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
