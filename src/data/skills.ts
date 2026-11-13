/**
 * Skills, grouped by category and by EVIDENCE — not by self-rated scores.
 *  production : used in professional employment (resume)
 *  projects   : used hands-on in my own shipped or in-development products (repositories)
 *  learning   : actively studying / experimenting
 * Every skill lists where it was used so visitors can trace it.
 */
export type Evidence = 'production' | 'projects' | 'learning';

export const evidenceLabels: Record<Evidence, { label: string; description: string }> = {
  production: { label: 'Professional', description: 'Used in employment, per my resume' },
  projects: { label: 'Hands-on projects', description: 'Used to build my own products' },
  learning: { label: 'Currently learning', description: 'Studying or experimenting' },
};

export interface Skill {
  name: string;
  evidence: Evidence;
  usedIn: string[];
}

export interface SkillGroup {
  id: string;
  name: string;
  blurb: string;
  skills: Skill[];
}

const AZ = 'AstraZeneca';
const GAVS = 'GAVS Technologies';
const PFE = 'PromptFlowEngine';
const CT = 'CryptoTalkies';
const YT = 'AIYouTubeManager';
const MSEW = 'MSEW Platform';
const SCAN = 'AI PDF Scanner';
const LAND = 'Land Intelligence';
const SALES = 'AI Sales Hub';
const VOICE = 'Offline Voice Translator';

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    name: 'Backend engineering',
    blurb: 'C#/.NET services and APIs, from client applications to clean-architecture SaaS back ends.',
    skills: [
      { name: 'C#', evidence: 'production', usedIn: [AZ, GAVS, YT, SALES] },
      { name: '.NET', evidence: 'production', usedIn: [AZ, GAVS, YT, SALES] },
      { name: 'Web APIs / REST', evidence: 'production', usedIn: [AZ, YT, MSEW, LAND, PFE] },
      { name: 'System integration', evidence: 'production', usedIn: [AZ, 'Euphoros'] },
      { name: 'Application modernization', evidence: 'production', usedIn: [AZ] },
      { name: 'ASP.NET Core', evidence: 'projects', usedIn: [YT, SALES] },
      { name: 'Clean Architecture · CQRS · MediatR', evidence: 'projects', usedIn: [YT, SALES] },
      { name: 'Entity Framework Core', evidence: 'projects', usedIn: [YT, SALES] },
      { name: 'Node.js (Express, Cloud Functions)', evidence: 'projects', usedIn: [MSEW, CT] },
      { name: 'Python · FastAPI', evidence: 'projects', usedIn: [LAND] },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend & mobile',
    blurb: 'Typed React front ends and Flutter apps with native Kotlin modules where performance or privacy needs it.',
    skills: [
      { name: 'TypeScript', evidence: 'projects', usedIn: [PFE, CT, MSEW, SALES] },
      { name: 'React', evidence: 'projects', usedIn: [PFE, CT, YT, MSEW, LAND, SALES] },
      { name: 'Next.js', evidence: 'projects', usedIn: [CT, YT] },
      { name: 'Astro', evidence: 'projects', usedIn: [PFE] },
      { name: 'Vite · Tailwind CSS', evidence: 'projects', usedIn: [LAND, MSEW, SALES, CT, YT] },
      { name: 'Flutter / Dart', evidence: 'projects', usedIn: [CT, SCAN, MSEW, LAND, VOICE] },
      { name: 'Kotlin (Android native)', evidence: 'projects', usedIn: [SCAN, VOICE, MSEW] },
      { name: 'Browser & VS Code extensions', evidence: 'projects', usedIn: [PFE] },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    blurb: 'Relational stores first, vectors where retrieval needs them, encryption where privacy demands it.',
    skills: [
      { name: 'SQL', evidence: 'production', usedIn: [AZ] },
      { name: 'PostgreSQL', evidence: 'projects', usedIn: [YT, MSEW, SALES] },
      { name: 'pgvector (vector search)', evidence: 'projects', usedIn: [YT] },
      { name: 'Redis', evidence: 'projects', usedIn: [YT] },
      { name: 'Firestore', evidence: 'projects', usedIn: [CT] },
      { name: 'Cloudflare D1', evidence: 'projects', usedIn: [PFE] },
      { name: 'SQLite · SQLCipher', evidence: 'projects', usedIn: [SCAN, VOICE, LAND] },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    blurb: 'Automated delivery pipelines and infrastructure as code, with staged environments and rollbacks.',
    skills: [
      { name: 'AWS', evidence: 'production', usedIn: [AZ, YT] },
      { name: 'AWS Lambda', evidence: 'production', usedIn: [AZ] },
      { name: 'GitHub Actions CI/CD', evidence: 'production', usedIn: [AZ, PFE, CT, YT, MSEW] },
      { name: 'Cloud migration', evidence: 'production', usedIn: [AZ] },
      { name: 'Application monitoring', evidence: 'production', usedIn: [AZ, YT] },
      { name: 'Terraform', evidence: 'projects', usedIn: [YT] },
      { name: 'Docker / Compose', evidence: 'projects', usedIn: [YT, LAND, SALES] },
      { name: 'Cloudflare Workers', evidence: 'projects', usedIn: [PFE, CT] },
      { name: 'Firebase (Functions, Hosting, FCM)', evidence: 'projects', usedIn: [CT] },
      { name: 'AWS EC2 · IIS / Nginx', evidence: 'projects', usedIn: [YT] },
    ],
  },
  {
    id: 'ai',
    name: 'AI & machine learning',
    blurb: 'Retrieval, multi-model orchestration, agent tooling and on-device models — with deterministic fallbacks.',
    skills: [
      { name: 'Generative AI · LLMs', evidence: 'production', usedIn: [AZ, PFE, CT, YT] },
      { name: 'AWS Bedrock', evidence: 'production', usedIn: [AZ] },
      { name: 'RAG', evidence: 'production', usedIn: [AZ, YT] },
      { name: 'Prompt engineering', evidence: 'production', usedIn: [AZ, PFE] },
      { name: 'Microsoft Copilot Studio', evidence: 'production', usedIn: [AZ] },
      { name: 'Machine learning (prediction analysis)', evidence: 'production', usedIn: [AZ] },
      { name: 'Model Context Protocol (MCP)', evidence: 'projects', usedIn: [PFE] },
      { name: 'Multi-provider LLM orchestration', evidence: 'projects', usedIn: [CT, YT] },
      { name: 'Embeddings · semantic search', evidence: 'projects', usedIn: [YT] },
      { name: 'AI agents with human approval gates', evidence: 'projects', usedIn: [SALES] },
      { name: 'On-device AI (OCR, ASR, translation)', evidence: 'projects', usedIn: [SCAN, VOICE] },
      { name: 'Agentic AI architectures', evidence: 'learning', usedIn: ['IIT Madras programme (in progress)', SALES] },
    ],
  },
  {
    id: 'architecture',
    name: 'Architecture & security',
    blurb: 'Designs that keep the core logic in one place and make the risky paths explicit.',
    skills: [
      { name: 'Solution & API architecture', evidence: 'projects', usedIn: [PFE, YT, MSEW, SALES] },
      { name: 'Edge / serverless architecture', evidence: 'projects', usedIn: [PFE, CT] },
      { name: 'Privacy-by-design', evidence: 'projects', usedIn: [PFE, SCAN, VOICE] },
      { name: 'OAuth 2.0 · JWT · role-based access', evidence: 'projects', usedIn: [YT, MSEW, SALES] },
      { name: 'Prompt-injection & secret detection', evidence: 'projects', usedIn: [PFE] },
    ],
  },
  {
    id: 'practice',
    name: 'Delivery practice',
    blurb: 'Specifications first, AI-assisted where it helps, verified by tests before release.',
    skills: [
      { name: 'Specification-driven development', evidence: 'production', usedIn: [AZ, PFE, SCAN] },
      { name: 'AI-assisted SDLC', evidence: 'production', usedIn: [AZ, PFE] },
      { name: 'Requirements & acceptance criteria', evidence: 'production', usedIn: [AZ, 'Euphoros'] },
      { name: 'Test planning · code review', evidence: 'production', usedIn: [AZ, GAVS] },
      { name: 'Playwright end-to-end testing', evidence: 'projects', usedIn: [PFE, LAND, SALES] },
      { name: 'Unit & integration testing (xUnit, pytest, Vitest)', evidence: 'projects', usedIn: [SALES, LAND, PFE] },
    ],
  },
];
