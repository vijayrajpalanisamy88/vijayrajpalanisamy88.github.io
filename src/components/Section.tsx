import type { ReactNode } from 'react';

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = '',
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-24 ${className}`}>
      <div className="container-x">
        <div className="reveal">
          <p className="eyebrow">{`// ${eyebrow}`}</p>
          <h2 id={`${id}-title`} className="h-section">
            {title}
          </h2>
          {lead && <p className="lead">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
