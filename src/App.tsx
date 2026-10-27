import { useState, useEffect, useRef } from 'react';
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

// Exact target width for desktop presentation across all devices
const DESKTOP_WIDTH = 1240;

export default function App() {
  const [theme, setTheme] = useState<'silver' | 'dark'>('silver');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  // Viewport & Scaling State
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : DESKTOP_WIDTH
  );
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

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

  // Track window resizing and orientation changes
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Track content height variations dynamically with ResizeObserver
  useEffect(() => {
    const measureHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.offsetHeight || contentRef.current.scrollHeight;
        if (height > 0) {
          setContentHeight(height);
        }
      }
    };

    // Immediate initial measurement & after slight paint tick
    measureHeight();
    const timer = setTimeout(measureHeight, 100);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && contentRef.current) {
      resizeObserver = new ResizeObserver(() => {
        measureHeight();
      });
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener('load', measureHeight);

    return () => {
      clearTimeout(timer);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('load', measureHeight);
    };
  }, [activeDemo]);

  // Intercept in-page smooth navigation for desktop scaled coordinate space
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href.length > 1) {
          const id = href.replace('#', '');
          const el = document.getElementById(id);
          if (el) {
            e.preventDefault();
            const currentScale = viewportWidth < DESKTOP_WIDTH ? viewportWidth / DESKTOP_WIDTH : 1;
            const rect = el.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = rect.top + scrollTop - (75 * currentScale);
            window.scrollTo({
              top: Math.max(0, targetY),
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [viewportWidth]);

  // Scaling calculations
  const isScaleNeeded = viewportWidth < DESKTOP_WIDTH;
  const scale = isScaleNeeded ? viewportWidth / DESKTOP_WIDTH : 1;
  const scaledWrapperHeight = isScaleNeeded && contentHeight > 0
    ? Math.ceil(contentHeight * scale)
    : undefined;

  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      
      {/* Dynamic Animated Canvas capturing the Reference Image's Wave Ribbons & City Skyline */}
      <BackgroundCanvas theme={theme} />

      {activeDemo === 'swaraajya-voting' ? (
        /* ================= SWARAAJYA LIVE PROJECT DEMO VIEW (SCALED DESKTOP) ================= */
        <div
          style={{
            width: '100%',
            overflowX: 'hidden',
            height: scaledWrapperHeight ? `${scaledWrapperHeight}px` : 'auto',
            position: 'relative'
          }}
        >
          <div
            ref={contentRef}
            style={
              isScaleNeeded
                ? {
                    width: `${DESKTOP_WIDTH}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }
                : {
                    width: '100%',
                    position: 'relative'
                  }
            }
          >
            <SwaraajyaDemoView 
              onBack={() => {
                setActiveDemo(null);
                setTimeout(() => {
                  const el = document.getElementById('projects');
                  if (el) {
                    const rect = el.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    window.scrollTo({
                      top: Math.max(0, rect.top + scrollTop - 70),
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              }} 
              theme={theme} 
            />
          </div>
        </div>
      ) : (
        /* ================= MAIN PORTFOLIO SECTIONS (SCALED DESKTOP) ================= */
        <>
          {/* Glassmorphic Navbar (Exact Desktop Style & Position) */}
          {isScaleNeeded ? (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${viewportWidth}px`,
                height: `${Math.ceil(75 * scale)}px`,
                zIndex: 100,
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  width: `${DESKTOP_WIDTH}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  pointerEvents: 'auto'
                }}
              >
                <Navbar 
                  theme={theme} 
                  toggleTheme={toggleTheme} 
                  onOpenResume={() => setResumeOpen(true)} 
                />
              </div>
            </div>
          ) : (
            <Navbar 
              theme={theme} 
              toggleTheme={toggleTheme} 
              onOpenResume={() => setResumeOpen(true)} 
            />
          )}

          {/* Scaled Desktop Layout Container */}
          <div
            style={{
              width: '100%',
              overflowX: 'hidden',
              height: scaledWrapperHeight ? `${scaledWrapperHeight}px` : 'auto',
              position: 'relative',
              flex: 1
            }}
          >
            <div
              ref={contentRef}
              style={
                isScaleNeeded
                  ? {
                      width: `${DESKTOP_WIDTH}px`,
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }
                  : {
                      width: '100%',
                      position: 'relative'
                    }
              }
            >
              {/* Main Content Sections - Exact Desktop Layout */}
              <main style={{ position: 'relative', zIndex: 5 }}>
                <HeroSection onOpenResume={() => setResumeOpen(true)} />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection onOpenDemo={(id) => setActiveDemo(id)} />
                <EducationSection />
                <CertificationsSection />
                <ContactSection onShowToast={showToast} />
              </main>

              {/* Exact Desktop 4-Column Footer */}
              <Footer />
            </div>
          </div>
        </>
      )}

      {/* Resume Digital Document Modal (Root Portal for Optimal Mobile Usability) */}
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
