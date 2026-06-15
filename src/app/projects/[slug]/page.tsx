import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import {
  caseStudies,
  getCaseStudyById,
  getPublicProofPageBySlug,
  publicProofPages,
} from '@/lib/portfolio';

type ProjectProofPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return publicProofPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: ProjectProofPageProps): Promise<Metadata> {
  const { slug } = await params;
  const proofPage = getPublicProofPageBySlug(slug);

  if (!proofPage) {
    return {};
  }

  const study = getCaseStudyById(proofPage.studyId);

  return {
    title: `${study?.title ?? 'Project Proof'} | Jeremy Dowdy`,
    description: proofPage.recruiterAngle,
  };
}

export default async function ProjectProofPage({ params }: ProjectProofPageProps) {
  const { slug } = await params;
  const proofPage = getPublicProofPageBySlug(slug);

  if (!proofPage) {
    notFound();
  }

  const study = caseStudies.find((item) => item.id === proofPage.studyId);

  if (!study) {
    notFound();
  }

  return (
    <main className="project-proof-page">
      <section className="project-proof-hero container">
        <Link className="back-link" href="/#public-proof">
          <ArrowLeft aria-hidden="true" size={16} />
          <span>Back to portfolio</span>
        </Link>

        <div className="project-proof-shell">
          <div className="project-proof-copy">
            <p className="eyebrow">{proofPage.eyebrow}</p>
            <h1>{study.title}</h1>
            <p className="project-proof-strapline">{proofPage.strapline}</p>
            <p className="project-proof-summary">{proofPage.publicSummary}</p>

            <div className="tag-list">
              {study.stack.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="project-proof-sidebar">
            <div className="project-proof-panel">
              <span className="project-proof-panel-label">Role</span>
              <p>{study.role}</p>
            </div>
            <div className="project-proof-panel">
              <span className="project-proof-panel-label">Status</span>
              <p>{proofPage.status}</p>
            </div>
            <div className="project-proof-panel">
              <span className="project-proof-panel-label">Availability</span>
              <p>{proofPage.repositoryStatus}</p>
            </div>
            <div className="project-proof-panel">
              <span className="project-proof-panel-label">Recruiter read</span>
              <p>{proofPage.recruiterAngle}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="container project-proof-metrics" aria-label="Project proof metrics">
        {proofPage.metrics.map((metric) => (
          <article className="project-proof-metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="section container">
        <div className="section-heading">
          <p className="eyebrow">System context</p>
          <h2>
            <span className="gradient-text">What problem this project actually solves.</span>
          </h2>
          <p>{proofPage.challenge}</p>
        </div>

        <div className="project-proof-columns">
          <article className="project-proof-card">
            <h3>Operating constraints</h3>
            <ul className="project-proof-list">
              {proofPage.constraints.map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="project-proof-card">
            <h3>Why it belongs in the portfolio</h3>
            <p>{study.proof}</p>
            <p className="project-proof-card-note">
              It shows the decision-making, system design, and implementation signal behind the
              build without exposing private customer or financial records.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Architecture</p>
            <h2>
              <span className="gradient-text">How I structured the build.</span>
            </h2>
            <p>
              The goal is not to show every file. It is to make the operational design legible to a
              recruiter or hiring manager in a few minutes.
            </p>
          </div>

          <div className="project-architecture-grid">
            {proofPage.architecture.map((item) => (
              <article className="project-proof-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="project-proof-columns">
          <article className="project-proof-card">
            <h3>Product and data decisions</h3>
            <ul className="project-proof-list">
              {proofPage.productDecisions.map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="project-proof-card">
            <h3>What a public reviewer can verify</h3>
            <ul className="project-proof-list">
              {proofPage.publicProof.map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <p className="eyebrow">Future iterations</p>
          <h2>
            <span className="gradient-text">What I would expand next.</span>
          </h2>
        </div>

        <div className="project-proof-next">
          {proofPage.nextIterations.map((item) => (
            <article className="project-proof-next-item" key={item}>
              <ArrowUpRight aria-hidden="true" size={16} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
