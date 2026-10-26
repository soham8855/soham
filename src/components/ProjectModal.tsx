import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  RefreshCw, 
  Vote, 
  AlertTriangle, 
  Play 
} from 'lucide-react';
import type { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Simulator state for Inventory Management System
  const [stockItem, setStockItem] = useState({ name: 'Microcontroller Unit ESP32', qty: 14, threshold: 20 });
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [inventoryLogs, setInventoryLogs] = useState<string[]>([
    'System init: Database connection active.',
    'Inventory records synchronized with warehouse registry.'
  ]);

  // Simulator state for E-Voting System
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [blockHeight, setBlockHeight] = useState(19420853);
  const [votesCount, setVotesCount] = useState<{ [key: string]: number }>({
    'Decentralized Campus Council A': 428,
    'Decentralized Campus Council B': 391
  });

  const handleSimulateRestock = () => {
    const newQty = stockItem.qty > 5 ? stockItem.qty - 5 : 45;
    const isAlert = newQty <= stockItem.threshold;
    setStockItem({ ...stockItem, qty: newQty });
    setAlertTriggered(isAlert);
    const newLog = isAlert 
      ? `[ALERT] Low-stock detected for ${stockItem.name}! Stock (${newQty}) <= Threshold (${stockItem.threshold}). Automated reorder alert dispatched!`
      : `[DISPATCH] Inventory transaction updated. Current units: ${newQty}`;
    setInventoryLogs(prev => [newLog, ...prev.slice(0, 4)]);
  };

  const handleCastVote = () => {
    if (!selectedCandidate || hasVoted) return;
    const generatedHash = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setTxHash(generatedHash);
    setHasVoted(true);
    setBlockHeight(prev => prev + 1);
    setVotesCount(prev => ({
      ...prev,
      [selectedCandidate]: prev[selectedCandidate] + 1
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem' }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
          <div>
            <span className="section-tag" style={{ marginBottom: '0.5rem' }}>
              {project.category}
            </span>
            <h3 style={{ fontSize: '1.65rem', color: 'var(--text-primary)', margin: 0 }}>
              {project.title}
            </h3>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Technologies Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '0.3rem 0.75rem',
                borderRadius: '0.5rem',
                background: 'var(--badge-bg)',
                color: 'var(--accent-primary)',
                border: '1px solid var(--badge-border)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Full Resume Description */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.65rem', color: 'var(--text-primary)' }}>
            System Overview
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: 1.7 }}>
            {project.fullDescription}
          </p>
        </div>

        {/* Resume Key Highlights */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            Engineering Contributions & Achievements
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {project.highlights.map((highlight, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.75rem',
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <CheckCircle2 size={18} color="var(--accent-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture & Workflow */}
        {project.architecture && (
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              Architecture & Data Flow
            </h4>
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem'
              }}
            >
              <div 
                style={{
                  padding: '1.25rem',
                  borderRadius: '0.85rem',
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={16} /> CORE COMPONENTS
                </div>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {project.architecture.components.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div 
                style={{
                  padding: '1.25rem',
                  borderRadius: '0.85rem',
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Cpu size={16} /> PIPELINE WORKFLOW
                </div>
                <ol style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {project.architecture.workflow.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE LIVE SYSTEM SIMULATOR */}
        <div 
          style={{
            padding: '1.5rem',
            borderRadius: '1rem',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-accent)',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Play size={16} /> INTERACTIVE ARCHITECTURE SIMULATOR
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Live Interactive Preview</span>
          </div>

          {/* If Inventory Management */}
          {project.id === 'inventory-management' && (
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'var(--bg-card)', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1rem', border: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{stockItem.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Minimum Threshold: {stockItem.threshold} Units</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: stockItem.qty <= stockItem.threshold ? '#ef4444' : '#10b981' }}>
                      {stockItem.qty} Units
                    </div>
                    <div style={{ fontSize: '0.7rem', color: stockItem.qty <= stockItem.threshold ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                      {stockItem.qty <= stockItem.threshold ? 'CRITICAL LOW STOCK' : 'STABLE LEVEL'}
                    </div>
                  </div>
                  <button 
                    onClick={handleSimulateRestock}
                    className="btn-primary"
                    style={{ padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <RefreshCw size={14} /> Simulate Order Outflow
                  </button>
                </div>
              </div>

              {alertTriggered && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', color: '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}>
                  <AlertTriangle size={18} />
                  <span>Automated Alert Triggered: Low-stock notification dispatched to supplier database pipeline!</span>
                </div>
              )}

              {/* Logs */}
              <div style={{ background: 'rgba(0,0,0,0.85)', padding: '0.85rem', borderRadius: '0.5rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                <div style={{ color: '#94a3b8', marginBottom: '0.25rem' }}>// Real-time Database Audit Log Stream:</div>
                {inventoryLogs.map((log, i) => (
                  <div key={i} style={{ opacity: 1 - i * 0.15 }}>&gt; {log}</div>
                ))}
              </div>
            </div>
          )}

          {/* If Swaraajya E-Voting System */}
          {(project.id === 'swaraajya-voting' || project.id === 'e-voting-blockchain') && (
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                    <strong>Swaraajya Consensus Engine:</strong> Cast a simulated cryptographic ballot on-chain to test decentralized ledger immutability & anonymity:
                  </p>
                  <span style={{ fontSize: '0.725rem', fontFamily: 'JetBrains Mono, monospace', background: 'var(--badge-bg)', color: 'var(--accent-primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid var(--badge-border)' }}>
                    Repo: Swaraajya-Voting-main
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                  {Object.entries(votesCount).map(([candidate, count]) => (
                    <div 
                      key={candidate}
                      onClick={() => !hasVoted && setSelectedCandidate(candidate)}
                      style={{
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        background: selectedCandidate === candidate ? 'rgba(2, 132, 199, 0.15)' : 'var(--bg-card)',
                        border: selectedCandidate === candidate ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        cursor: hasVoted ? 'default' : 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {candidate}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Ledger Tally:</span>
                        <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-primary)' }}>{count}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {!hasVoted ? (
                  <button 
                    onClick={handleCastVote}
                    disabled={!selectedCandidate}
                    className="btn-primary"
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      opacity: selectedCandidate ? 1 : 0.5,
                      cursor: selectedCandidate ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <Vote size={18} />
                    <span>Cryptographically Sign & Cast Ballot to Swaraajya Contract</span>
                  </button>
                ) : (
                  <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '0.75rem', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={18} />
                      <span>Ballot Successfully Minted On-Chain (Block #{blockHeight})</span>
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
                      TxHash: <span style={{ color: 'var(--accent-primary)' }}>{txHash}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                      Single-ballot constraint enforced by Swaraajya smart contract logic. Duplicate voting barred.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
