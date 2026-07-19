/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#F9E8E8',
        rose: '#E8A5A5',
        'deep-rose': '#C97A7A',
        cream: '#FDF6F0',
        'warm-cream': '#F5EBE0',
        latte: '#D4B896',
        ink: '#2C1A1A',
        slate: '#6B4F4F',
        mist: '#B89E9E',
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        heading: ['Jost', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['Italiana', 'serif'],
      },
      borderRadius: {
        card: '20px',
      },
      boxShadow: {
        card: '0 4px 20px rgba(44,26,26,0.08)',
        hover: '0 8px 32px rgba(44,26,26,0.14)',
      },
    },
  },
  plugins: [],
}