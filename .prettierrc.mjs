/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        printWidth: 100,
      },
    },
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
        printWidth: 100,
        svelteIndentScriptAndStyle: true,
        svelteSortOrder: "options-scripts-markup-styles",
        svelteStrictMode: false,
        svelteBracketNewLine: false,
        singleAttributePerLine: false,
        htmlWhitespaceSensitivity: "ignore",
        singleQuote: false,
      },
    },
  ],
  // Configuración global
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  bracketSameLine: true, // Esto mantendrá las etiquetas de apertura y cierre en la misma línea
  arrowParens: "avoid",
};
