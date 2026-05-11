/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        genshingold: '#D3BC8E',
        genshinlightgold: '#F4E8C1',
        genshindark: '#3B4255',
        genshinbg: '#ECE5D3',
        genshinwhite: '#F9F6F0',
        anemo: '#74C2A8',
        geo: '#E3B342',
      },
      fontFamily: {
        genshin: ['Marcellus', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #D3BC8E' },
          '100%': { boxShadow: '0 0 20px #D3BC8E, 0 0 10px #F4E8C1' },
        }
      }
    },
  },
  plugins: [],
}
