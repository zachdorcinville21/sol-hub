module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
          zinc: {
            900: '#18181b',
          },
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
