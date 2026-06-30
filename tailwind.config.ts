import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light:   '#F0D060',
          dim:     '#9A7B20',
        },
        blue: {
          DEFAULT: '#00A3FF',
          dim:     '#0066CC',
          glow:    'rgba(0,163,255,0.35)',
        },
        bg: {
          0: '#050505',
          1: '#0B0D10',
          2: '#111318',
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", 'system-ui', 'sans-serif'],
        sans:    ["'Inter'", 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #9A7B20 0%, #F0D060 50%, #9A7B20 100%)',
        'blue-gradient': 'linear-gradient(135deg, #0066CC 0%, #00A3FF 50%, #00D4FF 100%)',
        'dark-radial':   'radial-gradient(ellipse at center, #111318 0%, #050505 100%)',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'float-x':     'float-x 8s ease-in-out infinite',
        'pulse-gold':  'pulse-gold 2.5s ease-in-out infinite',
        'pulse-blue':  'pulse-blue 2.5s ease-in-out infinite',
        'shimmer':     'shimmer 3s linear infinite',
        'spin-slow':   'spin-slow 12s linear infinite',
        'scan':        'scan 4s linear infinite',
        'bead-fall':   'bead-fall 2.8s ease-in infinite',
        'fade-up':     'fade-up 0.6s ease-out both',
        'layer-glow':  'layer-glow 3s ease-in-out infinite',
      },
      screens: { xs: '375px' },
    },
  },
  plugins: [],
}

export default config
