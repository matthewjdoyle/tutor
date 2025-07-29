/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'hero': ['Playfair Display', 'serif'],
      },
      colors: {
        // Theme-based colors using CSS custom properties
        'primary': {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        'secondary': {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
        },
        'accent': {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
        },
        'neutral': {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
        },
        'background': {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          muted: 'var(--color-bg-muted)',
        },
        'surface': {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          elevated: 'var(--color-surface-elevated)',
          muted: 'var(--color-surface-muted)',
        },
        'text': {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        'border': {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          muted: 'var(--color-border-muted)',
        },
        // Legacy colors for backward compatibility
        'brand-primary': 'var(--color-primary-500)',
        'brand-secondary': 'var(--color-secondary-500)',
        'brand-accent': 'var(--color-accent-500)',
        'brand-primary-alt': 'var(--color-primary-600)',
        'brand-secondary-alt': 'var(--color-secondary-600)',
        'neutral-bg': 'var(--color-bg-primary)',
        'neutral-surface': 'var(--color-surface-primary)',
        'neutral-muted-bg': 'var(--color-bg-muted)',
        'neutral-border': 'var(--color-border-primary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-on-brand': 'var(--color-text-inverse)',
      },
      backgroundImage: {
        'gradient-mesh': 'var(--gradient-mesh)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-section': 'var(--gradient-section)',
        'pattern-dots': 'var(--pattern-dots)',
        'pattern-grid': 'var(--pattern-grid)',
        'pattern-waves': 'var(--pattern-waves)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
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
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
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