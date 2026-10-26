import { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { SwaraajyaDemoView } from './components/SwaraajyaDemoView';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'silver' | 'dark'>('silver');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'silver' ? 'dark' : 'silver'));
  };

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      
      {/* Dynamic Animated Canvas capturing the Reference Image's Wave Ribbons & City Skyline */}
      <BackgroundCanvas theme={theme} />

      {activeDemo === 'swaraajya-voting' ? (
        /* ================= SWARAAJYA LIVE PROJECT DEMO VIEW ================= */
        <SwaraajyaDemoView 
          onBack={() => {
            setActiveDemo(null);
            setTimeout(() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }} 
          theme={theme} 
        />
      ) : (
        /* ================= MAIN PORTFOLIO SECTIONS ================= */
        <>
          {/* Glassmorphic Navbar */}
          <Navbar 
            theme={theme} 
            toggleTheme={toggleTheme} 
            onOpenResume={() => setResumeOpen(true)} 
          />

          {/* Main Content Sections */}
          <main style={{ flex: 1, position: 'relative', zIndex: 5 }}>
            <HeroSection onOpenResume={() => setResumeOpen(true)} />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection onOpenDemo={(id) => setActiveDemo(id)} />
            <EducationSection />
            <CertificationsSection />
            <ContactSection onShowToast={showToast} />
          </main>

          {/* Comprehensive Footer */}
          <Footer />
        </>
      )}

      {/* Resume Digital Document Modal */}
      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
        onShowToast={showToast}
      />

      {/* Interactive Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast">
            <CheckCircle2 size={18} color="#10b981" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
