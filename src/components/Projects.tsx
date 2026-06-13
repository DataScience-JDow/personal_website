import { caseStudies } from '@/lib/portfolio';
import { CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Projects() {
  return (
    <section className="section container" id="case-studies" aria-labelledby="case-studies-title">
      <ScrollReveal>
        <div className="section-heading">
          <p className="eyebrow">The work</p>
          <h2 id="case-studies-title">
            <span className="gradient-text">Three places where the story becomes concrete.</span>
          </h2>
          <p>
            These are the threads I want a recruiter to notice: pricing intelligence, automated
            profitability review, and AI-assisted systems that remove repetitive analysis work.
          </p>
        </div>
      </ScrollReveal>

      <div className="case-study-list">
        {caseStudies.map((study, index) => (
          <ScrollReveal key={study.id}>
            <article className="case-study" id={study.id}>
              <div className="case-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="case-main">
                <p className="case-role">{study.role}</p>
                <h3>{study.title}</h3>
                <p className="case-context">{study.context}</p>

                <div className="case-columns">
                  <div>
                    <h4>Architecture</h4>
                    <ul>
                      {study.architecture.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>Impact</h4>
                    <ul>
                      {study.impact.map((item) => (
                        <li key={item}>
                          <CheckCircle2 aria-hidden="true" size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <aside className="case-aside" aria-label={`${study.title} stack and proof`}>
                <p>{study.proof}</p>
                <div className="tag-list">
                  {study.stack.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </aside>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
