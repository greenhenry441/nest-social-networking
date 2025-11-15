import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        accent: 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        background: 'var(--color-background)',
        'text-default': 'var(--color-text-default)',
        'text-light': 'var(--color-text-light)',
        'text-heading': 'var(--color-text-heading)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Assuming Poppins is the chosen expressive font
        // You can add more font families here if needed, e.g., 'display': ['Montserrat', 'sans-serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config