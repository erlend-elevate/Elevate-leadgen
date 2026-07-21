/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        // The Visibility Dossier tokens (design.md §2)
        paper: '#F2EEE5',
        'paper-2': '#E8E2D2',
        ink: '#1A1A2E',
        'ink-soft': '#4A4A5E',
        navy: '#0A2540',
        'navy-deep': '#051729',
        teal: '#00D4AA',
        'teal-aa': '#0B6B57',
        orange: '#FF6B35',
        'orange-aa': '#B43E18',
        'paper-on-navy': '#EDEAE0',
        'line-paper': 'rgba(26,26,46,.16)',
        'line-navy': 'rgba(237,234,224,.14)',
        // shadcn tokens (kept for ui/* components)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive) / <alpha-value>)", foreground: "hsl(var(--destructive-foreground) / <alpha-value>)" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        snap: 'cubic-bezier(.22,.9,.24,1)',
        thump: 'cubic-bezier(.34,1.56,.64,1)',
        wipe: 'cubic-bezier(.77,0,.18,1)',
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'caret-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(0,212,170,.55)' },
          '100%': { boxShadow: '0 0 0 14px rgba(0,212,170,0)' },
        },
        'drift-bg': {
          from: { backgroundPosition: '50% 50%' },
          to: { backgroundPosition: '54% 46%' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'caret-blink': 'caret-blink .9s steps(1) infinite',
        'pulse-ring': 'pulse-ring 1.2s ease-out 1',
        'drift-bg': 'drift-bg 20s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
