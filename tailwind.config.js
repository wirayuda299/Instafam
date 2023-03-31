/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%": { left: '-100%', display: "none" },
          "100%": { left: '79px', display: "block" }
        },
        slideOut: {
          "0%": { left: '79px', display: "block" },
          "100%": { left: '-100%', display: "none" }
        }
      },
      slideInWidth: {
        "0%": { left: '-100%', display: "none" },
        "100%": { left: '80px', display: "block" }
      },
      slideOutWidth: {
        "0%": { left: '80px', display: "block" },
        "100%": { left: '-100%', display: "none" }
      },
      fadeIn: {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 }
      },

      animation: {
        slideIn: 'slideIn 0.4s ease forwards',
        slideOut: 'slideOut 0.4s ease forwards',
        slideInWidth: 'slideInWidth 0.4s ease forwards',
        slideOutWidth: 'slideOutWidth 0.4s ease forwards',
        fadeIn: 'fadeIn 0.5s ease forwards',

      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
