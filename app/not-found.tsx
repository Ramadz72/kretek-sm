import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian text-ivory flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-botanical/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        <div className="relative w-20 h-20 mb-6">
          <Image
            src="/images/logo/logo-emblem.png"
            alt="Emblem"
            fill
            className="object-contain"
          />
        </div>

        <span className="font-mono text-xs uppercase tracking-editorial text-botanical mb-2">
          Kesalahan 404
        </span>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-ivory tracking-tight mb-4">
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-sm text-ivory-muted font-light leading-relaxed mb-8">
          Halaman yang Anda tuju tidak tersedia atau telah dipindahkan. Silakan kembali ke beranda resmi Kretek Rempah SM.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-botanical hover:bg-botanical-light text-obsidian font-display font-bold text-xs uppercase tracking-wider transition-all shadow-luxury"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </main>
  );
}
