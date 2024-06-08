/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      "kikyou": {
        "50": "#e9f0f6",
        "100": "#d3e1ed",
        "200": "#a7c4db",
        "300": "#7ba6c8",
        "400": "#4f89b6",
        "500": "#236ba4",
        "600": "#1c5683",
        "700": "#154062",
        "800": "#0e2b42",
        "900": "#071521"
      },
      "kazusa": {
        "50": "#fbf0f4",
        "100": "#f6e1e9",
        "200": "#edc2d3",
        "300": "#e4a4bc",
        "400": "#db85a6",
        "500": "#d26790",
        "600": "#a85273",
        "700": "#7e3e56",
        "800": "#54293a",
        "900": "#2a151d"
      }
      // ...
    },
  },
  plugins: [],
}




