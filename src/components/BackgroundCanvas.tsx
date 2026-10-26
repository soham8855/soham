import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  theme: 'silver' | 'dark';
}

interface Particle {
  x: number;
  y: number;
  speed: number;
  radius: number;
  alpha: number;
  waveOffset: number;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();
    window.addEventListener('resize', setupCanvasSize);

    // Initialize floating cyber particles that drift along the ribbons
    const particleCount = 28;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.25 + Math.random() * 0.45,
        radius: 1 + Math.random() * 1.8,
        alpha: 0.2 + Math.random() * 0.5,
        waveOffset: Math.random() * Math.PI * 2
      });
    }

    let step = 0;

    const render = () => {
      step += 0.0075;
      ctx.clearRect(0, 0, width, height);

      const isSilver = theme === 'silver';

      // 1. Draw subtle futuristic cityscape silhouette in the far horizon
      const skylineY = height * 0.42;
      const buildingWidth = Math.max(width / 26, 40);
      const skylineColor = isSilver 
        ? 'rgba(148, 163, 184, 0.12)' 
        : 'rgba(30, 41, 59, 0.25)';
      
      ctx.fillStyle = skylineColor;
      for (let i = 0; i < 30; i++) {
        const seed = Math.sin(i * 127) * 10000;
        const randH = (seed - Math.floor(seed));
        const bHeight = 35 + randH * 165;
        const bX = i * (buildingWidth * 0.96);
        ctx.fillRect(bX, skylineY - bHeight, buildingWidth * 0.82, bHeight + 120);

        // Antenna on select buildings
        if (i % 4 === 1) {
          ctx.strokeStyle = isSilver ? 'rgba(148, 163, 184, 0.22)' : 'rgba(56, 189, 248, 0.25)';
          ctx.lineWidth = 1.25;
          ctx.beginPath();
          ctx.moveTo(bX + (buildingWidth * 0.41), skylineY - bHeight);
          ctx.lineTo(bX + (buildingWidth * 0.41), skylineY - bHeight - 38);
          ctx.stroke();

          // Blinking red/cyan antenna beacon
          const beaconAlpha = (Math.sin(step * 3 + i) + 1) / 2;
          ctx.fillStyle = isSilver ? `rgba(2, 132, 199, ${beaconAlpha * 0.6})` : `rgba(56, 189, 248, ${beaconAlpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(bX + (buildingWidth * 0.41), skylineY - bHeight - 38, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw flowing wave ribbons matching the reference image's white/cyan contour curves
      const ribbonCount = 5;
      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        const baseOffset = r * 30;
        const startY = height * 0.22 + baseOffset;
        
        ctx.lineWidth = r === 0 ? 1.5 : 0.85;
        ctx.strokeStyle = isSilver
          ? `rgba(2, 132, 199, ${0.12 + r * 0.04})`
          : `rgba(56, 189, 248, ${0.1 + r * 0.04})`;

        for (let x = 0; x <= width; x += 15) {
          const y =
            startY +
            Math.sin(x * 0.003 + step + r * 0.6) * 36 +
            Math.cos(x * 0.0018 - step * 0.5) * 22;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 3. Lower ambient wave ribbons
      for (let r = 0; r < 4; r++) {
        ctx.beginPath();
        const startY = height * 0.62 + r * 26;
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = isSilver
          ? `rgba(255, 255, 255, ${0.38 + r * 0.12})`
          : `rgba(14, 165, 233, ${0.08 + r * 0.04})`;

        for (let x = 0; x <= width; x += 20) {
          const y =
            startY +
            Math.sin(x * 0.0025 - step * 0.8 + r) * 28 +
            Math.sin(x * 0.005 + step) * 12;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 4. Subtle cyber drift particles
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width + 10) {
          p.x = -10;
          p.y = Math.random() * height;
        }

        const oscY = p.y + Math.sin(step * 2 + p.waveOffset) * 8;
        ctx.fillStyle = isSilver 
          ? `rgba(2, 132, 199, ${p.alpha * 0.35})` 
          : `rgba(56, 189, 248, ${p.alpha * 0.45})`;
        ctx.beginPath();
        ctx.arc(p.x, oscY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setupCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          opacity: 0.95
        }}
      />
    </div>
  );
};
