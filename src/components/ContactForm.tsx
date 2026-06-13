'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm, ActionState } from '@/app/actions';
import { Send, Loader, AlertCircle, CheckCircle } from 'lucide-react';

const initialState: ActionState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending} 
      className="btn btn-primary"
      style={{ 
        width: '100%', 
        gap: 'var(--space-xs)',
        opacity: pending ? 0.8 : 1,
        cursor: pending ? 'not-allowed' : 'pointer'
      }}
    >
      {pending ? (
        <>
          <Loader size={18} className="animate-spin" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send size={18} />
          <span>Send Message</span>
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <section className="contact-section container" id="contact" style={{ paddingBlock: 'var(--space-xl)' }}>
      <div className="section-header" style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
        <h2 className="section-title text-glow" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Let&apos;s <span className="text-gradient">Connect</span>
        </h2>
        <p className="section-subtitle" style={{ color: 'var(--text-muted)', marginTop: 'var(--space-xs)', maxWidth: '600px', marginInline: 'auto' }}>
          Have an opportunity or a question about my work? Send a direct message into my database board.
        </p>
      </div>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)', alignItems: 'start' }}>
        {/* Info Column */}
        <div className="contact-info glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-xs)' }}>Get In Touch</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Feel free to reach out for contract work, full-time opportunities, or questions regarding my projects. I usually respond within 24 hours.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', borderTop: '1px solid var(--surface-border)', paddingTop: 'var(--space-md)' }}>
            <div>
              <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '2px' }}>Email</strong>
              <a href="mailto:jeremydowdy@gmail.com" style={{ fontSize: '1rem' }}>jeremydowdy@gmail.com</a>
            </div>
            <div>
              <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '2px' }}>Location</strong>
              <span style={{ fontSize: '1rem' }}>Austin, TX (Open to Remote)</span>
            </div>
            <div>
              <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '2px' }}>LinkedIn</strong>
              <a href="https://linkedin.com/in/jeremy-dowdy" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1rem' }}>linkedin.com/in/jeremy-dowdy</a>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <form 
          action={formAction} 
          className="contact-form glass-card" 
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}
        >
          {state.success && state.message && (
            <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', padding: 'var(--space-sm)', borderRadius: 'var(--border-radius-sm)', marginBottom: 'var(--space-xs)' }}>
              <CheckCircle size={18} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{state.message}</p>
            </div>
          )}

          {!state.success && state.error && (
            <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: 'var(--space-sm)', borderRadius: 'var(--border-radius-sm)', marginBottom: 'var(--space-xs)' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{state.error}</p>
            </div>
          )}

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              placeholder="Your Name"
              className="form-input"
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--surface-bg)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="you@example.com"
              className="form-input"
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--surface-border)', background: 'var(--surface-bg)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Message</label>
            <textarea 
              id="message" 
              name="message" 
              required 
              rows={5} 
              placeholder="Hi Jeremy, I'd like to talk about..."
              className="form-input"
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem', 
                borderRadius: 'var(--border-radius-sm)', 
                border: '1px solid var(--surface-border)', 
                background: 'var(--surface-bg)', 
                color: 'var(--text-primary)',
                resize: 'vertical'
              }}
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
