/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0d0f14',
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b1b8c7',
          400: '#8691a7',
          500: '#64718b',
          600: '#4e5870',
          700: '#3f475b',
          800: '#363c4c',
          900: '#1a1d24',
          950: '#0d0f14',
        },
        lime: {
          DEFAULT: '#e6fd53',
          50: '#f9ffe5',
          100: '#f3ffc8',
          200: '#ebfe97',
          300: '#e6fd53',
          400: '#dbfa23',
          500: '#b8dc0a',
          600: '#8fae05',
          700: '#6c8408',
          800: '#56680d',
          900: '#485610',
        },
        canvas: '#f0f2f5',
        card: '#ffffff',
        pill: '#f1f3f6',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'bento': '0 2px 14px -2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'bento-hover': '0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
