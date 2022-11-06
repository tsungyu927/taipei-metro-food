/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    colors: {
      bg: {
        'dark-primary': '#1F1D2C',
        'dark-secondary': '#242230',
        'dark-grey': '#373443'
      },
      line: {
        BROWN: '#C48C31',
        RED: '#E3002C',
        GREEN: '#008659',
        ORANGE: '#F8B61C',
        BLUE: '#0070BD',
        YELLOW: '#FDDB00'
      },
      text: {
        main: '#fff',
        secondary: '#373443'
      }
    },
    fontFamily: {
      taipeiSans: ['TaipeiSans']
    },
    extend: {}
  },
  plugins: []
}
