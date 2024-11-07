interface Project {
  name: string;
  achievements: string[];
  url?: string;
}

interface Stack {
  frontend?: string[];
  backend?: string[];
  tools?: string[];
}

export interface ProjectType {
  role: string;
  company: string;
  period: string;
  projects: Project[];
  stack: Stack;
  details: string;
  mergeFrom?: boolean;
  branch?: string;
}
