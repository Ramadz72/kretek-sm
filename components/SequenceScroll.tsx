'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

interface SequenceScrollProps {
  onLoadProgress?: (progress: number) => void;
  onLoaded?: () => void;
}

export default function SequenceScroll({ onLoadProgress, onLoaded }: SequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const totalFrames = SITE_CONFIG.sequence.totalFrames; // 240 frames
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Motion scroll binding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Storytelling Opacity & Translation Transforms
  // Phase 1: 0% - 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.20], [0, -30]);

  // Phase 2: 24% - 45%
  const opacity2 = useTransform(scrollYProgress, [0.22, 0.28, 0.38, 0.46], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.22, 0.28, 0.38, 0.46], [40, 0, 0, -30]);

  // Phase 3: 52% - 75%
  const opacity3 = useTransform(scrollYProgress, [0.52, 0.58, 0.68, 0.76], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.52, 0.58, 0.68, 0.76], [40, 0, 0, -30]);

  // Phase 4: 82% - 100%
  const opacity4 = useTransform(scrollYProgress, [0.82, 0.88, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.82, 0.88, 1], [40, 0, 0]);

  // Scroll indicator fade out
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Draw frame to canvas with aspect-ratio cover calculation
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      
      const img =
        images[index]?.complete && images[index]?.naturalWidth > 0
          ? images[index]
          : [...images]
              .slice(0, index + 1)
              .reverse()
              .find((frame) => frame?.complete && frame.naturalWidth > 0)
            ?? images.find(
              (frame) => frame?.complete && frame.naturalWidth > 0
            );

      if (!img || !img.complete || img.naturalWidth === 0) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvasWidth = canvas.clientWidth;
      const canvasHeight = canvas.clientHeight;

      if (canvas.width !== canvasWidth * dpr || canvas.height !== canvasHeight * dpr) {
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Cover calculation
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      const hRatio = canvasWidth / imgWidth;
      const vRatio = canvasHeight / imgHeight;
      const ratio = Math.max(hRatio, vRatio);

      const shiftX = (canvasWidth - imgWidth * ratio) / 2;
      const shiftY = (canvasHeight - imgHeight * ratio) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(
        img,
        0,
        0,
        imgWidth,
        imgHeight,
        shiftX,
        shiftY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      ctx.restore();
    },
    [images]
  );

  // Progressive Preloading
  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = new Array(totalFrames);
    let loadedCount = 0;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const frameUrl = (idx: number) => {
      const numStr = String(idx + 1).padStart(3, '0');
      return `${SITE_CONFIG.sequence.folder}/${SITE_CONFIG.sequence.fileNamePrefix}${numStr}${SITE_CONFIG.sequence.fileExtension}`;
    };

    // Helper to load single image
    const loadSingleImage = (i: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = frameUrl(i);
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load frame ${i}`));
      });
    };

    // If reduced motion is requested, load just the final hero frame
    if (prefersReducedMotion) {
      loadSingleImage(totalFrames - 1)
        .then((img) => {
          if (isCancelled) return;
          loadedImages[0] = img;
          setImages([img]);
          setIsReady(true);
          onLoadProgress?.(100);
          onLoaded?.();
        })
        .catch(() => setLoadError(true));
      return () => {
        isCancelled = true;
      };
    }

    // Step 1: Preload priority frames (first 30 frames and last frame) for immediate rendering
    const priorityIndices = Array.from({ length: Math.min(30, totalFrames) }, (_, i) => i);
    priorityIndices.push(totalFrames - 1);

    Promise.allSettled(
      priorityIndices.map(async (i) => {
        try {
          const img = await loadSingleImage(i);
          if (!isCancelled) {
            loadedImages[i] = img;
            loadedCount++;
            onLoadProgress?.(Math.min(100, Math.round((loadedCount / totalFrames) * 100)));
          }
        } catch (e) {
          console.warn(e);
        }
      })
    ).then(() => {
      if (isCancelled) return;
      
      setImages([...loadedImages]);

      const firstValidFrame = loadedImages.find(
        (img) => img?.complete && img.naturalWidth > 0
      );

      if (!firstValidFrame) {
        setLoadError(true);
        return;
      }

      setIsReady(true);
      onLoaded?.();

      // Step 2: Progressively load remaining frames in background
      const remainingIndices = Array.from({ length: totalFrames }, (_, i) => i).filter(
        (i) => !priorityIndices.includes(i)
      );

      const batchSize = 10;
      let currentIndex = 0;

      const loadNextBatch = () => {
        if (isCancelled || currentIndex >= remainingIndices.length) return;
        const currentBatch = remainingIndices.slice(currentIndex, currentIndex + batchSize);
        currentIndex += batchSize;

        Promise.allSettled(
          currentBatch.map(async (i) => {
            try {
              const img = await loadSingleImage(i);
              if (!isCancelled) {
                loadedImages[i] = img;
                loadedCount++;
                onLoadProgress?.(Math.min(100, Math.round((loadedCount / totalFrames) * 100)));
              }
            } catch (e) {
              console.warn(e);
            }
          })
        ).then(() => {
          if (!isCancelled) {
            setImages([...loadedImages]);
            setTimeout(loadNextBatch, 30);
          }
        });
      };

      loadNextBatch();
    });

    return () => {
      isCancelled = true;
    };
  }, [totalFrames, onLoadProgress, onLoaded]);

  // Sync scroll with frame draw
  useEffect(() => {
    if (!isReady || images.length === 0) return;

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      const targetIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(progress * (totalFrames - 1)))
      );

      if (targetIndex !== currentFrameRef.current) {
        currentFrameRef.current = targetIndex;

        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }

        rafIdRef.current = requestAnimationFrame(() => {
          drawFrame(targetIndex);
        });
      }
    });

    // Redraw frame sesuai posisi scroll terakhir
    drawFrame(currentFrameRef.current);

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isReady, images, totalFrames, scrollYProgress, drawFrame]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-obsidian"
      style={{ height: `${SITE_CONFIG.sequence.scrollDistanceVh}vh` }}
    >
      {/* Sticky Fullscreen Canvas / Hero Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Background Atmosphere Glow */}
        <div className="absolute inset-0 bg-dark-botanical pointer-events-none z-0" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-botanical/10 blur-[150px] pointer-events-none -top-20 left-1/2 -translate-x-1/2 z-0" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gold/10 blur-[130px] pointer-events-none bottom-10 left-1/2 -translate-x-1/2 z-0" />

        {/* The Image-Sequence Canvas */}
        {!loadError ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700"
            style={{ opacity: isReady ? 1 : 0 }}
          />
        ) : (
          /* High-End Visual Fallback if Sequence fails */
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-72 sm:w-96 aspect-[3/4]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/apel-mint.jpg"
                alt="Kretek Rempah SM"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        )}

        {/* Ambient Dark Gradient Overlays for Seamless Text Readability */}
        {/*<div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/60 pointer-events-none z-20" />*/}
        {/*<div className="absolute inset-0 bg-radial-gradient from-transparent via-obsidian/40 to-obsidian pointer-events-none z-20" />*/}

        {/* =========================================================================
            HERO STORYTELLING OVERLAYS (Scroll-Linked)
           ========================================================================= */}

        {/* Phase 1: 0% */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-200/90 border border-botanical/30 text-botanical font-mono text-[10px] sm:text-xs uppercase tracking-editorial mb-6 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-botanical animate-pulse" />
              INDONESIAN BOTANICAL HERITAGE
            </span>

            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-ivory mb-6 leading-[1.05]">
              Rempah. <span className="text-gradient-gold">Karakter.</span> <span className="italic font-light">Kreasi.</span>
            </h1>

            <p className="max-w-2xl text-base sm:text-xl text-ivory-muted leading-relaxed font-sans font-light">
              Kenali <strong className="text-ivory font-semibold">Kretek Rempah SM</strong>, kretek dengan karakter visual yang berakar pada kekayaan rempah Indonesia.
            </p>
          </div>
        </motion.div>

        {/* Phase 2: 25% - 30% (Left Aligned Editorial) */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 z-30 flex items-center justify-start px-6 sm:px-12 lg:px-24 pointer-events-none"
        >
          <div className="max-w-xl text-left">
            <span className="font-mono text-xs uppercase tracking-editorial text-botanical block mb-3">
              01 • FILOSOFI BAHAN ALAMI
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-tight mb-4 leading-tight">
              Berakar dari <span className="text-gradient-botanical">kekayaan rempah.</span>
            </h2>
            <p className="text-base sm:text-lg text-ivory-muted leading-relaxed font-light">
              Jelajahi perpaduan visual bahan-bahan rempah yang menjadi bagian dari identitas Kretek Rempah SM.
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-r from-botanical to-transparent mt-6" />
          </div>
        </motion.div>

        {/* Phase 3: 55% - 65% (Right Aligned Editorial) */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 z-30 flex items-center justify-end px-6 sm:px-12 lg:px-24 pointer-events-none"
        >
          <div className="max-w-xl text-right">
            <span className="font-mono text-xs uppercase tracking-editorial text-gold block mb-3">
              02 • SINTESIS KONTEMPORER
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-tight mb-4 leading-tight">
              Tradisi dalam <span className="text-gradient-gold">karakter modern.</span>
            </h2>
            <p className="text-base sm:text-lg text-ivory-muted leading-relaxed font-light">
              Identitas yang mempertemukan inspirasi herbal Nusantara dengan pendekatan desain yang kontemporer.
            </p>
            <div className="w-20 h-[2px] bg-gradient-to-l from-gold to-transparent mt-6 ml-auto" />
          </div>
        </motion.div>

        {/* Phase 4: 85% - 95% (Centered CTA) */}
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-auto"
        >
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-xs font-mono uppercase tracking-widest text-botanical mb-4">
              KRETEK MULTIHERBAL NUSANTARA
            </span>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-ivory tracking-tight mb-6 leading-tight">
              Jelajahi Koleksi <br />
              <span className="text-gradient-gold">Kretek Rempah SM</span>
            </h2>

            <p className="text-base sm:text-lg text-ivory-muted max-w-lg mb-8 font-light">
              Sentuhan 17 rempah dan 5 tembakau pilihan, dirancang dalam harmoni rasa yang berkelas.
            </p>

            <a
              href="#koleksi"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-botanical hover:bg-botanical-light text-obsidian font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-luxury hover:scale-105 active:scale-95"
            >
              <span>LIHAT PRODUK</span>
              <Sparkles className="w-4 h-4 text-obsidian group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none text-ivory-muted"
        >
          <span className="text-[10px] font-mono tracking-editorial uppercase text-ivory-dark">
            Gulir Untuk Menjelajah
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-botanical" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
