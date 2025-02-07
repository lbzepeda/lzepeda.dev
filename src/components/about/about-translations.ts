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
        { text: "fullstack engineer", highlight: true },
        { text: " focused on ", highlight: false },
        { text: "scalable applications", highlight: true },
        { text: ". I specialize in ", highlight: false },
        { text: "cloud development", highlight: true },
        { text: " and ", highlight: false },
        { text: "modern architectures", highlight: true },
        { text: ", building solutions that integrate ", highlight: false },
        { text: "robust backend", highlight: true },
        { text: " with ", highlight: false },
        { text: "intuitive interfaces", highlight: true },
        { text: ".", highlight: false },
      ],
      experience: [
        { text: "I've developed ", highlight: false },
        { text: "critical financial systems", highlight: true },
        { text: " in Central America, including ", highlight: false },
        { text: "payment platforms", highlight: true },
        { text: " and ", highlight: false },
        { text: "cross-border operations", highlight: true },
        {
          text: " handling millions of transactions. My work is characterized by ",
          highlight: false,
        },
        { text: "robust architectures", highlight: true },
        { text: " and attention to detail. Outside of coding, I enjoy ", highlight: false },
        { text: "CrossFit, traveling", highlight: true },
        { text: ", and spending time with family and friends.", highlight: false },
      ],
    },
  },
  es: {
    about: {
      title: "Sobre Mí",
      intro: [
        { text: "¡Hola! Soy Levi Zepeda, ", highlight: false },
        { text: "ingeniero fullstack", highlight: true },
        { text: " enfocado en ", highlight: false },
        { text: "aplicaciones escalables", highlight: true },
        { text: ". Me especializo en ", highlight: false },
        { text: "desarrollo cloud", highlight: true },
        { text: " y ", highlight: false },
        { text: "arquitecturas modernas", highlight: true },
        { text: ", construyendo soluciones que integran ", highlight: false },
        { text: "backend robusto", highlight: true },
        { text: " con ", highlight: false },
        { text: "interfaces intuitivas", highlight: true },
        { text: ".", highlight: false },
      ],
      experience: [
        { text: "He desarrollado ", highlight: false },
        { text: "sistemas financieros críticos", highlight: true },
        { text: " en Centroamérica, incluyendo ", highlight: false },
        { text: "plataformas de pagos", highlight: true },
        { text: " y ", highlight: false },
        { text: "operaciones transfronterizas", highlight: true },
        {
          text: " que manejan millones de transacciones. Mi trabajo se caracteriza por ",
          highlight: false,
        },
        { text: "arquitecturas robustas", highlight: true },
        { text: " y atención al detalle. Fuera del código, disfruto del ", highlight: false },
        { text: "CrossFit, viajar", highlight: true },
        { text: ", y pasar tiempo con familia y amigos.", highlight: false },
      ],
    },
  },
} as const;

export type Languages = keyof typeof aboutTranslations;

export const getAboutTranslations = (lang: Languages) => aboutTranslations[lang].about;
