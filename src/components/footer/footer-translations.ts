export type FooterTranslations = {
  builtWith: string;
  viewSource: string;
};

export const footerTranslations = {
  en: {
    footer: {
      builtWith: "Built with ❤️ using Svelte & Astro",
      viewSource: "View source on GitHub",
    },
  },
  es: {
    footer: {
      builtWith: "Construido con ❤️ usando Svelte & Astro",
      viewSource: "Ver código en GitHub",
    },
  },
} as const;

export type Languages = keyof typeof footerTranslations;
export const getFooterTranslations = (lang: Languages) => footerTranslations[lang].footer;
