import React, { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Bot, 
  Cpu, 
  ChevronDown
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import heroReferenceImg from '../assets/hero-reference.jpg';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      id="hero" 
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6.5rem',
        paddingBottom: '4rem',
        overflow: 'hidden'
      }}
    >
      {/* Ambient decorative blur orbs matching the silver/cyan aesthetic */}
      <div 
        className="glow-orb"
        style={{
          width: '500px',
          height: '500px',
          top: '10%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(2, 132, 199, 0.05) 50%, transparent 75%)'
        }}
      />
      <div 
        className="glow-orb"
        style={{
          width: '400px',
          height: '400px',
          bottom: '10%',
          left: '0%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(14, 165, 233, 0.08) 50%, transparent 75%)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            gap: '3rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          
          {/* ================= LEFT COLUMN: HERO CONTENT ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            
            {/* Status / Specialization Badge */}
            <div 
              className="section-tag"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem'
              }}
            >
              <span 
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981'
                }}
                className="animate-pulse-glow"
              />
              <span>Computer Science Engineer · IoT, Security & Blockchain</span>
            </div>

            {/* Prominent Name Display - Exact Desktop Heading */}
            <div style={{ position: 'relative', marginBottom: '0.35rem' }}>
              <h1 
                style={{
                  fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: '-0.035em',
                  background: 'var(--hero-name-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0,
                  textTransform: 'uppercase',
                  display: 'inline-block'
                }}
              >
                {PERSONAL_INFO.name}
              </h1>
            </div>

            {/* Full Name & Designation */}
            <div 
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                letterSpacing: '0.04em',
                marginBottom: '0.85rem'
              }}
            >
              {PERSONAL_INFO.fullName}
            </div>

            {/* Professional Subtitle - Related to Software Development, AI & ML */}
            <div 
              style={{
                fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                marginBottom: '1.25rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                alignItems: 'center'
              }}
            >
              <span>Software Development</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span>Artificial Intelligence & ML</span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span>Blockchain Engineering</span>
            </div>

            {/* Clean, Stylish Introduction from Resume */}
            <p 
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '580px',
                marginBottom: '2rem'
              }}
            >
              {PERSONAL_INFO.professionalSummary}
            </p>

            {/* Call-to-Action Buttons */}
            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}
            >
              <a href="#projects" className="btn-primary">
                <span>Explore Featured Projects</span>
                <ArrowRight size={18} />
              </a>

              <button onClick={onOpenResume} className="btn-secondary">
                <Download size={18} />
                <span>View Full Resume</span>
              </button>

              <a href="#contact" className="btn-secondary">
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Quick Metrics Bar from Resume */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                gap: '1rem',
                width: '100%',
                maxWidth: '580px',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              {PERSONAL_INFO.stats.map((stat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                  <span 
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)'
                    }}
                  >
                    {stat.value}
                  </span>
                  <span 
                    style={{
                      fontSize: '0.775rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ================= RIGHT COLUMN: REFERENCE IMAGE CENTERPIECE ================= */}
          <div 
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              perspective: '1000px'
            }}
          >
            {/* Interactive 3D Card showcasing the visual reference composition */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glass-card"
              style={{
                width: '100%',
                maxWidth: '580px',
                borderRadius: '1.5rem',
                padding: '0.85rem',
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
                position: 'relative',
                boxShadow: 'var(--card-shadow-hover)',
                background: 'var(--bg-card)'
              }}
            >
              
              {/* Artwork Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '1.15rem',
                  overflow: 'hidden',
                  aspectRatio: '16 / 10.5',
                  background: 'linear-gradient(135deg, #d2dbe5 0%, #eef3f7 100%)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.06)'
                }}
              >
                {/* Reference Image - High Fidelity Rendering */}
                <img
                  src={heroReferenceImg}
                  alt="Soham Vijay Gurav - Futuristic Cyber & Software Systems Reference"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Cyber Scanline Overlay Effect */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 60%, rgba(2,132,199,0.1) 100%)'
                  }}
                />

                {/* Subtle Interactive Status Chip */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(15, 23, 42, 0.7)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  <span 
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#38bdf8'
                    }}
                    className="animate-pulse-glow"
                  />
                  <span>FUTURE-READY TECH ARCHITECTURE</span>
                </div>
              </div>

              {/* Floating Glass Badges around Artwork matching Soham's resume */}
              <div 
                className="glass-card animate-float"
                style={{
                  position: 'absolute',
                  top: '-1.25rem',
                  right: '-1rem',
                  padding: '0.65rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  borderRadius: '1rem',
                  border: '1px solid var(--border-accent)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
                  background: 'var(--bg-card-hover)',
                  zIndex: 20
                }}
              >
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(2, 132, 199, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Blockchain & Web3</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Solidity · Ethereum · Smart Contracts</div>
                </div>
              </div>

              <div 
                className="glass-card animate-float"
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  left: '-1rem',
                  padding: '0.65rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  borderRadius: '1rem',
                  border: '1px solid var(--border-accent)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
                  background: 'var(--bg-card-hover)',
                  animationDelay: '1.5s',
                  zIndex: 20
                }}
              >
                <div 
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <Bot size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>RPA & Process Automation</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>UiPath Studio · Bot Workflows</div>
                </div>
              </div>

              {/* Lower info strip */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.5rem 0.25rem 0.5rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Cpu size={14} color="var(--accent-primary)" />
                  ADCET, Ashta (2023 - 2027)
                </span>
                <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>
                  CGPA 7.3 / 10.0
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Scroll down indicator */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3.5rem'
          }}
        >
          <a 
            href="#about"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
          >
            <span>DISCOVER MY WORK</span>
            <ChevronDown size={18} className="animate-pulse-glow" />
          </a>
        </div>

      </div>
    </section>
  );
};
