import React from 'react';
import { 
  Award, 
  CheckCircle, 
  Calendar, 
  FileBadge, 
  Terminal 
} from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <Award size={15} />
            <span>Credentials & Recognition</span>
          </div>
          <h2 className="section-title">Certifications & Industry Training</h2>
          <p className="section-subtitle">
            External credentials validating industry standards, development workflows, and engineering quality.
          </p>
        </div>

        {/* Certifications Showcase */}
        <div 
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem'
          }}
        >
          {CERTIFICATIONS.map((cert, index) => (
            <div 
              key={index}
              className="glass-card cert-card-grid"
              style={{
                padding: '2.5rem',
                borderTop: '4px solid #10b981',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '2rem',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
                  <span 
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      color: '#059669',
                      border: '1px solid rgba(16, 185, 129, 0.25)'
                    }}
                  >
                    VERIFIED CREDENTIAL
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} /> Completed: {cert.year}
                  </span>
                </div>

                <h3 
                  style={{
                    fontSize: '1.65rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  {cert.issuer}
                </h3>

                <p 
                  style={{
                    color: 'var(--accent-primary)',
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    marginBottom: '1rem'
                  }}
                >
                  {cert.name}
                </p>

                <p 
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem'
                  }}
                >
                  {cert.description}
                </p>

                {/* Skills Verified */}
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
                    VERIFIED DOMAINS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {cert.skillsCovered.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          padding: '0.3rem 0.75rem',
                          borderRadius: '0.5rem',
                          background: 'var(--bg-card-subtle)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <CheckCircle size={14} color="#10b981" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Credential Seal Card */}
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-card-subtle)',
                  borderRadius: '1.25rem',
                  padding: '2rem',
                  border: '1px solid var(--border-subtle)',
                  textAlign: 'center'
                }}
              >
                <div 
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(2, 132, 199, 0.2) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#059669',
                    marginBottom: '1rem',
                    border: '2px solid rgba(16, 185, 129, 0.4)'
                  }}
                >
                  <FileBadge size={36} />
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  ECS Software
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Industry Technical Program
                </div>

                <div 
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    background: 'var(--bg-card)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--accent-primary)'
                  }}
                >
                  ID: ECS-2025-DEV-SG
                </div>
              </div>

            </div>
          ))}

          {/* Hackathon & Collaborative Highlights banner */}
          <div 
            className="glass-card"
            style={{
              padding: '1.75rem 2rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-hover) 100%)',
              borderLeft: '4px solid var(--accent-primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div 
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--badge-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  flexShrink: 0
                }}
              >
                <Terminal size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>
                  Competitive Hackathons & Collaborative Systems
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>
                  Proven ability to deliver high-integrity functional software solutions in time-constrained team sprints.
                </p>
              </div>
            </div>

            <span 
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                letterSpacing: '0.04em'
              }}
            >
              ADCET CSE LABS
            </span>
          </div>

        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .cert-card-grid {
            grid-template-columns: 1.6fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
