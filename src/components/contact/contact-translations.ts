export type ContactTranslations = {
  title: string;
  subtitle: string;
  emailButton: string;
  downloadButton: string;
  socialMedia: string;
  emailText: string;
};

// contact-translations.ts
export const contactTranslations = {
  en: {
    contact: {
      // Asegúrate de que esta estructura coincida
      title: "Let's Connect",
      subtitle:
        "I'm always excited to connect with fellow developers, discuss innovative projects, or explore new opportunities in the tech world.",
      emailButton: "Send me an email",
      downloadButton: "Download Resume",
      socialMedia: "Or find me on social media",
      emailText: "Email me at",
    },
  },
  es: {
    contact: {
      // Asegúrate de que esta estructura coincida
      title: "Conectemos",
      subtitle:
        "Siempre estoy entusiasmado por conectar con otros desarrolladores, discutir proyectos innovadores o explorar nuevas oportunidades en el mundo tecnológico.",
      emailButton: "Envíame un email",
      downloadButton: "Descargar CV",
      socialMedia: "O encuéntrame en redes sociales",
      emailText: "Escríbeme a",
    },
  },
};

export type Languages = keyof typeof contactTranslations;
export const getContactTranslations = (lang: Languages) => contactTranslations[lang].contact;
