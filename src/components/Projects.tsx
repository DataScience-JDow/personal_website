'use client';

import { useState } from 'react';
import { caseStudies } from '@/lib/portfolio';
import { CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'work' | 'personal'>('all');

  const filteredProjects = caseStudies.filter(
    (study) => filter === 'all' || study.category === filter
  );

  return (
    <section className="section container" id="case-studies" aria-labelledby="case-studies-title">
      <ScrollReveal>
        <div className="section-heading">
          <p className="eyebrow">The work</p>
          <h2 id="case-studies-title">
            <span className="gradient-text">Selected Projects & Case Studies</span>
          </h2>
          <p>
            An interactive catalog of my analytics engineering, data science, and web development
            work. Toggle below to filter between enterprise accomplishments and personal applications.
          </p>
        </div>
      </ScrollReveal>

      {/* Tabs Filter */}
      <ScrollReveal>
        <div className="project-tabs" aria-label="Filter projects">
          <button
            className="tab-button"
            data-active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button
            className="tab-button"
            data-active={filter === 'work'}
            onClick={() => setFilter('work')}
          >
            Work Accomplishments
          </button>
          <button
            className="tab-button"
            data-active={filter === 'personal'}
            onClick={() => setFilter('personal')}
          >
            Personal Projects
          </button>
        </div>
      </ScrollReveal>

      <div className="case-study-list">
        {filteredProjects.map((study, index) => (
          <ScrollReveal key={study.id}>
            <article className="case-study" id={study.id}>
              <div className="case-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="case-main">
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
                  <p className="case-role">{study.role}</p>
                  <span
                    className="tag"
                    style={{
                      fontSize: '0.65rem',
                      padding: '2px 8px',
                      textTransform: 'uppercase',
                      borderRadius: '999px',
                      border: study.category === 'work' ? '1px solid rgba(6, 214, 160, 0.2)' : '1px solid rgba(129, 140, 248, 0.2)',
                      background: study.category === 'work' ? 'rgba(6, 214, 160, 0.05)' : 'rgba(129, 140, 248, 0.05)',
                      color: study.category === 'work' ? 'var(--accent)' : '#818cf8',
                      marginTop: '-2px'
                    }}
                  >
                    {study.category}
                  </span>
                </div>
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
