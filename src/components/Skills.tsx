import { capabilityGroups, credentials, experience } from '@/lib/portfolio';
import ScrollReveal from './ScrollReveal';

export default function Skills() {
  return (
    <>
      <section className="section container" id="capabilities" aria-labelledby="capabilities-title">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <h2 id="capabilities-title">
              <span className="gradient-text">The stack I use to move from question to system.</span>
            </h2>
            <p>
              I am strongest when the work spans business discovery, warehouse logic, semantic
              modeling, automation, and a clear executive-facing answer.
            </p>
          </div>
        </ScrollReveal>

        <div className="capability-grid">
          {capabilityGroups.map((group) => {
            const Icon = group.icon;
            return (
              <ScrollReveal key={group.title}>
                <article className="capability-card">
                  <Icon aria-hidden="true" size={24} />
                  <h3>{group.title}</h3>
                  <p>{group.summary}</p>
                  <div className="tag-list">
                    {group.evidence.map((item) => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="section section-muted" id="experience" aria-labelledby="experience-title">
        <div className="container">
          <ScrollReveal>
            <div className="section-heading">
              <p className="eyebrow">Experience</p>
              <h2 id="experience-title">
                <span className="gradient-text">A career arc from operations to data science.</span>
              </h2>
              <p>
                My background started with account ownership and forecasting, then moved into BI,
                cloud pipelines, machine learning, pricing systems, and enterprise data modernization.
              </p>
            </div>
          </ScrollReveal>

          <div className="timeline">
            {experience.map((item) => (
              <ScrollReveal key={`${item.company}-${item.title}`}>
                <article className="timeline-item">
                  <div className="timeline-meta">
                    <span>{item.period}</span>
                    <strong>{item.company}</strong>
                    <small>{item.location}</small>
                  </div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <ul>
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="credential-grid" aria-label="Education and certifications">
            {credentials.map((credential) => {
              const Icon = credential.icon;
              return (
                <ScrollReveal key={credential.label}>
                  <article className="credential">
                    <Icon aria-hidden="true" size={20} />
                    <div>
                      <h3>{credential.label}</h3>
                      <p>{credential.detail}</p>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
