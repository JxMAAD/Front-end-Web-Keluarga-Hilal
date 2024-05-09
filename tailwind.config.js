/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#605DFF',
        'primary-dark': '#4a00e0',
        'primary-light': '#5DA8FF',
        secondary: '#1D1D1D',
        'social-background': '#E9E9E9',
        'social-background-hover': '#dddddd',
        text: '#1F2346',
        white: '#FFFFFF',
        violet: '#8e2de2',
      },
    },
  },
  plugins: [],
}

