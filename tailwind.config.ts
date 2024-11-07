import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        move: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(60px, 60px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        'move-grid': 'move 20s linear infinite',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
export default config;
