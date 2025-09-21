/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B4513',
          50: '#F5F2F0',
          100: '#E8DDD6',
          200: '#D4C1B0',
          300: '#C0A589',
          400: '#AC8962',
          500: '#8B4513',
          600: '#75390F',
          700: '#5F2D0C',
          800: '#492108',
          900: '#331605',
        },
        secondary: {
          DEFAULT: '#CD853F',
          50: '#F9F5F1',
          100: '#F1E7DA',
          200: '#E6D1B6',
          300: '#DBBA91',
          400: '#D0A46C',
          500: '#CD853F',
          600: '#B8722A',
          700: '#945B22',
          800: '#70441A',
          900: '#4C2D11',
        },
        accent: {
          DEFAULT: '#DAA520',
          50: '#FDF8E7',
          100: '#FAF0C9',
          200: '#F5E194',
          300: '#F0D25E',
          400: '#EBC329',
          500: '#DAA520',
          600: '#B88A1A',
          700: '#966F15',
          800: '#74540F',
          900: '#52390A',
        },
        earth: {
          50: '#FAF7F4',
          100: '#F3EDE5',
          200: '#E5D5C3',
          300: '#D7BDA1',
          400: '#C9A57F',
          500: '#A0825C',
          600: '#7D6549',
          700: '#5A4836',
          800: '#372B23',
          900: '#140E10',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'Cambria', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}