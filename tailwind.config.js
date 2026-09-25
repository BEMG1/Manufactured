/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#00B4D8', // Hydro Cyan (Secondary)
          green: '#1B5E20', // Deep Forest Green (Primary)
          light: '#48BB78', // Sprout Green (Tertiary)
          surface: '#F8FAFC',
          stone: '#CBD5E1',
        },
        surface: {
          DEFAULT: '#f8f9ff',
          dim: '#cbdbf5',
          bright: '#f8f9ff',
          container: '#e5eeff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'level-1': '0 2px 8px -2px rgba(13, 59, 20, 0.06)',
        'level-2': '0 8px 24px -4px rgba(0, 180, 216, 0.28)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #00B4D8 0%, #0096C7 45%, #1B5E20 100%)',
      }
    },
  },
  plugins: [],
}
