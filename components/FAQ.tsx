
'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Plus,
  Minus,
  HelpCircle,
  Search,
  X,
  Leaf,
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

type Category = 'Semua' | 'Produk' | 'Bahan & Komposisi' | 'Informasi Umum';

const categories: Category[] = [
  'Semua',
  'Produk',
  'Bahan & Komposisi',
  'Informasi Umum',
];

function getCategory(question: string): Exclude<Category, 'Semua'> {
  const q = question.toLowerCase();

  if (
    /bahan|komposisi|nikotin|tar|rempah|tembakau|racikan|kandungan|ionisasi|oxygenisasi/.test(q)
  ) {
    return 'Bahan & Komposisi';
  }

  if (
    /varian|produk|cigar|beta|alpha|rasa|kemasan|ukuran/.test(q)
  ) {
    return 'Produk';
  }

  return 'Informasi Umum';
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');
  const [search, setSearch] = useState('');
  const reduceMotion = useReducedMotion();

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return SITE_CONFIG.faqs
      .map((faq, originalIndex) => ({ ...faq, originalIndex }))
      .filter((faq) => {
        const matchesCategory =
          activeCategory === 'Semua' ||
          getCategory(faq.question) === activeCategory;

        const matchesSearch =
          !query ||
          `${faq.question} ${faq.answer}`.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
      });
  }, [activeCategory, search]);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative isolate w-full overflow-hidden border-t border-white/[0.08] bg-obsidian py-24 text-ivory sm:py-32 lg:py-36"
    >
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-dark-botanical opacity-30" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-botanical/[0.07] blur-[120px]" />
        <div className="absolute -right-40 top-[35%] h-96 w-96 rounded-full bg-gold/[0.06] blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.025),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-botanical/25 bg-botanical/[0.08] px-4 py-2">
            <HelpCircle className="h-3.5 w-3.5 text-botanical" />
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-botanical sm:text-[10px]">
              Pusat Informasi
            </span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span className="font-mono text-[9px] text-ivory-dark sm:text-[10px]">
              FAQ / 01
            </span>
          </div>

          <h2 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
            Punya Pertanyaan?
            <span className="mt-1 block text-gradient-gold">
              Temukan Jawabannya.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-7 text-ivory-muted sm:text-base">
            Informasi mengenai Kretek Rempah SM, varian produk, bahan, dan
            karakteristiknya dalam satu tempat.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-botanical/60" />
            <Leaf className="h-4 w-4 text-botanical" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-botanical/60" />
          </div>
        </motion.div>

        {/* Search */}
        <div className="mx-auto mb-6 max-w-3xl">
          <label
            htmlFor="faq-search"
            className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-ivory-dark"
          >
            Cari informasi
          </label>

          <div className="group flex items-center gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.025] px-4 transition-colors duration-300 focus-within:border-gold/40 focus-within:bg-white/[0.04] sm:px-5">
            <Search className="h-4 w-4 shrink-0 text-botanical transition-colors group-focus-within:text-gold" />

            <input
              id="faq-search"
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setOpenIndex(null);
              }}
              placeholder="Cari pertanyaan atau kata kunci..."
              className="min-w-0 flex-1 bg-transparent py-4 text-sm text-ivory outline-none placeholder:text-ivory-dark/70"
            />

            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setOpenIndex(null);
                }}
                aria-label="Hapus pencarian"
                className="rounded-full p-1.5 text-ivory-muted transition-colors hover:bg-white/10 hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="mx-auto mb-10 flex max-w-3xl flex-wrap gap-2 sm:mb-12">
          {categories.map((category) => {
            const active = activeCategory === category;

            const count =
              category === 'Semua'
                ? SITE_CONFIG.faqs.length
                : SITE_CONFIG.faqs.filter(
                    (faq) => getCategory(faq.question) === category
                  ).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setOpenIndex(null);
                }}
                aria-pressed={active}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  active
                    ? 'border-gold/50 bg-gold text-obsidian shadow-[0_4px_24px_rgba(212,175,55,0.12)]'
                    : 'border-white/[0.09] bg-white/[0.025] text-ivory-muted hover:border-botanical/40 hover:text-ivory'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`font-mono text-[10px] ${
                    active ? 'text-obsidian/70' : 'text-ivory-dark'
                  }`}
                >
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ list */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ivory-dark">
              Daftar Pertanyaan
            </span>
            <span className="font-mono text-[10px] text-botanical">
              {String(filteredFaqs.length).padStart(2, '0')} ditemukan
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === faq.originalIndex;

                return (
                  <motion.article
                    layout={!reduceMotion}
                    key={faq.originalIndex}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -8 }
                    }
                    transition={{
                      duration: reduceMotion ? 0 : 0.25,
                      ease: 'easeOut',
                    }}
                    className={`group relative overflow-hidden rounded-2xl border transition-colors duration-300 ${
                      isOpen
                        ? 'border-gold/30 bg-[#151712]'
                        : 'border-white/[0.08] bg-white/[0.018] hover:border-botanical/30 hover:bg-white/[0.035]'
                    }`}
                  >
                    {/* Active accent */}
                    <motion.div
                      aria-hidden="true"
                      initial={false}
                      animate={{ scaleY: isOpen ? 1 : 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                      }}
                      className="absolute bottom-3 left-0 top-3 w-[2px] origin-center rounded-full bg-gradient-to-b from-gold to-botanical"
                    />

                    <button
                      type="button"
                      onClick={() => toggle(faq.originalIndex)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.originalIndex}`}
                      className="flex w-full items-center gap-4 px-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold sm:gap-5 sm:px-6 sm:py-6"
                    >
                      <span
                        className={`hidden w-8 shrink-0 font-mono text-xs sm:block ${
                          isOpen ? 'text-gold' : 'text-ivory-dark'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span
                        className={`min-w-0 flex-1 font-display text-sm font-bold leading-relaxed transition-colors sm:text-base ${
                          isOpen
                            ? 'text-gold'
                            : 'text-ivory group-hover:text-white'
                        }`}
                      >
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? 'rotate-180 border-gold/50 bg-gold text-obsidian'
                            : 'border-white/10 bg-white/[0.04] text-ivory-muted group-hover:border-botanical/40 group-hover:text-botanical'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-4 w-4" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.originalIndex}`}
                          key="answer"
                          initial={
                            reduceMotion
                              ? false
                              : { height: 0, opacity: 0 }
                          }
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 border-t border-white/[0.07] px-4 pb-6 pt-4 sm:ml-[3.75rem] sm:px-6 sm:pb-7">
                            <div className="mb-3 flex items-center gap-2">
                              <span className="h-1 w-5 rounded-full bg-botanical" />
                              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-botanical">
                                {getCategory(faq.question)}
                              </span>
                            </div>

                            <p className="whitespace-pre-line text-sm font-light leading-7 text-ivory-muted sm:text-[15px]">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </AnimatePresence>

            {/* Empty search state */}
            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center"
              >
                <Search className="mx-auto mb-4 h-7 w-7 text-ivory-dark" />
                <h3 className="font-display text-base font-bold text-ivory">
                  Pertanyaan tidak ditemukan
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ivory-muted">
                  Coba gunakan kata kunci lain atau tampilkan semua kategori.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setActiveCategory('Semua');
                    setOpenIndex(null);
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2.5 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-obsidian"
                >
                  Reset pencarian
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </div>

          {/* Bottom contact card */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-botanical/20 bg-gradient-to-br from-botanical/[0.09] via-white/[0.02] to-gold/[0.04] p-5 sm:mt-12 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-botanical/25 bg-botanical/[0.08] text-botanical">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-ivory">
                    Masih ada yang ingin ditanyakan?
                  </h3>
                  <p className="mt-1 text-xs leading-6 text-ivory-muted sm:text-sm">
                    Hubungi kanal resmi kami untuk informasi lebih lanjut.
                  </p>
                </div>
              </div>

              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold px-5 py-3 text-xs font-bold text-obsidian transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f2d66d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                Hubungi Kami
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Editorial footer note */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-[10px] leading-5 text-ivory-dark sm:mt-12">
          Informasi produk mengikuti data dan dokumen yang tersedia.
          Produk tembakau tetap memiliki risiko kesehatan; bahan alami
          tidak berarti bebas risiko.
        </p>
      </div>
    </section>
  );
}
