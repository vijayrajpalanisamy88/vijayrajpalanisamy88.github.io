import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { HowIBuild } from './components/HowIBuild';
import { AIJourney } from './components/AIJourney';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { ProjectPage } from './components/ProjectPage';
import { Link, useRouter } from './lib/router';
import { useRevealOnScroll } from './lib/hooks';
import { getProject } from './data/projects';
import { profile } from './data/profile';
import { headFor } from './seo';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <HowIBuild />
      <AIJourney />
      <Resume />
      <Contact />
    </>
  );
}

function NotFound() {
  return (
    <section className="container-x py-32 text-center" aria-labelledby="nf-title">
      <p className="eyebrow">404</p>
      <h1 id="nf-title" className="h-section">This page does not exist</h1>
      <p className="lead mx-auto">The link may be outdated. Start from the homepage or the project list.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="btn btn-primary">Home</Link>
        <Link to="/#projects" className="btn btn-ghost">Projects</Link>
      </div>
    </section>
  );
}

/** Stable key for a route; used to decide whether prerendered HTML can be hydrated. */
export const routeKey = (path: string) => {
  const r = resolveRoute(path);
  return r.kind === 'project' ? `project:${r.project.slug}` : r.kind;
};

export function resolveRoute(path: string) {
  if (path === '/') return { kind: 'home' as const };
  const m = path.match(/^\/projects\/([a-z0-9-]+)\/$/);
  if (m) {
    const project = getProject(m[1]);
    if (project) return { kind: 'project' as const, project };
  }
  return { kind: 'notfound' as const };
}

export function App() {
  const { path } = useRouter();
  const route = resolveRoute(path);
  useRevealOnScroll(path);

  // keep <title>/description in sync during client-side navigation
  useEffect(() => {
    const h = headFor(path);
    document.title = h.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', h.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', h.canonical);
  }, [path]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1} className="relative isolate outline-none">
        <div className="ambient" aria-hidden="true" />
        {route.kind === 'home' && <Home />}
        {route.kind === 'project' && <ProjectPage key={route.project.slug} project={route.project} />}
        {route.kind === 'notfound' && <NotFound />}
      </main>
      <footer className="border-t border-line py-10">
        <div className="container-x flex flex-col gap-4 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Vite and Tailwind, and hosted on GitHub Pages.
          </p>
          <p className="flex gap-4">
            <a className="hover:text-fg" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="hover:text-fg" href={`mailto:${profile.email}`}>Email</a>
            <Link className="hover:text-fg" to="/#top">Back to top ↑</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
