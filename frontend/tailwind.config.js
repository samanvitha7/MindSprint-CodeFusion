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
      fontFamily: {
        'poppins': ["Poppins", "sans-serif"],
      },
    },
    // Override default font family to use Poppins globally
    fontFamily: {
      'sans': ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      'poppins': ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
}

