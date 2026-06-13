import React from 'react';

export default function Navbar() {
  return (
    <header className="navbar-container">
      <nav className="navbar container">
        <a href="#" className="navbar-logo">
          JD<span className="text-gradient">.</span>
        </a>
        
        <ul className="navbar-links">
          <li>
            <a href="#about" className="navbar-link">About</a>
          </li>
          <li>
            <a href="#projects" className="navbar-link">Projects</a>
          </li>
          <li>
            <a href="#skills" className="navbar-link">Skills</a>
          </li>
          <li>
            <a href="#contact" className="navbar-link">Contact</a>
          </li>
        </ul>
        
        <div className="navbar-actions">
          <a href="#contact" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
