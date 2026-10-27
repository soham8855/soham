import React from 'react';
import { 
  User, 
  GraduationCap, 
  Award, 
  Code2, 
  Bot, 
  Cpu, 
  Blocks, 
  Radio, 
  Layout, 
  CheckCircle, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO, AREAS_OF_INTEREST } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout size={22} />;
      case 'Bot': return <Bot size={22} />;
      case 'Cpu': return <Cpu size={22} />;
      case 'Radio': return <Radio size={22} />;
      case 'Blocks': return <Blocks size={22} />;
      default: return <Code2 size={22} />;
    }
  };

  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <User size={15} />
            <span>Background & Mindset</span>
          </div>
          <h2 className="section-title">About Soham</h2>
          <p className="section-subtitle">
            An engineering mindset focused on systems automation, distributed security, and high-performance software.
          </p>
        </div>

        {/* Top Split: Professional Bio + Key Pillars */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.25fr 1fr',
            gap: '2.5rem',
            alignItems: 'stretch',
            marginBottom: '4rem'
          }}
          className="about-split-grid"
        >
          {/* Left: Detailed Story */}
          <div 
            className="glass-card about-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                  color: 'var(--accent-primary)',
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}
              >
                <Sparkles size={20} />
                <span>Final-Year Engineering Perspective</span>
              </div>

              <h3 
                style={{
                  fontSize: 'clamp(1.35rem, 4vw, 1.65rem)',
                  marginBottom: '1.25rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.35
                }}
              >
                Passionate about engineering reliable solutions across physical and decentralized computing layers.
              </h3>

              <p 
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(0.925rem, 2.5vw, 1.025rem)',
                  lineHeight: 1.75,
                  marginBottom: '1.25rem'
                }}
              >
                {PERSONAL_INFO.professionalSummary}
              </p>

              <p 
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(0.925rem, 2.5vw, 1.025rem)',
                  lineHeight: 1.75,
                  marginBottom: '1.5rem'
                }}
              >
                Currently completing my B-Tech in Computer Science at <strong>Annasaheb Dange College of Engineering & Technology, Ashta</strong>, with a rigorous curriculum in IoT, Cyber Security, and Blockchain Technology. My academic tenure combines hands-on robotic process automation (UiPath), smart contract engineering on Ethereum, and Python database systems.
              </p>
            </div>

            {/* Checklist highlights */}
            <div 
              className="about-checklist"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.85rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              {[
                'Hackathon Collaborator',
                'Time-Constrained Execution',
                'Full-Stack Architecture',
                'UiPath Bot Development'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  <CheckCircle size={16} color="var(--accent-primary)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Academic Pillar Card */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            {/* Academic Credential Card */}
            <div 
              className="glass-card about-card"
              style={{
                padding: '2rem',
                borderLeft: '4px solid var(--accent-primary)',
                background: 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span className="section-tag" style={{ margin: 0 }}>
                  <GraduationCap size={14} /> CURRENT EDUCATION
                </span>
                <span 
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    color: 'var(--accent-primary)'
                  }}
                >
                  CGPA 7.3 / 10
                </span>
              </div>

              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                B-Tech in Computer Science
              </h4>
              <p style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                IoT, Cyber Security & Blockchain Technology
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {PERSONAL_INFO.institution}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <span>Duration: 2023 – May 2027</span>
                <span>Final-Year Status</span>
              </div>
            </div>

            {/* Certification Pillar */}
            <div 
              className="glass-card"
              style={{
                padding: '1.75rem',
                borderLeft: '4px solid #10b981',
                background: 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="section-tag" style={{ margin: 0, background: 'rgba(16, 185, 129, 0.1)', color: '#059669', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  <Award size={14} /> CERTIFIED
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Year: 2025
                </span>
              </div>

              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                ECS Software Technologies PVT LTD
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Verified technical credential in professional software engineering workflows, systems implementation, and programming principles.
              </p>
            </div>

            {/* Quick Contact Pill */}
            <div 
              className="glass-card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-card-hover)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  LOCATION
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Ashta / Sangli, Maharashtra
                </div>
              </div>
              <a 
                href="#contact"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <span>Connect</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

          </div>
        </div>

        {/* Bottom: Areas of Interest from Resume */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Areas of Specialization & Interest
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Targeted domains where I apply engineering principles and continuous technical curiosity.
            </p>
          </div>

          <div 
            className="areas-interest-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.25rem'
            }}
          >
            {AREAS_OF_INTEREST.map((area, index) => (
              <div 
                key={index}
                className="glass-card interest-card"
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderTop: `3px solid var(--accent-primary)`
                }}
              >
                <div 
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--badge-bg)',
                    color: 'var(--accent-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--badge-border)',
                    flexShrink: 0
                  }}
                >
                  {getIcon(area.icon)}
                </div>

                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {area.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
