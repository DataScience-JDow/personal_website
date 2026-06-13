import React from 'react';
import { sql } from '@/lib/db';

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  description: string;
  featured: boolean;
}

interface GroupedSkills {
  [category: string]: Skill[];
}

export default async function Skills() {
  let skills: Skill[] = [];

  try {
    skills = await sql<Skill[]>`
      SELECT id, name, category, proficiency, description, featured
      FROM portfolio.skills
      ORDER BY category, proficiency DESC
    `;
  } catch (error) {
    console.error('Failed to fetch skills from database:', error);
  }

  // Group skills by category
  const groupedSkills = skills.reduce<GroupedSkills>((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(groupedSkills);

  return (
    <section className="skills-section container" id="skills" style={{ paddingBlock: 'var(--space-xl)' }}>
      <div className="section-header" style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
        <h2 className="section-title text-glow" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Detailed <span className="text-gradient">Skills</span>
        </h2>
        <p className="section-subtitle" style={{ color: 'var(--text-muted)', marginTop: 'var(--space-xs)', maxWidth: '600px', marginInline: 'auto' }}>
          Details on my core capabilities and real-world application, expanding beyond what fits on my LinkedIn profile. Click any skill to learn more.
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="skills-categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-md)' }}>
          {categories.map((category) => (
            <div key={category} className="skills-category-group glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <h3 className="category-title" style={{ fontSize: '1.25rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: 'var(--space-xs)', marginBottom: 'var(--space-xs)' }}>
                {category}
              </h3>
              
              <div className="skills-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {groupedSkills[category].map((skill) => (
                  <details 
                    key={skill.id} 
                    className="skill-disclosure"
                  >
                    <summary className="skill-summary">
                      <div className="skill-name-group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                        <span className="skill-name">{skill.name}</span>
                        {skill.featured && (
                          <span className="tag" style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem' }}>Core</span>
                        )}
                      </div>
                      <div className="skill-proficiency-indicator" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                        <span className="proficiency-pct" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                          {skill.proficiency}%
                        </span>
                      </div>
                    </summary>
                    <div className="skill-disclosure-content" style={{ marginTop: '0.5rem', padding: '0.5rem 0.25rem 0.25rem', color: 'var(--text-muted)', fontSize: '0.875rem', borderTop: '1px dashed var(--surface-border)' }}>
                      <div className="skill-progress-bar" style={{ height: '4px', width: '100%', background: 'var(--surface-border)', borderRadius: '2px', marginBottom: '0.75rem', overflow: 'hidden' }}>
                        <div 
                          className="skill-progress-fill" 
                          style={{ 
                            height: '100%', 
                            width: `${skill.proficiency}%`, 
                            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                            borderRadius: '2px'
                          }}
                        />
                      </div>
                      <p style={{ lineHeight: 1.5 }}>{skill.description}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state glass-card" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
          <p>No skills found in database. Run the migration script to populate data.</p>
        </div>
      )}
    </section>
  );
}
