/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#03060c',
          900: '#03060c',
          800: '#070b16',
          700: '#0b1120',
          600: '#111a2e',
        },
        neon: {
          DEFAULT: '#2affde',
          400: '#5cffe8',
          500: '#2affde',
          600: '#16d9c0',
          700: '#0faa97',
        },
        accent: {
          DEFAULT: '#7c5cff',
          400: '#9b85ff',
          500: '#7c5cff',
        },
        danger: {
          DEFAULT: '#ff4d6d',
          400: '#ff7a90',
          500: '#ff4d6d',
        },
        warning: {
          DEFAULT: '#ffb547',
          400: '#ffc97a',
          500: '#ffb547',
        },
        success: {
          DEFAULT: '#2affde',
          400: '#5cffe8',
          500: '#2affde',
        },
      },
      fontFamily: {
        sans: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Sora', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-sm': '0 0 12px rgba(42, 255, 222, 0.35)',
        'neon-md': '0 0 24px rgba(42, 255, 222, 0.45)',
        'neon-lg': '0 0 48px rgba(42, 255, 222, 0.55)',
        'neon-accent': '0 0 24px rgba(124, 92, 255, 0.45)',
        'neon-danger': '0 0 24px rgba(255, 77, 109, 0.5)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'grid-glow':
          'linear-gradient(rgba(42,255,222,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(42,255,222,0.06) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(circle at 50% 0%, rgba(42,255,222,0.12), transparent 60%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.8s ease forwards',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
      },
    },
  },
  plugins: [],
};
