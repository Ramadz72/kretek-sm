/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0C09',
        charcoal: {
          DEFAULT: '#151711',
          50: '#23271D',
          100: '#1D2018',
          200: '#151711',
          300: '#11130E',
          400: '#0B0C09',
        },
        botanical: {
          DEFAULT: '#8BCB25',
          light: '#A3DC3B',
          dark: '#679B18',
          muted: '#2A3319',
        },
        gold: {
          DEFAULT: '#E8C83E',
          light: '#F4DD6D',
          dark: '#BFA225',
          metallic: '#D4AF37',
        },
        tobacco: {
          DEFAULT: '#70462D',
          dark: '#452A1A',
          light: '#8F5E3E',
        },
        copper: '#A86539',
        ivory: {
          DEFAULT: '#F3F0E5',
          muted: '#D8D4C7',
          dark: '#B0ACA0',
        },
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.2em',
        editorial: '0.28em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dark-botanical': 'radial-gradient(circle at 50% 30%, rgba(42, 51, 25, 0.45) 0%, rgba(21, 23, 17, 0.95) 60%, rgba(11, 12, 9, 1) 100%)',
        'gold-glow': 'radial-gradient(circle at center, rgba(232, 200, 62, 0.15) 0%, rgba(11, 12, 9, 0) 70%)',
      },
      boxShadow: {
        'luxury': '0 20px 50px -15px rgba(0, 0, 0, 0.8), 0 0 30px 1px rgba(139, 203, 37, 0.05)',
        'luxury-gold': '0 20px 50px -15px rgba(0, 0, 0, 0.8), 0 0 35px 2px rgba(232, 200, 62, 0.15)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
};
