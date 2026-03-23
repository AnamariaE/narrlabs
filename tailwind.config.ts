import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Personal brand
        'personal-ink': '#111216',
        'personal-sand': '#F5F2EC',
        'personal-clay': '#D9CFC2',
        'personal-sage': '#5E8F7A',
        'personal-rose': '#C77A84',

        // NarrLab brand
        'studio-ink': '#1C1B1A',
        'studio-parchment': '#F7F3EE',
        'studio-terracotta': '#C46542',
        'studio-sage': '#4E8A7F',
        'studio-plum': '#6E5A7C',
        'studio-grey': '#B6AFA6',
      },
      fontFamily: {
        sans: ['var(--font-sora), var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
export default config
