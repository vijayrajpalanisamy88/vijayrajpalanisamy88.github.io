import { projects, type Project } from '../data/projects';
import { Link } from '../lib/router';
import { ArchitectureDiagram } from './ArchitectureExplorer';
import { StatusBadge } from './StatusBadge';
import { Icon } from './Icon';

function Block({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="reveal" aria-labelledby={`cs-${n}`}>
      <h2 id={`cs-${n}`} className="flex items-baseline gap-3 text-xl font-semibold tracking-tight">
        <span className="font-mono text-sm text-accent-2">{String(n).padStart(2, '0')}</span>
        {title}
      </h2>
      <div className="mt-3 text-muted">{children}</div>
    </section>
  );
}

export function ProjectPage({ project: p }: { project: Project }) {
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  let n = 0;

  return (
    <article className="pb-24 pt-10 sm:pt-14" aria-labelledby="project-title">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="text-sm text-faint">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/" className="hover:text-fg">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/#projects" className="hover:text-fg">Projects</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-muted">{p.name}</li>
          </ol>
        </nav>

        <header className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge kind={p.status.kind} label={p.status.label} />
              {p.categories.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
            <h1 id="project-title" className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="gradient-text">{p.name}</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-accent-2">{p.tagline}</p>
            <p className="lead">{p.summary}</p>
            <p className="mt-4 text-sm text-faint">
              <strong className="text-muted">Status:</strong> {p.status.note} · <strong className="text-muted">Period:</strong> {p.period} ·{' '}
              <strong className="text-muted">Source:</strong> {p.repo}
            </p>
            {p.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {p.links.map((l, i) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={`btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}`}>
                    {l.label} <Icon name="external" size={15} />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          {p.image ? (
            <figure className="glass overflow-hidden">
              <img src={p.image.src} alt={p.image.alt} width={1280} height={720} className="aspect-[16/9] w-full object-cover object-top" fetchPriority="high" />
              <figcaption className="border-t border-line px-4 py-2 text-xs text-faint">{p.image.caption}</figcaption>
            </figure>
          ) : (
            <div className="glass grid aspect-[16/9] place-items-center p-6 text-center">
              <div>
                <Icon name={p.categories.includes('Mobile') ? 'phone' : p.categories.includes('Enterprise') ? 'shield' : 'layers'} size={40} className="mx-auto text-accent-2" />
                <p className="mt-3 text-sm text-faint">
                  {p.categories.includes('Enterprise')
                    ? 'Confidential enterprise work. No screenshots are published.'
                    : 'Screenshots are not published yet. The architecture is shown below.'}
                </p>
              </div>
            </div>
          )}
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-12">
            <Block n={++n} title="Overview">
              <p>{p.overview}</p>
            </Block>
            <Block n={++n} title="The problem">
              <p>{p.problem}</p>
            </Block>
            <Block n={++n} title="Who it is for">
              <ul className="prose-list space-y-1.5">{p.users.map((u) => <li key={u}>{u}</li>)}</ul>
            </Block>
            <Block n={++n} title="My role">
              <p>{p.role}</p>
            </Block>
            <Block n={++n} title="Implemented features">
              <ul className="prose-list space-y-2">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            </Block>
            {p.architecture && (
              <Block n={++n} title="System architecture">
                <p className="mb-5">{p.architecture.summary}</p>
                <ArchitectureDiagram project={p} compact />
              </Block>
            )}
            <Block n={++n} title="Engineering challenges and approaches">
              <div className="grid gap-4">
                {p.challenges.map((c) => (
                  <div key={c.title} className="glass p-5">
                    <h3 className="font-semibold text-fg">{c.title}</h3>
                    <p className="mt-2 text-sm">{c.approach}</p>
                  </div>
                ))}
              </div>
            </Block>
            <Block n={++n} title="Outcomes and current status">
              <ul className="prose-list space-y-1.5">{p.outcomes.map((o) => <li key={o}>{o}</li>)}</ul>
              <p className="mt-3 text-sm text-faint">No usage or revenue numbers are published here unless I can verify them.</p>
            </Block>
            {p.roadmap.length > 0 && (
              <Block n={++n} title="Roadmap (not yet shipped)">
                <div className="rounded-xl border border-dashed border-[color-mix(in_srgb,var(--warn)_50%,transparent)] p-5">
                  <ul className="prose-list space-y-1.5">{p.roadmap.map((r) => <li key={r}>{r}</li>)}</ul>
                </div>
              </Block>
            )}
          </div>

          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            <div className="glass p-5">
              <h2 className="eyebrow">Technology stack</h2>
              <dl className="mt-4 space-y-4">
                {p.stack.map((g) => (
                  <div key={g.group}>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-faint">{g.group}</dt>
                    <dd className="mt-1.5 flex flex-wrap gap-1.5">
                      {g.items.map((i) => (
                        <span key={i} className="chip !py-0.5 !text-[11px]">{i}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <Link to={`/projects/${next.slug}/`} className="glass card-hover block p-5">
              <span className="text-xs text-faint">Next case study</span>
              <span className="mt-1 flex items-center justify-between font-semibold text-fg">
                {next.name} <Icon name="arrowRight" size={16} />
              </span>
            </Link>
            <Link to="/#projects" className="btn btn-ghost w-full">
              <Icon name="arrowLeft" size={16} /> All projects
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
