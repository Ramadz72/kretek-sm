'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function AgeNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnderage, setIsUnderage] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('kretek_sm_age_verified');
    if (!verified) {
      setIsOpen(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('kretek_sm_age_verified', 'true');
    setIsOpen(false);
  };

  const handleDeny = () => {
    setIsUnderage(true);
  };

  if (!isOpen) {
    return (
      <aside aria-label="Peringatan Merokok" className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal-400/95 backdrop-blur-md border-t border-botanical/20 py-2.5 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-ivory-dark font-mono">
          <div className="flex items-center gap-2 text-gold">
            <AlertTriangle className="w-4 h-4 shrink-0 text-gold" />
            <span className="font-semibold">{SITE_CONFIG.legalNotice.healthWarning}</span>
          </div>
          <span className="text-ivory-muted/70">
            {SITE_CONFIG.legalNotice.ageRestriction} • {SITE_CONFIG.legalNotice.ageDescription}
          </span>
        </div>
      </aside>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-obsidian/95 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-lg w-full bg-charcoal-200 border border-botanical/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-botanical/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          {/* Icon */}
          <div className="mx-auto w-14 h-14 rounded-full bg-charcoal-50 border border-gold/40 flex items-center justify-center mb-5 text-gold shadow-luxury-gold">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <span className="inline-block text-[10px] tracking-editorial uppercase font-mono text-botanical mb-2">
            Verifikasi Usia Resmi
          </span>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ivory tracking-tight mb-3">
            Peringatan Khusus Dewasa (21+)
          </h2>

          <div className="bg-charcoal-300/80 border border-gold/20 rounded-lg p-3 text-xs text-gold/90 font-mono mb-4 leading-relaxed">
            {SITE_CONFIG.legalNotice.healthWarning}
          </div>

          {!isUnderage ? (
            <>
              <p className="text-sm text-ivory-muted leading-relaxed mb-6">
                Situs ini memuat informasi mengenai produk tembakau dan kretek multiherbal Indonesia. Akses hanya diperuntukkan bagi perokok dewasa berusia <strong>21 tahun ke atas</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleConfirm}
                  className="w-full py-3.5 px-5 bg-botanical hover:bg-botanical-light text-obsidian font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg hover:shadow-botanical/30"
                >
                  Saya Berusia 21+ Tahun
                </button>
                <button
                  onClick={handleDeny}
                  className="w-full py-3.5 px-5 bg-charcoal-50 hover:bg-charcoal border border-ivory/10 hover:border-ivory/30 text-ivory-muted font-display text-xs uppercase tracking-wider rounded-xl transition-all duration-300"
                >
                  Di Bawah 21 Tahun
                </button>
              </div>
            </>
          ) : (
            <div className="text-left bg-red-950/40 border border-red-500/30 rounded-xl p-4 text-sm text-ivory leading-relaxed">
              <p className="font-bold text-red-400 mb-1">Akses Tidak Diizinkan</p>
              <p className="text-xs text-ivory-muted">
                Sesuai peraturan yang berlaku di Indonesia, konten produk tembakau tidak dapat diakses oleh anak di bawah 21 tahun atau wanita hamil. Silakan tutup peramban Anda.
              </p>
            </div>
          )}

          <p className="text-[10px] text-ivory-dark/60 mt-6 tracking-wide">
            {SITE_CONFIG.legalNotice.ageDescription}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
