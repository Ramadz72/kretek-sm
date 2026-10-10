'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Preloader from '@/components/Preloader';
import SequenceScroll from '@/components/SequenceScroll';
import TextReveal from '@/components/TextReveal';
import ProductBento from '@/components/ProductBento';
import IngredientShowcase from '@/components/IngredientShowcase';
import BrandDetails from '@/components/BrandDetails';
import VisualShowcase from '@/components/VisualShowcase';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import AgeNotice from '@/components/AgeNotice';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative min-h-screen bg-obsidian text-ivory selection:bg-botanical selection:text-obsidian overflow-x-hidden">
      {/* Desktop Magnetic Follower Cursor */}
      <CustomCursor />

      {/* Branded Loading Screen */}
      <Preloader progress={loadProgress} isLoaded={isLoaded} />

      {/* Global Navigation Header */}
      <Navbar />

      {/* 1. Hero: Cinematic 240-Frame Scrollytelling Reveal */}
      <SequenceScroll
        onLoadProgress={(p) => setLoadProgress(p)}
        onLoaded={() => setIsLoaded(true)}
      />

      {/* 2. Brand Story: Scroll-scrubbed Character Reveal */}
      <TextReveal />

      {/* 3. Product Collection: Interactive Bento Grid */}
      <ProductBento />

      {/* 4. Rempah Nusantara: 17 Botanical Ingredients */}
      <IngredientShowcase />

      {/* 5. Brand Details & Animated Statistics */}
      <BrandDetails />

      {/* 6. Fullscreen Brand Visuals Showcase */}
      <VisualShowcase />

      {/* 7. Frequently Asked Questions */}
      <FAQ />

      {/* 8. Final CTA with Cinematic Botanical Ambience */}
      <FinalCTA />

      {/* 9. Minimal Editorial Footer */}
      <Footer />

      {/* 10. Mandatory 21+ Age Notice & Tobacco Compliance */}
      <AgeNotice />
    </main>
  );
}
