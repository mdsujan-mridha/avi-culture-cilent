/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0f0826",
          "secondary": "#1f1248",
          "accent": " #583ee6",
          "neutral": "#FFA500",
          "base-100": "#ffffff",
        },
      },

    ],
  },

  plugins: [require("daisyui")],
}

