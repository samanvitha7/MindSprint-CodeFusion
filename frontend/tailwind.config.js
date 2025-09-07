/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#012437",      
        forest: "#2a6250",    
        mint: "#97cead",      
        soft: "#e5f3dd",      
      },
      backgroundColor: {
        'default': '#e5f3dd', /* Soft green as default background */
      },
      fontFamily: {
        'playfair': ["Playfair Display", "serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1.125rem', { lineHeight: '1.75rem' }], // Increased from 1rem
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],
        'xl': ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '3xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.875rem', { lineHeight: '1' }],
        '5xl': ['3.5rem', { lineHeight: '1' }],
        '6xl': ['4.25rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'normal': '600', // Changed from 400 to 600 for thicker default
        'medium': '600',
        'semibold': '700', // Changed from 600 to 700
        'bold': '800', // Changed from 700 to 800
        'extrabold': '900', // Changed from 800 to 900
        'black': '900',
      },
    },
    // Override default font family to use Playfair Display globally
    fontFamily: {
      'sans': ["Playfair Display", "ui-serif", "Georgia", "serif"],
      'serif': ["Playfair Display", "ui-serif", "Georgia", "serif"],
      'playfair': ["Playfair Display", "serif"],
    },
  },
  plugins: [],
}

