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
          850: '#36454f',
          900: '#0D1421',
          950: '#16161d',
        },
        'dark-gray': {
          900: '#16161d'
        },
        blue: {
          900: '#1034A6',
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
