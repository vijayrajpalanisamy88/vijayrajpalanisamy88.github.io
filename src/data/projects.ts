/**
 * Project case studies.
 * Sources: each product's repository README / architecture docs (read 13 Nov 2026) and the live public pages.
 * Rules: no secrets, hostnames of private services, client names or proprietary source.
 * "status" must be honest; roadmap items stay in `roadmap`, never in `features`.
 */
export type Category = 'AI product' | 'SaaS' | 'Mobile' | 'Enterprise' | 'Domain platform' | 'Developer tools';
export type StatusKind = 'live' | 'beta' | 'development' | 'demo' | 'enterprise';

export interface ArchNode {
  id: string;
  label: string;
  tech: string;
  detail: string;
}
export interface ArchLayer {
  id: 'clients' | 'edge' | 'services' | 'data' | 'ai' | 'external' | 'delivery';
  name: string;
  nodes: ArchNode[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** One-line summary for recruiters / non-technical readers. */
  summary: string;
  categories: Category[];
  featured: boolean;
  status: { kind: StatusKind; label: string; note: string };
  period: string;
  links: { label: string; href: string }[];
  repo: string; // visibility statement, never a private URL
  image?: { src: string; alt: string; caption: string };
  overview: string;
  problem: string;
  users: string[];
  role: string;
  stack: { group: string; items: string[] }[];
  features: string[];
  challenges: { title: string; approach: string }[];
  outcomes: string[];
  roadmap: string[];
  architecture?: { summary: string; layers: ArchLayer[] };
}

export const projects: Project[] = [
  // ───────────────────────────────────────────── PromptFlowEngine
  {
    slug: 'promptflowengine',
    name: 'PromptFlowEngine',
    tagline: 'Prompt engineering, security and PromptOps platform for developers and teams',
    summary:
      'One deterministic TypeScript engine that analyses, secures and optimises prompts — shipped as a web workspace, HTTP API, Chrome and VS Code extensions, a CLI and an MCP server.',
    categories: ['AI product', 'Developer tools', 'SaaS'],
    featured: true,
    status: { kind: 'live', label: 'Live', note: 'Public site, workspace and HTTP API live (engine v1.1.0, Nov 2026).' },
    period: 'Aug 2026 – present',
    links: [
      { label: 'promptflowengine.com', href: 'https://promptflowengine.com/' },
      { label: 'Enterprise overview', href: 'https://promptflowengine.com/enterprise' },
    ],
    repo: 'Private repository. The engine, CLI and MCP server are MIT-licensed in the repo.',
    image: {
      src: '/images/promptflowengine.jpg',
      alt: 'PromptFlowEngine homepage with the headline "Engineer better prompts. Connect AI to your codebase."',
      caption: 'Public homepage, captured Nov 2026.',
    },
    overview:
      'PromptFlowEngine turns a rough request plus project context into a structured engineering prompt, and checks every prompt for ambiguity, wasted tokens, prompt-injection patterns, leaked secrets and personal data before it reaches an AI tool. The same engine runs in the browser, the editor, agent hooks, CI and the hosted API.',
    problem:
      'Developers paste prompts into AI tools with missing requirements, excess tokens and sometimes credentials or personal data. Teams adopting AI coding assistants have no consistent way to check prompt quality or enforce a policy before data leaves the machine.',
    users: ['Developers using AI coding assistants', 'Teams that need AI-usage guardrails and governance', 'AI agents calling tools over MCP', 'CI pipelines gating prompt quality'],
    role: 'Sole designer and engineer: product definition, engine design, every client surface, the Cloudflare deployment, the test suites and the CI/CD pipeline.',
    stack: [
      { group: 'Engine', items: ['TypeScript (pure, one dependency)', 'js-tiktoken'] },
      { group: 'Web', items: ['Astro', 'React islands', 'Cloudflare Workers + Static Assets', 'Cloudflare D1'] },
      { group: 'Clients', items: ['Chrome extension', 'VS Code extension', 'CLI', 'MCP server (stdio)'] },
      { group: 'Quality', items: ['Vitest', 'Playwright (website, API, MCP, Chrome, VS Code, security)', 'ESLint', 'pnpm workspaces'] },
      { group: 'Delivery', items: ['GitHub Actions', 'Wrangler versioned deploys', 'Preview → staging → production'] },
    ],
    features: [
      'Prompt analysis, restructuring, optimisation and quality scoring with requirement-preservation checks.',
      'Detection of secrets, personal data and prompt-injection patterns, with local redaction.',
      'Token and cost comparison across models before and after optimisation.',
      'Codebase-aware VS Code workflow that turns a change request into a specification with context, constraints, edge cases, tests and acceptance criteria.',
      'Chrome extension with pre-submit protection on major AI chat sites.',
      'MCP server with 19 read-only tools, and CLI commands for CI gating (`promptflow check`) and agent tool-call guarding.',
      'Public HTTP API that needs no key, plus a browser workspace that needs no sign-up.',
    ],
    challenges: [
      {
        title: 'Identical behaviour on six surfaces',
        approach:
          'All prompt logic lives in one pure-TypeScript package with no Node APIs, so the same code runs in the browser, the Worker, the extensions, the CLI and the MCP server. No surface re-implements a rule.',
      },
      {
        title: 'Privacy without trust assumptions',
        approach:
          'Scanning happens where the prompt is. Servers receive counts and categories only, so prompt text cannot be stored by construction. Model calls are optional and labelled, and are never required.',
      },
      {
        title: 'Shipping safely as a solo developer',
        approach:
          'Every pull request deploys a preview version. Main deploys to staging and runs smoke tests, then production behind a GitHub environment gate, with instant Wrangler rollback.',
      },
    ],
    outcomes: [
      'Live product with web, API, extension, CLI and MCP surfaces, all sharing one engine.',
      'Playwright suites cover the website, HTTP API, MCP server, Chrome and VS Code extensions and security scans.',
    ],
    roadmap: [
      'Self-hosted AI gateway (NestJS, Postgres + pgvector, Redis): built in the repository, not deployed.',
      'Wider enterprise policy and reporting features.',
    ],
    architecture: {
      summary: 'One Cloudflare Worker serves the static Astro site from the edge and runs only for /api/* requests. Every client embeds the same engine package.',
      layers: [
        {
          id: 'clients',
          name: 'Clients',
          nodes: [
            { id: 'pfe-web', label: 'Web workspace', tech: 'Astro + React islands', detail: 'Static site with an in-browser workspace. The engine runs locally in the page, so no prompt is uploaded.' },
            { id: 'pfe-ext', label: 'Chrome extension', tech: 'TypeScript', detail: 'Checks prompts before they are submitted on popular AI chat sites.' },
            { id: 'pfe-vsc', label: 'VS Code extension', tech: 'TypeScript', detail: 'Turns code into prompts, applies guardrails, warns about exposure, installs agent hooks and bundles the MCP server.' },
            { id: 'pfe-cli', label: 'CLI & MCP server', tech: 'Node · stdio', detail: '`promptflow check` gates prompts in CI; `guard` and `mcp-guard` filter agent tool calls. The MCP server exposes 19 read-only tools.' },
          ],
        },
        {
          id: 'edge',
          name: 'Edge',
          nodes: [
            { id: 'pfe-cf', label: 'Cloudflare edge', tech: 'TLS · WAF · cache', detail: 'Static assets are served from the edge cache without invoking the Worker.' },
            { id: 'pfe-worker', label: 'API Worker', tech: 'Cloudflare Workers', detail: 'Runs only for /api/* and applies a rate-limiting binding. The engine and tokenizer run inside the Worker.' },
          ],
        },
        {
          id: 'services',
          name: 'Core',
          nodes: [
            { id: 'pfe-engine', label: 'Prompt engine', tech: 'Pure TypeScript', detail: 'Parse, analyse, optimise, evaluate, compare and restructure. Detects sensitive data and injection patterns, and makes policy and tool-call decisions. Deterministic.' },
          ],
        },
        {
          id: 'data',
          name: 'Data',
          nodes: [
            { id: 'pfe-d1', label: 'D1 databases', tech: 'Cloudflare D1', detail: 'Accounts and enterprise metadata. By design they store counts and categories, never prompt text.' },
          ],
        },
        {
          id: 'ai',
          name: 'AI',
          nodes: [
            { id: 'pfe-models', label: 'Model-agnostic', tech: 'GPT · Claude · Gemini token models', detail: 'No model call is required. Token and cost estimates cover the major model families, and estimates are labelled as such.' },
          ],
        },
        {
          id: 'delivery',
          name: 'Delivery',
          nodes: [
            { id: 'pfe-ci', label: 'CI/CD', tech: 'GitHub Actions + Wrangler', detail: 'Per-PR preview versions, staging on main, smoke tests, a gated production environment and instant rollback.' },
            { id: 'pfe-tests', label: 'Test suites', tech: 'Vitest + Playwright', detail: 'Unit tests plus end-to-end projects for the website, HTTP API, MCP, Chrome, VS Code and security.' },
          ],
        },
      ],
    },
  },

  // ───────────────────────────────────────────── CryptoTalkies
  {
    slug: 'cryptotalkies',
    name: 'CryptoTalkies',
    tagline: 'AI-powered crypto news, education and market-intelligence platform — web and mobile',
    summary:
      'A free crypto intelligence site and Flutter app: live market data, AI signals, sentiment and whale tracking, a multi-provider AI agent, and automated news and education content.',
    categories: ['AI product', 'Mobile', 'SaaS'],
    featured: true,
    status: { kind: 'live', label: 'Live', note: 'Website live and free to use; Android app published on Google Play.' },
    period: '2025 – present',
    links: [
      { label: 'cryptotalkies.net', href: 'https://cryptotalkies.net/' },
      { label: 'Android app (Google Play)', href: 'https://play.google.com/store/apps/details?id=com.cryptotalkies.ct' },
    ],
    repo: 'Private repositories (web and mobile).',
    image: {
      src: '/images/cryptotalkies.jpg',
      alt: 'CryptoTalkies homepage with the headline "Where crypto data becomes intelligence."',
      caption: 'Public homepage, captured Nov 2026.',
    },
    overview:
      'CryptoTalkies connects markets, signals, sentiment, whale activity and AI analysis on one platform. The web app is a statically exported Next.js site backed by Firebase Cloud Functions. The Flutter app shares the same Firebase project and AI functions.',
    problem:
      'Retail crypto learners have to piece together prices, news, sentiment and technical analysis from many sources, often in jargon. CryptoTalkies brings them together with plain-language AI explanations and educational content.',
    users: ['Crypto learners and enthusiasts', 'Mobile users following markets on Android', 'Readers of crypto news and guides'],
    role: 'Sole builder of the web platform, the Flutter app, the Firebase back end, the AI orchestration and the content automation pipelines.',
    stack: [
      { group: 'Web', items: ['Next.js (App Router, static export)', 'React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Lightweight Charts'] },
      { group: 'Mobile', items: ['Flutter', 'Riverpod', 'SQLite', 'Firebase Cloud Messaging', '12 locales'] },
      { group: 'Back end', items: ['Firebase Cloud Functions (Node 22)', 'Firestore', 'Firebase Hosting', 'Cloudflare Workers (edge)'] },
      { group: 'AI', items: ['Anthropic Claude', 'OpenAI', 'Google Gemini', 'Groq'] },
      { group: 'Data & delivery', items: ['CoinGecko', 'CoinMarketCap', 'CryptoPanic', 'GitHub Actions', 'Remotion · FFmpeg (video pipeline)'] },
    ],
    features: [
      'Live prices, rankings and coin sentiment, plus a Fear & Greed index.',
      'AI trading signals from multi-timeframe technical indicators (RSI, MACD, Bollinger Bands).',
      'Whale tracker, AI coin screener, narrative detector, arbitrage scanner and portfolio optimiser.',
      'ARIA, an AI crypto agent that pulls live prices, sentiment and headlines, with fallback across AI providers.',
      'News tagged by AI for likely market impact, a daily AI market brief, guides, a glossary and quizzes.',
      'Flutter app with portfolio tracking, price alerts, push notifications and 12 languages.',
    ],
    challenges: [
      {
        title: 'Reliable AI answers across providers',
        approach:
          'ARIA orchestrates several model providers with a fallback chain, so a provider outage or rate limit degrades the answer instead of failing the request.',
      },
      {
        title: 'One back end, two clients',
        approach:
          'Web and mobile share one Firebase project. Functions are grouped into web and mobile codebases with explicit naming, so each client can be deployed independently while sharing the AI and data functions.',
      },
      {
        title: 'Content at scale without a newsroom',
        approach:
          'Scheduled pipelines ingest news, extract facts, deduplicate and generate articles. Separate pipelines handle SEO monitoring, indexing submissions and short-video generation.',
      },
    ],
    outcomes: [
      'Website live and free to use, with no account required.',
      'Android app published on Google Play.',
      'Large programmatic SEO surface (coin, exchange and guide pages) generated at build time.',
    ],
    roadmap: ['iOS release of the Flutter app.', 'Further personalisation of alerts and briefs.'],
    architecture: {
      summary: 'A statically exported Next.js site and a Flutter app share one Firebase back end. Cloud Functions orchestrate market-data APIs and several AI providers.',
      layers: [
        {
          id: 'clients',
          name: 'Clients',
          nodes: [
            { id: 'ct-web', label: 'Web app', tech: 'Next.js static export', detail: 'Programmatic coin, exchange and guide pages are rendered at build time for speed and SEO. Interactive tools call Functions.' },
            { id: 'ct-app', label: 'Android app', tech: 'Flutter + Riverpod', detail: 'Markets, AI tools, portfolio, alerts and rewards in 12 locales, with local SQLite caching and secure storage.' },
          ],
        },
        {
          id: 'edge',
          name: 'Edge & hosting',
          nodes: [
            { id: 'ct-hosting', label: 'Firebase Hosting', tech: 'CDN', detail: 'Serves the static web build.' },
            { id: 'ct-cf', label: 'Edge worker', tech: 'Cloudflare Workers', detail: 'Edge rules for SEO and crawler hygiene in front of the site.' },
          ],
        },
        {
          id: 'services',
          name: 'Services',
          nodes: [
            { id: 'ct-fn', label: 'Cloud Functions', tech: 'Node 22 (2nd gen)', detail: 'Market data, news aggregation, the arbitrage scanner, alerts, notifications and AI endpoints. Separate web and mobile codebases share one project.' },
            { id: 'ct-aria', label: 'ARIA orchestrator', tech: 'Multi-provider agent', detail: 'Routes a question to tools for prices, sentiment and headlines, then synthesises an answer with fallback across model providers.' },
            { id: 'ct-pipelines', label: 'Content pipelines', tech: 'Scheduled jobs', detail: 'Pipelines for news ingestion and synthesis, SEO monitoring, indexing submissions and short-video rendering.' },
          ],
        },
        {
          id: 'data',
          name: 'Data',
          nodes: [{ id: 'ct-fs', label: 'Firestore', tech: 'Firebase', detail: 'Stores users, portfolios, alerts, cached market data and generated content.' }],
        },
        {
          id: 'ai',
          name: 'AI providers',
          nodes: [{ id: 'ct-llm', label: 'LLMs', tech: 'Claude · OpenAI · Gemini · Groq', detail: 'Used for summaries, analysis and article generation, with a fallback chain.' }],
        },
        {
          id: 'external',
          name: 'External data',
          nodes: [{ id: 'ct-apis', label: 'Market & news APIs', tech: 'CoinGecko · CoinMarketCap · CryptoPanic', detail: 'Supply prices, listings and news. Server-side calls keep API keys out of the clients.' }],
        },
        {
          id: 'delivery',
          name: 'Delivery',
          nodes: [{ id: 'ct-ci', label: 'CI/CD', tech: 'GitHub Actions', detail: 'Workflows for site and Functions deploys, edge deploys, link checks, indexing and growth automation.' }],
        },
      ],
    },
  },

  // ───────────────────────────────────────────── AIYouTubeManager
  {
    slug: 'aiyoutubemanager',
    name: 'AIYouTubeManager',
    tagline: 'Learn anything from YouTube, with AI — roadmaps, notes, quizzes and progress',
    summary:
      'An AI learning layer on top of YouTube: it builds a staged learning roadmap from a goal, matches videos to each stage, and writes notes, quizzes and flashcards from transcripts.',
    categories: ['AI product', 'SaaS'],
    featured: true,
    status: { kind: 'live', label: 'Live', note: 'Live with a 7-day free trial (Google sign-in), then Pro or Premium plans. Mobile app in development.' },
    period: 'Jun 2026 – present',
    links: [{ label: 'aiyoutubemanager.com', href: 'https://aiyoutubemanager.com/' }],
    repo: 'Private repository.',
    image: {
      src: '/images/aiyoutubemanager.jpg',
      alt: 'AIYouTubeManager homepage with the headline "Learn anything. From YouTube. With AI."',
      caption: 'Public homepage, captured Nov 2026.',
    },
    overview:
      'YouTube is a huge free classroom without a syllabus. AIYouTubeManager adds the syllabus: type a goal and get a staged roadmap with weekly estimates, matched videos, AI notes, quizzes and flashcards, and progress tracking. It can optionally read your subscriptions and playlists. It does not download or host videos.',
    problem:
      'Self-learners lose time to unstructured watching, forget what they watched, and cannot tell which of their subscriptions are actually worth their time.',
    users: ['Self-directed learners', 'Professionals upskilling from YouTube content', 'Students preparing for exams or new skills'],
    role: 'Sole architect and developer: .NET back end, Next.js front end, AI integration, AWS infrastructure as code, and the CI/CD and rollback workflows.',
    stack: [
      { group: 'Back end', items: ['.NET 9', 'ASP.NET Core', 'Clean Architecture', 'CQRS / MediatR', 'EF Core', 'FluentValidation', 'Serilog'] },
      { group: 'Data', items: ['PostgreSQL 16', 'pgvector', 'Redis 7'] },
      { group: 'AI', items: ['Anthropic Claude', 'OpenAI embeddings', 'RAG over the user’s channels'] },
      { group: 'Front end', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zustand'] },
      { group: 'Infra', items: ['AWS EC2', 'IIS / Nginx', 'Terraform', 'Docker Compose', 'GitHub Actions'] },
    ],
    features: [
      'Google OAuth sign-in and an optional YouTube connection that imports subscriptions and playlists.',
      'AI learning-roadmap generator with stages, weeks and estimated hours, plus videos matched to each stage.',
      'Per-video AI notes, key concepts, quizzes and flashcards written from the transcript.',
      'AI scoring of subscriptions and an AI-curated knowledge feed. Channels can be archived without unsubscribing.',
      'Semantic search and an AI mentor chat that uses RAG over the user’s channels.',
      'In-app embedded player with watch tracking.',
      'An RSS ingestion worker and a YouTube API quota-budget service.',
    ],
    challenges: [
      {
        title: 'YouTube API quota limits',
        approach:
          'A background worker syncs new videos from YouTube RSS feeds, which cost no quota. A quota-budget service rations Data API calls so the product stays within YouTube’s limits.',
      },
      {
        title: 'Grounded AI answers',
        approach:
          'Videos and channels are embedded into pgvector. The mentor chat retrieves relevant content before generating an answer, instead of relying on the model’s memory.',
      },
      {
        title: 'Repeatable infrastructure',
        approach:
          'Terraform modules and bootstrap define the AWS environment. GitHub Actions run CI, Terraform plan/apply, environment deploys, diagnostics, Lighthouse checks and a rollback workflow.',
      },
    ],
    outcomes: [
      'Live product with a free trial and paid plans.',
      'A clean-architecture .NET solution split into Domain, Application, Infrastructure and API projects, with tests.',
    ],
    roadmap: ['Weekly digest email (Phase 2).', 'Push notifications (Phase 2).', 'Flutter mobile app (in development).'],
    architecture: {
      summary: 'A Next.js client talks to an ASP.NET Core API built on clean-architecture layers. PostgreSQL with pgvector supports retrieval, and Redis caches hot data.',
      layers: [
        {
          id: 'clients',
          name: 'Clients',
          nodes: [
            { id: 'yt-web', label: 'Web app', tech: 'Next.js + React', detail: 'Protected app routes for the dashboard, feed, subscriptions, roadmap and watch page. TanStack Query fetches data and Zustand holds auth state.' },
            { id: 'yt-mobile', label: 'Mobile app', tech: 'Flutter (in development)', detail: 'Mobile client in progress, with its own CI and release workflows.' },
          ],
        },
        {
          id: 'edge',
          name: 'Edge',
          nodes: [{ id: 'yt-proxy', label: 'Reverse proxy', tech: 'IIS / Nginx + TLS', detail: 'Terminates TLS and routes traffic to the API on the EC2 host.' }],
        },
        {
          id: 'services',
          name: 'API',
          nodes: [
            { id: 'yt-api', label: 'ASP.NET Core API', tech: '.NET 9 · CQRS / MediatR', detail: 'Controllers for auth, subscriptions, videos, dashboard and roadmap, with exception middleware, rate limiting and JWT auth.' },
            { id: 'yt-worker', label: 'Background workers', tech: 'BackgroundService', detail: 'RSS ingestion syncs new videos without spending API quota.' },
            { id: 'yt-quota', label: 'Quota budget service', tech: 'C#', detail: 'Tracks and rations YouTube Data API usage.' },
          ],
        },
        {
          id: 'data',
          name: 'Data',
          nodes: [
            { id: 'yt-pg', label: 'PostgreSQL + pgvector', tech: 'EF Core · Npgsql', detail: 'Stores users, channels, videos, subscriptions, watch history and vector embeddings for semantic search.' },
            { id: 'yt-redis', label: 'Redis', tech: 'StackExchange.Redis', detail: 'Caches hot reads.' },
          ],
        },
        {
          id: 'ai',
          name: 'AI',
          nodes: [
            { id: 'yt-claude', label: 'LLM', tech: 'Anthropic Claude', detail: 'Writes summaries, scores channels, generates roadmaps, notes and quizzes, and powers the mentor chat.' },
            { id: 'yt-embed', label: 'Embeddings', tech: 'OpenAI embeddings', detail: 'Vectors for semantic search and RAG.' },
          ],
        },
        {
          id: 'external',
          name: 'External',
          nodes: [{ id: 'yt-google', label: 'Google & YouTube', tech: 'OAuth 2.0 · Data API v3 · RSS', detail: 'Handle sign-in and subscription and playlist import. Videos play in YouTube’s embedded player and are never downloaded.' }],
        },
        {
          id: 'delivery',
          name: 'Delivery',
          nodes: [
            { id: 'yt-tf', label: 'Infrastructure as code', tech: 'Terraform', detail: 'Terraform modules and environments for the AWS infrastructure, with CI checks and apply workflows.' },
            { id: 'yt-gha', label: 'CI/CD', tech: 'GitHub Actions', detail: 'CI, dev and production deploys, diagnostics, Lighthouse and a dedicated rollback workflow.' },
          ],
        },
      ],
    },
  },

  // ───────────────────────────────────────────── MSEW
  {
    slug: 'msew-infra-projects',
    name: 'MSEW Infra Projects',
    tagline: 'Construction operations and RE wall production platform — web portal and Android app',
    summary:
      'Digitises site operations for reinforced-earth (RE) wall construction: geofenced attendance, daily progress reports, production and dispatch, materials, equipment and approvals.',
    categories: ['Domain platform', 'Mobile', 'SaaS'],
    featured: false,
    status: { kind: 'development', label: 'Active development', note: 'Web portal and Android app built and iterating on user feedback (Nov 2026). The public site is currently a placeholder.' },
    period: '2026 – present',
    links: [{ label: 'msewinfraprojects.com', href: 'https://msewinfraprojects.com/' }],
    repo: 'Private repository.',
    overview:
      'Built from a consolidated business requirements document for construction-site operations and RE wall panel production. Super Admins, Admins and project managers use a web portal. Engineers and site staff use an Android app with geofenced check-ins and location capture.',
    problem:
      'Construction sites track attendance, progress, materials, machinery and approvals on paper, phone calls and spreadsheets, so managers see problems days late.',
    users: ['Project managers and coordinators', 'Site engineers and site staff', 'Company administrators'],
    role: 'Designed and built the REST API, the database, the admin portal and the mobile app from the requirements document.',
    stack: [
      { group: 'API', items: ['Node.js 24', 'TypeScript', 'Express 5', 'Scheduler', 'Migrations'] },
      { group: 'Data', items: ['PostgreSQL'] },
      { group: 'Web', items: ['React', 'Vite', 'Leaflet maps'] },
      { group: 'Mobile', items: ['Flutter (Android)', 'Earlier native version: Kotlin, Jetpack Compose, CameraX, WorkManager'] },
      { group: 'Delivery', items: ['GitHub Actions (server, web, Android, mobile)'] },
    ],
    features: [
      'Role-based web portal and mobile app (Super Admin, Admin, PM, Coordinator, Engineer, Site Staff).',
      'Geofenced attendance with location capture about every 15 minutes, and alerts when someone leaves the geofence.',
      'Daily progress reports (DPR) → attendance → work sequence, with approvals and reports.',
      'RE wall panel production, stock thresholds, dispatches, rental machinery, and asset tracking with handover checklists.',
      'Per-site settings with organisation defaults, versioned saves and change history.',
      'In-portal user manual filtered by role, and a Demo Mode that simulates 60 days of site activity.',
    ],
    challenges: [
      {
        title: 'Location accuracy vs battery',
        approach:
          'Location is captured about every 15 minutes and tied to attendance, with a measured 45-minute target for confirmed geofence-exit alerts to administrators.',
      },
      {
        title: 'Per-site rules',
        approach:
          'Hours, attendance rules, geofence policy, thresholds and notifications are configured per site on top of organisation defaults, with versioned saves and change history.',
      },
    ],
    outcomes: ['Web portal and Android app implemented end to end, with demo data and user manuals.'],
    roadmap: ['Public product website.', 'Play Store release of the Flutter app.'],
    architecture: {
      summary: 'A TypeScript Express API with a scheduler serves both the React admin portal and the Flutter field app from one PostgreSQL database.',
      layers: [
        {
          id: 'clients',
          name: 'Clients',
          nodes: [
            { id: 'ms-web', label: 'Admin portal', tech: 'React + Vite + Leaflet', detail: 'Projects, people, attendance maps, production, stock, approvals, reports, site settings and the user manual.' },
            { id: 'ms-app', label: 'Field app', tech: 'Flutter (Android)', detail: 'Check-ins, DPRs, location capture, dispatches and asset handovers for engineers and site staff.' },
          ],
        },
        {
          id: 'services',
          name: 'API',
          nodes: [
            { id: 'ms-api', label: 'REST API', tech: 'Express 5 · TypeScript', detail: 'Role-based endpoints. It also serves the built portal.' },
            { id: 'ms-sched', label: 'Scheduler', tech: 'Node', detail: 'Runs geofence checks, alerts and periodic jobs.' },
          ],
        },
        {
          id: 'data',
          name: 'Data',
          nodes: [{ id: 'ms-pg', label: 'PostgreSQL', tech: 'Migrations', detail: 'Stores projects, sites, people, attendance, production, stock, assets and audit history.' }],
        },
        {
          id: 'delivery',
          name: 'Delivery',
          nodes: [{ id: 'ms-ci', label: 'CI', tech: 'GitHub Actions', detail: 'Separate workflows for the server, web, native Android and Flutter mobile builds.' }],
        },
      ],
    },
  },

  // ───────────────────────────────────────────── AI PDF Scanner
  {
    slug: 'ai-pdf-scanner',
    name: 'AI PDF Scanner',
    tagline: 'Private, fully offline document scanner with OCR in English, Tamil and Hindi',
    summary:
      'An Android scanner that does everything on the device — capture, enhancement, OCR, searchable PDFs, encrypted storage and offline voice editing. The release build has no internet permission.',
    categories: ['Mobile', 'AI product'],
    featured: false,
    status: { kind: 'live', label: 'On Google Play', note: 'Published on Google Play as com.vpailabs.aipdfscanner (from 8 Nov 2026).' },
    period: 'Nov 2026 – present',
    links: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.vpailabs.aipdfscanner' },
      { label: 'Privacy policy', href: 'https://vijayrajpalanisamy88.github.io/ai-pdf-scanner-privacy/' },
    ],
    repo: 'Private repository. The privacy policy is public.',
    overview:
      'A scanner for people who do not want their documents in someone else’s cloud. The app captures pages, detects edges, enhances images, runs OCR, builds searchable PDFs and stores everything encrypted on the phone. It has no backend, no account and no network access.',
    problem:
      'Popular scanner apps upload documents to remote servers and often handle Indian languages poorly. Many users scan IDs, financial and medical papers that should never leave the device.',
    users: ['Privacy-conscious Android users', 'People scanning Tamil, Hindi and English documents', 'Small offices handling sensitive paperwork'],
    role: 'Requirements (BRD), architecture, the Flutter UI, the Kotlin native modules, testing on physical devices, and the Play release.',
    stack: [
      { group: 'App', items: ['Flutter / Dart', 'Kotlin native modules', 'Platform channels'] },
      { group: 'Imaging & OCR', items: ['CameraX', 'OpenCV', 'Tesseract (English, Tamil, Hindi)'] },
      { group: 'Storage & security', items: ['SQLCipher', 'FTS5 full-text search', 'Encrypted blob vault', 'Android Keystore'] },
      { group: 'Testing', items: ['Flutter integration tests', 'Instrumentation tests', 'Physical-device suites'] },
    ],
    features: [
      'Camera capture with edge detection, perspective correction and filters.',
      'On-device OCR in English, Tamil and Hindi, with searchable PDF export.',
      'Encrypted document storage and encrypted backup and restore.',
      'Offline voice-controlled editing in the same three languages.',
      'Duplicate and near-duplicate detection, and sharing through the system share sheet.',
      'Release build ships without the INTERNET permission.',
    ],
    challenges: [
      {
        title: 'Shipping 630 MB of models through Play',
        approach:
          'The OCR and voice models go in an install-time asset pack, so Play installs them with the app. Nothing downloads at runtime and the app stays fully offline.',
      },
      {
        title: 'No plaintext on disk',
        approach:
          'Camera frames arrive in memory and are encrypted into a vault immediately. Records and the full-text index live in SQLCipher, and exports are built as temporary encrypted blobs.',
      },
      {
        title: 'Testable native core',
        approach:
          'The native ScannerCore has no Flutter dependency, so instrumentation tests call it directly. A typed channel contract keeps a future iOS port free of Dart changes.',
      },
    ],
    outcomes: ['Published on Google Play.', 'Automated suites pass on a physical test phone (Samsung Galaxy A33).'],
    roadmap: ['iOS version that implements the same channel contract in Swift.'],
    architecture: {
      summary: 'A Flutter UI sits over a Kotlin native core. Everything stays on the device and nothing crosses a network boundary.',
      layers: [
        {
          id: 'clients',
          name: 'UI (Dart)',
          nodes: [
            { id: 'sc-ui', label: 'Screens & services', tech: 'Flutter', detail: 'Screens, document operations, a persisted OCR job queue and text-layer alignment.' },
            { id: 'sc-repo', label: 'Repository', tech: 'SQLCipher', detail: 'Owns all SQL, schema migrations and backup restore.' },
          ],
        },
        {
          id: 'services',
          name: 'Native core (Kotlin)',
          nodes: [
            { id: 'sc-cam', label: 'Camera', tech: 'CameraX', detail: 'Delivers JPEG frames in memory, so nothing is written as plaintext.' },
            { id: 'sc-img', label: 'Imaging', tech: 'OpenCV', detail: 'Edge detection, perspective warp, filters and thumbnails.' },
            { id: 'sc-ocr', label: 'OCR', tech: 'Tesseract', detail: 'English, Tamil and Hindi recognition, with deskewing.' },
            { id: 'sc-pdf', label: 'PDF tools', tech: 'Kotlin', detail: 'Builds searchable PDFs, imports, renders and verifies.' },
          ],
        },
        {
          id: 'data',
          name: 'Device storage',
          nodes: [{ id: 'sc-vault', label: 'Encrypted vault', tech: 'Stream cipher + Keystore', detail: 'Encrypts images and exports. Keys are managed by the device keystore.' }],
        },
      ],
    },
  },

  // ───────────────────────────────────────────── Land intelligence
  {
    slug: 'land-price-intelligence',
    name: 'Land Price Intelligence',
    tagline: 'Land research for buyers and investors — comparable sales, guideline values and infrastructure context',
    summary:
      'For any plot, shows seller asking prices, actual nearby sale prices and government guideline values separately, plus an evidence-based estimate range that refuses to guess when data is thin.',
    categories: ['Domain platform', 'SaaS', 'Mobile'],
    featured: false,
    status: { kind: 'demo', label: 'Working demo', note: 'End-to-end demo for Karnataka. All plot, price and project data is synthetic, and no forecasting model is published.' },
    period: 'Dec 2025 – present',
    links: [],
    repo: 'Private repository.',
    overview:
      'A research tool that keeps three different numbers apart: what sellers ask, what nearby land actually sold for, and the government guideline value. Each is shown with its source and date. Estimates come from comparable registered sales, and the app says “insufficient data” rather than inventing a figure.',
    problem:
      'Land buyers in India rely on asking prices and hearsay. Real transaction evidence, guideline values and upcoming infrastructure are scattered across sources.',
    users: ['Individual land buyers', 'Small investors', 'Advisers doing due diligence'],
    role: 'Product definition, valuation logic, back end, web front end and mobile app.',
    stack: [
      { group: 'Back end', items: ['Python', 'FastAPI', 'SQLModel', 'SQLite (default)', 'Stripe (demo billing mode)'] },
      { group: 'Web', items: ['React', 'Vite', 'Tailwind CSS', 'Leaflet'] },
      { group: 'Mobile', items: ['Flutter (Android, iOS)'] },
      { group: 'Testing', items: ['pytest', 'Playwright', 'Shared cross-language fixtures'] },
    ],
    features: [
      'Plot view with asking price, comparable sales and guideline value, each labelled with source and date.',
      'Estimate range from comparable sales, or an explicit “Insufficient data for a reliable estimate”.',
      'Locality price history and nearby infrastructure projects with their stage.',
      'Acquisition-cost, loan EMI and net-return calculators, plus user-chosen growth scenarios.',
      'Karnataka due-diligence checklist, comparison of up to four plots, a watchlist, saved searches and alerts.',
    ],
    challenges: [
      {
        title: 'Honest estimates',
        approach:
          'The comparable-sales model is backtested and reports an evaluation. Below an evidence threshold it declines to estimate.',
      },
      {
        title: 'One loan engine in three languages',
        approach:
          'The Python, JavaScript and Dart loan engines are all checked against a shared fixtures file, so web, mobile and API produce identical amortisation results.',
      },
    ],
    outcomes: ['Working end-to-end demo across API, web and mobile, with automated tests.'],
    roadmap: ['Real transaction and guideline-value data sources.', 'AI price-prediction models, only once backtests justify publishing them.'],
  },


  // ───────────────────────────────────────────── In development
  {
    slug: 'ai-sales-hub',
    name: 'AI Sales Hub',
    tagline: 'Multi-product AI sales and marketing agents with human approval on every external action',
    summary:
      'AI agents research, analyse, update an internal CRM and draft outreach. Nothing leaves the system without human approval and an evidence-based readiness gate.',
    categories: ['AI product', 'SaaS'],
    featured: false,
    status: { kind: 'development', label: 'Early development', note: 'Started Nov 2026. Sprint 3 delivered a durable agent runner, a metered AI gateway and the first Lead Discovery agent.' },
    period: 'Nov 2026 – present',
    links: [],
    repo: 'Private repository.',
    overview:
      'An agentic system designed around safety from the start. Agents may act internally, but every external action requires a person to approve it after passing an evidence-based readiness gate. AI usage goes through a metered gateway.',
    problem: 'Running sales and marketing for several products as a solo builder, without letting autonomous agents send unchecked messages.',
    users: ['Product owners running multi-product sales and marketing'],
    role: 'Architecture and implementation.',
    stack: [
      { group: 'Back end', items: ['ASP.NET Core 10 (minimal APIs)', 'ASP.NET Identity + MFA', 'EF Core + Npgsql', 'PostgreSQL 18'] },
      { group: 'Front end', items: ['React 19', 'TypeScript', 'Tailwind 4', 'Vite'] },
      { group: 'Quality', items: ['xUnit', 'Integration tests on real PostgreSQL', 'Playwright', 'GitHub Actions'] },
    ],
    features: ['Durable agent runner.', 'Metered AI gateway.', 'Lead Discovery agent.', 'Product-scoped authorisation and an audit log.'],
    challenges: [
      {
        title: 'Autonomy with accountability',
        approach: 'The domain layer encodes the readiness policy and sales gate as pure rules, so no code path can send an external action without approval.',
      },
    ],
    outcomes: ['Core platform and the first agent implemented and tested.'],
    roadmap: ['More specialised agents.', 'Analytics and cost reporting.'],
  },
  {
    slug: 'offline-voice-translator',
    name: 'Offline AI Voice Translator',
    tagline: 'Two-way speech translation that runs entirely on the phone',
    summary: 'English, Hindi and Tamil speech recognition, translation and speech output in airplane mode, with no internet permission in the strict release build.',
    categories: ['Mobile', 'AI product'],
    featured: false,
    status: { kind: 'development', label: 'In development', note: 'Preparing Play Store assets (Nov 2026).' },
    period: 'Nov 2026 – present',
    links: [],
    repo: 'Private repository.',
    overview: 'A privacy-first translator for conversations where connectivity or privacy is a concern. All speech and translation models run on the device.',
    problem: 'Conversation translators usually need the cloud, which fails offline and sends private conversations to servers.',
    users: ['Travellers', 'Field workers', 'Families speaking different languages'],
    role: 'Architecture, model selection and licensing review, Flutter and Kotlin implementation.',
    stack: [
      { group: 'App', items: ['Flutter', 'Riverpod', 'go_router', 'Material 3'] },
      { group: 'On-device AI', items: ['sherpa-onnx (VAD, ASR)', 'ONNX Runtime (Marian MT)', 'Android offline TTS', 'Tesseract OCR'] },
      { group: 'Storage', items: ['SQLCipher', 'Android Keystore'] },
    ],
    features: ['Two-way speech translation in English, Hindi and Tamil.', 'Signed, side-loaded language packs.', 'Opt-in, encrypted history.'],
    challenges: [{ title: 'Models on a phone', approach: 'Compact ONNX models, a device benchmark plan and a model licence matrix were done before implementation.' }],
    outcomes: ['Working app in development.'],
    roadmap: ['Google Play release.', 'More languages.'],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const allCategories: Category[] = ['AI product', 'SaaS', 'Mobile', 'Developer tools', 'Domain platform'];
