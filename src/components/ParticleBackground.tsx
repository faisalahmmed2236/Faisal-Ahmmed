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
    
    // Track mouse position
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > canvasWidth || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvasHeight || this.y < 0) this.speedY = -this.speedY;

        // Interactive mouse repel
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * 2;
          const directionY = forceDirectionY * force * 2;

          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw(ctx: CanvasRenderingContext2D, color: string) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      // Adjust density based on screen size
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 100);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    let currentThemeColor = 'rgba(255, 255, 255, 0.3)';

    const updateThemeColor = () => {
      const dummy = document.createElement('div');
      dummy.className = 'text-theme-p-500';
      dummy.style.display = 'none';
      document.body.appendChild(dummy);
      
      const computedColor = getComputedStyle(dummy).color;
      document.body.removeChild(dummy);

      if (computedColor) {
        if (computedColor.startsWith('rgb(')) {
          currentThemeColor = computedColor.replace('rgb(', 'rgba(').replace(')', ', 0.3)');
        } else if (computedColor.startsWith('rgba(')) {
          const parts = computedColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
          if (parts) {
            currentThemeColor = `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, 0.3)`;
          }
        }
      }
    };

    const drawLines = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = dx * dx + dy * dy;
          
          if (distance < 12000) {
            const opacity = 1 - (distance / 12000);
            const lineColor = currentThemeColor.replace(/[\d.]+\)$/g, `${opacity * 0.5})`);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
        
        // Connect to mouse
        const mouseDx = particles[a].x - mouse.x;
        const mouseDy = particles[a].y - mouse.y;
        const mouseDistance = mouseDx * mouseDx + mouseDy * mouseDy;
        
        if (mouseDistance < 20000) {
          const opacity = 1 - (mouseDistance / 20000);
          const lineColor = currentThemeColor.replace(/[\d.]+\)$/g, `${opacity * 0.8})`);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx, currentThemeColor);
      }
      
      drawLines();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    updateThemeColor();
    animate();

    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

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
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
};
