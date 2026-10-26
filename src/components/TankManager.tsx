import { useState, useEffect } from 'react';
import { Play, Square, Info, Settings, Droplet, Clock, Gauge, ArrowRightCircle } from 'lucide-react';

export default function TankManager() {
  // Tank Dimensions
  const [tankShape, setTankShape] = useState<'rectangular' | 'cylindrical'>('rectangular');
  const [unit, setUnit] = useState<'ft' | 'm'>('ft');
  
  const [rectLength, setRectLength] = useState<number>(10);
  const [rectWidth, setRectWidth] = useState<number>(8);
  const [rectHeight, setRectHeight] = useState<number>(6);
  
  const [cylRadius, setCylRadius] = useState<number>(4);
  const [cylHeight, setCylHeight] = useState<number>(6);

  // Water Levels
  const [currentLevelPct, setCurrentLevelPct] = useState<number>(40);
  const [targetLevelPct, setTargetLevelPct] = useState<number>(100);
  const [reservePct, setReservePct] = useState<number>(10);

  // Motor Settings
  const [motorFlowLpm, setMotorFlowLpm] = useState<number>(25);
  const [motorHp, setMotorHp] = useState<number>(1.0);

  // Simulation State
  const [motorStatus, setMotorStatus] = useState<'OFF' | 'RUNNING' | 'FULL'>('OFF');
  const [simulationSeconds, setSimulationSeconds] = useState<number>(0);

  // Formatter
  const fmt = (val: number) => Math.max(0, val).toLocaleString(undefined, { maximumFractionDigits: 0 });

  // 1. Calculations
  const conversionFactor = unit === 'ft' ? 28.3168 : 1000; // cubic ft to L, or cubic m to L
  
  let totalCapacityLiters = 0;
  if (tankShape === 'rectangular') {
    totalCapacityLiters = rectLength * rectWidth * rectHeight * conversionFactor;
  } else {
    totalCapacityLiters = Math.PI * Math.pow(cylRadius, 2) * cylHeight * conversionFactor;
  }
  
  // removed unused totalCapacityGallons
  const reserveLiters = totalCapacityLiters * (reservePct / 100);
  const usableCapacityLiters = totalCapacityLiters - reserveLiters;
  
  const currentLiters = totalCapacityLiters * (currentLevelPct / 100);
  const targetLiters = totalCapacityLiters * (targetLevelPct / 100);
  
  const requiredWaterLiters = Math.max(0, targetLiters - currentLiters);
  const emptyVolumeLiters = totalCapacityLiters - currentLiters;

  // Motor filling time (Required Water / Motor Flow)
  const estimatedFillTimeMin = motorFlowLpm > 0 ? requiredWaterLiters / motorFlowLpm : 0;
  
  // Auto-Stop Monitor
  useEffect(() => {
    if (motorStatus === 'RUNNING' && currentLevelPct >= targetLevelPct) {
      setMotorStatus('FULL');
      setCurrentLevelPct(targetLevelPct);
    }
  }, [currentLevelPct, targetLevelPct, motorStatus]);

  // Real-time Simulation Engine
  useEffect(() => {
    let interval: number | undefined;
    
    if (motorStatus === 'RUNNING') {
      interval = window.setInterval(() => {
        setSimulationSeconds(prev => prev + 1);
        
        setCurrentLevelPct(prev => {
          const litersPerSecond = motorFlowLpm / 60;
          const currentL = totalCapacityLiters * (prev / 100);
          const newLiters = currentL + litersPerSecond;
          const targetL = totalCapacityLiters * (targetLevelPct / 100);
          
          if (newLiters >= targetL) {
             return targetLevelPct;
          }
          return (newLiters / totalCapacityLiters) * 100;
        });
      }, 1000) as unknown as number; // 1 second real-time tick
    }
    
    return () => { if (interval) window.clearInterval(interval); };
  }, [motorStatus, motorFlowLpm, targetLevelPct, totalCapacityLiters]);

  const handleStartMotor = () => {
    if (currentLevelPct >= targetLevelPct) return; // Cannot start if already full/target
    setMotorStatus('RUNNING');
    setSimulationSeconds(0);
  };
  
  const handleStopMotor = () => {
    setMotorStatus('OFF');
  };

  const resetAll = () => {
    setMotorStatus('OFF');
    setTankShape('rectangular');
    setUnit('ft');
    setRectLength(10);
    setRectWidth(8);
    setRectHeight(6);
    setCurrentLevelPct(40);
    setTargetLevelPct(100);
    setReservePct(10);
    setMotorFlowLpm(25);
    setSimulationSeconds(0);
  };

  return (
    <div className="tank-manager-dashboard">
      
      {/* PROMINENT TANK CAPACITY BANNER */}
      <div style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))', border: '1px solid var(--primary)', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Your Tank Capacity</h2>
        <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '0.5rem', textShadow: '0 2px 10px rgba(6,182,212,0.3)' }}>
          {fmt(totalCapacityLiters)} <span style={{ fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 600 }}>Litres</span>
        </div>
        
        <div className="results-grid" style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current Water</span>
            <strong style={{ fontSize: '1.2rem', color: 'white' }}>{fmt(currentLiters)} L</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Remaining Capacity</span>
            <strong style={{ fontSize: '1.2rem', color: 'white' }}>{fmt(emptyVolumeLiters)} L</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Usable Volume</span>
            <strong style={{ fontSize: '1.2rem', color: 'var(--success)' }}>{fmt(usableCapacityLiters)} L</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Reserve Volume</span>
            <strong style={{ fontSize: '1.2rem', color: 'var(--danger)' }}>{fmt(reserveLiters)} L</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* LEFT COLUMN: Visualizer & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="panel-card" style={{ textAlign: 'center', position: 'relative' }}>
            <h3 className="panel-title"><Droplet size={18} className="text-cyan" /> Live Water Tank</h3>
            
            {/* TANK VISUALIZER */}
            <div style={{
              width: '100%', height: '300px', border: '3px solid var(--border-color)', 
              borderRadius: tankShape === 'cylindrical' ? '1rem' : '0.25rem',
              position: 'relative', overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.4)',
              margin: '0 auto', maxWidth: '350px'
            }}>
              {/* Reserve Line */}
              <div style={{
                position: 'absolute', bottom: `${reservePct}%`, width: '100%',
                borderTop: '2px dashed #ef4444', zIndex: 10
              }}>
                <span style={{ position: 'absolute', right: '5px', top: '-20px', fontSize: '0.7rem', color: '#ef4444' }}>Reserve</span>
              </div>
              
              {/* Target Line */}
              <div style={{
                position: 'absolute', bottom: `${targetLevelPct}%`, width: '100%',
                borderTop: '2px dashed var(--warning)', zIndex: 10
              }}>
                <span style={{ position: 'absolute', left: '5px', top: '-20px', fontSize: '0.7rem', color: 'var(--warning)' }}>Target</span>
              </div>
              
              {/* Water */}
              <div style={{
                position: 'absolute', bottom: 0, width: '100%', height: `${currentLevelPct}%`,
                background: 'linear-gradient(180deg, #38bdf8, #0284c7)',
                transition: 'height 1s linear', zIndex: 5,
                opacity: currentLevelPct <= reservePct ? 0.7 : 1 // Darken if in reserve
              }}>
                <div style={{ position: 'absolute', width: '100%', top: 0, height: '4px', background: 'rgba(255,255,255,0.4)' }}></div>
              </div>
              
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20, textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>{Math.round(currentLevelPct)}%</div>
                <div style={{ fontSize: '1rem', color: '#e0f2fe' }}>{fmt(currentLiters)} L</div>
              </div>
            </div>

            {/* MOTOR SIMULATION CONTROLS */}
            <div style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Motor Status:</span>
                <span style={{ 
                  fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem',
                  backgroundColor: motorStatus === 'RUNNING' ? 'rgba(16, 185, 129, 0.2)' : motorStatus === 'FULL' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: motorStatus === 'RUNNING' ? '#10b981' : motorStatus === 'FULL' ? '#3b82f6' : '#ef4444'
                }}>
                  {motorStatus} {motorStatus === 'RUNNING' && <span className="pulsing-dot" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', marginLeft: '5px' }}></span>}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {motorStatus === 'OFF' || motorStatus === 'FULL' ? (
                  <button className="btn-primary" onClick={handleStartMotor} style={{ flex: 1, backgroundColor: '#10b981' }} disabled={currentLevelPct >= targetLevelPct || motorFlowLpm <= 0}>
                    <Play size={18} /> Start Motor
                  </button>
                ) : (
                  <button className="btn-primary" onClick={handleStopMotor} style={{ flex: 1, backgroundColor: '#ef4444' }}>
                    <Square size={18} /> Stop Motor
                  </button>
                )}
              </div>
              
              {motorStatus === 'RUNNING' && (
                <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-around' }}>
                  <span><Clock size={12} style={{display:'inline', marginRight:'4px'}}/> Runtime: {Math.floor(simulationSeconds / 60)}m {simulationSeconds % 60}s</span>
                  <span>Est. Total: {Math.floor(estimatedFillTimeMin)}m</span>
                </div>
              )}
            </div>
          </div>

          <div className="results-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="kpi-card">
              <span className="kpi-label" style={{ color: 'var(--warning)' }}>Required Water</span>
              <div className="kpi-value">{fmt(requiredWaterLiters)} <span className="kpi-unit">L</span></div>
              <span className="kpi-subtext">To reach {targetLevelPct}%</span>
            </div>
            <div className="kpi-card">
              <span className="kpi-label">Est. Fill Time</span>
              <div className="kpi-value">{Math.floor(estimatedFillTimeMin / 60)}h {Math.round(estimatedFillTimeMin % 60)}m</div>
              <span className="kpi-subtext">At {fmt(motorFlowLpm)} L/min</span>
            </div>
          </div>

        </div>
        
        {/* RIGHT COLUMN: Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* TANK DETAILS */}
          <div className="panel-card">
            <h3 className="panel-title"><Settings size={18} className="text-cyan" /> 1. Tank Configuration</h3>
            <div className="form-group-grid">
              <div className="form-group">
                <label className="form-label">Tank Shape</label>
                <select className="select-control" value={tankShape} onChange={e => setTankShape(e.target.value as any)}>
                  <option value="rectangular">Rectangular</option>
                  <option value="cylindrical">Cylindrical</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Unit</label>
                <select className="select-control" value={unit} onChange={e => setUnit(e.target.value as any)}>
                  <option value="ft">Feet (ft)</option>
                  <option value="m">Meters (m)</option>
                </select>
              </div>
            </div>
            
            {tankShape === 'rectangular' ? (
              <div className="form-group-grid">
                <div className="form-group">
                  <label className="form-label">Length</label>
                  <input type="number" min="0" className="input-control" value={rectLength} onChange={e => setRectLength(Number(e.target.value))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Width</label>
                  <input type="number" min="0" className="input-control" value={rectWidth} onChange={e => setRectWidth(Number(e.target.value))} />
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Radius (Half Diameter)</label>
                <input type="number" min="0" className="input-control" value={cylRadius} onChange={e => setCylRadius(Number(e.target.value))} />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Height</label>
              <input type="number" min="0" className="input-control" value={tankShape === 'rectangular' ? rectHeight : cylHeight} onChange={e => tankShape === 'rectangular' ? setRectHeight(Number(e.target.value)) : setCylHeight(Number(e.target.value))} />
            </div>
          </div>

          {/* WATER LEVELS */}
          <div className="panel-card">
            <h3 className="panel-title"><Gauge size={18} className="text-cyan" /> 2. Water Levels</h3>
            <div className="form-group">
              <label className="form-label">Current Water Level (%)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input type="range" min="0" max="100" value={currentLevelPct} onChange={e => { setCurrentLevelPct(Number(e.target.value)); setMotorStatus('OFF'); }} style={{ flex: 1, accentColor: 'var(--primary)' }} />
                <input type="number" min="0" max="100" className="input-control" style={{ width: '80px' }} value={Math.round(currentLevelPct)} onChange={e => { setCurrentLevelPct(Number(e.target.value)); setMotorStatus('OFF'); }} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Target Fill Level (%)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <button className="btn-secondary" style={{ padding: '0.25rem', fontSize: '0.8rem' }} onClick={() => setTargetLevelPct(50)}>50%</button>
                <button className="btn-secondary" style={{ padding: '0.25rem', fontSize: '0.8rem' }} onClick={() => setTargetLevelPct(75)}>75%</button>
                <button className="btn-secondary" style={{ padding: '0.25rem', fontSize: '0.8rem' }} onClick={() => setTargetLevelPct(100)}>100%</button>
              </div>
              <input type="number" min="0" max="100" className="input-control" value={Math.round(targetLevelPct)} onChange={e => {
                let val = Number(e.target.value);
                if (val > 100) val = 100;
                setTargetLevelPct(val);
              }} />
            </div>
            <div className="form-group">
              <label className="form-label">Reserve Safety Buffer (%)</label>
              <input type="number" min="0" max="50" className="input-control" value={reservePct} onChange={e => {
                let val = Number(e.target.value);
                if (val > 50) val = 50;
                setReservePct(val);
              }} />
              <span className="label-info" style={{ marginTop: '0.25rem' }}>Warning: Do not use reserve water for normal operations.</span>
            </div>
          </div>

          {/* MOTOR SPECS */}
          <div className="panel-card">
            <h3 className="panel-title"><ArrowRightCircle size={18} className="text-cyan" /> 3. Motor Flow Rate</h3>
            <div className="form-group-grid">
              <div className="form-group">
                <label className="form-label">Flow Rate (LPM)</label>
                <div className="input-wrapper">
                  <input type="number" min="1" className="input-control" value={motorFlowLpm} onChange={e => setMotorFlowLpm(Number(e.target.value))} />
                  <span className="input-suffix">L/min</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Flow Rate (LPH)</label>
                <div className="input-wrapper">
                  <input type="number" min="60" className="input-control" value={motorFlowLpm * 60} onChange={e => setMotorFlowLpm(Number(e.target.value) / 60)} />
                  <span className="input-suffix">L/hr</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Motor Power (Optional)</label>
              <div className="input-wrapper">
                <input type="number" min="0.5" step="0.5" className="input-control" value={motorHp} onChange={e => setMotorHp(Number(e.target.value))} />
                <span className="input-suffix">HP</span>
              </div>
            </div>
          </div>

          <div className="panel-card" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <h3 className="panel-title" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', borderBottom: 'none' }}><Info size={14}/> How it is calculated</h3>
            <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', listStyle: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li><strong>Tank Capacity:</strong> Volume is calculated using Length × Width × Height (for rectangular) multiplied by standard conversion factors (1 cubic ft = ~28.31 L).</li>
              <li><strong>Required Water:</strong> Target Volume (Liters) minus Current Volume (Liters).</li>
              <li><strong>Motor Fill Time:</strong> Required Water ÷ Motor Flow Rate (LPM) gives the estimated time in minutes.</li>
              <li><strong>Simulation:</strong> Each second, the simulation adds `(Motor Flow / 60)` Liters to the tank and recalculates the percentage.</li>
            </ul>
          </div>

          <button className="btn-secondary" onClick={resetAll}><Square size={14} /> Reset All to Default</button>
        </div>
      </div>
    </div>
  );
}
