/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F4E5A1',
          DEFAULT: '#D4AF37',
          dark: '#B8960C',
          glow: 'rgba(212, 175, 55, 0.4)',
        },
        dark: {
          bg: '#080808',
          card: '#121212',
          elevated: '#181818',
          border: '#242424',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      boxShadow: {
        'gold-sm': '0 4px 15px rgba(212, 175, 55, 0.25)',
        'gold-md': '0 8px 30px rgba(212, 175, 55, 0.35)',
        'gold-lg': '0 12px 40px rgba(212, 175, 55, 0.5)',
      }
    },
  },
  plugins: [],
}
