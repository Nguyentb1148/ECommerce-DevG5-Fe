/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/@tiptap/core/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
      },
      animation: {
        BounceDelayOne: 'bounce 1s 0.2s infinite',
        BounceDelayTwo: 'bounce 1s 0.4s infinite',
        BounceDelayThree: 'bounce 1s 0.6s infinite',
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "66v": "66.9vh",
        "70v": "70vh",
        "80v": "80vh",
        "83v": "83.9vh",
        "90v": "90vh",
        "94v": "94vh",
        "100v": "100vh",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
    require('@tailwindcss/typography')
  ],
}