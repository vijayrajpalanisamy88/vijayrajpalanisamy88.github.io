import { useMemo, useState } from 'react';
import { allCategories, projects, type Category, type Project } from '../data/projects';
import { Link } from '../lib/router';
import { Section } from './Section';
import { StatusBadge } from './StatusBadge';
import { Icon } from './Icon';
import { ArchitectureExplorer } from './ArchitectureExplorer';

const techFilters = ['.NET', 'TypeScript', 'React', 'Flutter', 'PostgreSQL', 'Cloudflare', 'Firebase', 'AWS', 'Python'];
const matchesTech = (p: Project, t: string) => p.stack.some((g) => g.items.some((i) => i.toLowerCase().includes(t.toLowerCase())));

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const big = p.featured;
  return (
    <article
      className={`glass reveal card-hover group flex flex-col overflow-hidden ${big ? 'md:col-span-2 lg:col-span-1' : ''}`}
      style={{ ['--d' as string]: `${(index % 3) * 70}ms` }}
      data-testid="project-card"
      data-slug={p.slug}
    >
      {p.image ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-bg-2">
          <img
            src={p.image.src}
            alt={p.image.alt}
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
          />
          {p.featured && <span className="chip absolute left-3 top-3 !bg-[var(--surface-solid)] !text-fg">★ Featured</span>}
        </div>
      ) : (
        <div className="relative flex aspect-[16/9] flex-col justify-between overflow-hidden border-b border-line bg-[radial-gradient(circle_at_85%_0%,var(--glow),transparent_55%)] p-5">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line-strong bg-surface-solid text-accent-2" aria-hidden="true">
            <Icon name={p.categories.includes('Enterprise') ? 'shield' : p.categories[0] === 'Mobile' || p.slug.includes('scanner') || p.slug.includes('translator') ? 'phone' : p.categories.includes('AI product') ? 'sparkles' : 'layers'} size={24} />
          </span>
          <div>
            <span className="block text-lg font-semibold tracking-tight text-fg/90">{p.name}</span>
            <span className="mt-1 block font-mono text-[11px] text-faint">{p.stack.slice(0, 3).map((s) => s.items[0]).join(' · ')}</span>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge kind={p.status.kind} label={p.status.label} title={p.status.note} />
          <span className="font-mono text-xs text-faint">{p.period}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          <Link to={`/projects/${p.slug}/`} className="hover:text-accent">
            {p.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-accent-2">{p.tagline}</p>
        <p className="mt-3 text-[15px] text-muted">{p.summary}</p>

        {open && (
          <div id={`quick-${p.slug}`} className="mt-4 space-y-3 rounded-xl border border-line bg-surface-2 p-4 text-sm">
            <p>
              <span className="font-semibold text-fg">Problem: </span>
              <span className="text-muted">{p.problem}</span>
            </p>
            <p>
              <span className="font-semibold text-fg">My role: </span>
              <span className="text-muted">{p.role}</span>
            </p>
            <ul className="prose-list space-y-1 text-muted">
              {p.features.slice(0, 3).map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Key technologies">
          {p.stack
            .flatMap((g) => g.items)
            .slice(0, 6)
            .map((t) => (
              <li key={t} className="chip !py-0.5 !text-[11px]">
                {t}
              </li>
            ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <Link to={`/projects/${p.slug}/`} className="btn btn-primary !min-h-10 !px-4">
            Case study <Icon name="arrowRight" size={15} />
          </Link>
          <button type="button" className="btn btn-ghost !min-h-10 !px-4" aria-expanded={open} aria-controls={`quick-${p.slug}`} onClick={() => setOpen((o) => !o)}>
            {open ? 'Less' : 'Quick view'}
          </button>
          {p.links[0] && (
            <a href={p.links[0].href} target="_blank" rel="noopener noreferrer" className="link ml-auto inline-flex items-center gap-1 text-sm">
              {p.links[0].label.includes('.') ? 'Live site' : p.links[0].label}
              <Icon name="external" size={14} />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [tech, setTech] = useState<string>('');

  const list = useMemo(
    () =>
      projects
        .filter((p) => cat === 'all' || p.categories.includes(cat))
        .filter((p) => !tech || matchesTech(p, tech)),
    [cat, tech],
  );

  return (
    <Section
      id="projects"
      eyebrow="products & projects"
      title="AI and software products I have built"
      lead="Real products with honest status labels. Live means publicly available now. Roadmap items are listed separately in each case study and are never presented as shipped."
    >
      <div className="reveal mt-10 space-y-3">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          <button type="button" className="chip-btn" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>
            All ({projects.length})
          </button>
          {allCategories.map((c) => (
            <button key={c} type="button" className="chip-btn" aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Filter projects by technology" className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-xs text-faint">tech:</span>
          {techFilters.map((t) => (
            <button key={t} type="button" className="chip-btn !min-h-8 !py-0.5 !text-xs" aria-pressed={tech === t} onClick={() => setTech(tech === t ? '' : t)}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} projects shown
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="project-grid">
        {list.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} />
        ))}
        {list.length === 0 && <p className="text-muted">No project matches both filters. Clear one of them.</p>}
      </div>
      <ArchitectureExplorer />
    </Section>
  );
}
