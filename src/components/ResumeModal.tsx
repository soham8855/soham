import React from 'react';
import { 
  X, 
  Printer, 
  Download,
  FileText 
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  EDUCATION_HISTORY, 
  PROJECTS, 
  CERTIFICATIONS 
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTextCV = () => {
    const resumeText = `SOHAM VIJAY GURAV
(+91) 90606 05029 | guravsoham8855@gmail.com

PROFESSIONAL SUMMARY
Final-year Computer Science Engineering student specializing in IoT, Cyber Security, and Blockchain Technology. Demonstrates foundational proficiency in UI Path (RPA) design, Python, and web application development. Proven ability to contribute to full-stack systems and deliver functional solutions in collaborative, time-constrained environments such as academic projects and competitive hackathons.

EDUCATION
B-Tech – Computer Science (IoT, Cyber Security & Blockchain) · Annasaheb Dange College of Engineering & Technology, Ashta
Specialization: IoT, Cyber Security & Blockchain Technology | CGPA: 7.3 / 10.0 | 2023 – May 2027

HSC (XII) – Science · Ligade Patil Jr College of Science | Percentage: 68% | 2023

SSC (X) – Yashwantrao Chavan Vidyalay Yashwanagar | Percentage: 67% | 2021

CERTIFICATIONS
ECS Software Technologies PVT LTD (2025)

TECHNICAL SKILLS
RPA & Automation: UiPath Studio, Process Automation, Workflow Design, Bot Development
Languages: Python (Fundamentals), Java (Fundamentals), JavaScript (Basic)
Web Development: HTML, CSS, JavaScript, Responsive Design, Basic React.js
Blockchain: Solidity (Fundamentals), DApp Concepts, Ethereum, Smart Contracts, Hardhat, Web3.js
Developer Tools: Git, GitHub, VS Code, UiPath

ACADEMIC PROJECTS
Inventory Management System | Python · Database Management · Automation
• Developed a comprehensive inventory tracking platform to manage stock levels, product data, and order records; automated low-stock and reorder alerts to minimize manual monitoring overhead.
• Implemented data entry and reporting workflows that improved operational accuracy, reduced human error in record management, and streamlined day-to-day inventory operations.

Swaraajya — Blockchain-Based E-Voting System (Swaraajya-Voting) | Solidity · Hardhat · React.js · Ethereum · Web3.js · MetaMask
• Developed "Swaraajya", a tamper-proof decentralized voting platform where each vote is recorded as an immutable blockchain transaction, eliminating unauthorized manipulation and single points of failure.
• Supported implementation of cryptographic voter authentication to prevent duplicate submissions while maintaining voter anonymity and enabling transparent, real-time result auditability.
• Integrated responsive React.js frontend with Web3.js provider to enable seamless, cryptographically verified voter interaction.

AREAS OF INTEREST
Web Development & UI Design · RPA & Process Automation (UiPath) · Artificial Intelligence & Machine Learning · IoT Solutions · Blockchain & Decentralized Applications
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Soham_Vijay_Gurav_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast('Resume downloaded successfully!');
  };

  const handleCopySummary = () => {
    const text = `SOHAM VIJAY GURAV\nPhone: ${PERSONAL_INFO.phone}\nEmail: ${PERSONAL_INFO.email}\nInstitution: ${PERSONAL_INFO.institution}\nDegree: ${PERSONAL_INFO.degree} (CGPA: ${PERSONAL_INFO.cgpa})\nSummary: ${PERSONAL_INFO.professionalSummary}`;
    navigator.clipboard.writeText(text);
    onShowToast('Resume summary copied to clipboard!');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content print-resume-area" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '850px',
          padding: '2.5rem',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)'
        }}
      >
        
        {/* Top Modal Controls (Hidden in Print) */}
        <div 
          className="no-print" 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '2rem', 
            borderBottom: '1px solid var(--border-subtle)', 
            paddingBottom: '1rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <FileText size={20} color="var(--accent-primary)" />
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>Resume Curriculum Vitae</span>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handlePrint}
              className="btn-primary"
              style={{ padding: '0.5rem 0.95rem', fontSize: '0.85rem' }}
            >
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>
            <button 
              onClick={handleDownloadTextCV}
              className="btn-secondary"
              style={{ padding: '0.5rem 0.95rem', fontSize: '0.85rem' }}
            >
              <Download size={15} />
              <span>Download (.txt)</span>
            </button>
            <button 
              onClick={handleCopySummary}
              className="btn-secondary"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            >
              <span>Copy</span>
            </button>
            <button 
              onClick={onClose}
              aria-label="Close resume"
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ================= RESUME DOCUMENT CONTENT ================= */}
        <div style={{ padding: '0 0.5rem' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid var(--accent-primary)', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
            <h1 
              style={{ 
                fontSize: '2.2rem', 
                fontWeight: 800, 
                letterSpacing: '0.04em',
                marginBottom: '0.5rem',
                color: 'var(--text-primary)',
                fontFamily: 'Space Grotesk, sans-serif'
              }}
            >
              {PERSONAL_INFO.fullName}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              <span>{PERSONAL_INFO.phone}</span>
              <span>•</span>
              <span>{PERSONAL_INFO.email}</span>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem', marginBottom: '0.75rem', fontWeight: 800 }}>
              Professional Summary
            </h2>
            <p style={{ fontSize: '0.925rem', lineHeight: 1.65, color: 'var(--text-secondary)', textAlign: 'justify' }}>
              {PERSONAL_INFO.professionalSummary}
            </p>
          </div>

          {/* Section: Education */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem', marginBottom: '0.85rem', fontWeight: 800 }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {EDUCATION_HISTORY.map((edu, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {edu.degree} · <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{edu.institution}</span>
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {edu.period}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    <span>{edu.field || 'General Sciences'}</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>
                      {edu.scoreType}: {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Certifications */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem', marginBottom: '0.75rem', fontWeight: 800 }}>
              Certifications
            </h2>
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {cert.issuer}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {cert.year}
                </span>
              </div>
            ))}
          </div>

          {/* Section: Technical Skills */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem', marginBottom: '0.75rem', fontWeight: 800 }}>
              Technical Skills
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
              <div>
                <strong>RPA & Automation:</strong> <span style={{ color: 'var(--text-secondary)' }}>UiPath Studio, Process Automation, Workflow Design, Bot Development</span>
              </div>
              <div>
                <strong>Languages:</strong> <span style={{ color: 'var(--text-secondary)' }}>Python (Fundamentals), Java (Fundamentals), JavaScript (Basic)</span>
              </div>
              <div>
                <strong>Web Development:</strong> <span style={{ color: 'var(--text-secondary)' }}>HTML, CSS, JavaScript, Responsive Design, Basic React.js</span>
              </div>
              <div>
                <strong>Blockchain:</strong> <span style={{ color: 'var(--text-secondary)' }}>Solidity (Fundamentals), DApp Concepts, Ethereum, Smart Contracts, Hardhat, Web3.js</span>
              </div>
              <div>
                <strong>Developer Tools:</strong> <span style={{ color: 'var(--text-secondary)' }}>Git, GitHub, VS Code, UiPath</span>
              </div>
            </div>
          </div>

          {/* Section: Academic Projects */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem', marginBottom: '0.85rem', fontWeight: 800 }}>
              Academic Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {PROJECTS.map((proj) => (
                <div key={proj.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {proj.title}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                      {proj.technologies.join(' · ')}
                    </span>
                  </div>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Areas of Interest */}
          <div>
            <h2 style={{ fontSize: '1.05rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.35rem', marginBottom: '0.75rem', fontWeight: 800 }}>
              Areas of Interest
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Web Development & UI Design · RPA & Process Automation (UiPath) · Artificial Intelligence & Machine Learning · IoT Solutions · Blockchain & Decentralized Applications
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
