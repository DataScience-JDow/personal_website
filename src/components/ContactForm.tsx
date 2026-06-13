'use client';

import { submitContactForm, type ActionState } from '@/app/actions';
import { CheckCircle2, ExternalLink, LoaderCircle, Mail, Send } from 'lucide-react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Github } from '@/components/icons';
import { profile } from '@/lib/portfolio';
import ScrollReveal from './ScrollReveal';

const initialState: ActionState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="button" data-variant="primary" disabled={pending} type="submit">
      {pending ? <LoaderCircle aria-hidden="true" className="spin" size={18} /> : <Send aria-hidden="true" size={18} />}
      <span>{pending ? 'Sending note' : 'Send note'}</span>
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <section className="section contact-section container" id="contact" aria-labelledby="contact-title">
      <ScrollReveal>
        <div className="contact-panel">
          <div className="contact-copy">
            <p className="eyebrow">Recruiter flow</p>
            <h2 id="contact-title">
              <span className="gradient-text">If this sounds close to the role, I would like to talk.</span>
            </h2>
            <p>
              I am looking for work where data science, analytics engineering, and applied AI are tied
              to real operating decisions. Email and LinkedIn are the fastest ways to reach me.
            </p>
            <div className="contact-actions">
              <a className="button" data-variant="primary" href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" size={18} />
                <span>Email Jeremy</span>
              </a>
              <a className="button" data-variant="secondary" href={profile.linkedin} rel="noopener noreferrer" target="_blank">
                <ExternalLink aria-hidden="true" size={18} />
                <span>LinkedIn</span>
              </a>
              <a className="button" data-variant="secondary" href={profile.github} rel="noopener noreferrer" target="_blank">
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <form action={formAction} className="contact-form">
            <input autoComplete="off" className="bot-field" name="website" tabIndex={-1} type="text" />

            {state.message && (
              <div className="form-status" data-success={state.success}>
                <CheckCircle2 aria-hidden="true" size={18} />
                <span>{state.message}</span>
              </div>
            )}

            {state.error && (
              <div className="form-status" data-success="false">
                <span>{state.error}</span>
              </div>
            )}

            <label>
              <span>Name</span>
              <input autoComplete="name" maxLength={80} name="name" required type="text" />
            </label>

            <label>
              <span>Email</span>
              <input autoComplete="email" maxLength={120} name="email" required type="email" />
            </label>

            <label>
              <span>Message</span>
              <textarea maxLength={1200} minLength={20} name="message" required rows={5} />
            </label>

            <SubmitButton />
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
}
