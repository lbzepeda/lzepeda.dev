export type TextChunk = {
  text: string;
  highlight: boolean;
};

export type AboutTranslations = {
  title: string;
  intro: TextChunk[];
  experience: TextChunk[];
};

export const aboutTranslations = {
  en: {
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

export type Languages = keyof typeof aboutTranslations;

export const getAboutTranslations = (lang: Languages) => aboutTranslations[lang].about;
