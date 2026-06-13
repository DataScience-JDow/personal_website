import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero-section container" id="about">
      <div className="hero-content">
        <span className="hero-tagline tag">Available for Opportunities</span>
        <h1 className="hero-title">
          Hi, I&apos;m <span className="text-gradient">Jeremy Dowdy</span>.
          <br />
          I build high-performance full-stack web applications.
        </h1>
        <p className="hero-description">
          A software engineer specializing in Next.js, Node.js, and robust backend integrations. I architect isolated, multi-environment PostgreSQL databases using Supabase and connect automated third-party APIs (Plaid, Square) to deliver secure, production-grade systems.
        </p>
        <div className="hero-ctas">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in touch
          </a>
        </div>
      </div>
      <div className="hero-visual-container">
        <div className="hero-visual-outline">
          <Image 
            src="/hero-visual.png" 
            alt="Futuristic Tech Schema Lattice Visual Illustration" 
            width={600} 
            height={600}
            className="hero-image"
            priority
          />
        </div>
      </div>
    </section>
  );
}
