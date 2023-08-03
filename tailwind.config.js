/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./renderer/**/*.{vue,js,ts,jsx,tsx}",
    "./pages/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        WHITE: '#FFFFFF',
  
  GREEN_700: '#00875F',
  GREEN_500: '#00B37E',

  RED: '#F75A68',
  RED_DARK: '#AA2834',
  BLUE: '#793',
  GRAY_700: '#121214',
  GRAY_600: '#202024',
  GRAY_500: '#29292E',
  GRAY_400: '#323238',
  GRAY_300: '#7C7C8A',
  GRAY_200: '#C4C4CC',
  GRAY_100: '#E1E1E6'
      }
    },
  },
  plugins: [],
}

