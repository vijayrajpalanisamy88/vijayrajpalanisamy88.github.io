import type { StatusKind } from '../data/projects';

const styles: Record<StatusKind, string> = {
  live: 'text-ok border-[color-mix(in_srgb,var(--ok)_45%,transparent)] bg-[color-mix(in_srgb,var(--ok)_12%,transparent)]',
  beta: 'text-info border-[color-mix(in_srgb,var(--info)_45%,transparent)] bg-[color-mix(in_srgb,var(--info)_12%,transparent)]',
  development: 'text-warn border-[color-mix(in_srgb,var(--warn)_45%,transparent)] bg-[color-mix(in_srgb,var(--warn)_10%,transparent)]',
  demo: 'text-accent-2 border-[color-mix(in_srgb,var(--accent-2)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent-2)_10%,transparent)]',
  enterprise: 'text-accent-3 border-[color-mix(in_srgb,var(--accent-3)_45%,transparent)] bg-[color-mix(in_srgb,var(--accent-3)_10%,transparent)]',
};

export function StatusBadge({ kind, label, title }: { kind: StatusKind; label: string; title?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[kind]}`} title={title}>
      <span className={`h-1.5 w-1.5 rounded-full bg-current ${kind === 'live' ? 'anim-pulse' : ''}`} aria-hidden="true" />
      <span className="sr-only">Status: </span>
      {label}
    </span>
  );
}
