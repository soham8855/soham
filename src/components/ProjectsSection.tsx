import React, { useState } from 'react';
import { 
  FolderGit2, 
  ArrowUpRight, 
  CheckCircle2, 
  Activity 
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  onOpenDemo: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenDemo }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projectFilter, setProjectFilter] = useState<'all' | 'automation' | 'blockchain'>('all');

  const filteredProjects = PROJECTS.filter(p => {
    if (projectFilter === 'all') return true;
    if (projectFilter === 'automation') return p.id === 'inventory-management';
    if (projectFilter === 'blockchain') return p.id === 'swaraajya-voting' || p.id === 'e-voting-blockchain';
    return true;
  });

  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag">
            <FolderGit2 size={15} />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="section-title">Academic & Systems Projects</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            Authentic implementations extracted from my academic resume, highlighting database automation and decentralized security systems.
          </p>

          {/* Quick Filter Tabs - Exact Desktop Inline Flex */}
          <div style={{ display: 'inline-flex', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.35rem', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
            <button
              onClick={() => setProjectFilter('all')}
              className={projectFilter === 'all' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem', borderRadius: '0.5rem' }}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              onClick={() => setProjectFilter('automation')}
              className={projectFilter === 'automation' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem', borderRadius: '0.5rem' }}
            >
              Python & Automation
            </button>
            <button
              onClick={() => setProjectFilter('blockchain')}
              className={projectFilter === 'blockchain' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem', borderRadius: '0.5rem' }}
            >
              Blockchain & Web3
            </button>
          </div>
        </div>

        {/* Projects Grid - Exact Desktop 2-Column Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2.5rem'
          }}
        >
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2.25rem',
                borderTop: `4px solid ${project.accentColor}`,
                position: 'relative'
              }}
            >
              <div>
                {/* Header Category & Index */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span className="section-tag" style={{ margin: 0, fontSize: '0.75rem' }}>
                    {project.category}
                  </span>
                  <span 
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--text-muted)',
                      opacity: 0.6
                    }}
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* Project Title */}
                <h3 
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.3
                  }}
                >
                  {project.title}
                </h3>

                {/* Short Description */}
                <p 
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem'
                  }}
                >
                  {project.shortDescription}
                </p>

                {/* Key Highlights from Resume */}
                <div style={{ marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <CheckCircle2 size={16} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Metrics Badges */}
                {project.metrics && (
                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: '0.75rem',
                      marginBottom: '1.75rem',
                      padding: '0.85rem 1rem',
                      borderRadius: '0.75rem',
                      background: 'var(--bg-card-subtle)',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {project.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {m.label}
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '2px' }}>
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Tech Chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                  {project.technologies.map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.65rem',
                        borderRadius: '0.4rem',
                        background: 'var(--badge-bg)',
                        color: 'var(--accent-primary)',
                        border: '1px solid var(--badge-border)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Interactive Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      if (project.id === 'swaraajya-voting') {
                        onOpenDemo('swaraajya-voting');
                      } else {
                        setSelectedProject(project);
                      }
                    }}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.8rem', fontWeight: 700 }}
                  >
                    <Activity size={16} />
                    <span>
                      {project.id === 'swaraajya-voting' ? 'Launch Swaraajya Working Demo' : 'Architecture Deep Dive & Demo'}
                    </span>
                    <ArrowUpRight size={16} />
                  </button>

                  {project.id === 'swaraajya-voting' && (
                    <a
                      href="http://localhost:5174"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <span>Open Standalone App (Port 5174)</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep dive modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};
