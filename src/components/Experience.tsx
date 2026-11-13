import { useState } from 'react';
import { experience } from '../data/experience';
import { Section } from './Section';
import { Icon } from './Icon';

export function Experience() {
  const [open, setOpen] = useState<string>(experience[0].id);

  return (
    <Section
      id="experience"
      eyebrow="experience"
      title="Career timeline"
      lead="Titles and dates exactly as on my resume. Enterprise work is described only at the level my resume already states publicly."
    >
      <ol className="relative mt-12 space-y-6 border-l border-line pl-6 sm:pl-10">
        <span
          className="anim-grow absolute -left-px top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-3 to-transparent"
          aria-hidden="true"
        />
        {experience.map((r, i) => {
          const isOpen = open === r.id;
          return (
            <li key={r.id} className="reveal relative" style={{ ['--d' as string]: `${i * 60}ms` }}>
              <span
                className={`absolute -left-[31px] top-6 grid h-4 w-4 place-items-center rounded-full border-2 sm:-left-[47px] ${r.end === null ? 'border-ok bg-ok/30' : 'border-accent bg-bg'}`}
                aria-hidden="true"
              />
              <article className="glass card-hover overflow-hidden">
                <h3>
                  <button
                    type="button"
                    className="flex w-full flex-col gap-2 p-5 text-left sm:flex-row sm:items-center sm:justify-between sm:p-6"
                    aria-expanded={isOpen}
                    aria-controls={`role-${r.id}`}
                    onClick={() => setOpen(isOpen ? '' : r.id)}
                  >
                    <span>
                      <span className="block text-lg font-semibold text-fg">{r.title}</span>
                      <span className="block text-muted">
                        {r.company} · {r.location}
                      </span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="chip font-mono">{r.period}</span>
                      <Icon name="arrowRight" size={16} className={`text-faint transition ${isOpen ? 'rotate-90' : ''}`} />
                    </span>
                  </button>
                </h3>
                <div id={`role-${r.id}`} hidden={!isOpen} className="border-t border-line px-5 pb-6 pt-4 sm:px-6">
                  <p className="text-sm font-medium text-accent-2">{r.domain}</p>
                  <p className="mt-2 text-muted">{r.summary}</p>
                  <ul className="prose-list mt-4 space-y-2 text-[15px] text-muted">
                    {r.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  {r.metrics && (
                    <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                      {r.metrics.map((m) => (
                        <div key={m.label} className="rounded-xl border border-line bg-surface-2 p-4">
                          <dt className="text-sm text-muted">{m.label}</dt>
                          <dd className="order-first text-2xl font-semibold text-fg">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                    {r.tech.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
