import {
  heroActions,
  profile,
  proofPoints,
  recruiterHooks,
} from '@/lib/portfolio';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import AnimatedProofStrip from './AnimatedProofStrip';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <>
      <section className="hero-section container" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1 id="hero-title">
            <span className="gradient-text">{profile.headline}</span>
          </h1>

          <div className="hero-intro">
            <p className="hero-summary">{profile.summary}</p>

            <div className="hero-actions" aria-label="Primary recruiter actions">
              {heroActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    className="button"
                    data-variant={action.label === 'Download Resume' ? 'primary' : 'secondary'}
                    download={action.href.endsWith('.pdf') ? true : undefined}
                    href={action.href}
                    key={action.label}
                    rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    target={action.href.startsWith('http') ? '_blank' : undefined}
                  >
                    <Icon aria-hidden="true" size={18} />
                    <span>{action.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="hero-profile" aria-label="Jeremy Dowdy profile summary">
          <div className="hero-visual">
            <Image
              alt="Data architecture visualization showing interconnected systems"
              fill
              priority
              src="/hero-visual.png"
              sizes="(max-width: 980px) 320px, 480px"
              style={{ objectFit: 'cover' }}
            />
            <div className="hero-portrait">
              <Image
                alt="Jeremy Dowdy"
                height={80}
                priority
                src="/jeremy-dowdy-headshot.jpg"
                width={80}
              />
            </div>
          </div>
          <div className="hero-focus">
            <span>Currently</span>
            <p>Data Scientist at HOLT CAT, leading pricing intelligence, Fabric migration work, and AI-assisted delivery.</p>
            <a href="#experience">
              <span>See career arc</span>
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </aside>
      </section>

      <section className="recruiter-snapshot container" aria-label="Recruiter snapshot">
        <ScrollReveal>
          <div className="snapshot-copy">
            <p className="eyebrow">What I bring to the table</p>
            <h2>Operational context, technical depth, and a record of turning analysis into systems.</h2>
          </div>
        </ScrollReveal>

        <div className="snapshot-grid">
          {recruiterHooks.map((hook) => (
            <ScrollReveal key={hook.title}>
              <article className="snapshot-card">
                <h3>{hook.title}</h3>
                <p>{hook.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <AnimatedProofStrip proofPoints={proofPoints} />
      </section>
    </>
  );
}
