/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand-primary': '#0d9488', 
        'brand-secondary': '#2563eb', 
        'brand-accent': '#ec4899', 
        'brand-primary-alt': '#db2777', 
        'brand-secondary-alt': '#9333ea', 
        'neutral-bg': '#f9fafb', 
        'neutral-surface': '#f9fafb', 
        'neutral-border': '#e5e7eb', 
        'neutral-muted-bg': '#f9fafb',
        'text-primary': '#1f2937', 
        'text-secondary': '#374151', 
        'text-muted': '#6b7280', 
        'text-on-brand': '#ffffff', 
        'text-on-accent': '#ffffff',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'drift': 'drift var(--drift-duration, 30s) infinite linear alternate', 
        'textShimmer': 'textShimmer 18s linear infinite alternate',
        'fade-in-up-slight': 'fadeInUpSlight 0.7s ease-out forwards',
        'section-enter': 'sectionEnter 0.8s ease-out forwards',
        'smooth-scale': 'smoothScale 0.3s ease-out',
        'slide-in-left': 'slideInLeft 1s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.7' },
        },
        drift: {
          '0%': { transform: 'translate(var(--drift-start-x, 0px), var(--drift-start-y, 0px)) scale(var(--drift-start-scale, 1))', opacity: 'var(--drift-start-opacity, 0.7)' },
          '100%': { transform: 'translate(var(--drift-end-x), var(--drift-end-y)) scale(var(--drift-end-scale, 1))', opacity: 'var(--drift-end-opacity, 0.8)' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUpSlight: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sectionEnter: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        smoothScale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1.05)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'all-smooth': 'all',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-soft': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }
    }
  },
  plugins: [
    function({ addBase, addUtilities, theme }) {
      addBase({
        'html': { 
          scrollBehavior: 'smooth',
          scrollPaddingTop: '2rem',
        },
        'body': {
          scrollBehavior: 'smooth',
        },
        'h1': { fontSize: theme('fontSize.2xl'), fontWeight: theme('fontWeight.bold') },
        'h2': { fontSize: theme('fontSize.xl'), fontWeight: theme('fontWeight.semibold') },
        'h3': { fontSize: theme('fontSize.lg'), fontWeight: theme('fontWeight.medium') },
        '*:focus': {
          outline: '2px solid',
          outlineColor: theme('colors.brand-primary'),
          outlineOffset: '2px',
        }
      });
      
      addUtilities({
        '.scroll-smooth': {
          scrollBehavior: 'smooth',
        },
        '.scroll-padding-top': {
          scrollPaddingTop: '2rem',
        },
        '.transition-all-smooth': {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.hover-lift': {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }
        },
        '.hide-scrollbar': {
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          }
        }
      });
    }
  ],
} 