/**
 * Identity, contact and positioning.
 * Owner decisions (13 Nov 2026): contact is email + GitHub only; no phone or address; no resume download;
 * the current employer is not named anywhere on the site.
 */
export const SITE_URL = 'https://vijayrajpalanisamy88.github.io';

export const profile = {
  name: 'Vijayraj Palanisamy',
  shortName: 'Vijayraj',
  initials: 'VP',
  currentRole: 'Senior Consultant · Enterprise R&D IT',
  headline: 'C#/.NET engineer building GenAI and Agentic AI products',
  roles: ['C#/.NET Engineer', 'Full-Stack Developer', 'GenAI & RAG', 'Agentic AI Builder', 'AI Product Builder'],
  location: 'Chennai, India',
  /** Career start: Mar 2011 (SAP Business One Consultant, Euphoros). */
  careerStart: '2011-03',
  experienceLabel: '15+ years',
  intro:
    'I have spent more than 15 years delivering enterprise software — most recently R&D digital applications for a global life-sciences company. ' +
    'Alongside that work I design and ship my own AI products end to end: a PromptOps platform, an AI crypto intelligence site and app, an AI learning platform for YouTube, and privacy-first mobile apps.',
  email: 'vijayrajpalanisamy@gmail.com',
  github: 'https://github.com/vijayrajpalanisamy88',
  githubHandle: 'vijayrajpalanisamy88',
  /** Add a LinkedIn URL here when available. */
  linkedin: '' as string,
  openTo: [
    'Senior software engineering roles (C#/.NET, full stack)',
    'AI engineer and Agentic AI engineer roles',
    'Technical lead and architecture discussions',
    'Product collaborations and consulting',
  ],
} as const;

/** Numbers shown in the hero. Every value must be verifiable. */
export const quickFacts = [
  { value: '15+', label: 'years in software, since 2011' },
  { value: '3', label: 'live AI web products I built' },
  { value: '2', label: 'Android apps on Google Play' },
  { value: 'Bedrock · RAG', label: 'delivered in enterprise R&D IT' },
] as const;
