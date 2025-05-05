/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
            950: '#1e1b4b',
          },
          secondary: {
            50: '#f0fdfa',
            100: '#ccfbf1',
            200: '#99f6e4',
            300: '#5eead4',
            400: '#2dd4bf',
            500: '#14b8a6',
            600: '#0d9488',
            700: '#0f766e',
            800: '#115e59',
            900: '#134e4a',
            950: '#042f2e',
          },
          accent: {
            50: '#fff1f2',
            100: '#ffe4e6',
            200: '#fecdd3',
            300: '#fda4af',
            400: '#fb7185',
            500: '#f43f5e',
            600: '#e11d48',
            700: '#be123c',
            800: '#9f1239',
            900: '#881337',
            950: '#4c0519',
          },
          dark: {
            100: '#d5d5d5',
            200: '#ababab',
            300: '#808080',
            400: '#565656',
            500: '#2b2b2b',
            600: '#232323',
            700: '#1a1a1a',
            800: '#121212',
            900: '#090909',
          },
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
        borderRadius: {
          'sm': '0.25rem',
          DEFAULT: '0.375rem',
          'md': '0.5rem',
          'lg': '0.75rem',
          'xl': '1rem',
          '2xl': '1.5rem',
        },
        boxShadow: {
          'card': '0 2px 5px 0 rgba(0, 0, 0, 0.05)',
          'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        animation: {
          'fade-in': 'fadeIn 0.3s ease-in-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  }
  