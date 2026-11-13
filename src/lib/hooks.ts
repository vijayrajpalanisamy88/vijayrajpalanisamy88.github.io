import { useEffect, useState } from 'react';

/** Adds `.is-in` to every `.reveal` element as it scrolls into view. Re-runs when the route changes. */
export function useRevealOnScroll(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

/** 0..1 scroll progress of the whole document. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/** Id of the section currently in view, for nav highlighting. */
export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!enabled) {
      setActive('');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids, enabled]);
  return active;
}

const safeGet = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const safeSet = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* storage unavailable: preference lasts for this page view only */
  }
};

export type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) || 'dark');
  }, []);
  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    safeSet('theme', next);
    setTheme(next);
  };
  return { theme, toggle };
}

/** User-controlled animation switch, in addition to the OS reduced-motion setting. */
export function useMotionPref() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(document.documentElement.classList.contains('reduce-motion'));
  }, []);
  const toggle = () => {
    const next = !reduced;
    const root = document.documentElement;
    root.classList.toggle('reduce-motion', next);
    root.classList.toggle('motion', !next);
    if (next) document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
    safeSet('motion', next ? 'reduce' : 'full');
    setReduced(next);
  };
  return { reduced, toggle, safeGet };
}
