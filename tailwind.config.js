/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      colors: {
        primary: '#d9d9d9',
        secondary: '#ecc94b',
      }
    },
    extend: {
      fontFamily: {
        'inter': ['Inter']
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],

}