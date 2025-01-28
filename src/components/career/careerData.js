export const careerData = [
  {
    id: 1,
    title: 'Technology and Innovation Leader @ Alaska Cool',
    date: 'Jul 2023 - Present',
    description: 'Leading technology initiatives and driving innovation ',
    branch: 'main',
    isFavorite: false,
    technologies: {
      development: [
        'Python',
        'FastAPI',
        'Next.js',
        'React Native',
        'TypeScript',
        'GraphQL',
        'Tailwind CSS',
      ],
      infrastructure: ['Docker', 'Google Cloud', 'GitHub Actions', 'SWIFT GPI'],
      methodologies: ['SCRUM'],
      integrations: ['Google APIs', 'API Banking BAC'],
    },
    achievements: [
      'My role involved building a scalable centralized Backend architecture that streamlined communication across company platforms, enabling seamless operations for 32 employees with robust infrastructure for company expansion',
      'Accelerated payment processing efficiency by 60% through strategic implementation of BAC Banking API integration, transforming manual daily payment workflows into an automated system',
      'Through my implementation of a comprehensive mobile application, transformed field service operations by revolutionizing technician workflow management, expense tracking, and real-time task coordination, driving significant improvements in service delivery',
    ],
  },
  {
    id: 2,
    title: 'Senior Software Developer @ Grupo LAFISE',
    date: 'May 2021 - Jul 2023',
    description:
      'Led international payment solutions development for regional bank',
    branch: 'feature/senior-dev',
    isFavorite: true,
    technologies: {
      development: ['C#', 'React', 'TypeScript'],
      infrastructure: ['AWS Lambda', 'Docker', 'AWS S3'],
      methodologies: ['SCRUM'],
      integrations: [
        'Visa B2B Connect',
        'SWIFT GPI',
        'Core Banking',
        'SWIFT Alliance',
        'Host-to-Host (H2H) Platform',
      ],
    },
    achievements: [
      'As lead developer, I engineered a multi-national Host-to-Host (H2H) payment system across 5 countries (Costa Rica, Panama, Dominican Republic, Honduras, Nicaragua), processing $3M+ through 1M+ transfers for enterprise clients including UBER',
      'Revolutionized cross-border transactions by developing a SWIFT-based international transfer system, reducing processing times from hours to minutes while ensuring regulatory compliance and optimizing multi-currency exchange operations',
      'Through my strategic integration with major providers (BTS, RIA, Dollex, Teledolar), transformed remittance services by enabling instant account deposits for thousands of customers and eliminating traditional branch-visit requirements',
    ],
    mergeFrom: 'feature/senior-dev',
  },
  {
    id: 3,
    title: 'Junior Software Developer @ Grupo LAFISE',
    date: 'Jan 2018 - May 2021',
    description: 'Developed banking integrations and payment solutions',
    branch: 'merge/junior-dev',
    isFavorite: true,
    technologies: {
      development: ['C#', 'Angular'],
      infrastructure: ['AWS S3', 'SQL Server'],
      methodologies: ['SCRUM'],
      integrations: ['Payment Processing', 'ACH System'],
    },
    achievements: [
      'Developed a multi-country administrative system for MT101 and MT103 transfer processing control across 5 nations (Costa Rica, Panama, Dominican Republic, Honduras, Nicaragua), enhancing operational oversight and risk management',
      'Through my implementation of automated validation controls, strengthened the international transfer verification process, significantly reducing processing errors and improving compliance standards',
      'Engineered MT940 account statement generation systems for multiple providers, while implementing SWIFT messaging integrations that enhanced international banking capabilities',
      'As part of the core banking team, developed and integrated remittance provider systems that expanded our financial services reach and improved cross-border payment capabilities',
    ],
  },
  {
    id: 4,
    title: 'System Developer @ Nestrix',
    date: 'Jan 2017 - Sep 2019',
    description: 'Led e-commerce platform development',
    branch: 'feature/system-dev',
    isFavorite: false,
    technologies: {
      development: ['Angular', 'MongoDB'],
      infrastructure: ['MongoDB Atlas'],
      methodologies: ['SCRUM'],
      integrations: ['Payment Gateways', 'POS'],
    },
    achievements: [
      'Developed a comprehensive product management platform that enabled complete control over mobile app inventory, including product lifecycle, pricing strategies, and catalog optimization',
      'Maintained and optimized MongoDB infrastructure, ensuring reliable data management and efficient product operations across the e-commerce platform',
      'Built key features for inventory control and product management that contributed to the mobile app achieving 45% of total company sales',
    ],
  },
  {
    id: 5,
    title: 'CEO and Co-Founder @ CCL-Technologies',
    date: 'Nov 2014 - Sep 2019',
    description: 'Founded enterprise solutions company',
    branch: 'main',
    isFavorite: false,
    technologies: {
      development: ['PHP', '.NET'],
      infrastructure: ['Windows Server'],
      methodologies: [],
      integrations: ['CRM', 'ERP'],
    },
    achievements: [
      'Co-founded and grew a custom software development company that successfully delivered tailored solutions to major enterprises including Tigo (formerly Movistar) in Nicaragua',

      'Built lasting partnerships with diverse clients including religious organizations and media companies, developing custom solutions that addressed their specific business needs',

      'Through direct client engagement and project leadership, enhanced communication skills while establishing a strong network of business relationships throughout Nicaragua',
    ],
  },
];
