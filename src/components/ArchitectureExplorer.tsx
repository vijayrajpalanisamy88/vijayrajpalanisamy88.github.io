import { useState } from 'react';
import { projects, type ArchLayer, type Project } from '../data/projects';
import { Link } from '../lib/router';

const layerTone: Record<ArchLayer['id'], string> = {
  clients: 'var(--accent-2)',
  edge: 'var(--info)',
  services: 'var(--accent)',
  data: 'var(--ok)',
  ai: 'var(--accent-3)',
  external: 'var(--warn)',
  delivery: 'var(--text-faint)',
};

/** Interactive, layered architecture diagram. Works as stacked rows on mobile. */
export function ArchitectureDiagram({ project, compact = false }: { project: Project; compact?: boolean }) {
  const arch = project.architecture!;
  const first = arch.layers.find((l) => l.id === 'services')?.nodes[0] ?? arch.layers[0].nodes[0];
  const [sel, setSel] = useState(first.id);
  const node = arch.layers.flatMap((l) => l.nodes.map((n) => ({ ...n, layer: l }))).find((n) => n.id === sel)!;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-2" role="group" aria-label={`${project.name} architecture components`}>
        {arch.layers.map((l, li) => (
          <div key={l.id}>
            <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:items-stretch">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-faint">
                <span className="h-2 w-2 rounded-full" style={{ background: layerTone[l.id] }} aria-hidden="true" />
                {l.name}
              </div>
              <div className="flex flex-wrap gap-2">
                {l.nodes.map((n) => {
                  const active = n.id === sel;
                  return (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setSel(n.id)}
                      aria-pressed={active}
                      className={`min-h-11 flex-1 basis-40 rounded-xl border px-3 py-2 text-left transition ${active ? 'bg-surface-solid shadow-lg' : 'bg-surface-2 hover:bg-surface-solid'}`}
                      style={{ borderColor: active ? layerTone[l.id] : 'var(--border)' }}
                    >
                      <span className="block text-sm font-semibold text-fg">{n.label}</span>
                      <span className="block font-mono text-[11px] text-faint">{n.tech}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            {li < arch.layers.length - 1 && (
              <div className="flex justify-center py-0.5 sm:ml-[8rem]" aria-hidden="true">
                <svg width="14" height="16" viewBox="0 0 14 16">
                  <path d="M7 0v12M2 8l5 6 5-6" fill="none" stroke="var(--border-strong)" strokeWidth="1.5" className="anim-dash" strokeDasharray="3 3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <aside className="glass h-fit p-5 lg:sticky lg:top-24" aria-live="polite" data-testid="arch-detail">
        <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: layerTone[node.layer.id] }}>
          {node.layer.name}
        </p>
        <h4 className="mt-1 text-lg font-semibold">{node.label}</h4>
        <p className="font-mono text-xs text-faint">{node.tech}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{node.detail}</p>
        {!compact && (
          <Link to={`/projects/${project.slug}/`} className="link mt-4 inline-block text-sm">
            Read the full {project.name} case study →
          </Link>
        )}
      </aside>
    </div>
  );
}

export function ArchitectureExplorer() {
  const withArch = projects.filter((p) => p.architecture);
  const [slug, setSlug] = useState(withArch[0].slug);
  const project = withArch.find((p) => p.slug === slug)!;

  return (
    <div className="glass reveal mt-12 p-5 sm:p-8" id="architecture" aria-labelledby="arch-title">
      <p className="eyebrow">{'// architecture explorer'}</p>
      <h3 id="arch-title" className="mt-2 text-2xl font-semibold tracking-tight">
        Explore how each product is built
      </h3>
      <p className="mt-2 max-w-3xl text-muted">
        Pick a product, then select any component to see what it does. Only implemented components are shown. Secrets, private endpoints and
        internal network details are left out.
      </p>
      <div
        role="tablist"
        aria-label="Choose a product"
        className="mt-6 flex flex-wrap gap-2"
        onKeyDown={(e) => {
          if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
          e.preventDefault();
          const i = withArch.findIndex((p) => p.slug === slug);
          const n = withArch.length;
          const next = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + n) % n;
          setSlug(withArch[next].slug);
          document.getElementById(`arch-tab-${withArch[next].slug}`)?.focus();
        }}
      >
        {withArch.map((p) => (
          <button
            key={p.slug}
            type="button"
            role="tab"
            id={`arch-tab-${p.slug}`}
            aria-selected={p.slug === slug}
            aria-controls="arch-panel"
            tabIndex={p.slug === slug ? 0 : -1}
            className="chip-btn"
            onClick={() => setSlug(p.slug)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div id="arch-panel" role="tabpanel" aria-labelledby={`arch-tab-${slug}`} className="mt-6">
        <p className="mb-5 text-sm text-muted">{project.architecture!.summary}</p>
        <ArchitectureDiagram key={slug} project={project} />
      </div>
    </div>
  );
}
