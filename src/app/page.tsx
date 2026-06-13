import React from 'react';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {/* 1. Hero / Intro Section */}
      <Hero />
      
      {/* 2. Portfolio Projects Showcase (Server Component) */}
      <Projects />
      
      {/* 3. Skill Capabilities Grid (Server Component) */}
      <Skills />
      
      {/* 4. Form for messages (Client Component) */}
      <ContactForm />
    </div>
  );
}
