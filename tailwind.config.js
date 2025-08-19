/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Terminal Colors - Subtle & Professional
        primary: '#3b82f6', // Blue
        secondary: '#8b5cf6', // Purple
        accent: '#10b981', // Green
        'accent-blue': '#6366f1', // Indigo
        'accent-purple': '#ec4899', // Pink
        
        // Background Colors
        dark: '#0a0a0a',
        'dark-gray': '#1a1a1a',
        'terminal-bg': '#0d1117', // GitHub dark theme
        'terminal-surface': '#161b22',
        'terminal-border': '#30363d',
        
        // Text Colors
        'text-primary': '#1f2937',
        'text-secondary': '#4b5563',
        'text-muted': '#6b7280',
        'text-dim': '#9ca3af',
        
        // Status Colors - Subtle
        'success': '#10b981', // Green
        'warning': '#f59e0b', // Amber
        'error': '#ef4444', // Red
        'info': '#3b82f6', // Blue
        
        // Legacy colors for compatibility
        'terminal-green': '#3b82f6',
        'terminal-dark': '#0d1117',
        'terminal-gray': '#161b22',
        'terminal-light': '#21262d'
      },
      fontFamily: {
        'terminal': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s infinite',
        'typewriter': 'typewriter 3s steps(40) 1s forwards',
        'cursor': 'cursor 1s infinite',
        'terminal-boot': 'terminalBoot 0.1s ease-out',
        'terminal-typing': 'terminalTyping 0.05s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        glow: {
          '0%': { textShadow: '0 0 5px rgba(59, 130, 246, 0.3)' },
          '100%': { textShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        cursor: {
          '0%, 50%': { borderColor: 'transparent' },
          '51%, 100%': { borderColor: '#3b82f6' }
        },
        terminalBoot: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        terminalTyping: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        'terminal': '0 0 20px rgba(59, 130, 246, 0.1)',
        'terminal-glow': '0 0 30px rgba(59, 130, 246, 0.15)',
        'terminal-inner': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }
    },
  },
  plugins: [],
}