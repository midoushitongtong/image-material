/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      screens: {
        xs: { max: '639px' },
      },
      fontSize: {
        xs: ['0.3rem', '0.4rem'],
        sm: ['0.4rem', '0.5rem'],
        base: ['0.42rem', '0.52rem'],
        lg: ['0.6rem', '0.7rem'],
        xl: ['0.7rem', '0.8rem'],
        '2xl': ['0.8rem', '0.9rem'],
        '3xl': ['0.9rem', '1rem'],
        '4xl': ['1rem', '1.1rem'],
        '5xl': ['1.1rem', '1.2rem'],
        '6xl': ['1.2rem', '1.3rem'],
        '7xl': ['1.3rem', '1.4rem'],
        '8xl': ['1.4rem', '1.5rem'],
        '9xl': ['1.5rem', '1.6rem'],
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b',
      },
      height: {
        'pc-header': '72px',
        'pc-content': 'calc(100vh - 72px)',
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836',
      },
    },
  },
  plugins: [],
};
