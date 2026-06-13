import { profile } from '@/lib/portfolio';
import { FileDown } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
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
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        <a className="nav-resume" href={profile.resume} download>
          <FileDown aria-hidden="true" size={17} />
          <span>Resume</span>
        </a>
      </nav>
    </header>
  );
}
