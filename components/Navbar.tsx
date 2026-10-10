'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, ShoppingCart } from 'lucide-react';
import FullscreenMenu from './FullscreenMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-obsidian/85 backdrop-blur-xl border-b border-botanical/15 shadow-luxury'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#hero"
            className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
            aria-label="Kembali ke Beranda Kretek Rempah SM"
          >
            
          <div className="relative h-20 w-72 sm:h-16 sm:w-60">
            <Image
              src="/images/logo/logo-horizontal.png"
              alt="Kretek Rempah SM Logo"
              fill
              priority
              className="object-contain object-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            />
          </div>


          </a>

          {/* Center Subtle Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-ivory-muted">
            <a
              href="#story"
              className="hover:text-gold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all"
            >
              Tentang Kami
            </a>
            <a
              href="#koleksi"
              className="hover:text-gold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all"
            >
              Koleksi
            </a>
            <a
              href="#rempah"
              className="hover:text-gold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all"
            >
              Rempah Nusantara
            </a>
            <a
              href="#faq"
              className="hover:text-gold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action: Menu Trigger Button */}
          <div className="flex items-center gap-3">
            <a
              href="#koleksi"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display font-semibold tracking-wider uppercase text-gold bg-charcoal-100 hover:bg-charcoal-50 border border-gold/30 hover:border-gold transition-all duration-300"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-botanical" />
              <span>Lihat Produk</span>
            </a>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-charcoal-200/80 hover:bg-charcoal hover:border-botanical text-ivory transition-all duration-300"
              aria-label="Buka Menu Navigasi"
            >
              <span className="text-xs uppercase font-mono tracking-widest text-ivory group-hover:text-botanical transition-colors">
                Menu
              </span>
              <Menu className="w-4 h-4 text-botanical group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation Modal */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
