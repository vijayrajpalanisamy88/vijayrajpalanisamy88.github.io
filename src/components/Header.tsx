import { useEffect, useState } from 'react';
import { Link, useRouter } from '../lib/router';
import { useActiveSection, useMotionPref, useScrollProgress, useTheme } from '../lib/hooks';
import { profile } from '../data/profile';
import { Icon } from './Icon';

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai', label: 'AI' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];
const ids = navItems.map((n) => n.id);

export function Header() {
  const { path } = useRouter();
  const progress = useScrollProgress();
  const active = useActiveSection(ids, path === '/');
  const { theme, toggle } = useTheme();
  const motion = useMotionPref();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl">
      <div
        className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-3 to-accent-2"
        style={{ transform: `scaleX(${progress})` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      />
      <nav className="container-x flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link to="/" className="flex items-center gap-2.5 font-semibold" aria-label={`${profile.name} — home`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-3 font-mono text-sm text-white shadow-lg">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <Link
                to={`/#${n.id}`}
                aria-current={active === n.id ? 'location' : undefined}
                className={`rounded-lg px-3 py-2 text-sm transition hover:text-fg ${active === n.id ? 'bg-surface-2 text-fg' : 'text-muted'}`}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={motion.toggle}
            className="grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-fg"
            aria-pressed={motion.reduced}
            aria-label={motion.reduced ? 'Turn animations on' : 'Turn animations off'}
            title={motion.reduced ? 'Animations off' : 'Animations on'}
          >
            <Icon name={motion.reduced ? 'play' : 'pause'} />
          </button>
          <button
            type="button"
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-fg"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            data-testid="theme-toggle"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <a href={profile.resumePdf} download className="btn btn-primary hidden !min-h-10 !px-4 sm:inline-flex">
            <Icon name="download" size={16} /> Resume
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <ul className="container-x grid grid-cols-2 gap-1 py-3">
            {navItems.map((n) => (
              <li key={n.id}>
                <Link to={`/#${n.id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-muted hover:bg-surface-2 hover:text-fg">
                  {n.label}
                </Link>
              </li>
            ))}
            <li className="col-span-2 sm:hidden">
              <a href={profile.resumePdf} download className="btn btn-primary mt-1 w-full">
                <Icon name="download" size={16} /> Download resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
