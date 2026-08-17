/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'var(--surface-base)',
          alt: 'var(--surface-alt)',
          card: 'var(--surface-card)',
          deep: 'var(--surface-deep)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          mid: 'var(--ink-mid)',
          soft: 'var(--ink-soft)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          warm: 'var(--accent-warm)',
          muted: 'var(--accent-muted)',
        },
        rim: 'var(--rim)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        ui: ['Raleway', 'system-ui', 'sans-serif'],
        body: ['Lora', 'Georgia', 'serif'],
      },
      animation: {
        'reveal': 'reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 1.2s ease both',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
