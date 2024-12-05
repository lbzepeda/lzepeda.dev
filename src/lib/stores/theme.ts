// src/lib/stores/theme.ts
import { writable } from "svelte/store";

interface ThemeState {
  mode: "light" | "dark";
  contrast: "normal" | "high";
  palette: "purple" | "blue" | "green";
}

const PALETTES = {
  purple: {
    primary: "#9333ea",
    primaryDark: "#7c28cc",
    secondary: "#059669",
    secondaryDark: "#047857",
  },
  blue: {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    secondary: "#059669",
    secondaryDark: "#047857",
  },
  green: {
    primary: "#059669",
    primaryDark: "#047857",
    secondary: "#9333ea",
    secondaryDark: "#7c28cc",
  },
} as const;

function createThemeStore() {
  const store = writable<ThemeState>({
    mode: "light",
    contrast: "normal",
    palette: "purple",
  });

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme-preferences");
    if (stored) {
      store.set(JSON.parse(stored));
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        store.update((s) => ({ ...s, mode: "dark" }));
      }
    }

    store.subscribe((value) => {
      const root = document.documentElement;
      root.classList.toggle("dark", value.mode === "dark");

      const colors = PALETTES[value.palette];
      root.style.setProperty("--color-primary", colors.primary);
      root.style.setProperty("--color-primary-dark", colors.primaryDark);
      root.style.setProperty("--color-secondary", colors.secondary);
      root.style.setProperty("--color-secondary-dark", colors.secondaryDark);
    });
  }

  return {
    subscribe: store.subscribe,
    toggleMode: () =>
      store.update((s) => ({
        ...s,
        mode: s.mode === "light" ? "dark" : "light",
      })),
    toggleContrast: () =>
      store.update((s) => ({
        ...s,
        contrast: s.contrast === "normal" ? "high" : "normal",
      })),
    setPalette: (palette: ThemeState["palette"]) =>
      store.update((s) => ({
        ...s,
        palette,
      })),
  };
}

export const theme = createThemeStore();
