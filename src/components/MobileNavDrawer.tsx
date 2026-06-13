'use client';

import { useEffect } from 'react';
import { FileDown, Menu, X, ExternalLink, Mail } from 'lucide-react';
import { Github } from '@/components/icons';
import { profile } from '@/lib/portfolio';

const navItems = [
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="mobile-menu-btn" onClick={onClick} aria-label="Open menu">
      <Menu size={20} />
    </button>
  );
}

export default function MobileNavDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className="mobile-drawer-backdrop"
        data-open={isOpen}
        onClick={onClose}
      />
      <nav className="mobile-drawer" data-open={isOpen} aria-label="Mobile navigation">
        <div className="mobile-drawer-header">
          <strong>Menu</strong>
          <button className="mobile-drawer-close" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="mobile-drawer-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={onClose}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="mobile-drawer-actions">
          <a className="button" data-variant="primary" href={profile.resume} download>
            <FileDown aria-hidden="true" size={18} />
            <span>Download Resume</span>
          </a>
          <a className="button" data-variant="secondary" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <ExternalLink aria-hidden="true" size={18} />
            <span>LinkedIn</span>
          </a>
          <a className="button" data-variant="secondary" href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a className="button" data-variant="secondary" href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" size={18} />
            <span>Email</span>
          </a>
        </div>
      </nav>
    </>
  );
}
