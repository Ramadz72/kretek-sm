
'use client';

import Image from 'next/image';
import { Phone, Instagram, Mail, ArrowUp } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="kontak" className="relative w-full bg-obsidian border-t border-botanical/20 pt-20 pb-28 text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Advanced Health Warning */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-[#77752c]/40 bg-[#090b08] shadow-[0_16px_50px_rgba(0,0,0,0.3)]">

          {/* Top accent line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#b5a83a] to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-[190px_minmax(0,1fr)_minmax(0,0.85fr)]">

            {/* Official health warning image */}
            <div className="relative min-h-[210px] overflow-hidden border-b border-white/10 md:min-h-[150px] md:border-b-0 md:border-r md:border-white/10">
              <Image
                src="/images/warnings/health-warning.jpg"
                alt="Foto peringatan kesehatan resmi pada produk tembakau"
                fill
                sizes="(max-width: 768px) 100vw, 190px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10" />

              <span className="absolute bottom-3 left-3 rounded-md border border-white/20 bg-black/70 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white">
                Health Warning
              </span>
            </div>

            {/* Main warning copy */}
            <div className="flex flex-col justify-center gap-3 border-b border-white/10 p-5 sm:p-7 md:border-b-0 md:border-r md:border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e5c83d] shadow-[0_0_10px_rgba(229,200,61,0.5)]" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9b94a]">
                  Peringatan Kesehatan
                </span>
              </div>

              <p className="font-mono text-sm font-bold uppercase leading-relaxed tracking-wide text-[#e5cf50] sm:text-base">
                {SITE_CONFIG.legalNotice.healthWarning}
              </p>

              <div className="h-px w-16 bg-gradient-to-r from-[#c9b94a]/70 to-transparent" />

              <p className="text-[11px] leading-relaxed text-white/50">
                Informasi risiko kesehatan terkait penggunaan produk tembakau.
              </p>
            </div>

            {/* Age restriction */}
            <div className="flex flex-col justify-center gap-4 p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c9b94a]/30 bg-[#c9b94a]/[0.07]">
                  <span className="font-mono text-sm font-black text-[#e5cf50]">
                    21+
                  </span>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#c9b94a]">
                    Batas Usia
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#eee9d8]">
                    Dewasa saja
                  </p>
                </div>
              </div>

              <p className="text-xs leading-6 text-white/60">
                {SITE_CONFIG.legalNotice.ageDescription}
              </p>
            </div>

          </div>

          {/* Bottom accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="relative w-44 h-24">
              <Image
                src="/images/logo/logo-stacked.png"
                alt="Kretek Rempah SM"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm text-ivory-muted leading-relaxed font-light max-w-sm">
              {SITE_CONFIG.description}
            </p>
            <div className="font-mono text-xs text-botanical uppercase tracking-wider">
              {SITE_CONFIG.subTagline}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-editorial text-botanical font-semibold">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-ivory-muted">
              {SITE_CONFIG.navItems.map((item) => (
                <li key={item.number}>
                  <a
                    href={item.href}
                    className="hover:text-gold transition-colors flex items-center gap-2"
                  >
                    <span className="text-xs font-mono text-ivory-dark">{item.number}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact & Inquiries */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-editorial text-gold font-semibold">
              Kanal Resmi & Informasi
            </h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Hubungi perwakilan resmi kami untuk informasi katalog lengkap dan pemesanan perokok dewasa.
            </p>
            <div className="space-y-2.5 text-sm font-mono text-ivory-muted pt-2">
              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-charcoal-200 border border-white/5 hover:border-gold/40 text-ivory hover:text-gold transition-all"
              >
                <Phone className="w-4 h-4 text-botanical shrink-0" />
                <span>WhatsApp: {SITE_CONFIG.contact.whatsapp}</span>
              </a>

              <a
                href={SITE_CONFIG.contact.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-charcoal-200 border border-white/5 hover:border-gold/40 text-ivory hover:text-gold transition-all"
              >
                <Instagram className="w-4 h-4 text-botanical shrink-0" />
                <span>Instagram: {SITE_CONFIG.contact.instagram}</span>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-charcoal-200 border border-white/5 text-ivory-dark">
                <Mail className="w-4 h-4 text-botanical shrink-0" />
                <span>{SITE_CONFIG.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ivory-dark">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.legalBrandName}. Seluruh Hak Cipta Dilindungi.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-ivory-dark/70">
              {SITE_CONFIG.legalNotice.ageDescription}
            </span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-charcoal-200 border border-white/10 hover:border-gold text-ivory-muted hover:text-gold transition-colors"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
