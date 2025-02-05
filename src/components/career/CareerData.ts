export interface CareerData {
  id: number;
  roleKey: string;
  isFavorite: boolean;
  technologies: {
    development: string[];
    infrastructure: string[];
    methodologies: string[];
    integrations: string[];
  };
}

export const careerData: CareerData[] = [
  {
    id: 1,
    roleKey: "tech_leader",
    isFavorite: false,
    technologies: {
      development: [
        "Python",
        "FastAPI",
        "Next.js",
        "React Native",
        "TypeScript",
        "GraphQL",
        "Tailwind CSS",
      ],
      infrastructure: ["Docker", "Google Cloud", "GitHub Actions", "SWIFT GPI"],
      methodologies: ["SCRUM"],
      integrations: ["Google APIs", "API Banking BAC"],
    },
  },
  {
    id: 2,
    roleKey: "senior_dev",
    isFavorite: true,
    technologies: {
      development: ["C#", "React", "TypeScript"],
      infrastructure: ["AWS Lambda", "Docker", "AWS S3"],
      methodologies: ["SCRUM"],
      integrations: [
        "Visa B2B Connect",
        "SWIFT GPI",
        "Core Banking",
        "SWIFT Alliance",
        "Host-to-Host (H2H) Platform",
      ],
    },
  },
  {
    id: 3,
    roleKey: "junior_dev",
    isFavorite: true,
    technologies: {
      development: ["C#", "Angular"],
      infrastructure: ["AWS S3", "SQL Server"],
      methodologies: ["SCRUM"],
      integrations: ["Payment Processing", "ACH System"],
    },
  },
  {
    id: 4,
    roleKey: "system_dev",
    isFavorite: false,
    technologies: {
      development: ["Angular", "MongoDB"],
      infrastructure: ["MongoDB Atlas"],
      methodologies: ["SCRUM"],
      integrations: ["Payment Gateways", "POS"],
    },
  },
  {
    id: 5,
    roleKey: "ceo",
    isFavorite: false,
    technologies: {
      development: ["PHP", ".NET"],
      infrastructure: ["Windows Server"],
      methodologies: [],
      integrations: ["CRM", "ERP"],
    },
  },
];

export const allTechnologies = careerData.reduce((acc, career) => {
  Object.values(career.technologies).forEach(techArray => {
    techArray.forEach(tech => acc.add(tech));
  });
  return acc;
}, new Set<string>());
