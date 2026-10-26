import React, { useState } from 'react';
import { 
  Terminal, 
  Search, 
  Bot, 
  Code, 
  Globe, 
  ShieldCheck, 
  Wrench, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return <Bot size={18} />;
      case 'Code': return <Code size={18} />;
      case 'Globe': return <Globe size={18} />;
      case 'ShieldCheck': return <ShieldCheck size={18} />;
      case 'Wrench': return <Wrench size={18} />;
      default: return <Layers size={18} />;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.map(category => {
    const matchesTab = activeTab === 'all' || category.title.toLowerCase().includes(activeTab.toLowerCase());
    if (!matchesTab) return null;

    const filteredSkills = category.skills.filter(skill =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (searchQuery.trim() !== '' && filteredSkills.length === 0) {
      return null;
    }

    return {
      ...category,
      skills: filteredSkills
    };
  }).filter(Boolean);

  return (
    <section id="skills" className="section-wrapper" style={{ background: 'var(--bg-card-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <div className="section-tag">
            <Terminal size={15} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Core stack competencies documented directly from practical academic projects, lab research, and enterprise tooling.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Category Tabs */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <button
              onClick={() => setActiveTab('all')}
              className={activeTab === 'all' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(cat.title)}
                className={activeTab === cat.title ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Real-time Search Input */}
          <div 
            className="glass-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search skill (e.g. UiPath, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                width: '100%'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div 
                key={category!.title}
                className="glass-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  position: 'relative'
                }}
              >
                {/* Category Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div 
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'var(--badge-bg)',
                        color: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--badge-border)'
                      }}
                    >
                      {getCategoryIcon(category!.icon)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                        {category!.title}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {category!.skills.length} Technical Units
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills List within Category */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {category!.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: '0.75rem',
                        background: 'var(--bg-card-subtle)',
                        border: '1px solid var(--border-subtle)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {skill.name}
                        </span>
                        <span 
                          style={{
                            fontSize: '0.725rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.55rem',
                            borderRadius: '9999px',
                            background: 'var(--badge-bg)',
                            color: 'var(--badge-text)',
                            border: '1px solid var(--badge-border)'
                          }}
                        >
                          {skill.level}
                        </span>
                      </div>

                      {skill.description && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                          {skill.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            ))
          ) : (
            <div 
              className="glass-card"
              style={{
                gridColumn: '1 / -1',
                padding: '3rem',
                textAlign: 'center',
                color: 'var(--text-muted)'
              }}
            >
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No matching skills found for "{searchQuery}".</p>
              <button onClick={() => setSearchQuery('')} className="btn-secondary">
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Stack Highlight Footer */}
        <div 
          className="glass-card"
          style={{
            marginTop: '3rem',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles size={20} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Resume Verified Tech Stack
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['UiPath Studio', 'Python', 'Solidity', 'Ethereum', 'React.js', 'Web3.js', 'Hardhat', 'Git & VS Code'].map((item, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '0.5rem',
                  background: 'var(--badge-bg)',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--badge-border)'
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
