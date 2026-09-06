/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#152420',
        paper: '#FFFFFF',
        mist: '#F4F7F5',
        teal: {
          DEFAULT: '#0F6E5C',
          dark: '#0B5245',
          light: '#E4F2EE'
        },
        line: '#E4E7E5',
        gold: '#D6A94A',
        rose: '#C4536B'
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
