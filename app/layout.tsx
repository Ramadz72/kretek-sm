import type { Metadata, Viewport } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import { SITE_CONFIG } from '@/lib/site-config';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kretekrempahsm.com'),
  title: `${SITE_CONFIG.brandName} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  keywords: [
    'Kretek Rempah SM',
    'Kretek Rempah Indonesia',
    'Kretek Multiherbal',
    'Tembakau Srintil',
    'Rempah Nusantara',
    'Apel Mint',
    'Mangga Mint',
    'Cigar Rempah',
    'Beta Rempah',
  ],
  authors: [{ name: SITE_CONFIG.legalBrandName }],
  creator: SITE_CONFIG.brandName,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://kretekrempahsm.com',
    title: `${SITE_CONFIG.brandName} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.brandName,
    images: [
      {
        url: '/images/products/lifestyle-beta.jpg',
        width: 1200,
        height: 630,
        alt: 'Kretek Rempah SM Hero Visual',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.brandName} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: ['/images/products/lifestyle-beta.jpg'],
  },
  icons: {
    icon: '/images/logo/logo-emblem.png',
    apple: '/images/logo/logo-emblem.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0C09',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth selection:bg-botanical selection:text-obsidian`}
    >
      <body className="bg-obsidian text-ivory antialiased overflow-x-hidden">
        {/* Subtle Cinematic Film Grain Overlay */}
        <div className="film-grain" aria-hidden="true" />

        {/* Lenis Smooth Scroll Provider */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
