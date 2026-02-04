/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",           // Scans App.tsx, index.tsx in root
    "./components/**/*.{js,ts,jsx,tsx}" // Scans everything in components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}