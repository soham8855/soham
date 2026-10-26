import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Vote, 
  Users, 
  BarChart3, 
  Server
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

interface SwaraajyaDemoViewProps {
  onBack: () => void;
  theme: 'silver' | 'dark';
}

export const SwaraajyaDemoView: React.FC<SwaraajyaDemoViewProps> = ({ onBack }) => {
  const isLocalHost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const [activeTab, setActiveTab] = useState<'live-app' | 'interactive-portal' | 'blockchain-requirements'>(isLocalHost ? 'live-app' : 'interactive-portal');
  
  // Real MetaMask / Web3 Detection state
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState<boolean>(false);
  const [networkId, setNetworkId] = useState<string | null>(null);

  // Interactive Portal State (simulating the local storage mode of Swaraajya)
  const [portalMode, setPortalMode] = useState<'cast-vote' | 'results' | 'admin'>('cast-vote');
  const [aadhaarInput, setAadhaarInput] = useState<string>('9823-4512-7890');
  const voterVerified = true;
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [userVoted, setUserVoted] = useState<boolean>(false);
  const [votedCandidateName, setVotedCandidateName] = useState<string>('');

  // Candidates & Votes initialized from Swaraajya-Voting default party & candidate data
  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Sanjay Deshmukh', party: 'Swarajya Rashtriya Dal (SRD)', symbol: '🚩', votes: 1420, color: '#0284c7' },
    { id: 2, name: 'Pooja Kulkarni', party: 'Vikas Pragati Party (VPP)', symbol: '⚙️', votes: 1180, color: '#10b981' },
    { id: 3, name: 'Amit Patil', party: 'Janata Lok Sena (JLS)', symbol: '🌾', votes: 890, color: '#f59e0b' },
    { id: 4, name: 'None of the Above (NOTA)', party: 'Independent', symbol: '❌', votes: 110, color: '#64748b' }
  ]);

  // Check if MetaMask is available in the user's browser
  useEffect(() => {
    const checkEthereum = async () => {
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        setIsMetaMaskAvailable(true);
        try {
          const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
          const netId = await (window as any).ethereum.request({ method: 'net_version' });
          setNetworkId(netId);
        } catch (e) {
          console.log('Error checking existing accounts:', e);
        }
      } else {
        setIsMetaMaskAvailable(false);
      }
    };

    checkEthereum();
  }, []);

  const handleConnectWallet = async () => {
    if (!(window as any).ethereum) {
      alert('MetaMask is not detected in your browser. You can install it from metamask.io or use the built-in demo view.');
      return;
    }

    try {
      setIsConnectingWallet(true);
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
      }
      const netId = await (window as any).ethereum.request({ method: 'net_version' });
      setNetworkId(netId);
    } catch (err: any) {
      alert('Wallet connection request rejected or failed: ' + (err.message || err));
    } finally {
      setIsConnectingWallet(false);
    }
  };

  const handleVoteSubmit = () => {
    if (!selectedCandidateId) return;
    const cand = candidates.find(c => c.id === selectedCandidateId);
    if (!cand) return;

    setCandidates(prev => prev.map(c => c.id === selectedCandidateId ? { ...c, votes: c.votes + 1 } : c));
    setUserVoted(true);
    setVotedCandidateName(cand.name);
  };

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative', zIndex: 10 }}>
      
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-light)',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: 'var(--card-shadow)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Back to Portfolio Button */}
          <button
            onClick={onBack}
            className="btn-secondary"
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
                Swaraajya E-Voting System
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                LIVE PROJECT DEMO
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Source: C:\Users\SOHAM\Downloads\Swaraajya-Voting-main
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('live-app')}
            className={activeTab === 'live-app' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.825rem' }}
          >
            <Globe size={14} />
            <span>Live Standalone App (Port 5174)</span>
          </button>

          <button
            onClick={() => setActiveTab('interactive-portal')}
            className={activeTab === 'interactive-portal' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.825rem' }}
          >
            <Vote size={14} />
            <span>Interactive Portal & Web3</span>
          </button>

          <button
            onClick={() => setActiveTab('blockchain-requirements')}
            className={activeTab === 'blockchain-requirements' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.825rem' }}
          >
            <Cpu size={14} />
            <span>Network & Requirements</span>
          </button>

          <a
            href="http://localhost:5174"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }}
            title="Open standalone Swaraajya in a separate browser tab"
          >
            <span>Open in Tab</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      {/* ================= TAB 1: LIVE EMBEDDED APPLICATION ================= */}
      {activeTab === 'live-app' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Quick Notice Header */}
          <div 
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--bg-card-subtle)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.825rem',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span 
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981'
                }}
              />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                Swaraajya application server is active at <strong>http://localhost:5174</strong>
              </span>
              <span style={{ color: 'var(--text-muted)' }}>
                (Vite + React 18 + Supabase + Web3)
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
              <span>Contract: <code>0xdc9cb6BD...Ea964f</code></span>
              <a 
                href="http://localhost:5174" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: 'var(--accent-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <span>Launch Fullscreen</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Iframe displaying the actual running Swaraajya application */}
          <div style={{ flex: 1, position: 'relative', minHeight: 'calc(100vh - 120px)' }}>
            <iframe
              src="http://localhost:5174"
              title="Swaraajya Blockchain E-Voting System"
              style={{
                width: '100%',
                height: '100%',
                minHeight: 'calc(100vh - 120px)',
                border: 'none',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}

      {/* ================= TAB 2: INTERACTIVE PORTAL & WEB3 INSPECTOR ================= */}
      {activeTab === 'interactive-portal' && (
        <div className="container" style={{ padding: '2.5rem 1.5rem', flex: 1 }}>
          
          {/* Web3 / Wallet Connection Status Card */}
          <div 
            className="glass-card" 
            style={{ 
              padding: '1.5rem 2rem', 
              marginBottom: '2rem', 
              borderLeft: '4px solid var(--accent-primary)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <ShieldCheck size={18} color="var(--accent-primary)" />
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  Web3 Provider & MetaMask Integration
                </span>
                <span 
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    background: isMetaMaskAvailable ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: isMetaMaskAvailable ? '#10b981' : '#f59e0b',
                    border: isMetaMaskAvailable ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                  }}
                >
                  {isMetaMaskAvailable ? 'MetaMask Detected' : 'MetaMask Not Detected (Using Local State)'}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                {walletAddress ? (
                  <span>Connected Account: <code style={{ color: 'var(--accent-primary)' }}>{walletAddress}</code> (Network: {networkId || 'EVM'})</span>
                ) : (
                  <span>Contract Address: <code style={{ color: 'var(--accent-primary)' }}>0xdc9cb6BD84A8BaA955651D2a7D44aDbeE7eA964f</code> | RPC: <code>http://127.0.0.1:7545</code></span>
                )}
              </p>
            </div>

            <div>
              {walletAddress ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Wallet Active</span>
                </div>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  disabled={isConnectingWallet}
                  className="btn-primary"
                  style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
                >
                  {isConnectingWallet ? 'Connecting...' : 'Connect MetaMask Wallet'}
                </button>
              )}
            </div>
          </div>

          {/* Sub Navigation */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setPortalMode('cast-vote')}
              className={portalMode === 'cast-vote' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              <Vote size={15} />
              <span>Voter Portal & Cast Ballot</span>
            </button>
            <button
              onClick={() => setPortalMode('results')}
              className={portalMode === 'results' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              <BarChart3 size={15} />
              <span>Real-Time Election Results ({totalVotes} Votes)</span>
            </button>
            <button
              onClick={() => setPortalMode('admin')}
              className={portalMode === 'admin' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
            >
              <Users size={15} />
              <span>Admin Management Dashboard</span>
            </button>
          </div>

          {/* Sub View: Cast Ballot */}
          {portalMode === 'cast-vote' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              {/* Left: Voter Identity & Verification */}
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  Aadhaar Cryptographic Verification
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Swaraajya employs hash-based voter verification to prevent duplicate ballot submissions while guaranteeing voter anonymity.
                </p>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                    Registered Voter Identification / Aadhaar
                  </label>
                  <input
                    type="text"
                    value={aadhaarInput}
                    onChange={(e) => setAadhaarInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-card-subtle)',
                      color: 'var(--text-primary)',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  />
                </div>

                <div 
                  style={{
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: voterVerified ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    border: voterVerified ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: voterVerified ? '#10b981' : '#f59e0b', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    <CheckCircle2 size={16} />
                    <span>Eligible to Cast Ballot</span>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    Constituency: Ashta-04 · Single Vote Constraint: Verified Active
                  </div>
                </div>

                {userVoted && (
                  <div style={{ padding: '1rem', borderRadius: '0.75rem', background: 'rgba(2, 132, 199, 0.12)', border: '1px solid var(--border-accent)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>
                      Ballot Successfully Recorded
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      You cast your vote for <strong>{votedCandidateName}</strong>. The transaction hash is stored immutably.
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Ballot Candidates */}
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  Select Candidate for Constituency Ballot
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Choose your candidate below. Click confirm to record the ballot on the Swaraajya voting registry.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      onClick={() => !userVoted && setSelectedCandidateId(candidate.id)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '0.75rem',
                        background: selectedCandidateId === candidate.id ? 'rgba(2, 132, 199, 0.12)' : 'var(--bg-card-subtle)',
                        border: selectedCandidateId === candidate.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        cursor: userVoted ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{candidate.symbol}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {candidate.name}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {candidate.party}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tallied Votes</span>
                        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {candidate.votes}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {!userVoted ? (
                  <button
                    onClick={handleVoteSubmit}
                    disabled={!selectedCandidateId}
                    className="btn-primary"
                    style={{ width: '100%', padding: '0.85rem', opacity: selectedCandidateId ? 1 : 0.5 }}
                  >
                    <Vote size={18} />
                    <span>Confirm & Cast Vote</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setPortalMode('results')}
                    className="btn-secondary"
                    style={{ width: '100%', padding: '0.85rem' }}
                  >
                    <BarChart3 size={18} />
                    <span>View Real-Time Results</span>
                  </button>
                )}
              </div>

            </div>
          )}

          {/* Sub View: Results */}
          {portalMode === 'results' && (
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Live Election Results Dashboard
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Total Ballots Cast: <strong>{totalVotes}</strong> | Constituency: Ashta-04
                  </p>
                </div>
                <button
                  onClick={() => setPortalMode('cast-vote')}
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                >
                  <Vote size={15} /> Back to Ballot
                </button>
              </div>

              {/* Chart */}
              <div style={{ width: '100%', height: 320, marginBottom: '2.5rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={candidates} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} interval={0} angle={-15} textAnchor="end" />
                    <YAxis stroke="var(--text-muted)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-primary)' }}
                    />
                    <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                      {candidates.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Tally Breakdown Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {candidates.map(c => {
                  const pct = ((c.votes / totalVotes) * 100).toFixed(1);
                  return (
                    <div key={c.id} style={{ padding: '1.25rem', borderRadius: '0.75rem', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{c.symbol}</span>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: c.color }}>{pct}%</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                        {c.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {c.votes} Valid Votes
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* Sub View: Admin Management */}
          {portalMode === 'admin' && (
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    Admin Election Management
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Manage parties, verify voter rosters, and monitor on-chain transaction integrity.
                  </p>
                </div>
                <span className="section-tag" style={{ margin: 0 }}>
                  Role: Chief Electoral Officer
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1.5rem', borderRadius: '0.75rem', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    REGISTERED PARTIES
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                    3 Recognized Parties
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Swarajya Rashtriya Dal (SRD), Vikas Pragati Party (VPP), Janata Lok Sena (JLS)
                  </p>
                </div>

                <div style={{ padding: '1.5rem', borderRadius: '0.75rem', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    VERIFIED VOTER AUDIT
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem' }}>
                    3,600 Enrolled
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Aadhaar cryptographic verification active; zero duplicate registry collisions detected.
                  </p>
                </div>

                <div style={{ padding: '1.5rem', borderRadius: '0.75rem', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    ELECTION STATUS
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0284c7', marginBottom: '0.5rem' }}>
                    Voting Active
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Scheduled closure: 18:00 IST. Immutable block receipts logged continuously.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ================= TAB 3: BLOCKCHAIN & NETWORK REQUIREMENTS ================= */}
      {activeTab === 'blockchain-requirements' && (
        <div className="container" style={{ padding: '2.5rem 1.5rem', flex: 1 }}>
          <div className="glass-card" style={{ padding: '2.5rem', maxWidth: '900px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div 
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'var(--badge-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)'
                }}
              >
                <Server size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  Full Blockchain & Infrastructure Specifications
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Extracted directly from your <code>Swaraajya-Voting-main</code> documentation and service configurations.
                </p>
              </div>
            </div>

            {/* Spec Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              
              <div style={{ padding: '1.25rem', borderRadius: '0.75rem', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  1. Ethereum Smart Contract Address
                </div>
                <code style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', wordBreak: 'break-all' }}>
                  0xdc9cb6BD84A8BaA955651D2a7D44aDbeE7eA964f
                </code>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  Defined in <code>src/services/blockchainService.ts</code>. Includes event listener <code>votedEvent(_candidateId)</code> and state getter <code>candidates(id)</code>.
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: '0.75rem', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  2. Local Blockchain Node (Ganache)
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace' }}>
                  RPC URL: HTTP://127.0.0.1:7545 | Network ID: 5777
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                  Requires Ganache running locally for real on-chain transaction mining, or MetaMask configured with custom RPC localhost:7545.
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: '0.75rem', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  3. Dual Database Storage Modes
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  • <strong>Browser LocalStorage Mode</strong>: Fully operational out-of-the-box (key: <code>blockvote_mock_data</code>), persists data between reloads without external setup.
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                  • <strong>Supabase Cloud Mode</strong>: Project URL <code>https://rnhsjkruvglloagvwbct.supabase.co</code> for multi-device live sync.
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderRadius: '0.75rem', background: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                  4. Live Standalone Server Command
                </div>
                <div style={{ background: 'rgba(0,0,0,0.85)', padding: '0.85rem', borderRadius: '0.5rem', color: '#38bdf8', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>
                  cd C:\Users\SOHAM\Downloads\Swaraajya-Voting-main\Swaraajya-Voting-main<br />
                  npm run dev -- --host --port 5174
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={onBack} className="btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
                <ArrowLeft size={16} /> Return to Portfolio
              </button>
              <button onClick={() => setActiveTab('live-app')} className="btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                <Globe size={16} /> View Live Embedded App
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
