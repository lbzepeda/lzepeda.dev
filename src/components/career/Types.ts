// lib/types/translations.ts
type Role = {
  title: string;
  date: string;
  description: string;
  branch: string;
  achievements: string[];
};

type RoleKeys = "tech_leader" | "senior_dev" | "junior_dev" | "system_dev" | "ceo";

type CareerTranslations = {
  roles: Record<RoleKeys, Role>;
  title: string;
  timeline: string;
  gitLog: string;
  noResults: string;
  categories: {
    development: string;
    infrastructure: string;
    methodologies: string;
    integrations: string;
  };
};
