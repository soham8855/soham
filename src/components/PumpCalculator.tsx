import { useState, useEffect } from 'react';
import {
  Droplet, Compass, Gauge, FileText, Plus, Minus,
  AlertTriangle, AlertCircle, Sliders, Settings, Layers,
  Zap, Calculator, Waves, Printer, BarChart
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceDot,
  BarChart as ReBarChart, Bar
} from 'recharts';

// --- TYPES ---
interface Fitting { name: string; key: string; equivMultiplier: number; count: number; }


const STANDARD_HPS = [0.5, 0.75, 1.0, 1.5, 2.0, 3.0, 5.0, 7.5, 10.0, 12.5, 15.0, 20.0];
const PIPE_MATERIALS = [
  { name: 'PVC / Plastic (Smooth)', c: 150 },
  { name: 'HDPE', c: 140 },
  { name: 'Stainless Steel', c: 130 },
  { name: 'Galvanized Iron (GI)', c: 120 },
  { name: 'Cast Iron', c: 100 }
];

export default function PumpCalculator() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'calculator' | 'tank' | 'irrigation' | 'energy' | 'compare' | 'details' | 'history'>('calculator');

  // Input States - Calculator
  const [projectName, setProjectName] = useState('New Irrigation Block');
  const [deliveryHeight, setDeliveryHeight] = useState<number>(15);
  const [suctionLift, setSuctionLift] = useState<number>(3);
  const [pipeLength, setPipeLength] = useState<number>(120);
  const [pipeDiameterValue, setPipeDiameterValue] = useState<number>(2);
  const [pipeDiameterUnit, setPipeDiameterUnit] = useState<'inch' | 'mm'>('inch');
  const [pipeMaterial, setPipeMaterial] = useState<string>('PVC / Plastic (Smooth)');
  const [roughnessC, setRoughnessC] = useState<number>(150);
  const [requiredFlow, setRequiredFlow] = useState<number>(180); // LPM
  const [pumpEfficiency, setPumpEfficiency] = useState<number>(65); // %
  const [motorEfficiency, setMotorEfficiency] = useState<number>(85); // %

  const [fittings, setFittings] = useState<Fitting[]>([
    { name: '90° Elbow', key: 'elbow90', equivMultiplier: 30, count: 4 },
    { name: '45° Elbow', key: 'elbow45', equivMultiplier: 16, count: 2 },
    { name: 'Gate Valve', key: 'gateValve', equivMultiplier: 8, count: 1 },
    { name: 'Check Valve', key: 'checkValve', equivMultiplier: 100, count: 1 },
    { name: 'Tee (Branch)', key: 'teeBranch', equivMultiplier: 60, count: 1 }
  ]);

  const [userSelectedHP, setUserSelectedHP] = useState<number | null>(null);

  // Input States - Tank
  const [tankShape, setTankShape] = useState<'rectangular' | 'circular'>('rectangular');
  const [tankLength, setTankLength] = useState<number>(5); // m
  const [tankWidth, setTankWidth] = useState<number>(4); // m
  const [tankHeight, setTankHeight] = useState<number>(1.5); // m
  const [tankDiameter, setTankDiameter] = useState<number>(4); // m
  const [tankCurrentLevel, setTankCurrentLevel] = useState<number>(20); // %
  const [tankTargetLevel, setTankTargetLevel] = useState<number>(100); // %
  const [tankReserve, setTankReserve] = useState<number>(20); // %

  // Input States - Energy
  const [tariff, setTariff] = useState<number>(8); // ₹/kWh
  const [operatingHours, setOperatingHours] = useState<number>(6); // hrs/day
  const [operatingDays, setOperatingDays] = useState<number>(30); // days/month

  // Input States - Irrigation
  const [farmArea, setFarmArea] = useState<number>(1);
  const [farmAreaUnit, setFarmAreaUnit] = useState<'acre' | 'hectare' | 'sqm'>('acre');
  const [waterDepth, setWaterDepth] = useState<number>(10); // mm
  // Irrigation States (cleaned)

  // Sync Roughness Coefficient when material changes
  useEffect(() => {
    const mat = PIPE_MATERIALS.find(m => m.name === pipeMaterial);
    if (mat) setRoughnessC(mat.c);
  }, [pipeMaterial]);

  // History load removed since state is removed

  const handleFittingCountChange = (key: string, increment: boolean) => {
    setFittings(prev => prev.map(f => {
      if (f.key === key) return { ...f, count: increment ? f.count + 1 : Math.max(0, f.count - 1) };
      return f;
    }));
  };

  // --- CORE ENGINEERING CALCULATIONS ---
  // Pipe Diameter & Area
  const innerDiameterM = pipeDiameterUnit === 'inch' ? pipeDiameterValue * 0.0254 : pipeDiameterValue / 1000;
  const pipeAreaM2 = (Math.PI * Math.pow(innerDiameterM, 2)) / 4;
  
  // Velocity
  const flowRateM3s = requiredFlow / 60000;
  const waterVelocityMs = innerDiameterM > 0 ? flowRateM3s / pipeAreaM2 : 0;

  // Head Calculations
  const fittingsEquivLengthM = fittings.reduce((sum, f) => sum + (f.count * f.equivMultiplier * innerDiameterM), 0);
  const effectiveLengthM = pipeLength + fittingsEquivLengthM;
  const staticHeadM = deliveryHeight + suctionLift;
  
  let frictionLossM = 0;
  let frictionLossCoeffK = 0;
  if (innerDiameterM > 0 && roughnessC > 0) {
    const divisor = Math.pow(roughnessC, 1.852) * Math.pow(innerDiameterM, 4.87) * Math.pow(60000, 1.852);
    frictionLossCoeffK = divisor > 0 ? (10.67 * effectiveLengthM) / divisor : 0;
    frictionLossM = frictionLossCoeffK * Math.pow(requiredFlow, 1.852);
  }
  const tdhM = staticHeadM + frictionLossM;

  // Power Calculations
  const waterHorsepower = (requiredFlow * tdhM) / 4560.85;
  const brakeHorsepower = pumpEfficiency > 0 ? waterHorsepower / (pumpEfficiency / 100) : 0;
  const calculatedMotorHP = motorEfficiency > 0 ? brakeHorsepower / (motorEfficiency / 100) : 0;
  const recommendedHP = STANDARD_HPS.find(hp => hp >= calculatedMotorHP) || 100.0;
  const activeHP = userSelectedHP !== null ? userSelectedHP : recommendedHP;

  // Numerical solver for actual operating point
  const sRatio = calculatedMotorHP > 0 ? activeHP / calculatedMotorHP : 1;
  const pumpHShutoff = 1.5 * tdhM * Math.sqrt(sRatio);
  const pumpQMax = Math.sqrt(3) * requiredFlow * Math.sqrt(sRatio);

  const solveEstimatedDischarge = () => {
    if (pumpHShutoff <= staticHeadM) return 0;
    let low = 0, high = pumpQMax, Q_intersection = 0;
    for (let i = 0; i < 50; i++) {
      const mid = (low + high) / 2;
      const h_pump = pumpHShutoff * (1 - Math.pow(mid / pumpQMax, 2));
      const h_system = staticHeadM + frictionLossCoeffK * Math.pow(mid, 1.852);
      if (h_pump > h_system) { low = mid; Q_intersection = mid; } 
      else { high = mid; }
    }
    return Q_intersection;
  };
  const estimatedDischargeLPM = solveEstimatedDischarge();

  // --- TANK CALCULATIONS ---
  const calcTankVolume = () => {
    if (tankShape === 'rectangular') return tankLength * tankWidth * tankHeight * 1000;
    return Math.PI * Math.pow(tankDiameter / 2, 2) * tankHeight * 1000;
  };
  const tankCapacityLiters = calcTankVolume();
  const currentVolume = tankCapacityLiters * (tankCurrentLevel / 100);
  const targetVolume = tankCapacityLiters * (tankTargetLevel / 100);
  const waterRequiredLiters = Math.max(0, targetVolume - currentVolume);
  
  const tankFillTimeMin = estimatedDischargeLPM > 0 ? waterRequiredLiters / estimatedDischargeLPM : 0;

  // --- ENERGY CALCULATIONS ---
  const activeMotorKw = activeHP * 0.746 / (motorEfficiency / 100);
  const hourlyKw = activeMotorKw;
  const dailyKwh = hourlyKw * operatingHours;
  const monthlyKwh = dailyKwh * operatingDays;
  const dailyCost = dailyKwh * tariff;
  const monthlyCost = monthlyKwh * tariff;
  const costPerFill = tankFillTimeMin > 0 ? (activeMotorKw * (tankFillTimeMin / 60)) * tariff : 0;

  // --- IRRIGATION CALCULATIONS ---
  const areaInSqm = farmAreaUnit === 'acre' ? farmArea * 4046.86 : farmAreaUnit === 'hectare' ? farmArea * 10000 : farmArea;
  const requiredIrrigationVolumeLiters = areaInSqm * waterDepth;
  const recommendedTankLiters = requiredIrrigationVolumeLiters * (1 + tankReserve / 100);
  const irrigationFillsRequired = tankCapacityLiters > 0 ? requiredIrrigationVolumeLiters / tankCapacityLiters : 0;
  const totalIrrigationTimeMin = estimatedDischargeLPM > 0 ? requiredIrrigationVolumeLiters / estimatedDischargeLPM : 0;

  // --- PUMP COMPARISON DATA ---
  const comparePumps = [0.5, 1.0, 1.5, 2.0, 3.0, 5.0, 7.5, 10.0].map(hp => {
    const sr = calculatedMotorHP > 0 ? hp / calculatedMotorHP : 1;
    const hOff = 1.5 * tdhM * Math.sqrt(sr);
    const qMax = Math.sqrt(3) * requiredFlow * Math.sqrt(sr);
    
    let qIntersect = 0;
    let hIntersect = staticHeadM;
    if (hOff > staticHeadM) {
      let low = 0, high = qMax;
      for (let i = 0; i < 50; i++) {
        const mid = (low + high) / 2;
        const hpump = hOff * (1 - Math.pow(mid / qMax, 2));
        const hsys = staticHeadM + frictionLossCoeffK * Math.pow(mid, 1.852);
        if (hpump > hsys) { low = mid; qIntersect = mid; hIntersect = hsys; } else { high = mid; }
      }
    }
    const fillTime = qIntersect > 0 ? waterRequiredLiters / qIntersect : 0;
    const kw = hp * 0.746 / (motorEfficiency / 100);
    const energy = kw * (fillTime / 60);
    const cost = energy * tariff;
    let status = 'Underpowered';
    if (hp === recommendedHP) status = 'Optimal';
    else if (hp > recommendedHP && hp <= recommendedHP * 1.5) status = 'Acceptable';
    else if (hp > recommendedHP * 1.5) status = 'Oversized';

    return { hp, flow: qIntersect, head: hIntersect, fillTime, energy, cost, status };
  });

  // Chart Data
  const generatePumpCurveData = () => {
    const data = [];
    const maxFlow = Math.max(pumpQMax, requiredFlow * 1.5);
    for (let q = 0; q <= maxFlow; q += maxFlow / 20) {
      let h_pump = pumpHShutoff * (1 - Math.pow(q / pumpQMax, 2));
      const h_system = staticHeadM + frictionLossCoeffK * Math.pow(q, 1.852);
      data.push({ flow: Math.round(q), 'Pump Head (m)': Math.max(0, parseFloat(h_pump.toFixed(2))), 'System Head (m)': parseFloat(h_system.toFixed(2)) });
    }
    return data;
  };
  const pumpCurveData = generatePumpCurveData();
  const barChartData = comparePumps.filter(p => p.flow > 0).map(p => ({
    name: `${p.hp} HP`,
    'Fill Time (min)': Math.round(p.fillTime)
  }));

  // Actions
  const printReport = () => window.print();

  return (
    <>
      <header className="app-header no-print">
        <div className="container header-content">
          <div className="brand">
            <div className="brand-logo"><Droplet size={24} fill="white" /></div>
            <h1>HydroFlow <span style={{fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-muted)'}}>PRO</span></h1>
          </div>
          <button className="btn-primary" onClick={printReport} style={{ width: 'auto', padding: '0.5rem 1rem' }}>
            <Printer size={16} /> Print PDF Report
          </button>
        </div>
      </header>

      {/* PRINT ONLY REPORT HEADER */}
      <div className="print-only report-header">
        <h1>HydroFlow System Analysis Report</h1>
        <p>Project: <strong>{projectName}</strong> | Date: {new Date().toLocaleDateString()}</p>
        <p style={{fontSize: '0.8rem', fontStyle: 'italic'}}>Results are estimates based on user-provided inputs and assumed pump/system characteristics.</p>
      </div>

      <main className="container" style={{ paddingBottom: '3rem' }}>
        
        {/* KPI DASHBOARD SUMMARY */}
        <div className="results-grid" style={{ margin: '1.5rem 0' }}>
          <div className="kpi-card">
            <span className="kpi-label"><Gauge size={14} className="kpi-highlight" /> Total Dynamic Head</span>
            <div className="kpi-value">{tdhM.toFixed(1)} <span className="kpi-unit">meters</span></div>
            <span className="kpi-subtext">Static: {staticHeadM.toFixed(1)}m + Friction: {frictionLossM.toFixed(1)}m</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label"><Zap size={14} className="kpi-highlight" /> Recommended Pump</span>
            <div className="kpi-value">{recommendedHP} <span className="kpi-unit">HP</span></div>
            <span className="kpi-subtext">Operating Flow: {Math.round(estimatedDischargeLPM)} LPM</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label"><Waves size={14} className="kpi-highlight" /> Tank Capacity</span>
            <div className="kpi-value">{Math.round(tankCapacityLiters).toLocaleString()} <span className="kpi-unit">Liters</span></div>
            <span className="kpi-subtext">Estimated Fill Time: {Math.floor(tankFillTimeMin / 60)}h {Math.round(tankFillTimeMin % 60)}m</span>
          </div>
          <div className="kpi-card">
            <span className="kpi-label"><BarChart size={14} className="kpi-highlight" /> Est. Monthly Energy</span>
            <div className="kpi-value">₹{Math.round(monthlyCost).toLocaleString()}</div>
            <span className="kpi-subtext">{Math.round(monthlyKwh)} kWh/month</span>
          </div>
        </div>

        {/* ALERTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {activeHP < calculatedMotorHP && (
            <div className="alert-banner danger">
              <AlertCircle className="alert-icon" size={20} />
              <div className="alert-content">
                <span className="alert-title">Motor Underpowered!</span>
                <span className="alert-msg">The selected {activeHP} HP motor is too small for the calculated load of {calculatedMotorHP.toFixed(2)} HP.</span>
              </div>
            </div>
          )}
          {activeHP > recommendedHP * 1.5 && (
            <div className="alert-banner warning">
              <AlertTriangle className="alert-icon" size={20} />
              <div className="alert-content">
                <span className="alert-title">Motor Oversized!</span>
                <span className="alert-msg">The {activeHP} HP motor is larger than required, increasing energy consumption and costs unnecessarily.</span>
              </div>
            </div>
          )}
          {waterVelocityMs > 2.5 && (
            <div className="alert-banner warning">
              <AlertTriangle className="alert-icon" size={20} />
              <div className="alert-content">
                <span className="alert-title">High Pipeline Velocity!</span>
                <span className="alert-msg">Water velocity ({waterVelocityMs.toFixed(2)} m/s) exceeds recommended limit. Consider a larger pipe diameter to reduce friction.</span>
              </div>
            </div>
          )}
        </div>

        {/* TAB NAVIGATION */}
        <div className="tab-navigation no-print" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <button className={`tab-btn ${activeTab === 'calculator' ? 'active' : ''}`} onClick={() => setActiveTab('calculator')}><Calculator size={16}/> System & Pipe</button>
          <button className={`tab-btn ${activeTab === 'tank' ? 'active' : ''}`} onClick={() => setActiveTab('tank')}><Waves size={16}/> Tank Analysis</button>
          <button className={`tab-btn ${activeTab === 'irrigation' ? 'active' : ''}`} onClick={() => setActiveTab('irrigation')}><Droplet size={16}/> Irrigation</button>
          <button className={`tab-btn ${activeTab === 'energy' ? 'active' : ''}`} onClick={() => setActiveTab('energy')}><Zap size={16}/> Energy & Cost</button>
          <button className={`tab-btn ${activeTab === 'compare' ? 'active' : ''}`} onClick={() => setActiveTab('compare')}><Sliders size={16}/> Compare Pumps</button>
          <button className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`} onClick={() => setActiveTab('details')}><FileText size={16}/> Calcs</button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="dashboard-grid">
          
          {/* LEFT COLUMN: INPUTS */}
          <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {activeTab === 'calculator' && (
              <div className="panel-card">
                <h3 className="panel-title"><Calculator size={18} className="text-cyan" /> System Parameters</h3>
                
                <div className="form-group">
                  <label className="form-label">Project Name</label>
                  <input type="text" className="input-control" value={projectName} onChange={e => setProjectName(e.target.value)} />
                </div>

                <div className="form-section-title"><Compass size={14} /> Elevation & Lift</div>
                <div className="form-group-grid">
                  <div className="form-group">
                    <label className="form-label">Delivery Height</label>
                    <div className="input-wrapper"><input type="number" min="0" className="input-control" value={deliveryHeight} onChange={e => setDeliveryHeight(Number(e.target.value))} /><span className="input-suffix">m</span></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Suction Lift</label>
                    <div className="input-wrapper"><input type="number" min="0" className="input-control" value={suctionLift} onChange={e => setSuctionLift(Number(e.target.value))} /><span className="input-suffix">m</span></div>
                  </div>
                </div>

                <div className="form-section-title"><Settings size={14} /> Pipeline</div>
                <div className="form-group">
                  <label className="form-label">Pipe Length</label>
                  <div className="input-wrapper"><input type="number" min="1" className="input-control" value={pipeLength} onChange={e => setPipeLength(Number(e.target.value))} /><span className="input-suffix">m</span></div>
                </div>
                <div className="form-group-grid">
                  <div className="form-group">
                    <label className="form-label">Inner Diameter</label>
                    <input type="number" min="0.1" step="0.01" className="input-control" value={pipeDiameterValue} onChange={e => setPipeDiameterValue(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Unit</label>
                    <select className="select-control" value={pipeDiameterUnit} onChange={e => setPipeDiameterUnit(e.target.value as any)}>
                      <option value="inch">Inches (in)</option>
                      <option value="mm">Millimeters (mm)</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Material</label>
                  <select className="select-control" value={pipeMaterial} onChange={e => setPipeMaterial(e.target.value)}>
                    {PIPE_MATERIALS.map(m => <option key={m.name} value={m.name}>{m.name} (C={m.c})</option>)}
                  </select>
                </div>

                <div className="form-section-title"><Layers size={14} /> Minor Losses (Fittings)</div>
                <div className="fittings-container">
                  {fittings.map(f => (
                    <div className="fitting-item" key={f.key}>
                      <div className="fitting-info"><span className="fitting-name">{f.name}</span></div>
                      <div className="fitting-counter">
                        <button className="btn-counter" onClick={() => handleFittingCountChange(f.key, false)}><Minus size={10} /></button>
                        <span className="counter-value">{f.count}</span>
                        <button className="btn-counter" onClick={() => handleFittingCountChange(f.key, true)}><Plus size={10} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="form-section-title"><Droplet size={14} /> Requirements & Efficiencies</div>
                <div className="form-group">
                  <label className="form-label">Target Flow</label>
                  <div className="input-wrapper"><input type="number" min="1" className="input-control" value={requiredFlow} onChange={e => setRequiredFlow(Number(e.target.value))} /><span className="input-suffix">LPM</span></div>
                </div>
                <div className="form-group-grid">
                  <div className="form-group">
                    <label className="form-label">Pump Eff.</label>
                    <div className="input-wrapper"><input type="number" min="10" max="98" className="input-control" value={pumpEfficiency} onChange={e => setPumpEfficiency(Number(e.target.value))} /><span className="input-suffix">%</span></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Motor Eff.</label>
                    <div className="input-wrapper"><input type="number" min="10" max="98" className="input-control" value={motorEfficiency} onChange={e => setMotorEfficiency(Number(e.target.value))} /><span className="input-suffix">%</span></div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Select Pump Override (Optional)</label>
                  <select className="select-control" value={userSelectedHP || ''} onChange={e => setUserSelectedHP(e.target.value ? Number(e.target.value) : null)}>
                    <option value="">Auto Select ({recommendedHP} HP)</option>
                    {STANDARD_HPS.map(hp => <option key={hp} value={hp}>{hp} HP</option>)}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'tank' && (
              <div className="panel-card">
                <h3 className="panel-title"><Waves size={18} className="text-cyan" /> Tank Dimensions</h3>
                <div className="form-group">
                  <label className="form-label">Tank Shape</label>
                  <select className="select-control" value={tankShape} onChange={e => setTankShape(e.target.value as any)}>
                    <option value="rectangular">Rectangular</option>
                    <option value="circular">Circular / Cylindrical</option>
                  </select>
                </div>
                {tankShape === 'rectangular' ? (
                  <div className="form-group-grid">
                    <div className="form-group">
                      <label className="form-label">Length (m)</label>
                      <input type="number" className="input-control" value={tankLength} onChange={e => setTankLength(Number(e.target.value))} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Width (m)</label>
                      <input type="number" className="input-control" value={tankWidth} onChange={e => setTankWidth(Number(e.target.value))} />
                    </div>
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-label">Diameter (m)</label>
                    <input type="number" className="input-control" value={tankDiameter} onChange={e => setTankDiameter(Number(e.target.value))} />
                  </div>
                )}
                <div className="form-group">
                  <label className="form-label">Height (m)</label>
                  <input type="number" className="input-control" value={tankHeight} onChange={e => setTankHeight(Number(e.target.value))} />
                </div>
                
                <div className="form-section-title">Filling Targets</div>
                <div className="form-group-grid">
                  <div className="form-group">
                    <label className="form-label">Start Level (%)</label>
                    <input type="number" max="100" min="0" className="input-control" value={tankCurrentLevel} onChange={e => setTankCurrentLevel(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Target Level (%)</label>
                    <input type="number" max="100" min="0" className="input-control" value={tankTargetLevel} onChange={e => setTargetLevelClamp(Number(e.target.value))} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'irrigation' && (
              <div className="panel-card">
                <h3 className="panel-title"><Droplet size={18} className="text-cyan" /> Irrigation Demand</h3>
                <div className="form-group-grid">
                  <div className="form-group">
                    <label className="form-label">Farm Area</label>
                    <input type="number" className="input-control" value={farmArea} onChange={e => setFarmArea(Number(e.target.value))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Unit</label>
                    <select className="select-control" value={farmAreaUnit} onChange={e => setFarmAreaUnit(e.target.value as any)}>
                      <option value="acre">Acres</option>
                      <option value="hectare">Hectares</option>
                      <option value="sqm">Sq Meters</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Required Water Depth</label>
                  <div className="input-wrapper"><input type="number" className="input-control" value={waterDepth} onChange={e => setWaterDepth(Number(e.target.value))} /><span className="input-suffix">mm</span></div>
                  <span className="label-info" style={{marginTop:'0.25rem'}}>*Estimate based on crop type</span>
                </div>
                <div className="form-group">
                  <label className="form-label">Reserve Capacity (%)</label>
                  <select className="select-control" value={tankReserve} onChange={e => setTankReserve(Number(e.target.value))}>
                    <option value="0">0%</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'energy' && (
              <div className="panel-card">
                <h3 className="panel-title"><Zap size={18} className="text-cyan" /> Energy Cost Specs</h3>
                <div className="form-group">
                  <label className="form-label">Electricity Tariff</label>
                  <div className="input-wrapper"><input type="number" className="input-control" value={tariff} onChange={e => setTariff(Number(e.target.value))} /><span className="input-suffix">₹/kWh</span></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Daily Operation</label>
                  <div className="input-wrapper"><input type="number" className="input-control" value={operatingHours} onChange={e => setOperatingHours(Number(e.target.value))} /><span className="input-suffix">hours</span></div>
                </div>
                <div className="form-group">
                  <label className="form-label">Monthly Operation</label>
                  <div className="input-wrapper"><input type="number" className="input-control" value={operatingDays} onChange={e => setOperatingDays(Number(e.target.value))} /><span className="input-suffix">days</span></div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: CHARTS & VISUALIZATIONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {(activeTab === 'calculator' || activeTab === 'compare' || activeTab === 'details') && (
              <div className="panel-card print-section">
                <h3 className="panel-title">Pump & System Curve</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pumpCurveData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="flow" stroke="#94a3b8" label={{ value: 'Flow (LPM)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }} />
                      <YAxis stroke="#94a3b8" label={{ value: 'Head (m)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                      <Legend verticalAlign="top" />
                      <Line type="monotone" dataKey="Pump Head (m)" stroke="#06b6d4" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="System Head (m)" stroke="#f59e0b" strokeWidth={3} dot={false} />
                      {estimatedDischargeLPM > 0 && (
                        <ReferenceDot x={estimatedDischargeLPM} y={staticHeadM + frictionLossCoeffK * Math.pow(estimatedDischargeLPM, 1.852)} r={6} fill="#ef4444" stroke="white" />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                  Operating Point: <strong>{Math.round(estimatedDischargeLPM)} LPM</strong> at <strong>{(staticHeadM + frictionLossCoeffK * Math.pow(estimatedDischargeLPM, 1.852)).toFixed(1)} m</strong> Head
                </div>
              </div>
            )}

            {(activeTab === 'tank' || activeTab === 'irrigation' || activeTab === 'details') && (
              <div className="panel-card print-section">
                <h3 className="panel-title">Tank Fill Simulation</h3>
                <div className="tank-visualizer">
                  <div className="tank-water" style={{ height: `${tankCurrentLevel}%` }}></div>
                  <div className="tank-target-line" style={{ bottom: `${tankTargetLevel}%` }}></div>
                  <div className="tank-label" style={{ top: '10px' }}>Total Cap: {Math.round(tankCapacityLiters).toLocaleString()} L</div>
                  <div className="tank-label" style={{ bottom: '10px' }}>Current: {Math.round(currentVolume).toLocaleString()} L</div>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>Water Needed: <strong>{Math.round(waterRequiredLiters).toLocaleString()} L</strong></span>
                  <span>Est. Time: <strong>{Math.floor(tankFillTimeMin / 60)}h {Math.round(tankFillTimeMin % 60)}m</strong></span>
                </div>
                
                {activeTab === 'irrigation' && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Irrigation Requirements</h4>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
                      <li>Total Water Required: <strong>{Math.round(requiredIrrigationVolumeLiters).toLocaleString()} L</strong></li>
                      <li>Recommended Tank (incl. {tankReserve}% reserve): <strong className="text-cyan">{Math.round(recommendedTankLiters).toLocaleString()} L</strong></li>
                      <li>Number of Tank Fills: <strong>{irrigationFillsRequired.toFixed(1)}</strong> fills</li>
                      <li>Total Pump Run Time: <strong>{Math.floor(totalIrrigationTimeMin / 60)}h {Math.round(totalIrrigationTimeMin % 60)}m</strong></li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {(activeTab === 'energy' || activeTab === 'compare' || activeTab === 'details') && (
              <div className="panel-card print-section">
                <h3 className="panel-title">Energy Consumption & Cost</h3>
                <div className="results-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="kpi-card">
                    <span className="kpi-label">Daily Cost</span>
                    <div className="kpi-value">₹{Math.round(dailyCost).toLocaleString()}</div>
                    <span className="kpi-subtext">{Math.round(dailyKwh)} kWh/day</span>
                  </div>
                  <div className="kpi-card">
                    <span className="kpi-label">Cost per Fill</span>
                    <div className="kpi-value">₹{Math.round(costPerFill).toLocaleString()}</div>
                    <span className="kpi-subtext">To reach target %</span>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'compare' || activeTab === 'details') && (
              <div className="panel-card print-section">
                <h3 className="panel-title">Pump Comparison Matrix</h3>
                <div className="table-container">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>Pump</th>
                        <th>Flow</th>
                        <th>Head</th>
                        <th>Fill Time</th>
                        <th>Cost/Fill</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparePumps.map((p, i) => (
                        <tr key={i} className={p.hp === recommendedHP ? 'best-match' : ''}>
                          <td><strong>{p.hp} HP</strong></td>
                          <td>{Math.round(p.flow)} LPM</td>
                          <td>{p.head.toFixed(1)} m</td>
                          <td>{Math.round(p.fillTime)} min</td>
                          <td>₹{p.cost.toFixed(1)}</td>
                          <td style={{ color: p.status === 'Optimal' ? 'var(--success)' : p.status === 'Acceptable' ? 'var(--warning)' : 'var(--danger)' }}>
                            {p.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="chart-container" style={{ marginTop: '2rem' }}>
                  <h4 style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', textAlign: 'center'}}>Fill Time vs Pump Size</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                      <Bar dataKey="Fill Time (min)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {(activeTab === 'details') && (
              <div className="panel-card print-section">
                <h3 className="panel-title">Engineering Calculation Details</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <p><strong>Pipe Area:</strong> {pipeAreaM2.toFixed(6)} m²</p>
                  <p><strong>Water Velocity:</strong> {waterVelocityMs.toFixed(2)} m/s</p>
                  <p><strong>Effective Pipe Length (incl. fittings):</strong> {effectiveLengthM.toFixed(1)} m</p>
                  <p><strong>Friction Coefficient (k):</strong> {frictionLossCoeffK.toFixed(6)}</p>
                  <p><strong>Static Head:</strong> {staticHeadM.toFixed(2)} m</p>
                  <p><strong>Friction Head Loss:</strong> {frictionLossM.toFixed(2)} m</p>
                  <p><strong>Total Dynamic Head (TDH):</strong> {tdhM.toFixed(2)} m</p>
                  <br/>
                  <p><strong>Hydraulic Power:</strong> {waterHorsepower.toFixed(2)} HP</p>
                  <p><strong>Required Shaft Power:</strong> {brakeHorsepower.toFixed(2)} HP</p>
                  <p><strong>Required Motor Power:</strong> {calculatedMotorHP.toFixed(2)} HP</p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </>
  );

  // Helper inside component to clamp target
  function setTargetLevelClamp(val: number) {
    if(val < tankCurrentLevel) val = tankCurrentLevel;
    if(val > 100) val = 100;
    setTankTargetLevel(val);
  }
}
