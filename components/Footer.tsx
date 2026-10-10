'use client';

import Image from 'next/image';
import { Phone, Instagram, Mail, AlertTriangle, ArrowUp } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="kontak" className="relative w-full bg-obsidian border-t border-botanical/20 pt-20 pb-28 text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mandatory Health Warning Box */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-charcoal-200 border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-2xl bg-charcoal-50 text-gold border border-gold/30 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-gold block mb-1 font-semibold">
                Pemberitahuan Regulasi Tembakau Indonesia
              </span>
              <p className="text-sm font-mono text-ivory leading-relaxed font-bold">
                {SITE_CONFIG.legalNotice.healthWarning}
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-charcoal-50 border border-white/10 text-xs font-mono text-ivory-dark shrink-0">
            {SITE_CONFIG.legalNotice.ageRestriction}
          </span>
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
