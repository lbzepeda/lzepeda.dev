export type FooterTranslations = {
  builtWith: string;
  usingText: string;
  andText: string;
  viewSource: string;
};

export const footerTranslations = {
  en: {
    footer: {
      builtWith: "Built with ❤️ using",
      usingText: "using",
      andText: "and",
      viewSource: "View source on GitHub",
    },
  },
  es: {
    footer: {
      builtWith: "Construido con ❤️",
      usingText: "usando",
      andText: "y",
      viewSource: "Ver código en GitHub",
    },
  },
} as const;

export type Languages = keyof typeof footerTranslations;
export const getFooterTranslations = (lang: Languages) => footerTranslations[lang].footer;
