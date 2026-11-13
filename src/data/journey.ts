/**
 * AI engineering journey + delivery process.
 * Dates come from my career history or from first-commit dates in my repositories.
 * `kind` distinguishes professional delivery from personal products and from learning.
 */
export type JourneyKind = 'professional' | 'product' | 'learning';

export interface Milestone {
  when: string;
  title: string;
  kind: JourneyKind;
  text: string;
  topics: string[];
}

export const journey: Milestone[] = [
  {
    when: '2011 – 2015',
    title: 'Foundations: ERP and .NET',
    kind: 'professional',
    text: 'Started with SAP Business One implementations and integrations, then moved into .NET application development for client projects.',
    topics: ['C#', '.NET', 'System integration'],
  },
  {
    when: '2016 – 2023',
    title: 'Life-sciences operations and digital process improvement',
    kind: 'professional',
    text: 'Workflow analysis, data-driven reporting and process improvement across cross-functional teams.',
    topics: ['Process improvement', 'Reporting'],
  },
  {
    when: '2023 →',
    title: 'Generative AI in the enterprise',
    kind: 'professional',
    text: 'Delivered AWS Bedrock RAG question answering over vendor documents, used Microsoft Copilot Studio, and applied an AI-assisted, specification-driven delivery lifecycle in enterprise R&D IT.',
    topics: ['AWS Bedrock', 'RAG', 'Copilot Studio', 'SDD'],
  },
  {
    when: '2025 →',
    title: 'Multi-provider AI in a consumer product',
    kind: 'product',
    text: 'CryptoTalkies: an AI agent (ARIA) that combines live tools with Claude, Gemini, OpenAI and Groq and falls back between providers, plus automated content pipelines.',
    topics: ['LLM orchestration', 'Tool use', 'Automation'],
  },
  {
    when: 'Jun 2026 →',
    title: 'RAG on my own stack',
    kind: 'product',
    text: 'AIYouTubeManager: pgvector embeddings, semantic search and an AI mentor chat grounded in the user’s own channels, on a clean-architecture .NET API.',
    topics: ['RAG', 'pgvector', 'Embeddings', '.NET'],
  },
  {
    when: 'Aug 2026 →',
    title: 'PromptOps, MCP and agent guardrails',
    kind: 'product',
    text: 'PromptFlowEngine: a deterministic prompt engine, an MCP server with 19 tools, agent hooks and an MCP tool-call firewall, and CI gating for prompts.',
    topics: ['Prompt engineering', 'MCP', 'AI security', 'PromptOps'],
  },
  {
    when: 'Nov 2026 →',
    title: 'On-device AI and human-in-the-loop agents',
    kind: 'product',
    text: 'Offline OCR and speech translation on Android, and an agentic sales system where every external action needs human approval.',
    topics: ['On-device AI', 'ONNX', 'Agentic AI', 'Human approval'],
  },
  {
    when: 'In progress',
    title: 'Agentic AI & Applications — IIT Madras',
    kind: 'learning',
    text: 'Formal study of agentic AI architectures and applications. In progress; not a completed certification.',
    topics: ['Agentic AI', 'Multi-agent systems'],
  },
];

export interface Stage {
  id: string;
  name: string;
  short: string;
  activities: string[];
}

/** Traditional delivery lifecycle — established practice across my career. */
export const sdlc: Stage[] = [
  { id: 'understand', name: 'Understand', short: 'Business needs', activities: ['Stakeholder discovery', 'Business requirements', 'Constraints and risks'] },
  { id: 'specify', name: 'Specify', short: 'Specification', activities: ['Technical specification', 'Business rules and edge cases', 'Measurable acceptance criteria'] },
  { id: 'design', name: 'Design', short: 'Architecture', activities: ['Functional architecture', 'Technical architecture', 'Technology choice', 'API and data design'] },
  { id: 'build', name: 'Build', short: 'Implementation', activities: ['Back end and front end', 'Integrations', 'AI services where they add value'] },
  { id: 'verify', name: 'Verify', short: 'Testing', activities: ['Unit and integration tests', 'End-to-end tests', 'Code review'] },
  { id: 'release', name: 'Release', short: 'CI/CD', activities: ['Automated pipelines', 'Staged environments', 'Secure deployment and rollback'] },
  { id: 'operate', name: 'Operate', short: 'Run & improve', activities: ['Monitoring and alerts', 'Production support', 'Enhancements'] },
];

export interface AiStep {
  name: string;
  human: string;
  ai: string;
  maturity: 'practised' | 'experimental';
}

/**
 * AI-native lifecycle. "practised" = used at work and/or in my products.
 * "experimental" = what I am trying in my own products, not an established method.
 */
export const aiLifecycle: AiStep[] = [
  { name: 'Specification', human: 'Owns the intent, scope and acceptance criteria', ai: 'Finds ambiguity and missing edge cases', maturity: 'practised' },
  { name: 'Context & prompt', human: 'Chooses the relevant code and constraints', ai: 'Builds a structured, token-efficient prompt from the spec and codebase', maturity: 'practised' },
  { name: 'Design & implement', human: 'Decides the architecture', ai: 'Proposes designs and drafts code against the spec', maturity: 'practised' },
  { name: 'Review & test', human: 'Reviews every change against the spec', ai: 'Prepares test cases and review checklists', maturity: 'practised' },
  { name: 'Guardrails', human: 'Sets the policy', ai: 'Scans prompts and agent tool calls for secrets, PII and injection', maturity: 'practised' },
  { name: 'Agent execution', human: 'Approves every external action', ai: 'Agents research, draft and update internal systems', maturity: 'experimental' },
];
