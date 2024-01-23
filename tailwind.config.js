/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pale-green": "#98fb98",
        "pink": "#ffc0cb",
        "hot-pink": "#ff69b4",
        "corn-silk": "#fff8dc",
        "sky-blue": "#87ceeb",
        "navy-blue": "#0d2949",
      },
    },
    backgroundSize: {
      "50%": "50%",
      "30%": "30%",
    },
    borderWidth: {
      '1': '1px',
    },
    screens: {
      'xxs': '330px',
      'xs': '413px',
      'sm': '640px',
      'md': '767px',
      'lg': '1023px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '2560px',
    }
  },
  plugins: [],
};
