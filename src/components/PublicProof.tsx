import Link from 'next/link';
import { ArrowRight, LockKeyhole, NotebookPen } from 'lucide-react';
import { caseStudies, publicProofPages } from '@/lib/portfolio';
import ScrollReveal from './ScrollReveal';

export default function PublicProof() {
  const proofCards = publicProofPages
    .map((page) => {
      const study = caseStudies.find((item) => item.id === page.studyId);

      if (!study) {
        return null;
      }

      return { page, study };
    })
    .filter(Boolean) as {
    page: (typeof publicProofPages)[number];
    study: (typeof caseStudies)[number];
  }[];

  return (
    <section className="section container" id="public-proof" aria-labelledby="public-proof-title">
      <ScrollReveal>
        <div className="section-heading">
          <p className="eyebrow">Public proof</p>
          <h2 id="public-proof-title">
            <span className="gradient-text">The two projects a recruiter can inspect more deeply right now.</span>
          </h2>
          <p>
            Most of my highest-leverage enterprise work is proprietary. These public case studies
            show how I think when the implementation details can be shared more openly: data model,
            workflow design, backend decisions, and product tradeoffs.
          </p>
        </div>
      </ScrollReveal>

      <div className="public-proof-intro">
        <div className="proof-note">
          <LockKeyhole aria-hidden="true" size={18} />
          <p>
            Enterprise case studies stay on the homepage because the business outcomes are real, but
            the code and underlying data cannot be shared publicly.
          </p>
        </div>
        <div className="proof-note">
          <NotebookPen aria-hidden="true" size={18} />
          <p>
            These deeper pages are where I expose the implementation context I cannot always attach
            to work projects.
          </p>
        </div>
      </div>

      <div className="public-proof-grid">
        {proofCards.map(({ page, study }) => (
          <ScrollReveal key={page.slug}>
            <article className="public-proof-card">
              <div className="public-proof-card-header">
                <p className="case-role">{study.role}</p>
                <h3>{study.title}</h3>
              </div>

              <p className="public-proof-card-summary">{page.strapline}</p>

              <div className="tag-list">
                {study.stack.slice(0, 5).map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>

              <p className="public-proof-card-angle">{page.recruiterAngle}</p>

              <Link className="public-proof-link" href={`/projects/${page.slug}`}>
                <span>Read case study</span>
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
