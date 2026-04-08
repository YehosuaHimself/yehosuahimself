/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  /* ─── Coexist with existing CSS: don't reset what global.css already handles ─── */
  corePlugins: {
    preflight: false,
  },

  theme: {
    extend: {
      /* ─── Colors: matches variables.css exactly ─── */
      colors: {
        cream:    { DEFAULT: '#f5f0e8', tan: '#ede5d4', warm: '#e6dcc8', dark: '#ddd2ba' },
        ink:      { DEFAULT: '#1c1007', 2: '#3a2710', 3: '#5e3d1e' },
        dim:      { DEFAULT: '#9a7e5a', light: '#b89b74' },
        gold:     { DEFAULT: '#a06820', bright: '#c07e28', light: 'rgba(160,104,32,0.10)', line: 'rgba(160,104,32,0.28)' },
        line:     { DEFAULT: 'rgba(28,16,7,0.10)', heavy: 'rgba(28,16,7,0.18)' },
        dk:       { DEFAULT: '#0d0a06', 2: '#161208' },
      },

      /* ─── Typography: matches variables.css font stacks ─── */
      fontFamily: {
        head:  ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono:  ['"DM Mono"', 'monospace'],
        serif: ['"Cormorant Garamond"', '"EB Garamond"', 'Georgia', 'serif'],
      },

      /* ─── Font sizes: matches clamp() scale ─── */
      fontSize: {
        'xs':   ['clamp(0.78rem, 1.1vw, 0.88rem)', { lineHeight: '1.5' }],
        'sm':   ['clamp(0.88rem, 1.3vw, 1rem)',     { lineHeight: '1.5' }],
        'md':   ['clamp(1rem, 1.5vw, 1.15rem)',     { lineHeight: '1.6' }],
        'lg':   ['clamp(1.2rem, 2vw, 1.6rem)',      { lineHeight: '1.4' }],
        'xl':   ['clamp(1.8rem, 3.5vw, 2.8rem)',    { lineHeight: '1.2' }],
        '2xl':  ['clamp(2.4rem, 5vw, 4rem)',        { lineHeight: '1.1' }],
        'hero': ['clamp(3rem, 8vw, 6.5rem)',         { lineHeight: '0.95' }],
      },

      /* ─── Spacing: matches --pad ─── */
      padding: {
        section: '8vw',
      },

      /* ─── Transitions: matches duration tokens ─── */
      transitionDuration: {
        fast: '0.15s',
        mid:  '0.3s',
        slow: '0.6s',
      },

      /* ─── Custom keyframes for reveal animations ─── */
      keyframes: {
        'reveal-up': {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.6s ease-out forwards',
        'fade-in':   'fade-in 0.4s ease-out forwards',
      },
    },
  },

  plugins: [],
}
