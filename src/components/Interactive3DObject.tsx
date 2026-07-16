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
    const pointCount = 150;
    const sphereRadius = 90;
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
    const ringCount = 100;
    const ring1Radius = 130;
    const ring2Radius = 165;

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

    // Precompute constant sphere point connections (constellation lines)
    const connections: [number, number][] = [];
    for (let i = 0; i < pointCount; i++) {
      for (let j = i + 1; j < pointCount; j++) {
        const dx = spherePoints[i].x - spherePoints[j].x;
        const dy = spherePoints[i].y - spherePoints[j].y;
        const dz = spherePoints[i].z - spherePoints[j].z;
        const dist3d = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (dist3d < 55) {
          connections.push([i, j]);
        }
      }
    }

    let hasMouseMoved = false;

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      if (!hasMouseMoved) {
        mouseRef.current.x = mouseRef.current.targetX;
        mouseRef.current.y = mouseRef.current.targetY;
        hasMouseMoved = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0;
    let angleY = 0;

    // Use ResizeObserver for responsive sizing instead of window.onresize
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Use contentRect or container bounds for high precision
        const width = entry.contentRect.width || (containerRef.current ? containerRef.current.clientWidth : 0);
        const height = entry.contentRect.height || (containerRef.current ? containerRef.current.clientHeight : 0);
        
        if (width > 0 && height > 0) {
          // Cap pixel ratio for performance
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          ctx.scale(dpr, dpr);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

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

      // Pre-allocate projection arrays to prevent GC churn
      const projectedPoints = Array.from({ length: pointCount }, () => ({ x: 0, y: 0, z: 0, depthScale: 0 }));
      const projectedRing1 = Array.from({ length: ringCount }, () => ({ x: 0, y: 0, z: 0 }));
      const projectedRing2 = Array.from({ length: ringCount }, () => ({ x: 0, y: 0, z: 0 }));

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (width <= 0 || height <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (!hasMouseMoved) {
        mouseRef.current.targetX = width / 2;
        mouseRef.current.targetY = height / 2;
        if (mouseRef.current.x === 0 && mouseRef.current.y === 0) {
          mouseRef.current.x = width / 2;
          mouseRef.current.y = height / 2;
        }
      }

      // Lerp mouse coordinates to achieve smooth movement with lag inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const timeSec = Date.now() * 0.001;

      // Center perfectly on the mouse pointer with a slight smooth lag
      const centerX = mouseRef.current.x;
      const centerY = mouseRef.current.y;

      // Base auto rotation + breathing speed modulation + mouse influence (reduced since we center on it)
      angleY += 0.004 + Math.sin(timeSec * 0.4) * 0.0015;
      angleX += 0.0025 + Math.cos(timeSec * 0.3) * 0.001;

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
      for (let i = 0; i < pointCount; i++) {
        const p = spherePoints[i];
        // Apply rotations
        let rotated = rotatePointY(p, angleY);
        rotated = rotatePointX(rotated, angleX);

        // Perspective scale factor
        const scale = fov / (fov + rotated.z);
        projectedPoints[i].x = centerX + rotated.x * scale;
        projectedPoints[i].y = centerY + rotated.y * scale;
        projectedPoints[i].z = rotated.z;
        projectedPoints[i].depthScale = scale;
      }

      // Draw constellation connections using precomputed connections list (Ultra-fast!)
      ctx.lineWidth = 0.5;
      for (let k = 0; k < connections.length; k++) {
        const [i, j] = connections[k];
        const p1 = projectedPoints[i];
        const p2 = projectedPoints[j];
        
        // Fade out lines on the back side of the sphere (z > 0 is deeper in screen)
        const avgZ = (p1.z + p2.z) / 2;
        const alphaFactor = Math.max(0.05, Math.min(0.4, 0.4 * (1 - avgZ / sphereRadius)));
        
        ctx.strokeStyle = `${secondaryColor}${Math.floor(alphaFactor * 255).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
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
      for (let i = 0; i < ringCount; i++) {
        const p = ring1Points[i];
        // Tilting ring initially
        let rotated = rotatePointX(p, Math.PI / 4);
        rotated = rotatePointZ(rotated, Math.PI / 6);
        // Apply dynamic rotations
        rotated = rotatePointY(rotated, angleY * 1.5);
        rotated = rotatePointX(rotated, angleX);

        const scale = fov / (fov + rotated.z);
        projectedRing1[i].x = centerX + rotated.x * scale;
        projectedRing1[i].y = centerY + rotated.y * scale;
        projectedRing1[i].z = rotated.z;
      }

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
      for (let i = 0; i < ringCount; i++) {
        const p = ring2Points[i];
        let rotated = rotatePointX(p, -Math.PI / 3);
        rotated = rotatePointZ(rotated, -Math.PI / 5);
        rotated = rotatePointY(rotated, -angleY * 1.2);
        rotated = rotatePointX(rotated, angleX * 0.8);

        const scale = fov / (fov + rotated.z);
        projectedRing2[i].x = centerX + rotated.x * scale;
        projectedRing2[i].y = centerY + rotated.y * scale;
        projectedRing2[i].z = rotated.z;
      }

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
      resizeObserver.disconnect();
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
