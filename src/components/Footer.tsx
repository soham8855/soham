import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  GraduationCap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="site-footer"
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-light)',
        padding: '3.5rem 0 2rem 0'
      }}
    >
      <div className="container">
        
        {/* Main Footer Row */}
        <div 
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1rem'
                }}
              >
                S
              </div>
              <span 
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  letterSpacing: '0.04em',
                  background: 'var(--hero-name-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {PERSONAL_INFO.name}
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {PERSONAL_INFO.fullName} — Computer Science Engineer specializing in IoT, Cyber Security, Blockchain, and Process Automation.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <GraduationCap size={16} color="var(--accent-primary)" />
              <span>ADCET Ashta (Class of 2027)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <a href="#about" style={{ color: 'var(--text-secondary)' }}>About Soham</a>
              <a href="#skills" style={{ color: 'var(--text-secondary)' }}>Technical Skills</a>
              <a href="#projects" style={{ color: 'var(--text-secondary)' }}>Academic Projects</a>
              <a href="#education" style={{ color: 'var(--text-secondary)' }}>Education & Qualifications</a>
              <a href="#certifications" style={{ color: 'var(--text-secondary)' }}>Certifications (ECS)</a>
              <a href="#contact" style={{ color: 'var(--text-secondary)' }}>Contact Channels</a>
            </div>
          </div>

          {/* Core Focus Domains */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Focus Areas
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>• Robotic Process Automation (UiPath)</span>
              <span>• Blockchain & Smart Contracts</span>
              <span>• Artificial Intelligence & ML</span>
              <span>• IoT & Embedded Systems</span>
              <span>• Full-Stack Web Development</span>
            </div>
          </div>

          {/* Direct Communication */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Direct Reach
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}
              >
                <Mail size={16} color="var(--accent-primary)" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a 
                href={`tel:${PERSONAL_INFO.phoneRaw}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}
              >
                <Phone size={16} color="#10b981" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <div style={{ marginTop: '0.5rem' }}>
                <span className="section-tag" style={{ margin: 0, fontSize: '0.75rem' }}>
                  Open for 2027 Engineering Opportunities
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>{PERSONAL_INFO.fullName}</strong>. Designed to match frontend reference aesthetic.
          </div>

          <button
            onClick={scrollToTop}
            className="btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 880px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 550px) {
          .site-footer {
            padding: 2.75rem 0 1.5rem 0 !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
            margin-bottom: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
};
