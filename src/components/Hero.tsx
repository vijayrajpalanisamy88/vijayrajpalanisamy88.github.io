import { useEffect, useState } from 'react';
import { profile, quickFacts } from '../data/profile';
import { Link } from '../lib/router';
import { Icon } from './Icon';

function RotatingRole() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.documentElement.classList.contains('reduce-motion') || document.hidden) return;
      setI((n) => (n + 1) % profile.roles.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block min-w-[12ch] text-left">
      <span key={i} className="anim-word inline-block bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
        {profile.roles[i]}
      </span>
      <span className="sr-only">. Roles: {profile.roles.join(', ')}.</span>
    </span>
  );
}

/** Stylised architecture: clients → .NET API → data / AI. Illustrative, theme-aware, decorative. */
function HeroDiagram() {
  const box = (x: number, y: number, w: number, label: string, sub: string, tone: string) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height="54" rx="12" fill="var(--surface-solid)" stroke={tone} strokeOpacity=".7" />
      <circle cx="16" cy="27" r="4" fill={tone} className="anim-pulse" />
      <text x="30" y="24" fill="var(--text)" fontSize="13" fontWeight="600" fontFamily="var(--font-sans)">{label}</text>
      <text x="30" y="40" fill="var(--text-faint)" fontSize="10.5" fontFamily="var(--font-mono)">{sub}</text>
    </g>
  );
  const edge = (d: string, tone: string) => (
    <path d={d} fill="none" stroke={tone} strokeWidth="1.6" strokeDasharray="5 5" strokeOpacity=".75" className="anim-dash" />
  );
  const A = 'var(--accent)';
  const C = 'var(--accent-2)';
  const V = 'var(--accent-3)';
  return (
    <svg viewBox="0 0 440 400" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="hg" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".18" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity=".05" />
        </linearGradient>
      </defs>
      <rect x="120" y="140" width="200" height="120" rx="20" fill="url(#hg)" stroke="var(--border-strong)" />
      {edge('M95 62 C 150 62, 170 120, 200 150', C)}
      {edge('M345 62 C 290 62, 270 120, 240 150', C)}
      {edge('M200 250 C 170 290, 130 300, 110 330', A)}
      {edge('M240 250 C 270 290, 310 300, 330 330', V)}
      {box(10, 30, 150, 'Web · Mobile', 'React · Flutter', C)}
      {box(280, 30, 150, 'Agents · IDE', 'MCP · extensions', C)}
      <g transform="translate(140 158)">
        <text x="80" y="22" textAnchor="middle" fill="var(--text)" fontSize="15" fontWeight="700" fontFamily="var(--font-sans)">C# / .NET API</text>
        <text x="80" y="42" textAnchor="middle" fill="var(--text-faint)" fontSize="10.5" fontFamily="var(--font-mono)">clean architecture · CQRS</text>
        <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-muted)">
          <rect x="6" y="56" width="70" height="22" rx="6" fill="var(--surface-2)" stroke="var(--border)" />
          <text x="41" y="71" textAnchor="middle">REST</text>
          <rect x="84" y="56" width="70" height="22" rx="6" fill="var(--surface-2)" stroke="var(--border)" />
          <text x="119" y="71" textAnchor="middle">guardrails</text>
        </g>
      </g>
      {box(20, 330, 170, 'SQL · pgvector', 'PostgreSQL · Redis', A)}
      {box(250, 330, 170, 'LLMs · RAG', 'Bedrock · Claude', V)}
      <g className="anim-float">
        <rect x="300" y="198" width="118" height="40" rx="10" fill="var(--surface-solid)" stroke="var(--border-strong)" />
        <text x="359" y="215" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">CI/CD · IaC</text>
        <text x="359" y="230" textAnchor="middle" fill="var(--ok)" fontSize="10" fontFamily="var(--font-mono)">● deploy ok</text>
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative pt-14 pb-16 sm:pt-20 lg:pt-24" aria-labelledby="hero-title">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="chip !text-[13px]">
            <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
            {profile.currentRole} · {profile.location}
          </p>
          <h1 id="hero-title" className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="gradient-text">{profile.name}</span>
          </h1>
          <p className="mt-4 text-xl font-medium text-fg sm:text-2xl" style={{ textWrap: 'balance' }}>
            {profile.headline}
          </p>
          <p className="mt-3 font-mono text-sm text-muted sm:text-base" aria-live="off">
            <span className="text-faint">&gt; </span>
            <RotatingRole />
          </p>
          <p className="lead !mt-6">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/#projects" className="btn btn-primary">
              View projects <Icon name="arrowRight" size={16} />
            </Link>
            <a href={profile.resumePdf} download className="btn btn-ghost" data-testid="hero-resume">
              <Icon name="download" size={16} /> Download resume
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="GitHub profile (opens in new tab)">
              <Icon name="github" size={16} /> GitHub
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label="LinkedIn profile (opens in new tab)">
                <Icon name="linkedin" size={16} /> LinkedIn
              </a>
            )}
            <Link to="/#contact" className="btn btn-ghost">
              <Icon name="mail" size={16} /> Contact
            </Link>
          </div>
        </div>

        <div className="glass relative p-4 sm:p-6 lg:mt-10">
          <p className="eyebrow mb-2 px-1">how my systems fit together</p>
          <HeroDiagram />
        </div>
      </div>

      <div className="container-x mt-14">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {quickFacts.map((f, i) => (
            <div key={f.label} className="glass reveal p-5" style={{ ['--d' as string]: `${i * 70}ms` }}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{f.value}</span>
                <span className="mt-1 block text-sm text-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
