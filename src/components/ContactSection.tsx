import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  onShowToast: (message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Collaboration',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    onShowToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onShowToast('Message transmitted successfully! Soham will get back to you.');
      setFormData({
        name: '',
        email: '',
        subject: 'Project Collaboration',
        message: ''
      });
    }, 1000);
  };

  return (
    <section id="contact" className="section-wrapper" style={{ background: 'var(--bg-card-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Mail size={15} />
            <span>Direct Communication</span>
          </div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Open to software engineering roles, hackathon collaborations, and innovative technology inquiries.
          </p>
        </div>

        {/* Main Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'start'
          }}
          className="contact-grid"
        >
          
          {/* ================= LEFT: DIRECT CONTACT DETAILS ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Email Card */}
            <div 
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: '4px solid var(--accent-primary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    DIRECT EMAIL
                  </div>
                  <a 
                    href={`mailto:${PERSONAL_INFO.email}`}
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      textDecoration: 'none'
                    }}
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'Email')}
                  aria-label="Copy Email"
                  style={{
                    padding: '0.6rem',
                    borderRadius: '0.5rem',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: copiedField === 'Email' ? '#10b981' : 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                  title="Copy email to clipboard"
                >
                  {copiedField === 'Email' ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="btn-primary"
                  style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div 
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderLeft: '4px solid #10b981'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    PHONE NUMBER
                  </div>
                  <a 
                    href={`tel:${PERSONAL_INFO.phoneRaw}`}
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      textDecoration: 'none'
                    }}
                  >
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'Phone number')}
                  aria-label="Copy Phone"
                  style={{
                    padding: '0.6rem',
                    borderRadius: '0.5rem',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: copiedField === 'Phone number' ? '#10b981' : 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                  title="Copy phone to clipboard"
                >
                  {copiedField === 'Phone number' ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <a
                  href={`tel:${PERSONAL_INFO.phoneRaw}`}
                  className="btn-primary"
                  style={{ padding: '0.6rem 0.85rem', fontSize: '0.8rem' }}
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Academic & Geographic Location */}
            <div 
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}
            >
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'var(--badge-bg)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>
                  CAMPUS / RESIDENCE
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  {PERSONAL_INFO.location}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {PERSONAL_INFO.institution}
                </div>
              </div>
            </div>

            {/* Quick Status Pill */}
            <div 
              className="glass-card"
              style={{
                padding: '1.25rem 1.75rem',
                background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(56, 189, 248, 0.05) 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                border: '1px solid var(--border-accent)'
              }}
            >
              <span 
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }}
                className="animate-pulse-glow"
              />
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Available for internships, technical discussions & full-time roles (2027)
              </span>
            </div>

          </div>

          {/* ================= RIGHT: INTERACTIVE CONTACT FORM ================= */}
          <div 
            className="glass-card"
            style={{
              padding: '2.5rem'
            }}
          >
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Send a Direct Message
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Fill out the form below to reach Soham directly for projects, inquiries, or discussions.
              </p>
            </div>

            {submitted ? (
              <div 
                style={{
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  background: 'var(--bg-card-subtle)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                <div 
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h4 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Message Received!
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '420px', margin: '0 auto 1.5rem auto' }}>
                  Thank you for reaching out. Soham Vijay Gurav has been notified and will respond via email shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ padding: '0.65rem 1.5rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.6rem',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-card-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.6rem',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-card-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                </div>

                {/* Subject Selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Purpose of Message
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.6rem',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-card-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Project Collaboration">Project Collaboration</option>
                    <option value="Internship / Role Inquiry">Internship / Full-Time Role (2027)</option>
                    <option value="Blockchain & Web3 Consulting">Blockchain & Smart Contracts</option>
                    <option value="RPA Automation Discussion">RPA & UiPath Bot Development</option>
                    <option value="Other Inquiries">General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Message Content *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your note or project description here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.6rem',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-card-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Submit button */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message to Soham'}</span>
                  </button>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message || 'Hi Soham,\n\nI reviewed your portfolio and would like to connect.')}`}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontSize: '0.85rem'
                    }}
                  >
                    <ExternalLink size={15} />
                    <span>Open in Default Mail App (Pre-filled)</span>
                  </a>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr 1.25fr !important;
          }
        }
      `}</style>
    </section>
  );
};
