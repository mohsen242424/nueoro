import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9F1239', // Royal Burgundy / خمري
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239', // Core Burgundy
          900: '#881337',
          950: '#4c0519',
        },
        secondary: {
          DEFAULT: '#BE123C', // Deep Crimson / قرمزي
          50: '#fff5f5',
          100: '#fed7d7',
          200: '#feb2b2',
          300: '#fc8181',
          400: '#f56565',
          500: '#e53e3e',
          600: '#c53030',
          700: '#9b2c2c',
          800: '#742a2a',
          900: '#63171b',
          950: '#3f0e11',
        },
        accent: {
          DEFAULT: '#FB7185', // Rose / Coral glow
          bone: '#F5EBE6',    // Bone ivory from spine in logo
          ivory: '#FAF6F0',
          gold: '#D97706',
        },
        bone: {
          DEFAULT: '#F5EBE6',
          50: '#FAF8F5',
          100: '#F5EBE6',
          200: '#EBDCD4',
          300: '#DFC8BC',
        },
        'brand-red': {
          DEFAULT: '#9F1239',
        },
        dark: {
          DEFAULT: '#080406', // Onyx background from logo
          surface: '#11070B',
          card: '#180B11',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        light: {
          DEFAULT: '#FAF7F5',
          surface: '#FFFFFF',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-in',
        'bounce-subtle': 'bounce-subtle 2s infinite',
        'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
        'blob-morph': 'blob-morph 10s ease-in-out infinite alternate',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.7', transform: 'scale(1.05)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        },
        'neural-pulse': {
          '0%, 100%': { opacity: '0.8', boxShadow: '0 0 10px rgba(225, 29, 72, 0.5)' },
          '50%': { opacity: '1', boxShadow: '0 0 25px rgba(225, 29, 72, 0.9)' },
        },
        'blob-morph': {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
          '50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
        }
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
export default config
