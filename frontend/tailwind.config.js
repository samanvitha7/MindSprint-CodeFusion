/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
        navy: "#012437",      // (1) Deep Navy - text
        forest: "#2a6250",    // (2) Forest Green - text/logo
        mint: "#97cead",      // (3) Mint Green - button bg
        soft: "#e5f3dd",      // (4) Soft Green - background
      },},
  },
  plugins: [],
}

