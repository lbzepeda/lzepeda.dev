export type HeroDescription = Array<{
  text: string;
  highlight: boolean;
}>;

export type HeroTranslations = {
  role: string;
  description: HeroDescription;
};

export const heroTranslations = {
  en: {
    hero: {
      role: "Fullstack Developer",
      description: [
        { text: "I build ", highlight: false },
        { text: "distributed systems", highlight: true },
        { text: " end-to-end. My focus is creating ", highlight: false },
        { text: "robust architectures", highlight: true },
        { text: " that ", highlight: false },
        { text: "scale", highlight: true },
        { text: ", combining ", highlight: false },
        { text: "high-performance backend", highlight: true },
        { text: " with ", highlight: false },
        { text: "fluid user experiences", highlight: true },
        { text: ".", highlight: false },
      ],
    },
  },
  es: {
    hero: {
      role: "Desarrollador Fullstack",
      description: [
        { text: "Construyo ", highlight: false },
        { text: "sistemas distribuidos", highlight: true },
        { text: " completos. Mi enfoque es crear ", highlight: false },
        { text: "arquitecturas robustas", highlight: true },
        { text: " que ", highlight: false },
        { text: "escalan", highlight: true },
        { text: ", combinando ", highlight: false },
        { text: "backend de alto rendimiento", highlight: true },
        { text: " con ", highlight: false },
        { text: "experiencias de usuario fluidas", highlight: true },
        { text: ".", highlight: false },
      ],
    },
  },
} as const;

export type Languages = keyof typeof heroTranslations;

export const getHeroTranslations = (lang: Languages) => heroTranslations[lang].hero;
