import { writable } from "svelte/store";

type Language = "en" | "es";

function createLanguageStore() {
  const browser = typeof window !== "undefined";

  const getInitialLanguage = (): Language => {
    if (!browser) return "en";

    const stored = localStorage.getItem("preferredLanguage");
    if (stored === "en" || stored === "es") return stored;

    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("es") ? "es" : "en";
  };

  const { subscribe, set, update } = writable<Language>(getInitialLanguage());

  return {
    subscribe,
    setLanguage: (lang: Language) => {
      if (browser) {
        localStorage.setItem("preferredLanguage", lang);
      }
      set(lang);
    },
    toggleLanguage: () => {
      update((current) => {
        const newLang = current === "en" ? "es" : "en";
        if (browser) {
          localStorage.setItem("preferredLanguage", newLang);
        }
        return newLang;
      });
    },
  };
}

export const language = createLanguageStore();
