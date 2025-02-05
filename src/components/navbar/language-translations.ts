export type LanguageCode = "en" | "es";

export type LanguageInfo = {
  code: LanguageCode;
  flag: string;
  name: string;
  label: string;
};

export type LanguageTranslations = {
  selector: {
    ariaLabel: string;
    menuAriaLabel: string;
  };
  languages: Record<LanguageCode, LanguageInfo>;
};

export const languageTranslations = {
  en: {
    language: {
      selector: {
        ariaLabel: "Select language",
        menuAriaLabel: "Language selection menu",
      },
      languages: {
        en: {
          code: "en",
          flag: "🇺🇸",
          name: "English",
          label: "EN",
        },
        es: {
          code: "es",
          flag: "🇪🇸",
          name: "Spanish",
          label: "ES",
        },
      },
    },
  },
  es: {
    language: {
      selector: {
        ariaLabel: "Seleccionar idioma",
        menuAriaLabel: "Menú de selección de idioma",
      },
      languages: {
        en: {
          code: "en",
          flag: "🇺🇸",
          name: "Inglés",
          label: "EN",
        },
        es: {
          code: "es",
          flag: "🇪🇸",
          name: "Español",
          label: "ES",
        },
      },
    },
  },
} as const;

export type Languages = keyof typeof languageTranslations;

export const getLanguageTranslations = (lang: Languages) => languageTranslations[lang].language;
