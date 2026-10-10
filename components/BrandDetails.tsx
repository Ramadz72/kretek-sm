'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, ShieldCheck, Feather, Layers } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = '', duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(end);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-display font-black text-5xl sm:text-6xl text-gold">
      {count}
      {suffix}
    </span>
  );
}

export default function BrandDetails() {
  const principleIcons = [Feather, Layers, ShieldCheck];

  return (
    <section className="relative w-full py-28 sm:py-36 bg-obsidian border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-100 border border-gold/30 text-gold font-mono text-[11px] uppercase tracking-editorial mb-4">
            <Sparkles className="w-3.5 h-3.5 text-botanical" />
            STANDAR & SPESIFIKASI TERVERIFIKASI
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-ivory tracking-tight mb-4">
            Formulasi Terukur & <span className="text-gradient-gold">Fakta Produk</span>
          </h2>
          <p className="text-sm sm:text-base text-ivory-muted font-light leading-relaxed">
            Data spesifikasi dan bahan didokumentasikan secara faktual berdasarkan dokumen resmi katalog Kretek Rempah SM.
          </p>
        </div>

        {/* 1. Animated Count-up Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {SITE_CONFIG.stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-3xl bg-charcoal-200 border border-white/10 text-center hover:border-gold/40 transition-colors duration-300 shadow-luxury"
            >
              <div className="mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <h3 className="font-display font-bold text-base sm:text-lg text-ivory mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-ivory-dark font-mono">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Three Editorial Brand Principles */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-8 h-[1px] bg-botanical" />
            <span className="font-mono text-xs uppercase tracking-editorial text-botanical">
              Tiga Pilar Formulasi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SITE_CONFIG.principles.map((principle, index) => {
              const Icon = principleIcons[index] || Sparkles;
              return (
                <div
                  key={principle.number}
                  className="group relative p-8 rounded-3xl bg-charcoal-300 border border-white/10 hover:border-botanical/50 transition-all duration-500 shadow-luxury flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs text-botanical font-bold">
                        {principle.number}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-charcoal-50 border border-white/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <span className="text-[11px] font-mono uppercase tracking-widest text-ivory-dark block mb-2">
                      {principle.subtitle}
                    </span>

                    <h3 className="font-display font-bold text-2xl text-ivory group-hover:text-gold transition-colors mb-4">
                      {principle.title}
                    </h3>

                    <p className="text-sm text-ivory-muted leading-relaxed font-light">
                      {principle.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-ivory-dark">
                    <span>Kretek Rempah SM</span>
                    <span className="text-botanical">Karya Anak Bangsa</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
