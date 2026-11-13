/**
 * Employment history. Titles and dates match my career history.
 * The employer for 2016 - present is intentionally not named; describe that work generically
 * (no employer, product, project or lab names, no internal metrics).
 */
export interface Role {
  id: string;
  title: string;
  company: string;
  location: string;
  start: string; // YYYY-MM
  end: string | null; // null = present
  period: string;
  domain: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export const experience: Role[] = [
  {
    id: 'senior-consultant',
    title: 'Senior Consultant',
    company: 'Global life-sciences company',
    location: 'Chennai',
    start: '2023-02',
    end: null,
    period: 'Feb 2023 – Present',
    domain: 'Life sciences · R&D IT / Digital DevOps',
    summary:
      'Digital engineering for R&D IT, working with cross-functional stakeholders on R&D digital applications, solution reliability and user experience.',
    highlights: [
      'Applied specification-driven development: clarified requirements, defined implementation-ready specifications and acceptance criteria, and aligned development and validation to the agreed scope.',
      'Used an AI-assisted development lifecycle for requirements analysis, design decisions, implementation refinement, test-case preparation and developer-led review.',
      'Implemented GitHub Actions CI/CD workflows and supported .NET application modernization and on-premises-to-cloud migration.',
      'Used AWS Lambda for application monitoring with Microsoft Teams notifications.',
      'Delivered AWS Bedrock and RAG-based question answering over vendor documentation.',
    ],
    tech: ['C#', '.NET', 'AWS Bedrock', 'RAG', 'AWS Lambda', 'GitHub Actions', 'Python', 'Microsoft Copilot Studio'],
  },
  {
    id: 'analyst',
    title: 'Analyst',
    company: 'Global life-sciences company',
    location: 'Chennai',
    start: '2016-01',
    end: '2023-06',
    period: 'Jan 2016 – Jun 2023',
    domain: 'Life sciences · Operations and digital process improvement',
    summary:
      'Operational and digital process improvement through workflow analysis, data-driven reporting and cross-functional collaboration.',
    highlights: [
      'Identified inefficiencies and improved resource utilization in operational processes.',
      'Built data-driven reports to support decision-making.',
      'Contributed to system and process enhancements aligned with business needs.',
    ],
    tech: ['Workflow analysis', 'Reporting', 'Process improvement'],
  },
  {
    id: 'gavs-dotnet-developer',
    title: '.NET Developer',
    company: 'GAVS Technologies',
    location: 'Chennai',
    start: '2013-05',
    end: '2015-12',
    period: 'May 2013 – Dec 2015',
    domain: 'IT services · Client application development',
    summary: 'Developed and supported .NET applications for client requirements across the full software development lifecycle.',
    highlights: [
      'Built .NET applications to client requirements.',
      'Debugging, issue resolution and peer code reviews to maintain code quality.',
      'Coordinated with delivery teams for timely releases.',
    ],
    tech: ['C#', '.NET', 'SDLC', 'Code review'],
  },
  {
    id: 'euphoros-sap-b1',
    title: 'SAP Business One Consultant',
    company: 'Euphoros',
    location: 'Chennai',
    start: '2011-03',
    end: '2013-05',
    period: 'Mar 2011 – May 2013',
    domain: 'ERP consulting',
    summary: 'SAP Business One implementations: requirements discovery, process optimization, system integration and end-user training.',
    highlights: [
      'Implemented SAP Business One for clients and tailored it to their processes.',
      'Ran needs assessments and integrated SAP Business One with existing infrastructure.',
      'Delivered end-user training to drive adoption.',
    ],
    tech: ['SAP Business One', 'System integration', 'Requirements analysis'],
  },
];

export const professionalDevelopment = [
  {
    name: 'Agentic AI & Applications',
    issuer: 'IIT Madras',
    status: 'In progress' as const,
  },
];

