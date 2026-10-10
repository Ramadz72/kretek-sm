import { Variants } from 'framer-motion';

export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;
export const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: LUXURY_EASE,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const maskReveal: Variants = {
  hidden: { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 40 },
  visible: {
    clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
    y: 0,
    transition: {
      duration: 1,
      ease: LUXURY_EASE,
    },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: LUXURY_EASE,
    },
  },
};

export function splitWords(text: string): string[] {
  return text.split(' ');
}
