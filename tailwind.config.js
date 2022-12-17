/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#73A580',
        secondary: '#E1AD01',
        dark: '#3E363F',
      },
      boxShadow: {
        cart: '0 0 20px -12px',
        login: '0 0 20px -8px',
      },
      dropShadow: {
        center: '#000036 0 0 30px',
      },
    },
  },
  plugins: [],
};
