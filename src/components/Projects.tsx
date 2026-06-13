import React from 'react';
import { sql } from '@/lib/db';
import ProjectGrid from './ProjectGrid';
import { Project } from './ProjectDetailModal';

export default async function Projects() {
  let projects: Project[] = [];

  try {
    // Fetch projects sorted by featured first, then newest
    projects = await sql<Project[]>`
      SELECT id, title, description, content, image_url, tags, github_url, live_url, featured, created_at
      FROM portfolio.projects
      ORDER BY featured DESC, created_at DESC
    `;
  } catch (error) {
    console.error('Failed to fetch projects from database:', error);
  }

  return (
    <section className="projects-section container" id="projects" style={{ paddingBlock: 'var(--space-xl)' }}>
      <div className="section-header" style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
        <h2 className="section-title text-glow" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Selected <span className="text-gradient">Projects</span>
        </h2>
        <p className="section-subtitle" style={{ color: 'var(--text-muted)', marginTop: 'var(--space-xs)', maxWidth: '600px', marginInline: 'auto' }}>
          A selection of projects demonstrating full-stack engineering, database isolation, and automated third-party integrations.
        </p>
      </div>

      {projects.length > 0 ? (
        <ProjectGrid projects={projects} />
      ) : (
        <div className="empty-state glass-card" style={{ textAlign: 'center', padding: 'var(--space-lg)' }}>
          <p>No projects found in database. Run the migration script to populate data.</p>
        </div>
      )}
    </section>
  );
}
