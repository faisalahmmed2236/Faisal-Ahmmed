import React, { useRef, useEffect } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let blobs: GlowBlob[] = [];
    
    // Cache dimensions to avoid layout thrashing
    let cachedWidth = window.innerWidth;
    let cachedHeight = window.innerHeight;
    
    // Track mouse position
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120
    };

    const handleResize = () => {
      cachedWidth = window.innerWidth;
      cachedHeight = window.innerHeight;
      
      // Cap pixel ratio to 1.5 for performance while keeping it sharp enough
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = cachedWidth * dpr;
      canvas.height = cachedHeight * dpr;
      canvas.style.width = `${cachedWidth}px`;
      canvas.style.height = `${cachedHeight}px`;
      ctx.scale(dpr, dpr);
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5; // slow, elegant motion
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around instead of hard bounce for organic flow
        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;

        if (this.y > height) this.y = 0;
        else if (this.y < 0) this.y = height;

        // Interactive mouse repel (subtle push)
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D, color: string) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class GlowBlob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      angle: number;
      speed: number;
      amplitude: number;

      constructor(width: number, height: number, radius: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = radius;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.0005 + Math.random() * 0.001;
        this.amplitude = 15 + Math.random() * 25;
      }

      update(width: number, height: number) {
        // Slow organic floating movement
        this.x += this.vx + Math.sin(this.angle) * 0.05;
        this.y += this.vy + Math.cos(this.angle) * 0.05;
        this.angle += this.speed;

        // Soft bounce at boundary with padding
        const pad = -this.radius / 2;
        if (this.x < pad || this.x > width - pad) this.vx = -this.vx;
        if (this.y < pad || this.y > height - pad) this.vy = -this.vy;
      }

      draw(ctx: CanvasRenderingContext2D, color: string, color04: string) {
        ctx.save();
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, color);
        grad.addColorStop(0.5, color04);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const init = () => {
      const width = cachedWidth;
      const height = cachedHeight;

      // Particles setup (optimized for speed and density)
      particles = [];
      const numberOfParticles = Math.min(Math.floor((width * height) / 24000), 45);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(width, height));
      }

      // Background decorative glowing objects (blobs) that drift automatically
      // Generates 3 large beautiful blobs
      blobs = [
        new GlowBlob(width, height, Math.min(width * 0.35, 350)),
        new GlowBlob(width, height, Math.min(width * 0.3, 280)),
        new GlowBlob(width, height, Math.min(width * 0.25, 220)),
      ];
    };

    // Ultra-fast direct theme config retrieval
    let cachedColors: any = null;
    
    const getColors = () => {
      if (cachedColors) return cachedColors;
      
      const isLight = document.documentElement.getAttribute('data-mode') === 'light';
      const themeAttr = document.documentElement.getAttribute('data-theme') || 'default';

      if (isLight) {
        cachedColors = {
          primaryBlob: 'rgba(59, 130, 246, 0.12)',
          primaryBlob04: 'rgba(59, 130, 246, 0.04)',
          secondaryBlob: 'rgba(96, 165, 250, 0.10)',
          secondaryBlob04: 'rgba(96, 165, 250, 0.04)',
          tertiaryBlob: 'rgba(147, 51, 234, 0.08)',
          tertiaryBlob04: 'rgba(147, 51, 234, 0.04)',
          particle: 'rgba(59, 130, 246, 0.25)',
          linePrefix: 'rgba(59, 130, 246, '
        };
        return cachedColors;
      }

      // Dark mode theme selections
      switch (themeAttr) {
        case 'emerald':
          cachedColors = {
            primaryBlob: 'rgba(16, 185, 129, 0.12)',
            primaryBlob04: 'rgba(16, 185, 129, 0.04)',
            secondaryBlob: 'rgba(20, 184, 166, 0.10)',
            secondaryBlob04: 'rgba(20, 184, 166, 0.04)',
            tertiaryBlob: 'rgba(6, 182, 212, 0.08)',
            tertiaryBlob04: 'rgba(6, 182, 212, 0.04)',
            particle: 'rgba(16, 185, 129, 0.25)',
            linePrefix: 'rgba(16, 185, 129, '
          };
          break;
        case 'rose':
          cachedColors = {
            primaryBlob: 'rgba(244, 63, 94, 0.12)',
            primaryBlob04: 'rgba(244, 63, 94, 0.04)',
            secondaryBlob: 'rgba(249, 115, 22, 0.10)',
            secondaryBlob04: 'rgba(249, 115, 22, 0.04)',
            tertiaryBlob: 'rgba(236, 72, 153, 0.08)',
            tertiaryBlob04: 'rgba(236, 72, 153, 0.04)',
            particle: 'rgba(244, 63, 94, 0.25)',
            linePrefix: 'rgba(244, 63, 94, '
          };
          break;
        case 'blue':
          cachedColors = {
            primaryBlob: 'rgba(59, 130, 246, 0.12)',
            primaryBlob04: 'rgba(59, 130, 246, 0.04)',
            secondaryBlob: 'rgba(6, 182, 212, 0.10)',
            secondaryBlob04: 'rgba(6, 182, 212, 0.04)',
            tertiaryBlob: 'rgba(139, 92, 246, 0.08)',
            tertiaryBlob04: 'rgba(139, 92, 246, 0.04)',
            particle: 'rgba(59, 130, 246, 0.25)',
            linePrefix: 'rgba(59, 130, 246, '
          };
          break;
        default: // Indigo/Purple default
          cachedColors = {
            primaryBlob: 'rgba(99, 102, 241, 0.12)',
            primaryBlob04: 'rgba(99, 102, 241, 0.04)',
            secondaryBlob: 'rgba(168, 85, 247, 0.10)',
            secondaryBlob04: 'rgba(168, 85, 247, 0.04)',
            tertiaryBlob: 'rgba(236, 72, 153, 0.08)',
            tertiaryBlob04: 'rgba(236, 72, 153, 0.04)',
            particle: 'rgba(99, 102, 241, 0.25)',
            linePrefix: 'rgba(99, 102, 241, '
          };
          break;
      }
      return cachedColors;
    };

    const drawLines = (lineColorPrefix: string) => {
      // Fast path connecting particles (optimized double-loop distance threshold)
      const maxDistance = 110;
      const maxDistanceSq = maxDistance * maxDistance;

      for (let a = 0; a < particles.length; a++) {
        const pa = particles[a];
        for (let b = a + 1; b < particles.length; b++) {
          const pb = particles[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - (dist / maxDistance)) * 0.45;
            ctx.strokeStyle = lineColorPrefix + opacity + ')';
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }
        
        // Dynamic interactive connection to cursor
        if (mouse.x > 0 && mouse.y > 0) {
          const mouseDx = pa.x - mouse.x;
          const mouseDy = pa.y - mouse.y;
          const mouseDistSq = mouseDx * mouseDx + mouseDy * mouseDy;
          const maxMouseDistSq = 140 * 140;
          
          if (mouseDistSq < maxMouseDistSq) {
            const dist = Math.sqrt(mouseDistSq);
            const opacity = (1 - (dist / 140)) * 0.65;
            ctx.strokeStyle = lineColorPrefix + opacity + ')';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const width = cachedWidth;
      const height = cachedHeight;
      
      ctx.clearRect(0, 0, width, height);

      // Get real-time colors based on theme and light/dark status
      const colors = getColors();

      // 1. Draw glowing background objects (blobs) drifting automatically (all-sections, dark and light)
      if (blobs.length >= 3) {
        blobs[0].update(width, height);
        blobs[0].draw(ctx, colors.primaryBlob, colors.primaryBlob04);

        blobs[1].update(width, height);
        blobs[1].draw(ctx, colors.secondaryBlob, colors.secondaryBlob04);

        blobs[2].update(width, height);
        blobs[2].draw(ctx, colors.tertiaryBlob, colors.tertiaryBlob04);
      }

      // 2. Draw and update interactive particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(width, height);
        particles[i].draw(ctx, colors.particle);
      }
      
      // 3. Connect particles with glowing matrix lines
      drawLines(colors.linePrefix);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize & Start
    handleResize();
    animate();

    // Listen to changes in data-theme or data-mode dynamically
    const observer = new MutationObserver(() => {
      // Force instant update on mode or theme switches
      cachedColors = null;
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-mode'] });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
};
