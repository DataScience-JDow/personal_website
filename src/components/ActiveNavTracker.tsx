'use client';

import { useEffect, useState } from 'react';
import MobileNavDrawer, { MobileMenuButton } from './MobileNavDrawer';
import { FileDown } from 'lucide-react';
import { Github } from '@/components/icons';
import { profile } from '@/lib/portfolio';
import Image from 'next/image';

const navItems = [
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function ActiveNavTracker() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['case-studies', 'capabilities', 'experience', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one with highest intersection ratio
          const best = visible.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActiveSection(`#${best.target.id}`);
        }
      },
      { threshold: 0.15, rootMargin: '-72px 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Primary navigation">
        <a className="nav-brand" href="#top" aria-label="Jeremy Dowdy home">
          <span className="nav-avatar">
            <Image
              alt="Jeremy Dowdy"
              height={38}
              priority
              src="/jeremy-dowdy-headshot.jpg"
              width={38}
            />
          </span>
          <strong>Jeremy Dowdy</strong>
        </a>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-active={activeSection === item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            className="nav-resume"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
          <a className="nav-resume" href={profile.resume} download>
            <FileDown aria-hidden="true" size={17} />
            <span>Resume</span>
          </a>
          <MobileMenuButton onClick={() => setDrawerOpen(true)} />
        </div>
      </nav>

      <MobileNavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
