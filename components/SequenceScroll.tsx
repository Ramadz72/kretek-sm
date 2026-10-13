
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ShoppingCart } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

interface SequenceScrollProps {
  onLoadProgress?: (progress: number) => void;
  onLoaded?: () => void;
}

export default function SequenceScroll({
  onLoadProgress,
  onLoaded,
}: SequenceScrollProps) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const totalFrames = SITE_CONFIG.sequence.totalFrames;

  const imagesRef = useRef<Array<HTMLImageElement | undefined>>([]);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const readyRef = useRef(false);
  const loadedCallbackRef = useRef(false);

  const callbacksRef = useRef({ onLoadProgress, onLoaded });

  useEffect(() => {
    callbacksRef.current = { onLoadProgress, onLoaded };
  }, [onLoadProgress, onLoaded]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Storytelling opacity dan posisi teks
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.12, 0.2],
    [1, 1, 0]
  );
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -30]);

  const opacity2 = useTransform(
    scrollYProgress,
    [0.22, 0.28, 0.38, 0.46],
    [0, 1, 1, 0]
  );
  const y2 = useTransform(
    scrollYProgress,
    [0.22, 0.28, 0.38, 0.46],
    [40, 0, 0, -30]
  );

  const opacity3 = useTransform(
    scrollYProgress,
    [0.52, 0.58, 0.68, 0.76],
    [0, 1, 1, 0]
  );
  const y3 = useTransform(
    scrollYProgress,
    [0.52, 0.58, 0.68, 0.76],
    [40, 0, 0, -30]
  );

  const opacity4 = useTransform(
    scrollYProgress,
    [0.82, 0.88, 1],
    [0, 1, 1]
  );
  const y4 = useTransform(scrollYProgress, [0.82, 0.88, 1], [40, 0, 0]);

  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.08],
    [1, 0]
  );

  // Gambar frame yang paling sesuai dengan posisi scroll.
  // Jika frame target belum siap, gunakan frame terdekat yang tersedia.
  const drawFrame = useCallback((requestedIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames = imagesRef.current;
    const index = Math.max(
      0,
      Math.min(requestedIndex, frames.length - 1)
    );

    let img = frames[index];

    const isUsable = (frame?: HTMLImageElement) =>
      Boolean(
        frame?.complete &&
        frame.naturalWidth > 0 &&
        frame.naturalHeight > 0
      );

    if (!isUsable(img)) {
      img = undefined;

      for (let distance = 1; distance < frames.length; distance++) {
        const beforeIndex = index - distance;
        const afterIndex = index + distance;

        if (beforeIndex >= 0 && isUsable(frames[beforeIndex])) {
          img = frames[beforeIndex];
          break;
        }

        if (afterIndex < frames.length && isUsable(frames[afterIndex])) {
          img = frames[afterIndex];
          break;
        }
      }
    }

    if (!img || !isUsable(img)) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);

    if (
      canvas.width !== pixelWidth ||
      canvas.height !== pixelHeight
    ) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }

    const scale = Math.max(
      width / img.naturalWidth,
      height / img.naturalHeight
    );

    const drawWidth = img.naturalWidth * scale;
    const drawHeight = img.naturalHeight * scale;
    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  }, []);

  // Preload frame satu kali dengan jumlah request yang dibatasi.
  useEffect(() => {
    let cancelled = false;
    let nextIndex = 0;
    let activeWorkers = 0;
    let loadedCount = 0;
    let failedCount = 0;
    let callbackSent = false;

    const frames: Array<HTMLImageElement | undefined> =
      new Array(totalFrames);

    imagesRef.current = frames;
    readyRef.current = false;
    loadedCallbackRef.current = false;

    setIsReady(false);
    setLoadError(false);

    const frameUrl = (index: number) => {
      const number = String(index + 1).padStart(3, '0');

      return `${SITE_CONFIG.sequence.folder}/${SITE_CONFIG.sequence.fileNamePrefix}${number}${SITE_CONFIG.sequence.fileExtension}`;
    };

    const notifyLoaded = () => {
      if (cancelled || callbackSent) return;

      callbackSent = true;
      loadedCallbackRef.current = true;
      callbacksRef.current.onLoaded?.();
    };

    const reportProgress = () => {
      if (cancelled) return;

      const progress = Math.round(
        ((loadedCount + failedCount) / totalFrames) * 100
      );

      callbacksRef.current.onLoadProgress?.(progress);
    };

    const markFrameLoaded = (
      index: number,
      img: HTMLImageElement
    ) => {
      if (cancelled) return;

      frames[index] = img;
      loadedCount++;

      reportProgress();

      if (!readyRef.current) {
        readyRef.current = true;
        setIsReady(true);
        notifyLoaded();
      }

      // Frame yang baru tersedia langsung dapat digunakan.
      drawFrame(currentFrameRef.current);
    };

    const markFrameFailed = (index: number) => {
      if (cancelled) return;

      failedCount++;
      console.warn(`Gagal memuat frame ${index + 1}: ${frameUrl(index)}`);
      reportProgress();
    };

    const finish = () => {
      if (cancelled) return;

      if (loadedCount + failedCount !== totalFrames) return;

      if (loadedCount === 0) {
        setLoadError(true);
        return;
      }

      callbacksRef.current.onLoadProgress?.(100);
      notifyLoaded();
    };

    const loadSingleFrame = (index: number) => {
      const img = new Image();

      img.onload = () => {
        if (cancelled) return;

        markFrameLoaded(index, img);
        finish();
      };

      img.onerror = () => {
        if (cancelled) return;

        markFrameFailed(index);
        finish();
      };

      img.src = frameUrl(index);
    };

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
      // Untuk preferensi reduced motion, tampilkan frame terakhir.
      loadSingleFrame(totalFrames - 1);

      return () => {
        cancelled = true;
      };
    }

    // Batasi request bersamaan agar browser tidak dibanjiri request.
    const concurrency = 8;

    const worker = () => {
      if (cancelled) return;

      while (
        activeWorkers < concurrency &&
        nextIndex < totalFrames
      ) {
        const index = nextIndex++;
        activeWorkers++;

        const img = new Image();

        img.onload = () => {
          if (cancelled) return;

          activeWorkers--;
          markFrameLoaded(index, img);
          finish();
          worker();
        };

        img.onerror = () => {
          if (cancelled) return;

          activeWorkers--;
          markFrameFailed(index);
          finish();
          worker();
        };

        img.src = frameUrl(index);
      }
    };

    worker();

    return () => {
      cancelled = true;
    };
  }, [totalFrames, drawFrame]);

  // Listener scroll tunggal: tidak bergantung pada jumlah frame yang sudah dimuat.
  useEffect(() => {
    const renderCurrentFrame = () => {
      rafIdRef.current = null;
      drawFrame(currentFrameRef.current);
    };

    const scheduleDraw = (progress: number) => {
      const targetIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(progress * (totalFrames - 1)))
      );

      currentFrameRef.current = targetIndex;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(renderCurrentFrame);
    };

    const unsubscribe = scrollYProgress.on('change', scheduleDraw);

    // Sinkronkan frame saat pertama kali efek dijalankan.
    scheduleDraw(scrollYProgress.get());

    const handleResize = () => {
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [scrollYProgress, totalFrames, drawFrame]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full bg-obsidian"
      style={{
        height: `${SITE_CONFIG.sequence.scrollDistanceVh}vh`,
      }}
    >
      <div className="sticky top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute inset-0 z-0 bg-dark-botanical pointer-events-none" />

        {/* Global cinematic contrast */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Left-side readability; product remains visible */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-[#050806]/45 via-[#050806]/15 to-transparent" />

        <div className="absolute -top-20 left-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-botanical/10 blur-[150px] pointer-events-none" />

        <div className="absolute bottom-10 left-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px] pointer-events-none" />

        {/* Image sequence */}
        {!loadError ? (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-10 block h-full w-full"
            style={{
              opacity: isReady ? 1 : 0,
            }}
          />
        ) : (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="relative aspect-[3/4] w-72 sm:w-96">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/apel-mint.jpg"
                alt="Kretek Rempah SM"
                className="h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              />
            </div>
          </div>
        )}

        {/* Storytelling phase 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center pointer-events-none sm:px-6"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center">
            
          <div className="relative mb-6 flex items-center justify-center">
            {/* Gambar rokok sebagai background badge */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <img
                src="/images/products/kretek-sm-stick-kom.webp"
                alt=""
                aria-hidden="true"
                className="h-20 w-[340px] max-w-[90vw] object-contain opacity-90 sm:h-28 sm:w-[480px]"
              />
            </div>

            {/* Lapisan gelap agar tulisan tetap terbaca */}
            <div className="absolute inset-0 rounded-full bg-black/20 blur-md" />
          </div>

            <h1 className="mb-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-ivory font-display sm:text-7xl lg:text-8xl">
              Rempah.
              <span className="text-gradient-gold"> Karakter.</span>
              <br />
              <span className="font-light italic">Kretek Nusantara.</span>
            </h1>

            <p className="max-w-2xl text-base font-light leading-relaxed text-ivory-muted font-sans sm:text-xl">
              Mengenal Kretek Rempah SM, identitas kretek Indonesia
              dengan inspirasi visual dari kekayaan rempah Nusantara.
            </p>
          </div>
        </motion.div>

        {/* Storytelling phase 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 z-30 flex items-center justify-start px-6 pointer-events-none sm:px-12 lg:px-24"
        >
          <div className="max-w-xl text-left">
            <span className="mb-3 block font-mono text-xs uppercase tracking-editorial text-botanical">
              01 • FILOSOFI BAHAN ALAMI
            </span>

            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-ivory font-display sm:text-5xl lg:text-6xl">
              Berakar dari{' '}
              <span className="text-gradient-botanical">
                kekayaan rempah.
              </span>
            </h2>

            <p className="text-base font-light leading-relaxed text-ivory-muted sm:text-lg">
              Jelajahi perpaduan visual bahan-bahan rempah yang menjadi
              bagian dari identitas Kretek Rempah SM.
            </p>

            <div className="mt-6 h-[2px] w-20 bg-gradient-to-r from-botanical to-transparent" />
          </div>
        </motion.div>

        {/* Storytelling phase 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 z-30 flex items-center justify-end px-6 pointer-events-none sm:px-12 lg:px-24"
        >
          <div className="max-w-xl text-right">
            <span className="mb-3 block font-mono text-xs uppercase tracking-editorial text-gold">
              02 • SINTESIS KONTEMPORER
            </span>

            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-ivory font-display sm:text-5xl lg:text-6xl">
              Tradisi dalam{' '}
              <span className="text-gradient-gold ">
                karakter modern.
              </span>
            </h2>

            <p className="text-base font-light leading-relaxed text-ivory-muted sm:text-lg">
              Identitas yang mempertemukan inspirasi herbal Nusantara
              dengan pendekatan desain yang kontemporer.
            </p>

            <div className="ml-auto mt-6 h-[2px] w-20 bg-gradient-to-l from-gold to-transparent" />
          </div>
        </motion.div>

        
        {/* Storytelling phase 4 — final cinematic composition */}
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center px-5 sm:px-10 lg:px-16"
        >
          <div className="relative w-full">
            {/* Local shadow: menjaga teks terbaca tanpa menutupi produk */}
            <div className="pointer-events-none absolute -left-8 -top-20 -bottom-20 w-[min(58vw,700px)] bg-gradient-to-r from-[#050806]/90 via-[#050806]/65 to-transparent blur-2xl" />

            <div className="relative max-w-[min(90%,520px)] text-left">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="mb-5 inline-flex items-center gap-3 rounded-full border border-lime-300/30 bg-black/40 px-4 py-2 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(190,242,100,0.8)]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-lime-200 sm:text-[10px]">
                  Kretek Rempah SM · Nusantara
                </span>
              </motion.div>

              <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] text-[#f7f3e8] sm:text-6xl lg:text-7xl">
                Jelajahi
                <span className="mt-2 block text-lime-300">
                  Koleksi Kami.
                </span>
              </h2>

              <div className="my-6 h-px w-24 bg-gradient-to-r from-lime-300 to-transparent sm:my-7" />

              <p className="max-w-md text-sm font-light leading-7 text-white/80 sm:text-base sm:leading-8">
                Kenali Kretek Rempah SM melalui identitas visual yang
                terinspirasi dari kekayaan rempah Nusantara.
              </p>

              <a
                href="#koleksi"
                className="pointer-events-auto group mt-7 inline-flex items-center gap-4 rounded-full border border-lime-200/40 bg-lime-300 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#11170d] shadow-[0_8px_35px_rgba(163,230,53,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-lime-200 active:translate-y-0 sm:mt-9 sm:px-7 sm:py-4"
              >
                <span>Lihat Koleksi</span>
                <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                Rempah · Karakter · Kreasi
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory-muted pointer-events-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-editorial text-ivory-dark">
            Gulir Untuk Menjelajah
          </span>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown className="h-4 w-4 text-botanical" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}