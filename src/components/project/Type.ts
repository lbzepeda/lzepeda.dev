export interface ProjectType {
  role: string;
  company: string;
  period: string;
  projects: Array<{
    name: string;
    achievements: Array<string>;
    url?: string;
  }>;
  stack: {
    frontend?: Array<string>;
    backend?: Array<string>;
    tools?: Array<string>;
  };
  details: string;
}

export type ProjectTranslations = {
  title: string;
  subtitle: string;
  keyAchievements: string;
  viewProject: string;
  techStack: string;
  overview: string;
  frontend: string;
  backend: string;
  tools: string;
  now: string;
  data: ProjectType[];
};
