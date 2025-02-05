import { writable } from "svelte/store";

// Tipos base
type ThemeMode = "light" | "dark";
type ContrastMode = "normal" | "high";
type PaletteType = "purple" | "blue" | "green";

// Constantes del tema
export const THEME_COLORS = {
  LIGHT: "0F172A",
  DARK: "FFFFFF",
} as const;

const defaultState: ThemeState = {
  mode: "light",
  contrast: "normal",
  palette: "purple",
};

// Sistema de Tokens de Diseño
export const DESIGN_TOKENS = {
  technologyList: {
    category: {
      normal: {
        light: "text-xs text-gray-700 capitalize",
        dark: "dark:text-gray-300 capitalize",
      },
      high: {
        light: "text-sm text-slate-900 capitalize font-medium",
        dark: "dark:text-white capitalize font-medium",
      },
    },
    button: {
      text: {
        normal: {
          light: "text-xs text-secondary",
          dark: "dark:text-white",
        },
        high: {
          light: "text-sm text-secondary font-medium",
          dark: "dark:text-white font-medium",
        },
      },
      unselected: {
        normal: {
          light: "bg-secondary/5 border border-secondary/20 hover:bg-secondary/10",
          dark: "dark:bg-secondary-dark/20 dark:border-secondary-dark/40 dark:hover:bg-secondary-dark/30",
        },
        high: {
          light: "bg-secondary/10 border-2 border-secondary/30 hover:bg-secondary/15",
          dark: "dark:bg-secondary-dark/30 dark:border-2 dark:border-secondary-dark/50 dark:hover:bg-secondary-dark/40",
        },
      },
      base: "px-2 py-0.5 rounded-full transition-all duration-300",
    },
  },
  gitLog: {
    container: {
      normal: {
        light: "bg-gray-900 hover:scale-[1.02]",
        dark: "dark:bg-gray-800 hover:scale-[1.02]",
      },
      high: {
        light: "bg-gray-950 hover:scale-[1.02] ring-2 ring-gray-800",
        dark: "dark:bg-gray-900 hover:scale-[1.02] dark:ring-2 dark:ring-gray-700",
      },
    },
    content: {
      normal: {
        // Mantenemos el amarillo para commit
        commit: "text-yellow-300 dark:text-yellow-400",
        // Usando primary para author y date
        author: "text-primary dark:text-primary-dark",
        date: "text-primary dark:text-primary-dark",
        // Usando secondary para branch
        branch: "text-secondary dark:text-secondary-dark",
        title: "text-white dark:text-white font-bold",
        description: "text-gray-300 dark:text-gray-200",
        category: {
          label: "text-gray-300 dark:text-gray-200 font-semibold capitalize",
          content: "text-gray-300 dark:text-gray-200",
        },
        achievements: {
          title: "text-gray-300 dark:text-gray-200",
          item: "text-gray-300 dark:text-gray-200 ml-4",
        },
      },
      high: {
        commit: "text-yellow-400 dark:text-yellow-300 font-semibold",
        author: "text-primary-dark dark:text-primary font-semibold",
        date: "text-primary-dark dark:text-primary font-semibold",
        branch: "text-secondary-dark dark:text-secondary font-semibold",
        title: "text-white dark:text-white font-bold",
        description: "text-gray-200 dark:text-gray-100",
        category: {
          label: "text-gray-200 dark:text-gray-100 font-bold capitalize",
          content: "text-gray-200 dark:text-gray-100",
        },
        achievements: {
          title: "text-gray-200 dark:text-gray-100 font-semibold",
          item: "text-gray-200 dark:text-gray-100 ml-4",
        },
      },
    },
    milestone: {
      icon: {
        normal: "w-4 h-4 md:w-5 md:h-5 text-amber-300 dark:text-amber-400",
        high: "w-5 h-5 md:w-6 md:h-6 text-amber-400 dark:text-amber-300",
      },
      tooltip: {
        container:
          "absolute z-10 invisible group-hover:visible inline-block px-3 py-2 text-sm font-medium text-white rounded-lg shadow-sm opacity-0 group-hover:opacity-100 whitespace-nowrap",
        background: {
          normal: {
            light: "bg-gray-800",
            dark: "dark:bg-gray-700",
          },
          high: {
            light: "bg-gray-900 ring-1 ring-gray-700",
            dark: "dark:bg-gray-800 dark:ring-1 dark:ring-gray-600",
          },
        },
      },
    },
  },
  careerSection: {
    header: {
      title: {
        normal: {
          light: "text-slate-700 font-mono",
          dark: "dark:text-slate-300 font-mono",
        },
        high: {
          light: "text-slate-900 font-mono font-medium",
          dark: "dark:text-white font-mono font-medium",
        },
      },
      path: {
        normal: {
          light: "text-primary",
          dark: "dark:text-primary-dark",
        },
        high: {
          light: "text-primary-dark font-semibold",
          dark: "dark:text-primary font-semibold",
        },
      },
      icon: {
        normal: {
          light: "text-primary w-5 h-5 md:w-6 md:h-6",
          dark: "dark:text-primary-dark w-5 h-5 md:w-6 md:h-6",
        },
        high: {
          light: "text-primary-dark w-5 h-5 md:w-6 md:h-6",
          dark: "dark:text-primary w-5 h-5 md:w-6 md:h-6",
        },
      },
    },
    actionButton: {
      normal: {
        light: "bg-emerald-600 hover:bg-emerald-700 text-white",
        dark: "dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white",
      },
      high: {
        light: "bg-emerald-700 hover:bg-emerald-800 text-white font-medium",
        dark: "dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium",
      },
    },
  },
  careerTitle: {
    title: {
      normal: {
        light: "text-secondary text-sm md:text-lg font-semibold",
        dark: "dark:text-secondary-dark text-sm md:text-lg font-semibold",
      },
      high: {
        light: "text-secondary text-base md:text-xl font-bold",
        dark: "dark:text-secondary-dark text-base md:text-xl font-bold",
      },
    },
    date: {
      normal: {
        light: "text-xs md:text-sm text-gray-700 font-mono",
        dark: "dark:text-gray-300 text-xs md:text-sm font-mono",
      },
      high: {
        light: "text-sm md:text-base text-slate-900 font-medium font-mono",
        dark: "dark:text-white text-sm md:text-base font-medium font-mono",
      },
    },
    icon: {
      sizes: {
        normal: "w-3.5 h-3.5 md:w-4 md:h-4",
        high: "w-4 h-4 md:w-5 md:h-5",
      },
      colors: {
        favorite: "text-amber-700",
        chevron: {
          normal: {
            light: "text-gray-700",
            dark: "dark:text-gray-300",
          },
          high: {
            light: "text-slate-900",
            dark: "dark:text-white",
          },
        },
      },
    },
    tooltip: {
      base: "absolute z-10 invisible group-hover:visible inline-block px-3 py-2 text-sm font-medium text-white rounded-lg shadow-sm opacity-0 tooltip group-hover:opacity-100 whitespace-nowrap",
      background: {
        normal: {
          light: "bg-gray-800",
          dark: "dark:bg-gray-700",
        },
        high: {
          light: "bg-gray-900",
          dark: "dark:bg-gray-800",
        },
      },
      arrow: {
        base: "absolute top-1/2 -translate-y-1/2 border-[6px] border-transparent",
        left: {
          normal: {
            light: "border-l-gray-800",
            dark: "dark:border-l-gray-700",
          },
          high: {
            light: "border-l-gray-900",
            dark: "dark:border-l-gray-800",
          },
        },
        right: {
          normal: {
            light: "border-r-gray-800",
            dark: "dark:border-r-gray-700",
          },
          high: {
            light: "border-r-gray-900",
            dark: "dark:border-r-gray-800",
          },
        },
      },
    },
  },
  viewSelector: {
    button: {
      selected: {
        normal: {
          light: "text-primary border border-primary",
          dark: "dark:text-primary-dark dark:border-primary-dark",
        },
        high: {
          light: "text-primary-dark border-2 border-primary font-semibold",
          dark: "dark:text-primary dark:border-primary-dark",
        },
      },
      default: {
        normal: {
          light: "text-slate-700 border border-slate-300 hover:bg-slate-50",
          dark: "dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800",
        },
        high: {
          light: "text-slate-900 border-2 border-slate-400 hover:bg-slate-100 font-medium",
          dark: "dark:text-white dark:border-slate-500 dark:hover:bg-slate-800",
        },
      },
      base: "flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors duration-300",
    },
  },
  filter: {
    button: {
      selected: {
        normal: {
          light: "text-primary border border-primary hover:bg-primary/5",
          dark: "dark:text-primary-dark dark:border-primary-dark dark:hover:bg-primary-dark/10",
        },
        high: {
          light: "text-primary-dark border-2 border-primary font-semibold hover:bg-primary/5",
          dark: "dark:text-primary dark:border-primary dark:hover:bg-primary-dark/10",
        },
      },
      unselected: {
        normal: {
          light: "text-slate-600 border border-slate-300 hover:bg-slate-50",
          dark: "dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800",
        },
        high: {
          light: "text-slate-900 border-2 border-slate-400 hover:bg-slate-100",
          dark: "dark:text-white dark:border-slate-500 dark:hover:bg-slate-800",
        },
      },
      clear: {
        normal: {
          light: "text-gray-500 hover:text-gray-700",
          dark: "dark:text-gray-300 dark:hover:text-gray-200",
        },
        high: {
          light: "text-slate-900 font-medium",
          dark: "dark:text-white font-medium",
        },
      },
    },
    separator: {
      normal: {
        light: "border-gray-200",
        dark: "dark:border-gray-700",
      },
      high: {
        light: "border-gray-300",
        dark: "dark:border-gray-600",
      },
    },
    scrollbar: {
      normal: {
        light: "scrollbar-thumb-gray-300",
        dark: "dark:scrollbar-thumb-gray-600",
      },
      high: {
        light: "scrollbar-thumb-gray-400",
        dark: "dark:scrollbar-thumb-gray-500",
      },
    },
  },
  text: {
    heading: {
      h1: {
        normal: {
          light: "text-slate-900",
          dark: "dark:text-white",
        },
        high: {
          light: "text-slate-900 font-semibold",
          dark: "dark:text-white font-semibold",
        },
      },
      h2: {
        normal: {
          light: "text-slate-800",
          dark: "dark:text-slate-100",
        },
        high: {
          light: "text-slate-900 font-semibold",
          dark: "dark:text-white font-semibold",
        },
      },
      h3: {
        normal: {
          light: "text-slate-700",
          dark: "dark:text-slate-200",
        },
        high: {
          light: "text-slate-800 font-medium",
          dark: "dark:text-slate-100 font-medium",
        },
      },
    },
    body: {
      large: {
        normal: {
          light: "text-slate-700",
          dark: "dark:text-slate-300",
        },
        high: {
          light: "text-slate-900 font-medium",
          dark: "dark:text-white font-medium",
        },
      },
      base: {
        normal: {
          light: "text-slate-600",
          dark: "dark:text-slate-400",
        },
        high: {
          light: "text-slate-800",
          dark: "dark:text-slate-200",
        },
      },
      small: {
        normal: {
          light: "text-slate-500",
          dark: "dark:text-slate-500",
        },
        high: {
          light: "text-slate-700",
          dark: "dark:text-slate-300",
        },
      },
    },
    highlight: {
      normal: {
        light: "text-primary",
        dark: "dark:text-primary",
      },
      high: {
        light: "text-primary-dark font-semibold",
        dark: "dark:text-primary font-semibold",
      },
    },
  },
  background: {
    primary: {
      normal: {
        light: "bg-white",
        dark: "dark:bg-slate-900",
      },
      high: {
        light: "bg-white",
        dark: "dark:bg-slate-900",
      },
    },
    secondary: {
      normal: {
        light: "bg-slate-50",
        dark: "dark:bg-slate-800",
      },
      high: {
        light: "bg-slate-100",
        dark: "dark:bg-slate-800",
      },
    },
  },
  border: {
    default: {
      normal: {
        light: "border-slate-200",
        dark: "dark:border-slate-700",
      },
      high: {
        light: "border-slate-400",
        dark: "dark:border-slate-500",
      },
    },
    accent: {
      normal: {
        light: "border-primary",
        dark: "dark:border-primary",
      },
      high: {
        light: "border-primary-dark",
        dark: "dark:border-primary",
      },
    },
  },
} as const;

export const PALETTES = {
  purple: {
    primary: "#9333ea",
    primaryDark: "#7c28cc",
    secondary: "#059669",
    secondaryDark: "#047857",
    label: "Purple Harmony",
    states: {
      hover: {
        primary: "#8b31e3",
        primaryDark: "#7526c4",
      },
      active: {
        primary: "#8329db",
        primaryDark: "#6e24b8",
      },
    },
  },
  blue: {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    secondary: "#059669",
    secondaryDark: "#047857",
    label: "Ocean Blue",
    states: {
      hover: {
        primary: "#2251d1",
        primaryDark: "#1a47c2",
      },
      active: {
        primary: "#1f4bc4",
        primaryDark: "#1842b5",
      },
    },
  },
  green: {
    primary: "#059669",
    primaryDark: "#047857",
    secondary: "#9333ea",
    secondaryDark: "#7c28cc",
    label: "Forest Green",
    states: {
      hover: {
        primary: "#05875f",
        primaryDark: "#046c4f",
      },
      active: {
        primary: "#047c57",
        primaryDark: "#046347",
      },
    },
  },
} as const;

interface ThemeState {
  mode: ThemeMode;
  contrast: ContrastMode;
  palette: PaletteType;
}

function createThemeStore() {
  const store = writable<ThemeState>({
    mode: "light",
    contrast: "normal",
    palette: "purple",
  });

  // Inicialización
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme-preferences");
    if (stored) {
      store.set(JSON.parse(stored));
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      store.update(s => ({ ...s, mode: "dark" }));
    }

    // Suscripción para actualizar variables CSS y localStorage
    store.subscribe(value => {
      const root = document.documentElement;
      root.classList.toggle("dark", value.mode === "dark");

      const colors = PALETTES[value.palette];

      // Actualizar variables CSS basadas en el modo
      if (value.mode === "dark") {
        root.style.setProperty("--color-primary", colors.primaryDark);
        root.style.setProperty("--color-primary-dark", colors.primary);
        root.style.setProperty("--color-secondary", colors.secondaryDark);
        root.style.setProperty("--color-secondary-dark", colors.secondary);
      } else {
        root.style.setProperty("--color-primary", colors.primary);
        root.style.setProperty("--color-primary-dark", colors.primaryDark);
        root.style.setProperty("--color-secondary", colors.secondary);
        root.style.setProperty("--color-secondary-dark", colors.secondaryDark);
      }

      // Guardar preferencias
      localStorage.setItem("theme-preferences", JSON.stringify(value));
    });
  }

  // Helpers para obtener clases
  function getTextClasses(type: string, variant: "heading" | "body" = "body") {
    return (value: ThemeState) => {
      const token =
        variant === "heading"
          ? DESIGN_TOKENS.text.heading[type as keyof typeof DESIGN_TOKENS.text.heading]
          : DESIGN_TOKENS.text.body[type as keyof typeof DESIGN_TOKENS.text.body];

      return `${token[value.contrast].light} ${token[value.contrast].dark} transition-colors duration-300`;
    };
  }

  function getHighlightTextClasses() {
    return (value: ThemeState) => {
      const token = DESIGN_TOKENS.text.highlight;
      return `${token[value.contrast].light} ${token[value.contrast].dark} transition-colors duration-300`;
    };
  }

  function getBackgroundClasses(type: keyof typeof DESIGN_TOKENS.background) {
    return (value: ThemeState) => {
      const token = DESIGN_TOKENS.background[type];
      return `${token[value.contrast].light} ${token[value.contrast].dark} transition-colors duration-300`;
    };
  }

  function getBorderClasses(type: keyof typeof DESIGN_TOKENS.border) {
    return (value: ThemeState) => {
      const token = DESIGN_TOKENS.border[type];
      return `${token[value.contrast].light} ${token[value.contrast].dark} transition-colors duration-300`;
    };
  }

  function getViewFilterClasses(type: "selected" | "default") {
    return (value: ThemeState = defaultState) => {
      const token = DESIGN_TOKENS.viewSelector.button[type];
      return `${DESIGN_TOKENS.viewSelector.button.base} ${token[value?.contrast || "normal"].light} ${token[value?.contrast || "normal"].dark}`;
    };
  }

  // API pública
  return {
    subscribe: store.subscribe,
    toggleMode: () =>
      store.update(s => ({
        ...s,
        mode: s.mode === "light" ? "dark" : "light",
      })),
    toggleContrast: () =>
      store.update(s => ({
        ...s,
        contrast: s.contrast === "normal" ? "high" : "normal",
      })),
    setPalette: (palette: PaletteType) =>
      store.update(s => ({
        ...s,
        palette,
      })),
    getTextClasses,
    getHighlightTextClasses,
    getBackgroundClasses,
    getBorderClasses,
    getViewFilterClasses,
  };
}

export const theme = createThemeStore();
