// src/lib/types/titles.ts
export interface TextPart {
  text: string;
  className: string;
}

export interface Title {
  textParts: readonly TextPart[];
}

export type Titles = readonly Title[];

export const titles = [
  {
    textParts: [
      { text: "lzepeda", className: "text-slate-800 dark:text-slate-100" },
      { text: ".", className: "text-primary dark:text-primary-dark" },
      { text: "dev", className: "text-gray-500 dark:text-gray-400" },
    ],
  },
  {
    textParts: [
      {
        text: "Levi Zepeda",
        className: "text-primary dark:text-primary-dark",
      },
    ],
  },
] as const;
