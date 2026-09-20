/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: {
          DEFAULT: '#F1EEE7',
          soft: '#F8F6F2',
        },
        stone: {
          DEFAULT: '#D9D2C4',
          deep: '#B7AD9A',
        },
        ink: {
          DEFAULT: '#141412',
          soft: '#57544C',
        },
        charcoal: '#232320',
        line: '#DCD7CA',
        signal: '#7A2E22',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Archivo"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wideish: '0.06em',
        wider2: '0.14em',
      },
      transitionTimingFunction: {
        atelier: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      maxWidth: {
        prose: '62ch',
      },
    },
  },
  plugins: [],
}
