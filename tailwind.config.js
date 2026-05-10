/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: '#FFD1DC',
        mint: '#C1F0DB',
        lavender: '#E6D7FF',
        yellow: '#FFF3B0',
        whitecream: '#FFF9FB',
        text: '#5A4A4F',
        darkpink: '#A85C7A',
        darkmint: '#3A5A4A',
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        wiggle: 'wiggle 2.5s infinite',
        float: 'float 3s ease-in-out infinite',
        bounce: 'bounce 2s infinite',
        peek: 'peek 4s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        peek: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        }
      }
    },
  },
  plugins: [],
}

