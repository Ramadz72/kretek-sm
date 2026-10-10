'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Phone, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/site-config';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_PREVIEWS: Record<string, string> = {
  '01': '/images/products/lifestyle-apel.jpg',
  '02': '/images/tobacco-macro.jpg',
  '03': '/images/products/beta.jpg',
  '04': '/images/ingredients/cengkeh.jpg',
  '05': '/images/products/cigar.jpg',
  '06': '/images/logo/logo-stacked.png',
};

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [activeItem, setActiveItem] = useState<string>('01');

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const handleLinkClick = (href: string) => {
    onClose();
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9000] bg-obsidian/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-y-auto"
        >
          {/* Header Bar inside Menu */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11">
                <Image
                  src="/images/logo/logo-emblem.png"
                  alt="Kretek Rempah SM"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-wider text-ivory">
                  KRETEK REMPAH SM
                </span>
                <span className="text-[10px] font-mono text-botanical uppercase tracking-widest">
                  Navigasi Editorial
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-charcoal-100 hover:border-gold hover:bg-charcoal text-ivory transition-all duration-300"
              aria-label="Tutup Menu"
            >
              <span className="text-xs uppercase font-mono tracking-widest text-ivory group-hover:text-gold transition-colors">
                Tutup
              </span>
              <X className="w-4 h-4 text-ivory-muted group-hover:text-gold group-hover:rotate-90 transition-all duration-300" />
            </button>
          </div>

          {/* Main Menu Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-8">
            {/* Left Column: Navigation Items */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4">
              {SITE_CONFIG.navItems.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    onMouseEnter={() => setActiveItem(item.number)}
                    className="group flex items-baseline gap-4 sm:gap-6 text-left py-1 text-ivory hover:text-gold transition-colors w-full"
                  >
                    <span className="font-mono text-xs sm:text-sm text-botanical/80 group-hover:text-gold transition-colors">
                      {item.number}
                    </span>
                    <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight relative overflow-hidden">
                      <span className="inline-block transition-transform duration-500 group-hover:translate-x-3">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-gold" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Dynamic Editorial Preview & Info */}
            <div className="lg:col-span-5 hidden lg:flex flex-col justify-between pl-8 border-l border-white/10">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-charcoal-200">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={MENU_PREVIEWS[activeItem] || '/images/tobacco-macro.jpg'}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-botanical block mb-1">
                        Koleksi Kretek Rempah SM
                      </span>
                      <p className="text-sm font-display font-medium text-ivory">
                        {SITE_CONFIG.subTagline}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Direct Info */}
              <div className="space-y-4 pt-6">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-ivory-dark block mb-1">
                    Kanal Resmi
                  </span>
                  <div className="flex flex-col gap-2 text-sm text-ivory-muted">
                    <a
                      href={SITE_CONFIG.contact.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-gold transition-colors"
                    >
                      <Phone className="w-4 h-4 text-botanical" />
                      <span>{SITE_CONFIG.contact.whatsapp}</span>
                    </a>
                    <a
                      href={SITE_CONFIG.contact.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-gold transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-botanical" />
                      <span>{SITE_CONFIG.contact.instagram}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar inside Menu */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ivory-dark">
            <span>© {new Date().getFullYear()} {SITE_CONFIG.legalBrandName}.</span>
            <span className="text-gold/90 text-center sm:text-right">
              21+ Hanya untuk Konsumen Dewasa di Indonesia
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
