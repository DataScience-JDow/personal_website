'use client';

import React, { useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Github } from '@/components/icons';
import ProjectDetailModal, { Project } from './ProjectDetailModal';

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Return custom background style/class matching the database seeded project image_url key
  const getProjectBgStyle = (imageUrl: string) => {
    switch (imageUrl) {
      case 'louie_boards':
        return {
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
          borderColor: 'rgba(99, 102, 241, 0.2)'
        };
      case 'budgeting_app':
        return {
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
          borderColor: 'rgba(16, 185, 129, 0.2)'
        };
      case 'antigravity_engine':
        return {
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(244, 63, 94, 0.15) 100%)',
          borderColor: 'rgba(139, 92, 246, 0.2)'
        };
      default:
        return {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          borderColor: 'var(--surface-border)'
        };
    }
  };

  return (
    <>
      <div className="projects-grid">
        {projects.map((project) => {
          const customStyle = getProjectBgStyle(project.image_url);
          
          return (
            <article 
              key={project.id} 
              className="project-card glass-card"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Decorative Visual Header */}
              <div 
                className="project-visual-header" 
                style={{ 
                  height: '140px', 
                  borderRadius: '12px',
                  marginBottom: 'var(--space-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  ...customStyle
                }}
              >
                <span className="project-visual-letter" style={{ fontSize: '3rem', fontWeight: 900, opacity: 0.15 }}>
                  {project.title.substring(0, 2)}
                </span>
              </div>

              <div className="project-card-header" style={{ marginBottom: 'var(--space-xs)' }}>
                {project.featured && (
                  <span className="project-featured-badge" style={{ fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-secondary)' }}>
                    Featured Project
                  </span>
                )}
                <h3 className="project-card-title" style={{ fontSize: '1.25rem', marginTop: '4px' }}>{project.title}</h3>
              </div>

              <p className="project-card-description" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 'var(--space-sm)', flexGrow: 1 }}>
                {project.description}
              </p>

              <div className="project-card-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: 'var(--space-md)' }}>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-card-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <button 
                  onClick={() => setActiveProject(project)}
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={14} />
                </button>
                
                <div className="project-links" style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                  {project.github_url && (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link-icon" 
                      aria-label="GitHub repository"
                      style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.live_url && (
                    <a 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link-icon" 
                      aria-label="Live application"
                      style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ProjectDetailModal 
        project={activeProject} 
        onClose={() => setActiveProject(null)} 
      />
    </>
  );
}
