/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
        navy: "#012437",      
        forest: "#2a6250",    
        mint: "#97cead",      
        soft: "#e5f3dd",      
      },
 fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
},
  },
  plugins: [],
}

