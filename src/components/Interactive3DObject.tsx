import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export function Interactive3DObject() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Theme-aware colors
  let primaryColor = '#818cf8'; // Indigo
  let secondaryColor = '#a855f7'; // Purple
  let glowColor = '#ec4899'; // Hot pink

  if (theme === 'emerald') {
    primaryColor = '#10b981'; // Emerald
    secondaryColor = '#14b8a6'; // Teal
    glowColor = '#06b6d4'; // Cyan
  } else if (theme === 'rose') {
    primaryColor = '#f43f5e'; // Rose
    secondaryColor = '#f97316'; // Orange
    glowColor = '#ec4899'; // Magenta glow
  } else if (theme === 'blue') {
    primaryColor = '#3b82f6'; // Blue
    secondaryColor = '#06b6d4'; // Cyan
    glowColor = '#8b5cf6'; // Purple glow
  }

  useEffect(() => {
    // Generate sphere points using Fibonacci Golden Spiral for perfect distribution
    const pointCount = 100;
    const sphereRadius = 130;
    const spherePoints: Point3D[] = [];

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / pointCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);
      spherePoints.push({ x, y, z });
    }

    // Generate orbiting ring points
    const ring1Points: Point3D[] = [];
    const ring2Points: Point3D[] = [];
    const ringCount = 72;
    const ring1Radius = 180;
    const ring2Radius = 220;

    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      // Ring 1 in XY plane initially
      ring1Points.push({
        x: ring1Radius * Math.cos(angle),
        y: ring1Radius * Math.sin(angle),
        z: 0
      });
      // Ring 2 in XZ plane initially
      ring2Points.push({
        x: ring2Radius * Math.cos(angle),
        y: 0,
        z: ring2Radius * Math.sin(angle)
      });
    }

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.targetX = (e.clientX - cx) * 0.4;
      mouseRef.current.targetY = (e.clientY - cy) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0;
    let angleY = 0;

    // Handle resizing
    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Perspective Projection helper
    const fov = 400;

    const rotatePointX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos
      };
    };

    const rotatePointY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos + p.z * sin,
        y: p.y,
        z: -p.x * sin + p.z * cos
      };
    };

    const rotatePointZ = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos - p.y * sin,
        y: p.x * sin + p.y * cos,
        z: p.z
      };
    };

    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Lerp mouse coordinates to achieve smooth movement with lag inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Elegant, automatic slow float/bobbing motion
      const timeSec = Date.now() * 0.001;
      const autoFloatX = Math.cos(timeSec * 0.8) * 12;
      const autoFloatY = Math.sin(timeSec * 0.6) * 15;

      // Translate the entire 3D ball center smoothly with mouse displacement and float offsets
      const centerX = width / 2 + autoFloatX + mouseRef.current.x * 0.8;
      const centerY = height / 2 + autoFloatY + mouseRef.current.y * 0.8;

      // Base auto rotation + breathing speed modulation + mouse influence
      angleY += 0.004 + Math.sin(timeSec * 0.4) * 0.0015 + mouseRef.current.x * 0.00005;
      angleX += 0.0025 + Math.cos(timeSec * 0.3) * 0.001 - mouseRef.current.y * 0.00005;

      // Draw Central Glowing Core
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, sphereRadius * 0.8
      );
      coreGradient.addColorStop(0, `${primaryColor}22`);
      coreGradient.addColorStop(0.5, `${secondaryColor}11`);
      coreGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Project sphere points
      const projectedPoints = spherePoints.map(p => {
        // Apply rotations
        let rotated = rotatePointY(p, angleY);
        rotated = rotatePointX(rotated, angleX);

        // Perspective scale factor
        const scale = fov / (fov + rotated.z);
        return {
          x: centerX + rotated.x * scale,
          y: centerY + rotated.y * scale,
          z: rotated.z,
          depthScale: scale
        };
      });

      // Draw constellation connections first (behind or front depending on distance)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          // Check 3D distance between raw points
          const dx = spherePoints[i].x - spherePoints[j].x;
          const dy = spherePoints[i].y - spherePoints[j].y;
          const dz = spherePoints[i].z - spherePoints[j].z;
          const dist3d = Math.sqrt(dx*dx + dy*dy + dz*dz);

          if (dist3d < 95) {
            // Fade out lines on the back side of the sphere (z > 0 is deeper in screen)
            const avgZ = (p1.z + p2.z) / 2;
            const alphaFactor = Math.max(0.05, Math.min(0.4, 0.4 * (1 - avgZ / sphereRadius)));
            
            ctx.strokeStyle = `${secondaryColor}${Math.floor(alphaFactor * 255).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw points with depth sizing
      projectedPoints.forEach(p => {
        const pointAlpha = Math.max(0.1, Math.min(0.8, 0.7 * (1 - p.z / sphereRadius)));
        const pointSize = Math.max(1, Math.min(3.5, 2.5 * p.depthScale));

        ctx.fillStyle = p.z < 0 ? primaryColor : secondaryColor;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = p.z < 0 ? 6 : 0;
        ctx.globalAlpha = pointAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, pointSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // reset
        ctx.globalAlpha = 1.0;
      });

      // Project and draw Cyber Ring 1 (tilted in space)
      const projectedRing1 = ring1Points.map(p => {
        // Tilting ring initially
        let rotated = rotatePointX(p, Math.PI / 4);
        rotated = rotatePointZ(rotated, Math.PI / 6);
        // Apply dynamic rotations
        rotated = rotatePointY(rotated, angleY * 1.5);
        rotated = rotatePointX(rotated, angleX);

        const scale = fov / (fov + rotated.z);
        return {
          x: centerX + rotated.x * scale,
          y: centerY + rotated.y * scale,
          z: rotated.z
        };
      });

      // Draw Ring 1 paths
      ctx.lineWidth = 1.0;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 4;
      for (let i = 0; i < projectedRing1.length; i++) {
        const p1 = projectedRing1[i];
        const p2 = projectedRing1[(i + 1) % projectedRing1.length];
        const avgZ = (p1.z + p2.z) / 2;
        const ringAlpha = Math.max(0.02, Math.min(0.4, 0.3 * (1 - avgZ / ring1Radius)));
        ctx.strokeStyle = `${glowColor}${Math.floor(ringAlpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Project and draw Cyber Ring 2 (different tilt, counter rotation)
      const projectedRing2 = ring2Points.map(p => {
        let rotated = rotatePointX(p, -Math.PI / 3);
        rotated = rotatePointZ(rotated, -Math.PI / 5);
        rotated = rotatePointY(rotated, -angleY * 1.2);
        rotated = rotatePointX(rotated, angleX * 0.8);

        const scale = fov / (fov + rotated.z);
        return {
          x: centerX + rotated.x * scale,
          y: centerY + rotated.y * scale,
          z: rotated.z
        };
      });

      // Draw Ring 2 paths
      ctx.shadowBlur = 2;
      for (let i = 0; i < projectedRing2.length; i++) {
        const p1 = projectedRing2[i];
        const p2 = projectedRing2[(i + 1) % projectedRing2.length];
        const avgZ = (p1.z + p2.z) / 2;
        const ringAlpha = Math.max(0.01, Math.min(0.25, 0.2 * (1 - avgZ / ring2Radius)));
        ctx.strokeStyle = `${secondaryColor}${Math.floor(ringAlpha * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
      ctx.shadowBlur = 0; // Reset

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, primaryColor, secondaryColor, glowColor]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-50 sm:opacity-75 md:opacity-90"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
    </div>
  );
}
