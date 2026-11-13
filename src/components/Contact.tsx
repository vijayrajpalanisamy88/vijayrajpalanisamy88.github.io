import { useState } from 'react';
import { profile, SITE_URL } from '../data/profile';
import { Section } from './Section';
import { Icon } from './Icon';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  const channels = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
    { icon: 'github', label: 'GitHub', value: `@${profile.githubHandle}`, href: profile.github, external: true },
    ...(profile.linkedin ? [{ icon: 'linkedin', label: 'LinkedIn', value: 'LinkedIn profile', href: profile.linkedin, external: true }] : []),
    { icon: 'download', label: 'Resume', value: 'PDF download', href: profile.resumePdf, external: false, download: true },
    { icon: 'external', label: 'Portfolio', value: SITE_URL.replace('https://', ''), href: `${SITE_URL}/`, external: false },
  ];

  return (
    <Section id="contact" eyebrow="contact" title="Let’s build something reliable — with AI where it helps">
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="glass reveal p-6 sm:p-8">
          <h3 className="text-lg font-semibold">I’m interested in</h3>
          <ul className="prose-list mt-4 space-y-2 text-muted">
            {profile.openTo.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Hello Vijayraj — from your portfolio')}`} className="btn btn-primary">
              <Icon name="mail" size={16} /> Email me
            </a>
            <button type="button" onClick={copy} className="btn btn-ghost" aria-live="polite">
              <Icon name={copied ? 'check' : 'copy'} size={16} /> {copied ? 'Copied' : 'Copy email address'}
            </button>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2" aria-label="Contact channels">
          {channels.map((c, i) => (
            <li key={c.label} className="reveal" style={{ ['--d' as string]: `${i * 50}ms` }}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                {...('download' in c && c.download ? { download: true } : {})}
                className="glass card-hover flex h-full items-center gap-4 p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent-2">
                  <Icon name={c.icon} size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-faint">{c.label}</span>
                  <span className="block truncate font-medium text-fg">{c.value}</span>
                </span>
                {c.external && <span className="sr-only">(opens in new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
