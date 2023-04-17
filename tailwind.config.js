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
          "0%": { left: "-100%", display: "none" },
          "100%": { left: "79px", display: "block" },
        },

        slideOut: {
          "0%": { left: "79px", display: "block" },
          "100%": { left: "-100%", display: "none" },
        },
        popUp: {
          "0%": {
            display: "none",
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)",
          },
          "100%": {
            display: "block",
            transform: "scale(1)",
          },
        },
      },
      slideInWidth: {
        "0%": { left: "-100%", display: "none" },
        "100%": { left: "80px", display: "block" },
      },
      slideOutWidth: {
        "0%": { left: "80px", display: "block" },
        "100%": { left: "-100%", display: "none" },
      },
      fadeIn: {
        "0%": {
          display: "none",
        },
        "100%": { display: "block" },
      },
      fadeOut: {
        "0%": { display: "block" },
        "100%": { display: "none" },
      },

      animation: {
        slideIn: "slideIn 0.4s ease forwards",
        slideOut: "slideOut 0.4s ease forwards",
        slideInWidth: "slideInWidth 0.4s ease forwards",
        slideOutWidth: "slideOutWidth 0.4s ease forwards",
        fadeIn: "fadeIn 1s ease-in forwards",
        fadeOut: "fadeOut 1s ease-in-out forwards",
        popUp: "popUp 0.3s",
        slide: "slide 0.5s ease forwards",
      },
      screens: {
        xs: "320px",
        xs1: "500px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",

      },
    },
    transitionProperty: {
      width: "width",
      height: "height",
      spacing: "margin, padding",
      colors: "background-color, border-color, color, fill, stroke",
      opacity: "opacity",
      shadow: "box-shadow",
      transform: "transform",
      all: "all",
    },
    
  },
  plugins: [],
};
