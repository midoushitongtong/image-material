/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      screens: {
        pc: { min: '1200px' },
        'pc-and-tablet': { min: '768px' },
        tablet: { max: '1199px', min: '768px' },
        mobile: { max: '767px' },
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
        'form-error': '0 0 3px #dc2626',
      },
      height: {
        'pc-header': '72px',
        'pc-content': 'calc(100vh - 72px)',
      },
      colors: {
        main: '#f44c58',
        'hover-main': '#f32836',
        'success-100': '#f2f9ec',
        'success-200': '#e4f2db',
        'success-300': '#7ec050',
        'warn-100': '#fcf6ed',
        'warn-200': '#f8ecda',
        'warn-300': '#dca550',
        'error-100': '#ed7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff',
        'form-error': '#dc2626',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
