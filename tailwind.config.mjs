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
    },
  },
  plugins: [],
  presets: [
    {
      theme: {
        themes: {
          purple: {
            primary: "#9333ea",
            secondary: "#059669",
          },
          blue: {
            primary: "#2563eb",
            secondary: "#059669",
          },
          green: {
            primary: "#059669",
            secondary: "#9333ea",
          },
        },
      },
    },
  ],
};
