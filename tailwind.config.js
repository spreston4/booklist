/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      bg: {
        primary: "#ffffff",
        light: "#d5eeed",
        dark: "#0a3d3f",
      },
      button: {
        active: "#36c5ba",
        hover: "#86dcd6",
        alt: "#6f8c8c",
      },
      type: {
        white: "#ffffff",
        light: "#9ed0d6",
        dark: "#04373e",
      },
      util: {
        error: "#ff4424",
      },
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      animation: {
        fadeOut: "fadeOut 200ms ease-in-out",
        fadeIn: "fadeIn 300ms ease-in-out",
      },
      keyframes: {
        fadeOut: {
          "100%": { opacity: "100%" },
          "0%": { opaticy: "0%" },
        },
        fadeIn: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
      },
    },
  },
  plugins: [],
};
