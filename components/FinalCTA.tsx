'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Phone, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function FinalCTA() {
  return (
    <section className="relative w-full py-32 sm:py-44 bg-charcoal-400 overflow-hidden border-t border-botanical/20">
      {/* Cinematic Botanical Background & Ambient Glow */}
      <div className="absolute inset-0 bg-dark-botanical opacity-80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-botanical/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative Brand Emblem Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.03] pointer-events-none">
        <Image
          src="/images/logo/logo-emblem.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2">
          <img
            src="/images/products/kretek-sm-stick kaduruk.png"
            alt=""
            aria-hidden="true"
            className="h-20 w-[340px] max-w-[90vw] object-contain opacity-90 sm:h-28 sm:w-[480px]"
          />
        </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-ivory tracking-tight mb-6 leading-tight"
        >
          Kenali karakter <br />
          <span className="text-gradient-gold">Kretek Rempah SM.</span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-xl text-ivory-muted font-light leading-relaxed mb-12"
        >
          Jelajahi identitas, koleksi, dan informasi produk melalui kanal resmi.
        </motion.p>

        {/* Magnetic / Luxury CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {/* Primary CTA */}
          <a
            href="#koleksi"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-botanical hover:bg-botanical-light text-obsidian font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-luxury hover:scale-105 active:scale-95"
          >
            <span>JELAJAHI PRODUK</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          {/* Secondary CTA */}
          <a
            href={SITE_CONFIG.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-charcoal-100 hover:bg-charcoal border border-white/20 hover:border-gold text-ivory hover:text-gold font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
          >
            <Phone className="w-4 h-4 text-botanical" />
            <span>HUBUNGI KAMI</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
