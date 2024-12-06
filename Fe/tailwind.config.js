/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  darkMode: "selector",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        xsm: '540px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
      keyframes: {
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        floatImage: {
          '0%': {
            transform: 'translateY(0)',
          },
          '20%': {
            transform: 'translateY(25px)',
          },
          '40%': {
            transform: 'translateX(25px)',
          },
          '60%': {
            transform: 'translateY(25px)',
          },
          '80%': {
            transform: 'translateX(25px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
      boxShadow: {
        'all-sides': '0 0 10px',
      },
      animation: {
        float: 'floatImage 10s infinite ease-in-out',
        'fade-out': 'fade-out .3s ease-out forwards',
        'fade-in': 'fade-in .3s ease-out forwards',
        'scale-in': 'scale-in .2s ease-in-out forwards',
        'scale-out': 'scale-out .2s ease-in-out forwards',
      },
      fontFamily: {
        sans: 'Poppins',
      },
      colors: {
        'emerald-main': '#34d399',
        'emerald-light': 'rgba(52, 211, 153, 0.75)',
        'emerald-lighter': 'rgba(52, 211, 153, 0.1)',
        background: '#232532',
      },
      backgroundImage: {
        'radial-gradient':
          'radial-gradient(46.97% 53.54% at 50% 46.46%, rgba(0, 250, 220, 0.2) 0%, rgba(0, 1, 2, 0) 100%)',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.hover-side::after': {
          content: '""',
          'background-color': '#37D892',
          height: '3px',
          width: '0',
          display: 'block',
          transition: 'width .3s ease-in-out',
        },
      });
    },
    tailwindScrollbar, // Use the imported plugin here
  ],
};
