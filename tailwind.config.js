/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        typing: {
          '0%': { width: 0 },
          '50%': { width: '100%' },
          '100%': { width: '100%' },
        },
        blink: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      animation: {
        typingEffect: 'typing 10s steps(45, end) infinite, blink 0.75s step-end infinite',
      },
    },
  },
  plugins: [],
};
