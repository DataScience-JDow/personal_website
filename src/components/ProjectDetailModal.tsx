'use client';

import React, { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Github } from '@/components/icons';
import { parseMarkdown } from '@/lib/markdown';

export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  tags: string[];
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  created_at: string;
}

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      // Open modal if it isn't already open
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      // Close modal if it is open
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [project]);

  // Handle native cancel events (e.g. Esc key)
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    onClose();
  };

  if (!project) return null;

  return (
    <dialog 
      ref={dialogRef} 
      className="modal-dialog" 
      onCancel={handleCancel}
      onClick={(e) => {
        // Close on backdrop click
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="modal-header">
        <h3 className="modal-title">{project.title}</h3>
        <button 
          onClick={onClose} 
          className="modal-close-btn" 
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="modal-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <div className="modal-body">
        {parseMarkdown(project.content)}
      </div>

      <div className="modal-footer">
        {project.github_url && (
          <a 
            href={project.github_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
          >
            <Github size={18} />
            <span>View Source</span>
          </a>
        )}
        {project.live_url && (
          <a 
            href={project.live_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
          >
            <ExternalLink size={18} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </dialog>
  );
}
