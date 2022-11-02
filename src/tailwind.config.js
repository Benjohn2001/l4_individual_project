/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primaryPurple': '#C6C4FF',
        'secondaryPurple': '#E7E7FF',
        'darkerPurple': '#6B4EFF',
        'primaryDarker': '#9990FF',
      },
    },
  },
  plugins: [],
}
