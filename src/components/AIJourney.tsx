import { useState } from 'react';
import { journey, type JourneyKind } from '../data/journey';
import { Section } from './Section';

const kindLabel: Record<JourneyKind, string> = { professional: 'Professional', product: 'My products', learning: 'Learning' };
const kindTone: Record<JourneyKind, string> = { professional: 'var(--accent)', product: 'var(--accent-2)', learning: 'var(--warn)' };

const topics = [
  'Generative AI & LLMs',
  'RAG & semantic retrieval',
  'Prompt engineering & PromptOps',
  'Model Context Protocol',
  'AI agents with human approval',
  'AI security & guardrails',
  'AI-assisted programming',
  'Specification-driven development',
  'On-device AI',
];

export function AIJourney() {
  const [kind, setKind] = useState<JourneyKind | 'all'>('all');
  const items = journey.filter((m) => kind === 'all' || m.kind === kind);

  return (
    <Section
      id="ai"
      eyebrow="ai engineering journey"
      title="From enterprise RAG to agents and on-device AI"
      lead="How my AI work has grown, step by step. Professional delivery, my own products and ongoing learning are labelled separately."
    >
      <ul className="reveal mt-8 flex flex-wrap gap-2" aria-label="Focus areas">
        {topics.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>

      <div role="group" aria-label="Filter milestones" className="reveal mt-8 flex flex-wrap gap-2">
        <button type="button" className="chip-btn" aria-pressed={kind === 'all'} onClick={() => setKind('all')}>
          All
        </button>
        {(Object.keys(kindLabel) as JourneyKind[]).map((k) => (
          <button key={k} type="button" className="chip-btn" aria-pressed={kind === k} onClick={() => setKind(k)}>
            <span className="h-2 w-2 rounded-full" style={{ background: kindTone[k] }} aria-hidden="true" />
            {kindLabel[k]}
          </button>
        ))}
      </div>

      <ol className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((m, i) => (
          <li key={m.title} className="glass reveal card-hover relative overflow-hidden p-6" style={{ ['--d' as string]: `${(i % 2) * 70}ms` }}>
            <span className="absolute inset-y-0 left-0 w-1" style={{ background: kindTone[m.kind] }} aria-hidden="true" />
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs text-faint">{m.when}</span>
              <span className="text-xs font-semibold" style={{ color: kindTone[m.kind] }}>
                {kindLabel[m.kind]}
              </span>
            </div>
            <h3 className="mt-2 text-lg font-semibold">{m.title}</h3>
            <p className="mt-2 text-sm text-muted">{m.text}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Topics">
              {m.topics.map((t) => (
                <li key={t} className="chip !py-0.5 !text-[11px]">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
