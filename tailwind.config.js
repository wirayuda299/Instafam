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

      },
      screens: {
        'xs': '320px',
        'xs1': '500px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
