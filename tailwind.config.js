/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : "#190482",
        second : "#7752FE",
        third : '#8E8FFA',
        four : '#C2D9FF'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    
  ],
}