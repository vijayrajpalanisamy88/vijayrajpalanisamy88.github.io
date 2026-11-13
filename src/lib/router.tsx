import { createContext, useCallback, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

/**
 * Minimal path router. Routes are plain paths ("/", "/projects/<slug>/") that are also
 * prerendered to real HTML files at build time, so refreshes and deep links work on GitHub Pages.
 */
interface RouterValue {
  path: string;
  navigate: (to: string) => void;
}
const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} });

export const normalize = (p: string) => {
  const clean = p.split('#')[0].split('?')[0] || '/';
  return clean.endsWith('/') ? clean : `${clean}/`;
};

function scrollToHash(hash: string) {
  if (!hash) {
    window.scrollTo({ top: 0 });
    return;
  }
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (el) {
    el.scrollIntoView();
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
}

export function RouterProvider({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  const [path, setPath] = useState(normalize(initialPath));

  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.href);
    const next = normalize(url.pathname);
    const samePage = next === normalize(window.location.pathname);
    window.history.pushState({}, '', url.pathname + url.hash);
    if (samePage) {
      scrollToHash(url.hash);
      return;
    }
    setPath(next);
    // wait for the new route to render, then scroll
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(url.hash)));
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** Internal link: real href for crawlers / no-JS, client-side navigation otherwise. */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
