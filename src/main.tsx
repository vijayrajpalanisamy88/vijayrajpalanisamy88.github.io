import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App, routeKey } from './App';
import { normalize, RouterProvider } from './lib/router';
import './styles.css';

declare global {
  interface Window {
    __hydrated?: boolean;
  }
}

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <RouterProvider initialPath={window.location.pathname}>
      <App />
    </RouterProvider>
  </StrictMode>
);

// Hydrate only when the prerendered HTML is for this route (a host may serve another page as a fallback).
if (root.hasChildNodes() && root.dataset.route === routeKey(normalize(window.location.pathname))) hydrateRoot(root, app);
else if (root.hasChildNodes()) {
  root.replaceChildren();
  createRoot(root).render(app);
}
else createRoot(root).render(app); // dev server: no prerendered markup
window.__hydrated = true;
