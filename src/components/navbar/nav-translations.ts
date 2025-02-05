export type NavTranslationKeys = {
  home: string;
  about: string;
  career: string;
  projects: string;
  contact: string;
  resume: string;
};

export const navigationTranslations = {
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      career: "Career",
      projects: "Projects",
      contact: "Contact",
      resume: "Resume",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre Mí",
      career: "Carrera",
      projects: "Proyectos",
      contact: "Contacto",
      resume: "Currículum",
    },
  },
} as const;

export type NavKeys = keyof typeof navigationTranslations.en.nav;
export type Languages = keyof typeof navigationTranslations;

export const getNavTranslations = (lang: Languages) => navigationTranslations[lang].nav;

export const NAVIGATION_ITEMS: Array<{ href: string; labelKey: NavKeys; number: string }> = [
  { href: "#home", labelKey: "home", number: " 0." },
  { href: "#about", labelKey: "about", number: " 1." },
  { href: "#career", labelKey: "career", number: " 2." },
  { href: "#project", labelKey: "projects", number: " 3." },
  { href: "#contact", labelKey: "contact", number: " 4." },
];
