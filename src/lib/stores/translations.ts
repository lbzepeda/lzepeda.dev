export const translations = {
  en: {
    language: "English",
    nav: {
      home: "Home",
      about: "About Me",
      career: "Career",
      projects: "Projects",
      contact: "Contact",
      resume: "Resume",
    },
    theme: {
      colorScheme: "Color Scheme",
      contrast: "Contrast",
      normal: "Normal",
      high: "High",
    },
    hero: {
      role: "Fullstack Developer",
      description: [
        { text: "As a fullstack developer, I craft ", highlight: false },
        { text: "end-to-end", highlight: true },
        { text: " solutions through ", highlight: false },
        { text: "scalable", highlight: true },
        { text: " architectures and ", highlight: false },
        { text: "efficient", highlight: true },
        { text: " code. From ", highlight: false },
        { text: "database design", highlight: true },
        { text: " to ", highlight: false },
        { text: "user interfaces", highlight: true },
        {
          text: ", I build complete, performant applications.",
          highlight: false,
        },
      ],
    },
  },
  es: {
    language: "Español",
    nav: {
      home: "Inicio",
      about: "Sobre Mí",
      career: "Carrera",
      projects: "Proyectos",
      contact: "Contacto",
      resume: "Currículum",
    },
    theme: {
      colorScheme: "Esquema de Color",
      contrast: "Contraste",
      normal: "Normal",
      high: "Alto",
    },
    hero: {
      role: "Desarrollador Fullstack",
      description: [
        {
          text: "Como desarrollador fullstack, creo soluciones ",
          highlight: false,
        },
        { text: "integrales", highlight: true },
        { text: " mediante arquitecturas ", highlight: false },
        { text: "escalables", highlight: true },
        { text: " y código ", highlight: false },
        { text: "eficiente", highlight: true },
        { text: ". Desde el ", highlight: false },
        { text: "diseño de bases de datos", highlight: true },
        { text: " hasta las ", highlight: false },
        { text: "interfaces de usuario", highlight: true },
        {
          text: ", construyo aplicaciones completas y de alto rendimiento.",
          highlight: false,
        },
      ],
    },
  },
} as const;

export type Languages = keyof typeof translations;
export type NavKeys = keyof typeof translations.en.nav;
export type TranslationKeys = keyof typeof translations.en;
