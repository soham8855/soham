import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  BookOpen 
} from 'lucide-react';
import { EDUCATION_HISTORY } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="section-wrapper" style={{ background: 'var(--bg-card-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <GraduationCap size={15} />
            <span>Academic Milestones</span>
          </div>
          <h2 className="section-title">Education & Qualifications</h2>
          <p className="section-subtitle">
            Formal engineering foundations and secondary academic records extracted directly from my resume.
          </p>
        </div>

        {/* Education Timeline */}
        <div 
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            position: 'relative'
          }}
        >
          {/* Timeline center line for desktop */}
          <div 
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '28px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent-primary) 0%, rgba(148, 163, 184, 0.2) 100%)',
              zIndex: 1
            }}
          />

          {EDUCATION_HISTORY.map((item, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                gap: '1.75rem',
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Timeline Node */}
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: item.isCurrent 
                    ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' 
                    : 'var(--bg-card)',
                  color: item.isCurrent ? '#ffffff' : 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: item.isCurrent ? '0 8px 20px var(--accent-glow)' : 'var(--card-shadow)',
                  border: item.isCurrent ? 'none' : '1px solid var(--border-subtle)',
                  flexShrink: 0
                }}
              >
                <GraduationCap size={24} />
              </div>

              {/* Card Content */}
              <div 
                className="glass-card"
                style={{
                  flex: 1,
                  padding: '2rem',
                  borderLeft: item.isCurrent ? '4px solid var(--accent-primary)' : '1px solid var(--border-light)'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span 
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)'
                      }}
                    >
                      {item.degree}
                    </span>
                    {item.isCurrent && (
                      <span 
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '9999px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#10b981',
                          border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        CURRENT
                      </span>
                    )}
                  </div>

                  <div 
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      color: 'var(--accent-primary)',
                      background: 'var(--badge-bg)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--badge-border)'
                    }}
                  >
                    {item.scoreType}: {item.score}
                  </div>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1.25rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    fontWeight: 500
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <BookOpen size={16} color="var(--accent-primary)" />
                    {item.institution}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                    <Calendar size={16} />
                    {item.period}
                  </span>
                </div>

                {item.field && (
                  <p style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.925rem', marginBottom: '0.75rem' }}>
                    {item.field}
                  </p>
                )}

                {item.details && item.details.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.85rem' }}>
                    {item.details.map((detail, dIdx) => (
                      <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckCircle2 size={15} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
