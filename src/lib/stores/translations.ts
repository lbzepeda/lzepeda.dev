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
    about: {
      title: "About Me",
      intro: [
        { text: "Hi! I'm Levi Zepeda, a ", highlight: false },
        { text: "frontend developer", highlight: true },
        { text: " with backend expertise. I work with ", highlight: false },
        { text: "TypeScript, Tailwind CSS, React, and Next.js", highlight: true },
        { text: " [and more...], using Git for collaborative projects.", highlight: false },
      ],
      experience: [
        { text: "I've developed ", highlight: false },
        { text: "critical financial platforms", highlight: true },
        {
          text: " across Central America, including systems for Uber driver payments and ",
          highlight: false,
        },
        { text: "cross-border operations", highlight: true },
        { text: ". My work is driven by ", highlight: false },
        { text: "autonomy and attention to detail", highlight: true },
        {
          text: ", always focusing on the end user. Outside of coding, I enjoy ",
          highlight: false,
        },
        { text: "crossfit, traveling", highlight: true },
        { text: ", and spending time with family, friends, and my pets.", highlight: false },
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
    about: {
      title: "Sobre Mí",
      intro: [
        { text: "¡Hola! Soy Levi Zepeda, un ", highlight: false },
        { text: "desarrollador frontend", highlight: true },
        { text: " con experiencia en backend. Trabajo con ", highlight: false },
        { text: "TypeScript, Tailwind CSS, React y Next.js", highlight: true },
        { text: " [y más], usando Git para proyectos colaborativos.", highlight: false },
      ],
      experience: [
        { text: "He desarrollado ", highlight: false },
        { text: "plataformas financieras críticas", highlight: true },
        {
          text: " en Centroamérica, incluyendo sistemas para pagos de conductores Uber y ",
          highlight: false,
        },
        { text: "operaciones transfronterizas", highlight: true },
        { text: ". Mi trabajo se guía por la ", highlight: false },
        { text: "autonomía y atención al detalle", highlight: true },
        {
          text: ", siempre enfocándome en el usuario final. Fuera del código, disfruto del ",
          highlight: false,
        },
        { text: "crossfit, viajar", highlight: true },
        { text: ", y pasar tiempo con familia, amigos y mis mascotas.", highlight: false },
      ],
    },
  },
} as const;

export type Languages = keyof typeof translations;
export type NavKeys = keyof typeof translations.en.nav;
export type TranslationKeys = keyof typeof translations.en;
