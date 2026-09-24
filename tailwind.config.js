/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{tsx,jsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
      extend: {
        colors: {
          brand: {
            orange: '#F48F56',
            dark: '#00292E',
            mint: '#9FF9CC',
          },
        },
      },
    },
  plugins: [],
}