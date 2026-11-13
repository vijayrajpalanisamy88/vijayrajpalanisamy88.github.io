import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App, routeKey } from './App';
import { RouterProvider } from './lib/router';
import { headFor, renderHead } from './seo';
import { projects } from './data/projects';

export const routes = ['/', ...projects.map((p) => `/projects/${p.slug}/`)];

export function render(path: string) {
  const html = renderToString(
    <StrictMode>
      <RouterProvider initialPath={path}>
        <App />
      </RouterProvider>
    </StrictMode>,
  );
  return { html, head: renderHead(headFor(path)), route: routeKey(path) };
}
