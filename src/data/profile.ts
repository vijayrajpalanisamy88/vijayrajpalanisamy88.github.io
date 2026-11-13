/**
 * Identity, contact and positioning.
 * Source of truth: Vijayraj_Palanisamy_Resume.pdf (11 Nov 2026) and owner approvals (13 Nov 2026).
 * Do not add phone numbers or a postal address: the owner approved email + GitHub only.
 */
export const SITE_URL = 'https://vijayrajpalanisamy88.github.io';

export const profile = {
  name: 'Vijayraj Palanisamy',
  shortName: 'Vijayraj',
  initials: 'VP',
  /** Current title exactly as on the resume. */
  currentRole: 'Senior Consultant, AstraZeneca',
  headline: 'C#/.NET engineer building GenAI and Agentic AI products',
  roles: ['C#/.NET Engineer', 'Full-Stack Developer', 'GenAI & RAG', 'Agentic AI Builder', 'AI Product Builder'],
  location: 'Chennai, India',
  /** Career start: Mar 2011 (SAP Business One Consultant, Euphoros). */
  careerStart: '2011-03',
  experienceLabel: '15+ years',
  intro:
    'I have spent more than 15 years delivering enterprise software — most recently R&D digital applications in life sciences at AstraZeneca. ' +
    'Alongside that work I design and ship my own AI products end to end: a PromptOps platform, an AI crypto intelligence site and app, an AI learning platform for YouTube, and privacy-first mobile apps.',
  email: 'vijayrajpalanisamy@gmail.com',
  github: 'https://github.com/vijayrajpalanisamy88',
  githubHandle: 'vijayrajpalanisamy88',
  /** No LinkedIn URL was supplied or found on the resume. Add it here when available. */
  linkedin: '' as string,
  resumePdf: '/Vijayraj_Palanisamy_Resume.pdf',
  openTo: [
    'Senior software engineering roles (C#/.NET, full stack)',
    'AI engineer and Agentic AI engineer roles',
    'Technical lead and architecture discussions',
    'Product collaborations and consulting',
  ],
} as const;

/** Numbers shown in the hero. Every value must be checkable against the resume or a live product. */
export const quickFacts = [
  { value: '15+', label: 'years in software, since 2011' },
  { value: '3', label: 'live AI web products I built' },
  { value: '2', label: 'Android apps on Google Play' },
  { value: 'Bedrock · RAG', label: 'delivered at AstraZeneca' },
] as const;
