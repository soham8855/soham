import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  FileText, 
  Send
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  theme: 'silver' | 'dark';
  toggleTheme: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--bg-navbar)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.08)' : 'none',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <a 
          href="#hero" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.65rem',
            textDecoration: 'none' 
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.05rem',
              boxShadow: '0 4px 12px var(--accent-glow)'
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '0.04em',
                background: 'var(--hero-name-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1
              }}
            >
              {PERSONAL_INFO.name}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                fontWeight: 600,
                textTransform: 'uppercase',
                marginTop: '2px'
              }}
            >
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  position: 'relative',
                  padding: '0.35rem 0',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent-primary)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions (Desktop) */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.85rem'
          }}
          className="desktop-actions"
        >
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            style={{
              padding: '0.55rem',
              borderRadius: '0.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            title={theme === 'silver' ? 'Switch to Dark Mode' : 'Switch to Silver Reference Theme'}
          >
            {theme === 'silver' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="btn-secondary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
          >
            <FileText size={15} />
            <span>Resume</span>
          </button>

          {/* Contact Direct CTA */}
          <a
            href="#contact"
            className="btn-primary"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
          >
            <Send size={15} />
            <span>Let's Talk</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mobile-only-controls">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {theme === 'silver' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu"
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card-hover)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              {link.label}
            </a>
          ))}

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="btn-secondary"
              style={{ flex: 1, padding: '0.75rem' }}
            >
              <FileText size={16} /> Resume
            </button>

            <a
              href="#contact"
              onClick={handleLinkClick}
              className="btn-primary"
              style={{ flex: 1, padding: '0.75rem' }}
            >
              <Send size={16} /> Contact
            </a>
          </div>
        </div>
      )}

      {/* Style hook for responsive navbar visibility */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-only-controls { display: none !important; }
        }
      `}</style>
    </header>
  );
};
