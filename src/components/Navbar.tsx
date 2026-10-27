import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  FileText, 
  Send,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  theme: 'silver' | 'dark';
  toggleTheme: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['hero', 'about', 'skills', 'projects', 'education', 'certifications', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 860) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled || mobileMenuOpen ? 'var(--bg-navbar)' : 'transparent',
        backdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || mobileMenuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || mobileMenuOpen ? '1px solid var(--border-light)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.08)' : 'none',
        padding: scrolled ? '0.75rem 0' : '1.15rem 0',
        width: '100%'
      }}
    >
      <div 
        className="container" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          width: '100%' 
        }}
      >
        
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
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
              boxShadow: '0 4px 12px var(--accent-glow)',
              flexShrink: 0
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
          className="desktop-nav"
          style={{
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
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

        {/* Action Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              padding: '0.55rem',
              borderRadius: '0.6rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              minWidth: '40px',
              minHeight: '40px'
            }}
            title={theme === 'silver' ? 'Switch to Dark Mode' : 'Switch to Silver Theme'}
          >
            {theme === 'silver' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Desktop Resume CTA */}
          <button
            onClick={onOpenResume}
            className="btn-secondary desktop-only-btn"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
          >
            <FileText size={15} />
            <span>Resume</span>
          </button>

          {/* Contact Direct CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#contact');
            }}
            className="btn-primary desktop-only-btn"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
          >
            <Send size={15} />
            <span>Let's Talk</span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="mobile-hamburger-btn"
            style={{
              padding: '0.55rem',
              borderRadius: '0.6rem',
              background: mobileMenuOpen ? 'var(--badge-bg)' : 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: mobileMenuOpen ? 'var(--accent-primary)' : 'var(--text-primary)',
              display: 'none', // Handled via CSS media query below
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              minWidth: '40px',
              minHeight: '40px'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* ================= MOBILE DROPDOWN DRAWER ================= */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-modal)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-accent)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            padding: '1.25rem 1.5rem 1.75rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.65rem',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-primary)',
                    background: isActive ? 'var(--badge-bg)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && <Sparkles size={16} color="var(--accent-primary)" />}
                </a>
              );
            })}
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.75rem', 
              paddingTop: '0.75rem', 
              borderTop: '1px solid var(--border-subtle)' 
            }}
          >
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="btn-secondary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
            >
              <FileText size={16} />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.85rem' }}
            >
              <Send size={16} />
              <span>Let's Talk</span>
            </a>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav {
          display: flex;
        }
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-only-btn {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};
