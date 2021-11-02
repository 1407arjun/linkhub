module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      backgroundImage: {
        'home-1': "url('/assets/home-1.jpg')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
