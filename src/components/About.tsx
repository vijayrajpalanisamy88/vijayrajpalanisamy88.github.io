import { profile } from '../data/profile';
import { Section } from './Section';

const glance = [
  { k: 'Now', v: 'Senior Consultant, R&D IT / Digital DevOps at a global life-sciences company, since Feb 2023' },
  { k: 'Experience', v: '15+ years: ERP consulting, .NET development, life-sciences enterprise IT' },
  { k: 'Core stack', v: 'C#, .NET, Web APIs, SQL, Python, AWS, GitHub Actions' },
  { k: 'AI', v: 'AWS Bedrock RAG (enterprise); LLM orchestration, MCP, pgvector RAG, on-device AI (own products)' },
  { k: 'Products', v: 'PromptFlowEngine, CryptoTalkies, AIYouTubeManager, plus 2 Android apps on Google Play' },
  { k: 'Open to', v: profile.openTo.join(' · ') },
];

export function About() {
  return (
    <Section id="about" eyebrow="about" title="From enterprise .NET to AI-native products">
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <div className="reveal space-y-5 text-[17px] leading-relaxed text-muted">
          <p>
            I started in 2011 implementing and integrating <strong className="text-fg">SAP Business One</strong> for clients, then spent three
            years as a <strong className="text-fg">.NET developer</strong> at GAVS Technologies building applications to client requirements.
          </p>
          <p>
            Since 2016 I have worked for a <strong className="text-fg">global life-sciences company</strong>, first improving operational and digital processes, and
            since 2023 as a Senior Consultant in R&amp;D IT / Digital DevOps. There I support R&amp;D digital applications, modernize .NET
            applications, move workloads from on-premises to the cloud, build GitHub Actions pipelines and AWS Lambda monitoring, and delivered{' '}
            <strong className="text-fg">AWS Bedrock RAG</strong> question answering over vendor documentation.
          </p>
          <p>
            I deliver work through <strong className="text-fg">specifications first</strong>. Clear requirements and acceptance criteria are
            the reference for everything after them, including the AI-assisted parts of the lifecycle, and engineers review every AI suggestion.
          </p>
          <p>
            Outside work I build and run my own <strong className="text-fg">AI products end to end</strong>: architecture, back end, front end,
            mobile, infrastructure, CI/CD and operations. They range from a PromptOps platform with an MCP server to fully offline Android apps
            that run AI models on the phone. They are where I test, in production, the AI engineering practices I bring to a team.
          </p>
        </div>

        <aside className="glass reveal h-fit p-6" aria-labelledby="glance-title" style={{ ['--d' as string]: '120ms' }}>
          <h3 id="glance-title" className="eyebrow">30-second summary</h3>
          <dl className="mt-4 divide-y divide-[var(--border)]">
            {glance.map((g) => (
              <div key={g.k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-3 text-sm">
                <dt className="font-medium text-faint">{g.k}</dt>
                <dd className="text-fg">{g.v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  );
}
