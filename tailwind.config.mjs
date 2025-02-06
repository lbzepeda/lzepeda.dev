/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          dark: "var(--color-secondary-dark)",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        move: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(60px, 60px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        "move-grid": "move 20s linear infinite",
      },
    },
  },
  plugins: [],
};
