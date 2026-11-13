import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { projects } from '../../src/data/projects';
import { experience, professionalDevelopment } from '../../src/data/experience';
import { skillGroups } from '../../src/data/skills';
import { profile } from '../../src/data/profile';
import { headFor } from '../../src/seo';

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

describe('projects', () => {
  it('have unique, URL-safe slugs', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });

  it('every case study has the required sections filled in', () => {
    for (const p of projects) {
      for (const k of ['name', 'tagline', 'summary', 'overview', 'problem', 'role', 'period', 'repo'] as const) expect(p[k], `${p.slug}.${k}`).toBeTruthy();
      expect(p.users.length, p.slug).toBeGreaterThan(0);
      expect(p.features.length, p.slug).toBeGreaterThan(0);
      expect(p.stack.length, p.slug).toBeGreaterThan(0);
      expect(p.challenges.length, p.slug).toBeGreaterThan(0);
      expect(p.status.note, p.slug).toBeTruthy();
    }
  });

  it('only link to https URLs and never to private repositories', () => {
    for (const p of projects)
      for (const l of p.links) {
        expect(l.href).toMatch(/^https:\/\//);
        expect(l.href).not.toMatch(/github\.com\/vijayrajpalanisamy88\/(?!ai-pdf-scanner-privacy)/);
      }
  });

  it('featured products are the three primary case studies', () => {
    expect(projects.filter((p) => p.featured).map((p) => p.slug)).toEqual(['promptflowengine', 'cryptotalkies', 'aiyoutubemanager']);
  });

  it('screenshots referenced by projects exist', () => {
    for (const p of projects) if (p.image) expect(statSync(join('public', p.image.src)).size).toBeGreaterThan(1000);
  });

  it('architecture node ids are unique', () => {
    const ids = projects.flatMap((p) => p.architecture?.layers.flatMap((l) => l.nodes.map((n) => n.id)) ?? []);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('experience', () => {
  it('lists the four roles with exact titles and dates', () => {
    expect(experience.map((r) => `${r.title}|${r.company}|${r.period}`)).toEqual([
      'Senior Consultant|Global life-sciences company|Feb 2023 – Present',
      'Analyst|Global life-sciences company|Jan 2016 – Jun 2023',
      '.NET Developer|GAVS Technologies|May 2013 – Dec 2015',
      'SAP Business One Consultant|Euphoros|Mar 2011 – May 2013',
    ]);
  });
  it('"15+ years" is consistent with the career start date', () => {
    const years = (Date.now() - new Date(`${profile.careerStart}-01`).getTime()) / (365.25 * 24 * 3600 * 1000);
    expect(years).toBeGreaterThanOrEqual(15);
  });
  it('IIT Madras is shown as in progress, not as a completed certification', () => {
    expect(professionalDevelopment[0].status).toBe('In progress');
  });
});

describe('skills', () => {
  it('every skill names where it was used and has no numeric score', () => {
    for (const g of skillGroups)
      for (const s of g.skills) {
        expect(s.usedIn.length, s.name).toBeGreaterThan(0);
        expect(Object.keys(s)).not.toContain('level');
      }
  });
});

describe('privacy', () => {
  const files = [...walk('src'), 'index.html'].filter((f) => /\.(tsx?|css|html)$/.test(f));
  it('no phone numbers in source', () => {
    // generic Indian mobile pattern (+91 optional, 10 digits starting 6-9)
    for (const f of files) expect(readFileSync(f, 'utf8'), f).not.toMatch(/(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}/);
  });
  it('the current employer and its internal project names are never mentioned (owner decision)', () => {
    const banned = /astra\s*zeneca|plate\s*maestro|appito|\bHTS\b/i;
    for (const f of [...files, 'README.md']) expect(readFileSync(f, 'utf8'), f).not.toMatch(banned);
  });
  it('no resume is published (owner decision)', () => {
    const published = walk('public').map((f) => f.toLowerCase());
    expect(published.filter((f) => f.endsWith('.pdf') || f.includes('resume'))).toEqual([]);
  });
  it('no secrets or API keys in source', () => {
    for (const f of files) expect(readFileSync(f, 'utf8'), f).not.toMatch(/(sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{30,})/);
  });
});

describe('SEO metadata', () => {
  it('home and every project have a unique title, description and canonical', () => {
    const heads = ['/', ...projects.map((p) => `/projects/${p.slug}/`)].map(headFor);
    expect(new Set(heads.map((h) => h.title)).size).toBe(heads.length);
    for (const h of heads) {
      expect(h.description.length).toBeGreaterThan(50);
      expect(h.description.length).toBeLessThanOrEqual(300);
      expect(h.canonical).toMatch(/^https:\/\/vijayrajpalanisamy88\.github\.io\//);
      expect(h.noindex).toBeFalsy();
    }
  });
  it('unknown pages are noindex', () => {
    expect(headFor('/nope/').noindex).toBe(true);
  });
});
