import { enterpriseHighlights, experience, professionalDevelopment } from '../data/experience';
import { profile } from '../data/profile';
import { Section } from './Section';
import { Icon } from './Icon';

const expertise = [
  { k: 'Application development', v: 'C#, .NET, Web APIs, Python, SQL, system integration, application modernization' },
  { k: 'AI / intelligent systems', v: 'Generative AI, LLMs, RAG, AWS Bedrock, Agentic AI, AI agents, prompt engineering, Microsoft Copilot Studio' },
  { k: 'Engineering delivery', v: 'Specification-driven development, AI-assisted SDLC, requirements and acceptance criteria, test planning, code review, GitHub Actions, CI/CD, DevOps' },
  { k: 'Cloud & automation', v: 'AWS, AWS Lambda, cloud migration, application monitoring, workflow automation' },
];

export function Resume() {
  return (
    <Section id="resume" eyebrow="resume" title="Resume at a glance" lead="A summary of my resume that recruiters can scan quickly. The PDF is my actual resume, with only the phone number removed.">
      <div className="reveal mt-8 flex flex-wrap gap-3">
        <a href={profile.resumePdf} download className="btn btn-primary" data-testid="resume-download">
          <Icon name="download" size={16} /> Download resume (PDF)
        </a>
        <a href={profile.resumePdf} target="_blank" rel="noopener" className="btn btn-ghost">
          <Icon name="doc" size={16} /> Open in browser
        </a>
      </div>

      <article className="glass reveal mt-8 p-6 sm:p-10" aria-label="Web resume">
        <header className="flex flex-col gap-2 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">{profile.name}</h3>
            <p className="mt-1 font-medium text-accent-2">Senior Consultant · C#/.NET Engineer · AI-enabled software development</p>
          </div>
          <p className="text-sm text-muted">
            {profile.location} · <span className="text-fg">{profile.experienceLabel}</span> experience
          </p>
        </header>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h4 className="eyebrow">Professional summary</h4>
            <p className="mt-3 text-muted">
              Senior Consultant and C#/.NET software engineer with 15+ years of experience delivering enterprise and R&amp;D digital applications,
              application modernization, cloud integrations and DevOps improvements. Experience with generative AI, AWS Bedrock,
              retrieval-augmented generation (RAG) and AI-assisted engineering. I apply specification-driven development and a structured AI
              development lifecycle to turn business needs into explicit requirements, verifiable acceptance criteria, maintainable
              implementations and testable releases.
            </p>

            <h4 className="eyebrow mt-8">Experience</h4>
            <ol className="mt-3 space-y-5">
              {experience.map((r) => (
                <li key={r.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <p className="font-semibold text-fg">
                      {r.title} · <span className="font-normal text-muted">{r.company}</span>
                    </p>
                    <p className="font-mono text-xs text-faint">{r.period}</p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{r.summary}</p>
                </li>
              ))}
            </ol>

            <h4 className="eyebrow mt-8">Key achievements</h4>
            <ul className="prose-list mt-3 space-y-2 text-sm text-muted">
              <li>Improved project delivery timelines by 20% by streamlining delivery processes (AstraZeneca).</li>
              <li>Identified workflow enhancements that increased productivity by 15% (AstraZeneca).</li>
              <li>Delivered RAG-based Q&amp;A over vendor documentation with AWS Bedrock.</li>
              <li>Implemented GitHub Actions CI/CD and supported on-premises-to-cloud migration of .NET applications.</li>
              <li>Independently built PromptFlowEngine, a privacy-first PromptOps platform with web, API, extension, CLI and MCP surfaces.</li>
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="eyebrow">Technical expertise</h4>
              <dl className="mt-3 space-y-3 text-sm">
                {expertise.map((e) => (
                  <div key={e.k}>
                    <dt className="font-semibold text-fg">{e.k}</dt>
                    <dd className="text-muted">{e.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h4 className="eyebrow">Project experience</h4>
              <ul className="mt-3 space-y-3 text-sm">
                {enterpriseHighlights.map((h) => (
                  <li key={h.name}>
                    <p className="font-semibold text-fg">{h.name}</p>
                    <p className="text-xs text-faint">{h.context}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="eyebrow">Professional development</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {professionalDevelopment.map((p) => (
                  <li key={p.name} className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-fg">{p.name}</span>
                    <span className="text-muted">— {p.issuer}</span>
                    <span className="chip !py-0 !text-[11px] !text-warn">{p.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </Section>
  );
}
