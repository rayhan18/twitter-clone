/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './src/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './components/**/*.{html,js}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
