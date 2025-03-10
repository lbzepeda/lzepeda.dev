export type Role = {
  title: string;
  date: string;
  description: string;
  branch: string;
  achievements: string[];
};

export type RoleKey = "tech_leader" | "senior_dev" | "junior_dev" | "system_dev" | "ceo";

export type Categories = {
  development: string;
  infrastructure: string;
  methodologies: string;
  integrations: string;
};

export type CareerTranslations = {
  title: string;
  timeline: string;
  gitLog: string;
  noResults: string;
  categories: Categories;
  roles: Record<RoleKey, Role>;
  filter: {
    clearAll: string;
    filterResults: string;
  };
  viewSelector: {
    timeline: string;
    gitLog: string;
  };
};

export const careerTranslations = {
  en: {
    career: {
      title: "Career History Timeline",
      timeline: "Timeline",
      gitLog: "Git Log",
      noResults: "No experiences found with the selected technologies.",
      categories: {
        development: "Development",
        infrastructure: "Infrastructure",
        methodologies: "Methodologies",
        integrations: "Integrations",
      },
      roles: {
        tech_leader: {
          title: "Technology and Innovation Leader @ Alaska Cool",
          date: "Jul 2023 - Present",
          description: "Leading technology initiatives and driving innovation",
          branch: "main",
          achievements: [
            "My role involved building a scalable centralized Backend architecture that streamlined communication across company platforms, enabling seamless operations for 32 employees with robust infrastructure for company expansion",
            "Accelerated payment processing efficiency by 60% through strategic implementation of BAC Banking API integration, transforming manual daily payment workflows into an automated system",
            "Through my implementation of a comprehensive mobile application, transformed field service operations by revolutionizing technician workflow management, expense tracking, and real-time task coordination, driving significant improvements in service delivery",
          ],
        },
        senior_dev: {
          title: "Senior Software Developer @ Grupo LAFISE",
          date: "May 2021 - Jul 2023",
          description: "Led international payment solutions development for regional bank",
          branch: "feature/senior-dev",
          achievements: [
            "As lead developer, I engineered a multi-national Host-to-Host (H2H) payment system across 5 countries (Costa Rica, Panama, Dominican Republic, Honduras, Nicaragua), processing $3M+ through 1M+ transfers for enterprise clients including UBER",
            "Revolutionized cross-border transactions by developing a SWIFT-based international transfer system, reducing processing times from hours to minutes while ensuring regulatory compliance and optimizing multi-currency exchange operations",
            "Through my strategic integration with major providers (BTS, RIA, Dollex, Teledolar), transformed remittance services by enabling instant account deposits for thousands of customers and eliminating traditional branch-visit requirements",
          ],
        },
        junior_dev: {
          title: "Junior Software Developer @ Grupo LAFISE",
          date: "Jan 2018 - May 2021",
          description: "Developed banking integrations and payment solutions",
          branch: "merge/junior-dev",
          achievements: [
            "Developed a multi-country administrative system for MT101 and MT103 transfer processing control across 5 nations (Costa Rica, Panama, Dominican Republic, Honduras, Nicaragua), enhancing operational oversight and risk management",
            "Through my implementation of automated validation controls, strengthened the international transfer verification process, significantly reducing processing errors and improving compliance standards",
            "Engineered MT940 account statement generation systems for multiple providers, while implementing SWIFT messaging integrations that enhanced international banking capabilities",
            "As part of the core banking team, developed and integrated remittance provider systems that expanded our financial services reach and improved cross-border payment capabilities",
          ],
        },
        system_dev: {
          title: "System Developer @ Nestrix",
          date: "Jan 2017 - Sep 2019",
          description: "Led e-commerce platform development",
          branch: "feature/system-dev",
          achievements: [
            "Developed a comprehensive product management platform that enabled complete control over mobile app inventory, including product lifecycle, pricing strategies, and catalog optimization",
            "Maintained and optimized MongoDB infrastructure, ensuring reliable data management and efficient product operations across the e-commerce platform",
            "Built key features for inventory control and product management that contributed to the mobile app achieving 45% of total company sales",
          ],
        },
        ceo: {
          title: "CEO and Co-Founder @ CCL-Technologies",
          date: "Nov 2014 - Sep 2019",
          description: "Founded enterprise solutions company",
          branch: "main",
          achievements: [
            "Co-founded and grew a custom software development company that successfully delivered tailored solutions to major enterprises including Tigo (formerly Movistar) in Nicaragua",
            "Built lasting partnerships with diverse clients including religious organizations and media companies, developing custom solutions that addressed their specific business needs",
            "Through direct client engagement and project leadership, enhanced communication skills while establishing a strong network of business relationships throughout Nicaragua",
          ],
        },
      },
    },
  },
  es: {
    career: {
      title: "Línea de Tiempo Profesional",
      timeline: "Línea de Tiempo",
      gitLog: "Git Log",
      noResults: "No se encontraron experiencias con las tecnologías seleccionadas.",
      categories: {
        development: "Desarrollo",
        infrastructure: "Infraestructura",
        methodologies: "Metodologías",
        integrations: "Integraciones",
      },
      roles: {
        tech_leader: {
          title: "Líder de Tecnología e Innovación @ Alaska Cool",
          date: "Jul 2023 - Presente",
          description: "Liderando iniciativas tecnológicas e impulsando la innovación",
          branch: "main",
          achievements: [
            "Mi rol involucró la construcción de una arquitectura Backend centralizada y escalable que optimizó la comunicación entre plataformas de la empresa, permitiendo operaciones fluidas para 32 empleados con infraestructura robusta para expansión",
            "Aceleré la eficiencia del procesamiento de pagos en un 60% mediante la implementación estratégica de la integración con API Banking BAC, transformando flujos de trabajo manuales en un sistema automatizado",
            "A través de mi implementación de una aplicación móvil integral, transformé las operaciones de servicio en campo al revolucionar la gestión del flujo de trabajo de técnicos, seguimiento de gastos y coordinación de tareas en tiempo real",
          ],
        },
        senior_dev: {
          title: "Desarrollador Senior @ Grupo LAFISE",
          date: "May 2021 - Jul 2023",
          description:
            "Lideró el desarrollo de soluciones de pago internacional para banco regional",
          branch: "feature/senior-dev",
          achievements: [
            "Como desarrollador líder, diseñé un sistema de pagos Host-to-Host (H2H) multinacional en 5 países (Costa Rica, Panamá, República Dominicana, Honduras, Nicaragua), procesando más de $3M a través de más de 1M de transferencias para clientes empresariales incluyendo UBER",
            "Revolucioné las transacciones transfronterizas desarrollando un sistema de transferencias internacionales basado en SWIFT, reduciendo los tiempos de procesamiento de horas a minutos mientras aseguraba el cumplimiento normativo y optimizaba operaciones de cambio multi-moneda",
            "A través de mi integración estratégica con proveedores principales (BTS, RIA, Dollex, Teledolar), transformé los servicios de remesas permitiendo depósitos instantáneos en cuenta para miles de clientes y eliminando requisitos tradicionales de visita a sucursales",
          ],
        },
        junior_dev: {
          title: "Desarrollador Junior @ Grupo LAFISE",
          date: "Ene 2018 - May 2021",
          description: "Desarrolló integraciones bancarias y soluciones de pago",
          branch: "merge/junior-dev",
          achievements: [
            "Desarrollé un sistema administrativo multinacional para el control de procesamiento de transferencias MT101 y MT103 en 5 naciones (Costa Rica, Panamá, República Dominicana, Honduras, Nicaragua), mejorando la supervisión operativa y gestión de riesgos",
            "A través de mi implementación de controles de validación automatizados, fortalecí el proceso de verificación de transferencias internacionales, reduciendo significativamente errores de procesamiento y mejorando estándares de cumplimiento",
            "Diseñé sistemas de generación de estados de cuenta MT940 para múltiples proveedores, mientras implementaba integraciones de mensajería SWIFT que mejoraron las capacidades bancarias internacionales",
            "Como parte del equipo bancario central, desarrollé e integré sistemas de proveedores de remesas que expandieron nuestro alcance de servicios financieros y mejoraron las capacidades de pago transfronterizo",
          ],
        },
        system_dev: {
          title: "Desarrollador de Sistemas @ Nestrix",
          date: "Ene 2017 - Sep 2019",
          description: "Lideró el desarrollo de plataforma e-commerce",
          branch: "feature/system-dev",
          achievements: [
            "Desarrollé una plataforma integral de gestión de productos que permitió el control completo sobre el inventario de la aplicación móvil, incluyendo ciclo de vida del producto, estrategias de precios y optimización de catálogo",
            "Mantuve y optimicé la infraestructura MongoDB, asegurando una gestión confiable de datos y operaciones eficientes de productos en toda la plataforma de comercio electrónico",
            "Construí características clave para el control de inventario y gestión de productos que contribuyeron a que la aplicación móvil alcanzara el 45% de las ventas totales de la empresa",
          ],
        },
        ceo: {
          title: "CEO y Co-Fundador @ CCL-Technologies",
          date: "Nov 2014 - Sep 2019",
          description: "Fundó empresa de soluciones empresariales",
          branch: "main",
          achievements: [
            "Co-fundé y desarrollé una empresa de desarrollo de software personalizado que entregó exitosamente soluciones a medida para grandes empresas incluyendo Tigo (anteriormente Movistar) en Nicaragua",
            "Construí asociaciones duraderas con diversos clientes incluyendo organizaciones religiosas y empresas de medios, desarrollando soluciones personalizadas que abordaron sus necesidades específicas de negocio",
            "A través del compromiso directo con clientes y liderazgo de proyectos, mejoré habilidades de comunicación mientras establecía una sólida red de relaciones comerciales en Nicaragua",
          ],
        },
      },
    },
  },
} as const;

export type Languages = keyof typeof careerTranslations;

export const getCareerTranslations = (lang: Languages) => careerTranslations[lang].career;
