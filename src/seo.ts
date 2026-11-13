import { getProject, projects } from './data/projects';
import { experience } from './data/experience';
import { profile, SITE_URL } from './data/profile';

export interface Head {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: 'profile' | 'article' | 'website';
  jsonLd: object[];
  noindex?: boolean;
}

const OG_IMAGE = `${SITE_URL}/og-image.png`;

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: profile.name,
  url: `${SITE_URL}/`,
  jobTitle: 'Senior Consultant',
  address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressCountry: 'IN' },
  sameAs: [profile.github, profile.linkedin].filter(Boolean),
  knowsAbout: ['C#', '.NET', 'ASP.NET Core', 'Full-stack development', 'Generative AI', 'Retrieval-augmented generation', 'AWS Bedrock', 'Agentic AI', 'Prompt engineering', 'Model Context Protocol', 'GitHub Actions', 'AWS'],
  hasOccupation: experience.map((r) => ({ '@type': 'Role', roleName: r.title, startDate: r.start, ...(r.end ? { endDate: r.end } : {}) })),
};

export function headFor(path: string): Head {
  if (path === '/') {
    return {
      title: `${profile.name} — C#/.NET Engineer · GenAI & Agentic AI Builder`,
      description:
        'Portfolio of Vijayraj Palanisamy: Senior Consultant and C#/.NET full-stack engineer with 15+ years of experience in enterprise software. Builder of AI products including PromptFlowEngine, CryptoTalkies and AIYouTubeManager.',
      canonical: `${SITE_URL}/`,
      image: OG_IMAGE,
      type: 'profile',
      jsonLd: [
        { '@context': 'https://schema.org', '@type': 'ProfilePage', url: `${SITE_URL}/`, name: `${profile.name} — Portfolio`, mainEntity: person },
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Projects',
          itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/projects/${p.slug}/`, name: p.name })),
        },
      ],
    };
  }
  const m = path.match(/^\/projects\/([a-z0-9-]+)\/$/);
  const p = m ? getProject(m[1]) : undefined;
  if (p) {
    const url = `${SITE_URL}/projects/${p.slug}/`;
    return {
      title: `${p.name} — case study · ${profile.name}`,
      description: `${p.summary} Case study: problem, architecture, stack and engineering decisions.`.slice(0, 300),
      canonical: url,
      image: p.image ? `${SITE_URL}${p.image.src}` : OG_IMAGE,
      type: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': p.categories.includes('Enterprise') ? 'CreativeWork' : 'SoftwareApplication',
          name: p.name,
          description: p.summary,
          url,
          ...(p.links[0] ? { sameAs: p.links.map((l) => l.href) } : {}),
          ...(p.categories.includes('Enterprise') ? {} : { applicationCategory: p.categories.includes('Mobile') ? 'MobileApplication' : 'WebApplication', operatingSystem: p.categories.includes('Mobile') ? 'Android' : 'Web' }),
          creator: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
            { '@type': 'ListItem', position: 3, name: p.name, item: url },
          ],
        },
      ],
    };
  }
  return {
    title: `Page not found · ${profile.name}`,
    description: 'This page does not exist.',
    canonical: `${SITE_URL}/`,
    image: OG_IMAGE,
    type: 'website',
    jsonLd: [],
    noindex: true,
  };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderHead(h: Head): string {
  return [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<link rel="canonical" href="${h.canonical}" />`,
    h.noindex ? '<meta name="robots" content="noindex" />' : '<meta name="robots" content="index, follow" />',
    `<meta property="og:type" content="${h.type}" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${h.canonical}" />`,
    `<meta property="og:image" content="${h.image}" />`,
    `<meta property="og:image:alt" content="${esc(h.title)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${h.image}" />`,
    ...h.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
}
