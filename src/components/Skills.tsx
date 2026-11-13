import { useMemo, useState } from 'react';
import { evidenceLabels, skillGroups, type Evidence } from '../data/skills';
import { Section } from './Section';

const evidenceStyle: Record<Evidence, string> = {
  production: 'border-[color-mix(in_srgb,var(--accent)_55%,transparent)] bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]',
  projects: 'border-[color-mix(in_srgb,var(--accent-2)_50%,transparent)] bg-[color-mix(in_srgb,var(--accent-2)_10%,transparent)]',
  learning: 'border-dashed border-[color-mix(in_srgb,var(--warn)_60%,transparent)] bg-transparent',
};
const dot: Record<Evidence, string> = { production: 'bg-accent', projects: 'bg-accent-2', learning: 'bg-warn' };

export function Skills() {
  const [group, setGroup] = useState<string>('all');
  const [evidence, setEvidence] = useState<Evidence | 'all'>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const groups = useMemo(
    () =>
      skillGroups
        .filter((g) => group === 'all' || g.id === group)
        .map((g) => ({ ...g, skills: g.skills.filter((s) => evidence === 'all' || s.evidence === evidence) }))
        .filter((g) => g.skills.length > 0),
    [group, evidence],
  );

  const counts = useMemo(() => {
    const all = skillGroups.flatMap((g) => g.skills);
    return {
      production: all.filter((s) => s.evidence === 'production').length,
      projects: all.filter((s) => s.evidence === 'projects').length,
      learning: all.filter((s) => s.evidence === 'learning').length,
    };
  }, []);

  return (
    <Section
      id="skills"
      eyebrow="skills"
      title="Skills, by evidence — not by star ratings"
      lead="No made-up proficiency percentages. Each skill shows where it was used: in employment, in my own products, or as current learning. Select a skill to see where."
    >
      <div className="reveal mt-10 flex flex-col gap-4">
        <div role="group" aria-label="Filter skills by category" className="flex flex-wrap gap-2">
          <button type="button" className="chip-btn" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>
            All categories
          </button>
          {skillGroups.map((g) => (
            <button key={g.id} type="button" className="chip-btn" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
              {g.name}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Filter skills by evidence" className="flex flex-wrap gap-2">
          <button type="button" className="chip-btn" aria-pressed={evidence === 'all'} onClick={() => setEvidence('all')}>
            All evidence
          </button>
          {(Object.keys(evidenceLabels) as Evidence[]).map((e) => (
            <button key={e} type="button" className="chip-btn" aria-pressed={evidence === e} onClick={() => setEvidence(e)} title={evidenceLabels[e].description}>
              <span className={`h-2 w-2 rounded-full ${dot[e]}`} aria-hidden="true" />
              {evidenceLabels[e].label} <span>({counts[e]})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2" aria-live="polite">
        {groups.map((g, gi) => (
          <article key={g.id} className="glass reveal card-hover p-6" style={{ ['--d' as string]: `${(gi % 2) * 80}ms` }}>
            <h3 className="text-lg font-semibold">{g.name}</h3>
            <p className="mt-1 text-sm text-muted">{g.blurb}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.skills.map((s) => {
                const key = `${g.id}:${s.name}`;
                const isSel = selected === key;
                return (
                  <li key={s.name}>
                    <button
                      type="button"
                      onClick={() => setSelected(isSel ? null : key)}
                      aria-expanded={isSel}
                      className={`inline-flex min-h-9 items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-fg transition hover:brightness-110 ${evidenceStyle[s.evidence]} ${isSel ? 'ring-2 ring-accent-2' : ''}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${dot[s.evidence]}`} aria-hidden="true" />
                      {s.name}
                      <span className="sr-only">({evidenceLabels[s.evidence].label})</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {g.skills.some((s) => selected === `${g.id}:${s.name}`) &&
              (() => {
                const s = g.skills.find((x) => selected === `${g.id}:${x.name}`)!;
                return (
                  <div className="mt-4 rounded-xl border border-line bg-surface-2 p-4 text-sm" role="status">
                    <p>
                      <span className="font-semibold text-fg">{s.name}</span>{' '}
                      <span className="text-faint">· {evidenceLabels[s.evidence].description}</span>
                    </p>
                    <p className="mt-2 text-muted">
                      Used in: <span className="text-fg">{s.usedIn.join(', ')}</span>
                    </p>
                  </div>
                );
              })()}
          </article>
        ))}
      </div>

      <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-faint">
        {(Object.keys(evidenceLabels) as Evidence[]).map((e) => (
          <span key={e} className="inline-flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${dot[e]}`} aria-hidden="true" />
            <strong className="font-medium text-muted">{evidenceLabels[e].label}</strong> — {evidenceLabels[e].description}
          </span>
        ))}
      </p>
    </Section>
  );
}
