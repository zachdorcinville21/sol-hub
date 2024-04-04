module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        zinc: {
          900: '#18181b',
        },
        gray: {
          950: '#16161d',
        },
        'dark-gray': {
          900: '#16161d'
        }
      },
      fontFamily: {
        'noto': ['Noto Sans']
      }
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
