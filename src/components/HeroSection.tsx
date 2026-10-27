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
  const [isHoveringScreen, setIsHoveringScreen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply 3D tilt on larger screens where mouse is active
    if (window.innerWidth < 900) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 10,
      y: (x / rect.width) * 10
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
        paddingBottom: '3.5rem',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Ambient decorative blur orbs */}
      <div 
        className="glow-orb"
        style={{
          width: 'min(500px, 80vw)',
          height: 'min(500px, 80vw)',
          top: '5%',
          right: '0%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, rgba(2, 132, 199, 0.04) 50%, transparent 75%)'
        }}
      />
      <div 
        className="glow-orb"
        style={{
          width: 'min(400px, 70vw)',
          height: 'min(400px, 70vw)',
          bottom: '5%',
          left: '0%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(14, 165, 233, 0.06) 50%, transparent 75%)'
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
            
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

            {/* Prominent Name Display */}
            <div style={{ position: 'relative', marginBottom: '0.35rem', maxWidth: '100%' }}>
              <h1 
                style={{
                  fontSize: 'clamp(2.75rem, 7.5vw, 5.5rem)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.035em',
                  background: 'var(--hero-name-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0,
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  wordBreak: 'break-word'
                }}
              >
                {PERSONAL_INFO.name}
              </h1>
            </div>

            {/* Full Name & Designation */}
            <div 
              style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                letterSpacing: '0.03em',
                marginBottom: '0.85rem'
              }}
            >
              {PERSONAL_INFO.fullName}
            </div>

            {/* Professional Subtitle */}
            <div 
              style={{
                fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)',
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

            {/* Professional Summary from Resume */}
            <p 
              style={{
                fontSize: 'clamp(0.925rem, 2vw, 1.025rem)',
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
              className="hero-cta-group"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                marginBottom: '2.5rem',
                width: '100%'
              }}
            >
              <a href="#projects" className="btn-primary hero-btn">
                <span>Explore Featured Projects</span>
                <ArrowRight size={18} />
              </a>

              <button onClick={onOpenResume} className="btn-secondary hero-btn">
                <Download size={18} />
                <span>View Full Resume</span>
              </button>

              <a href="#contact" className="btn-secondary hero-btn">
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Quick Metrics Bar from Resume */}
            <div 
              className="hero-metrics-bar"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
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
                      fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                      fontWeight: 800,
                      color: 'var(--text-primary)'
                    }}
                  >
                    {stat.value}
                  </span>
                  <span 
                    style={{
                      fontSize: '0.725rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginTop: '2px'
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* ================= RIGHT COLUMN: GLOBE & LAPTOP ARTWORK CENTERPIECE ================= */}
          <div 
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              perspective: '1000px',
              width: '100%'
            }}
          >
            {/* Interactive 3D Card showcasing the visual reference composition */}
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glass-card hero-artwork-card"
              style={{
                width: '100%',
                maxWidth: '560px',
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
                  aspectRatio: '650 / 433',
                  background: 'linear-gradient(135deg, #d2dbe5 0%, #eef3f7 100%)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.06)'
                }}
              >
                {/* Reference Image with Soham's Actual Resume on Laptop Screen */}
                <img
                  src={heroReferenceImg}
                  alt="Soham Vijay Gurav - Futuristic Cyber & Software Systems Reference with Resume on Laptop Screen"
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
                    top: '0.85rem',
                    left: '0.85rem',
                    background: 'rgba(15, 23, 42, 0.78)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    color: '#ffffff',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.725rem',
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
                  <span>PORTFOLIO RESUME DISPLAY · ADCET CSE</span>
                </div>

                {/* Interactive Laptop Screen Glow & Click-to-Expand Layer */}
                <button
                  type="button"
                  onClick={onOpenResume}
                  onMouseEnter={() => setIsHoveringScreen(true)}
                  onMouseLeave={() => setIsHoveringScreen(false)}
                  title="Click laptop display to open full interactive resume"
                  aria-label="Open Soham Vijay Gurav Full Resume"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    clipPath: 'polygon(67.2% 48.3%, 92.5% 49.0%, 91.4% 75.1%, 66.2% 71.4%)',
                    background: isHoveringScreen 
                      ? 'rgba(14, 165, 233, 0.22)' 
                      : 'transparent',
                    boxShadow: isHoveringScreen ? '0 0 25px rgba(56, 189, 248, 0.5)' : 'none',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    padding: 0,
                    margin: 0,
                    transition: 'all 0.25s ease',
                    zIndex: 15
                  }}
                />

                {/* Hover prompt tooltip badge for laptop resume */}
                {isHoveringScreen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '40%',
                      right: '6%',
                      background: 'rgba(15, 23, 42, 0.92)',
                      color: '#ffffff',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '0.6rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      border: '1px solid var(--accent-primary)',
                      pointerEvents: 'none',
                      zIndex: 25,
                      animation: 'fadeIn 0.2s ease-out',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>Click Laptop to View Full CV</span>
                  </div>
                )}
              </div>

              {/* Floating Glass Badges around Artwork */}
              <div 
                className="glass-card animate-float hero-badge-top"
                style={{
                  position: 'absolute',
                  top: '-1rem',
                  right: '0.5rem',
                  padding: '0.55rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border-accent)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
                  background: 'var(--bg-card-hover)',
                  zIndex: 20
                }}
              >
                <div 
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: 'rgba(2, 132, 199, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-primary)' }}>Blockchain & Web3</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>Solidity · Ethereum · Smart Contracts</div>
                </div>
              </div>

              <div 
                className="glass-card animate-float hero-badge-bottom"
                style={{
                  position: 'absolute',
                  bottom: '-1.25rem',
                  left: '0.5rem',
                  padding: '0.55rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  borderRadius: '0.85rem',
                  border: '1px solid var(--border-accent)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
                  background: 'var(--bg-card-hover)',
                  animationDelay: '1.5s',
                  zIndex: 20
                }}
              >
                <div 
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    flexShrink: 0
                  }}
                >
                  <Bot size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-primary)' }}>RPA & Process Automation</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>UiPath Studio · Bot Workflows</div>
                </div>
              </div>

              {/* Lower info strip */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.5rem 0.25rem 0.5rem',
                  fontSize: '0.775rem',
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

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-artwork-card {
            max-width: 500px !important;
            margin: 0 auto;
          }
          .hero-cta-group {
            gap: 0.65rem !important;
          }
          .hero-btn {
            flex: 1 1 auto;
          }
        }
        @media (max-width: 600px) {
          .hero-metrics-bar {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.85rem !important;
          }
          .hero-badge-top {
            display: none !important;
          }
          .hero-badge-bottom {
            display: none !important;
          }
          .hero-btn {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
