'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
}

export default function Preloader({ progress, isLoaded }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-obsidian text-ivory select-none"
      >
        {/* Ambient background glow */}
        <div className="absolute w-96 h-96 rounded-full bg-botanical/10 blur-[120px] pointer-events-none" />
        <div className="absolute w-80 h-80 rounded-full bg-gold/10 blur-[100px] pointer-events-none" />

        <div className="relative flex flex-col items-center text-center px-6 max-w-md">
          {/* Official Emblem */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 mb-8"
          >
            <Image
              src="/images/logo/logo-emblem.png"
              alt="Kretek Rempah SM Emblem"
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(232,200,62,0.3)]"
              priority
            />
          </motion.div>

          <span className="text-[11px] font-mono uppercase tracking-editorial text-botanical mb-2">
            Indonesian Botanical Heritage
          </span>

          <h2 className="font-display font-bold text-2xl tracking-tight text-ivory mb-6">
            KRETEK REMPAH SM
          </h2>

          {/* Progress bar container */}
          <div className="w-56 h-[2px] bg-charcoal-50 rounded-full overflow-hidden relative mb-4">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-botanical via-gold to-botanical rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          {/* Counter percentage */}
          <div className="flex items-center gap-2 font-mono text-xs text-ivory-muted">
            <span className="text-gold font-semibold">{Math.round(progress)}%</span>
            <span>•</span>
            <span className="text-[11px] tracking-wider uppercase text-ivory-dark">
              {progress < 100 ? 'Memuat Aset Visual...' : 'Siap Menjelajah'}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
