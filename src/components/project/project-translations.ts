export const projectTranslations = {
  en: {
    project: {
      title: "Projects",
      subtitle: "A collection of my professional work and achievements",
      keyAchievements: "Key Achievements",
      viewProject: "View Project",
      techStack: "Tech Stack",
      overview: "Overview",
      frontend: "Fullstack",
      backend: "Backend",
      tools: "Tools",
      now: "NOW",
      data: [
        {
          role: "Senior Software Developer",
          company: "LAFISEConnect",
          period: "May 2021 - Jul 2023",
          projects: [
            {
              name: "LAFISEConnect",
              achievements: [
                "Implemented Nicaragua's first automated bulk transfer system",
                "Automated payment processing across 5 countries in LATAM",
                "Onboarded major clients including UBER",
                "Established platform as bank's #2 critical system",
              ],
              url: "https://www.lafise.com/LAFISEConnect/index.html",
            },
          ],
          stack: {
            tools: ["CI/CD", ".NET Core", "Azure DevOps", "Swift GPI"],
          },
          details:
            "I developed an enterprise file processing system that currently enables thousands of people across the region to receive automated transfers, international payments, and utility services.",
        },
        {
          role: "Junior Software Developer",
          company: "SWIFT Transfers",
          period: "2020 - 2023",
          projects: [
            {
              name: "International Transfers & Remittances System",
              achievements: [
                "Automated high-volume SWIFT transfer processing across 5 countries",
                "Implemented automated national and international compliance screening",
                "Developed commission calculation system for international transfers",
                "Integrated multiple currency exchange markets per country",
                "Reduced transfer processing time from manual to real-time",
                "Ensured compliance with financial regulations across multiple jurisdictions",
              ],
            },
          ],
          stack: {
            backend: ["CI/CD", ".NET Core", "AWS", "SQL Server"],
            tools: ["SWIFT Protocol", "Docker"],
          },
          details:
            "I developed an automated SWIFT transfer processing system that transformed manual operations into real-time transactions, while ensuring compliance with diverse regulatory requirements across multiple countries.",
        },
        {
          role: "Technology and Innovation Leader",
          company: "Technology and Innovation",
          period: "2023 - NOW",
          projects: [
            {
              name: "Enterprise Digital Transformation",
              achievements: [
                "I created a mobile app to manage company's technical services",
                "I integrated BAC's H2H system automating payroll process",
                "I successfully implemented SCRUM in sales and tech teams",
                "Implement a CRM system that connects multiple social media sales channels",
                "I automated expense and vendor payment processes",
                "I designed and built scalable backend infrastructure for growth",
              ],
            },
          ],
          stack: {
            frontend: [
              "ReactJS",
              "Next.js",
              "React Native",
              "EXPO",
              "TypeScript",
              "Tailwind CSS",
              "Apollo",
              "Clerk",
            ],
            backend: ["FastAPI", "GraphQL", "JWT", "Google Cloud Storage", "SQLAlchemy", "EAS"],
            tools: ["Git", "Webpack", "H2H Integration", "SCRUM", "CRM"],
          },
          details:
            "I led the company's digital transformation by developing key systems including technical service management, automated payments, and social media integration, while establishing a scalable technical foundation for future growth.",
        },
      ],
    },
  },
  es: {
    project: {
      title: "Proyectos",
      subtitle: "Una colección de mi trabajo y logros profesionales",
      keyAchievements: "Logros Clave",
      viewProject: "Ver Proyecto",
      techStack: "Tecnologías",
      overview: "Resumen",
      frontend: "Fullstack",
      backend: "Backend",
      tools: "Herramientas",
      now: "ACTUAL",
      data: [
        {
          role: "Desarrollador Senior de Software",
          company: "LAFISEConnect",
          period: "Mayo 2021 - Julio 2023",
          projects: [
            {
              name: "LAFISEConnect",
              achievements: [
                "Implementé el primer sistema automatizado de transferencias masivas de Nicaragua",
                "Automaticé el procesamiento de pagos en 5 países de LATAM",
                "Incorporé clientes importantes incluyendo UBER",
                "Establecí la plataforma como el sistema crítico #2 del banco",
              ],
              url: "https://www.lafise.com/LAFISEConnect/index.html",
            },
          ],
          stack: {
            tools: ["CI/CD", ".NET Core", "Azure DevOps", "Swift GPI"],
          },
          details:
            "Desarrollé un sistema empresarial de procesamiento de archivos que actualmente permite a miles de personas en la región recibir transferencias automatizadas, pagos internacionales y servicios públicos.",
        },
        {
          role: "Desarrollador Junior de Software",
          company: "SWIFT Transfers",
          period: "2020 - 2023",
          projects: [
            {
              name: "Sistema de Transferencias y Remesas Internacionales",
              achievements: [
                "Automaticé el procesamiento de transferencias SWIFT de alto volumen en 5 países",
                "Implementé verificación automatizada de cumplimiento nacional e internacional",
                "Desarrollé sistema de cálculo de comisiones para transferencias internacionales",
                "Integré múltiples mercados de cambio de divisas por país",
                "Reduje el tiempo de procesamiento de transferencias de manual a tiempo real",
                "Aseguré el cumplimiento de regulaciones financieras en múltiples jurisdicciones",
              ],
            },
          ],
          stack: {
            backend: ["CI/CD", ".NET Core", "AWS", "SQL Server"],
            tools: ["SWIFT Protocol", "Docker"],
          },
          details:
            "Desarrollé un sistema automatizado de procesamiento de transferencias SWIFT que transformó las operaciones manuales en transacciones en tiempo real, asegurando el cumplimiento de diversos requisitos regulatorios en varios países.",
        },
        {
          role: "Líder de Tecnología e Innovación",
          company: "Tecnología e Innovación",
          period: "2023 - ACTUAL",
          projects: [
            {
              name: "Transformación Digital Empresarial",
              achievements: [
                "Creé una aplicación móvil para gestionar servicios técnicos de la empresa",
                "Integré el sistema H2H de BAC automatizando el proceso de nómina",
                "Implementé exitosamente SCRUM en equipos de ventas y tecnología",
                "Implementé un sistema CRM que conecta múltiples canales de venta en redes sociales",
                "Automaticé procesos de gastos y pagos a proveedores",
                "Diseñé y construí infraestructura backend escalable para crecimiento",
              ],
            },
          ],
          stack: {
            frontend: [
              "ReactJS",
              "Next.js",
              "React Native",
              "EXPO",
              "TypeScript",
              "Tailwind CSS",
              "Apollo",
              "Clerk",
            ],
            backend: ["FastAPI", "GraphQL", "JWT", "Google Cloud Storage", "SQLAlchemy", "EAS"],
            tools: ["Git", "Webpack", "Integración H2H", "SCRUM", "CRM"],
          },
          details:
            "Lideré la transformación digital de la empresa desarrollando sistemas clave incluyendo gestión de servicios técnicos, pagos automatizados e integración con redes sociales, mientras establecía una base técnica escalable para el crecimiento futuro.",
        },
      ],
    },
  },
} as const;

export type Languages = keyof typeof projectTranslations;
export const getProjectTranslations = (lang: Languages) => projectTranslations[lang].project;
export const getProjectData = (lang: Languages) => projectTranslations[lang].project.data;
