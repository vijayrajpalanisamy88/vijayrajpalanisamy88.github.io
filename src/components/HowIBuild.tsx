import { useEffect, useState } from 'react';
import { aiLifecycle, sdlc } from '../data/journey';
import { Link } from '../lib/router';
import { Section } from './Section';

function LifecycleStepper() {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => {
      if (document.documentElement.classList.contains('reduce-motion') || document.hidden) return;
      setI((n) => (n + 1) % sdlc.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [auto]);

  const stage = sdlc[i];
  return (
    <div className="glass reveal mt-10 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">Delivery lifecycle</h3>
        <span className="chip !text-ok">Established practice · 15+ years</span>
      </div>
      <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" aria-label="Lifecycle stages">
        {sdlc.map((s, idx) => {
          const active = idx === i;
          return (
            <li key={s.id} className="relative">
              <button
                type="button"
                onClick={() => {
                  setAuto(false);
                  setI(idx);
                }}
                aria-current={active ? 'step' : undefined}
                className={`flex h-full min-h-[4.5rem] w-full flex-col justify-center rounded-xl border px-3 py-2 text-left transition ${active ? 'border-accent bg-[color-mix(in_srgb,var(--accent)_16%,transparent)]' : 'border-line bg-surface-2 hover:border-line-strong'}`}
              >
                <span className="font-mono text-[11px] text-faint">{String(idx + 1).padStart(2, '0')}</span>
                <span className="font-semibold text-fg">{s.name}</span>
                <span className="text-xs text-muted">{s.short}</span>
              </button>
              {idx < sdlc.length - 1 && (
                <span className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-faint lg:block" aria-hidden="true">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-line bg-surface-2 p-5 sm:flex-row sm:items-start sm:justify-between" aria-live="polite">
        <div>
          <p className="font-semibold text-fg">
            {stage.name} — {stage.short}
          </p>
          <ul className="prose-list mt-2 space-y-1 text-sm text-muted">
            {stage.activities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <button type="button" className="btn btn-ghost !min-h-9 shrink-0 !px-3 !text-xs" onClick={() => setAuto((a) => !a)} aria-pressed={!auto}>
          {auto ? 'Pause auto-play' : 'Resume auto-play'}
        </button>
      </div>
      <p className="mt-4 text-sm text-faint">The loop repeats: what I learn in Operate feeds the next Understand.</p>
    </div>
  );
}

function AiLifecycle() {
  return (
    <div className="glass reveal mt-6 p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">AI-native lifecycle: how AI fits into the work</h3>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="chip !text-accent-2">● Practised: Plate Maestro and my products</span>
          <span className="chip !text-warn">◌ Experimental: my own products only</span>
        </div>
      </div>
      <p className="mt-2 max-w-3xl text-sm text-muted">
        AI speeds up each stage, but the specification and the people stay in charge. The AI column describes assistance, not autonomy, except
        in the last row, which is still experimental.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-separate border-spacing-y-2 text-left text-sm">
          <thead className="font-mono text-[11px] uppercase tracking-wider text-faint">
            <tr>
              <th scope="col" className="px-3">Step</th>
              <th scope="col" className="px-3">Engineer</th>
              <th scope="col" className="px-3">AI assistance</th>
              <th scope="col" className="px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {aiLifecycle.map((s) => (
              <tr key={s.name} className="bg-surface-2">
                <th scope="row" className="rounded-l-xl px-3 py-3 font-semibold text-fg">{s.name}</th>
                <td className="px-3 py-3 text-muted">{s.human}</td>
                <td className="px-3 py-3 text-muted">{s.ai}</td>
                <td className="rounded-r-xl px-3 py-3">
                  {s.maturity === 'practised' ? <span className="text-accent-2">● Practised</span> : <span className="text-warn">◌ Experimental</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const decisions = [
  {
    slug: 'promptflowengine',
    product: 'PromptFlowEngine',
    title: 'One engine, edge-hosted, no prompt storage',
    points: [
      'Context: the same prompt rules are needed in a browser, editor, CLI, agents and an API.',
      'Decision: one pure-TypeScript engine package; one Cloudflare Worker serves the static site and runs only for /api/*.',
      'Rejected: Pages + Functions (a second routing model) and a separate backend (the product has no server-side prompt state).',
      'Result: per-PR previews, a gated production deploy, instant rollback, and server-side metadata only.',
    ],
  },
  {
    slug: 'aiyoutubemanager',
    product: 'AIYouTubeManager',
    title: 'Clean-architecture .NET with quota-aware ingestion',
    points: [
      'Context: YouTube Data API quota is too small to poll every channel for every user.',
      'Decision: a background worker syncs new videos from RSS feeds at zero quota; a budget service rations Data API calls.',
      'Retrieval: pgvector embeddings in the same PostgreSQL database keep RAG simple to operate.',
      'Delivery: Terraform for AWS, with GitHub Actions for CI, deploys, Lighthouse and a dedicated rollback workflow.',
    ],
  },
];

export function HowIBuild() {
  return (
    <Section
      id="build"
      eyebrow="how i build software"
      title="Specification first. Automated all the way to production."
      lead="The same lifecycle I use at work and on my own products, plus where AI fits into it — with practised steps clearly separated from experimental ones."
    >
      <LifecycleStepper />
      <AiLifecycle />
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {decisions.map((d, i) => (
          <article key={d.slug} className="glass reveal card-hover p-6" style={{ ['--d' as string]: `${i * 80}ms` }}>
            <p className="eyebrow">architecture case study · {d.product}</p>
            <h3 className="mt-2 text-lg font-semibold">{d.title}</h3>
            <ul className="prose-list mt-3 space-y-2 text-sm text-muted">
              {d.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link to={`/projects/${d.slug}/`} className="link mt-4 inline-block text-sm">
              Full case study →
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
