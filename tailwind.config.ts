import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        foreground: '#F8F8F8',
        card: 'rgba(255, 255, 255, 0.05)',
        primary: '#3B82F6',
        'primary-foreground': '#FFFFFF',
        accent: '#8A2BE2',
        'accent-foreground': '#FFFFFF',
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'rgba(255, 255, 255, 0.08)',
        destructive: '#EF4444',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3e%3cfilter id='noise'%3e%3cfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3e%3c/filter%3e%3crect width='100%25' height='100%25' filter='url(%23noise)'/%3e%3c/svg%3e\")",
      },
      boxShadow: {
        'glow': '0 0 15px 5px rgba(59, 130, 246, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
