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

  // Theme-aware colors with enhanced vibrance
  let primaryHex = '#818cf8'; // Indigo
  let secondaryHex = '#a855f7'; // Purple
  let glowHex = '#ec4899'; // Hot pink

  if (theme === 'emerald') {
    primaryHex = '#10b981'; // Emerald
    secondaryHex = '#14b8a6'; // Teal
    glowHex = '#06b6d4'; // Cyan
  } else if (theme === 'rose') {
    primaryHex = '#f43f5e'; // Rose
    secondaryHex = '#f97316'; // Orange
    glowHex = '#ec4899'; // Magenta glow
  } else if (theme === 'blue') {
    primaryHex = '#3b82f6'; // Blue
    secondaryHex = '#06b6d4'; // Cyan
    glowHex = '#8b5cf6'; // Purple glow
  }

  // Convert hex to rgb for high-performance canvas rgba formatting
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 129, g: 138, b: 248 };
  };

  const rgbPrimary = hexToRgb(primaryHex);
  const rgbSecondary = hexToRgb(secondaryHex);
  const rgbGlow = hexToRgb(glowHex);

  useEffect(() => {
    // 1. Generate Outer Constellation Sphere Points using Fibonacci Golden Spiral
    const outerPointCount = 130;
    const outerRadius = 140;
    const outerPoints: Point3D[] = [];

    for (let i = 0; i < outerPointCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / outerPointCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = outerRadius * Math.sin(phi) * Math.cos(theta);
      const y = outerRadius * Math.sin(phi) * Math.sin(theta);
      const z = outerRadius * Math.cos(phi);
      outerPoints.push({ x, y, z });
    }

    // 2. Generate Inner Core Sphere Points (creates parallax multi-layered depth)
    const innerPointCount = 35;
    const innerRadius = 60;
    const innerPoints: Point3D[] = [];
    for (let i = 0; i < innerPointCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / innerPointCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = innerRadius * Math.sin(phi) * Math.cos(theta);
      const y = innerRadius * Math.sin(phi) * Math.sin(theta);
      const z = innerRadius * Math.cos(phi);
      innerPoints.push({ x, y, z });
    }

    // 3. Generate Orbiting Ring Points with precalculated static tilted configurations
    const ringCount = 90;
    const ring1Radius = 145;
    const ring2Radius = 180;
    const ring1Points: Point3D[] = [];
    const ring2Points: Point3D[] = [];

    // Tilted matrix static parameters
    const cosTilt1X = Math.cos(Math.PI / 4.5);
    const sinTilt1X = Math.sin(Math.PI / 4.5);
    const cosTilt1Z = Math.cos(Math.PI / 7);
    const sinTilt1Z = Math.sin(Math.PI / 7);

    const cosTilt2X = Math.cos(-Math.PI / 3.2);
    const sinTilt2X = Math.sin(-Math.PI / 3.2);
    const cosTilt2Z = Math.cos(-Math.PI / 6);
    const sinTilt2Z = Math.sin(-Math.PI / 6);

    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      
      // Ring 1 base
      const rx1 = ring1Radius * Math.cos(angle);
      const ry1 = ring1Radius * Math.sin(angle);
      const rz1 = 0;
      // Pre-apply tilt X then tilt Z
      const rx1_t = rx1;
      const ry1_t = ry1 * cosTilt1X - rz1 * sinTilt1X;
      const rz1_t = ry1 * sinTilt1X + rz1 * cosTilt1X;
      
      const rx1_tz = rx1_t * cosTilt1Z - ry1_t * sinTilt1Z;
      const ry1_tz = rx1_t * sinTilt1Z + ry1_t * cosTilt1Z;
      const rz1_tz = rz1_t;
      ring1Points.push({ x: rx1_tz, y: ry1_tz, z: rz1_tz });

      // Ring 2 base
      const rx2 = ring2Radius * Math.cos(angle);
      const ry2 = 0;
      const rz2 = ring2Radius * Math.sin(angle);
      // Pre-apply tilt X then tilt Z
      const rx2_t = rx2;
      const ry2_t = ry2 * cosTilt2X - rz2 * sinTilt2X;
      const rz2_t = ry2 * sinTilt2X + rz2 * cosTilt2X;

      const rx2_tz = rx2_t * cosTilt2Z - ry2_t * sinTilt2Z;
      const ry2_tz = rx2_t * sinTilt2Z + ry2_t * cosTilt2Z;
      const rz2_tz = rz2_t;
      ring2Points.push({ x: rx2_tz, y: ry2_tz, z: rz2_tz });
    }

    // 4. Generate ambient Space Dust coordinates
    const dustCount = 50;
    const dustPoints: Point3D[] = [];
    for (let i = 0; i < dustCount; i++) {
      dustPoints.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500,
        z: (Math.random() - 0.5) * 400
      });
    }

    // Precompute index connections for outer sphere to avoid runtime distance checks
    const connections: [number, number][] = [];
    for (let i = 0; i < outerPointCount; i++) {
      for (let j = i + 1; j < outerPointCount; j++) {
        const dx = outerPoints[i].x - outerPoints[j].x;
        const dy = outerPoints[i].y - outerPoints[j].y;
        const dz = outerPoints[i].z - outerPoints[j].z;
        const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist3d < 58) {
          connections.push([i, j]);
        }
      }
    }

    let hasMouseMoved = false;

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
    let innerAngleX = 0;
    let innerAngleY = 0;

    let centerX = 0;
    let centerY = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width || (containerRef.current ? containerRef.current.clientWidth : 0);
        const height = entry.contentRect.height || (containerRef.current ? containerRef.current.clientHeight : 0);
        
        if (width > 0 && height > 0) {
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

    const fov = 400;

    // Pre-allocate projection structures outside loop for pure GC efficiency (0-alloc render loop)
    const projectedOuter = Array.from({ length: outerPointCount }, () => ({ x: 0, y: 0, z: 0, depthScale: 0 }));
    const projectedInner = Array.from({ length: innerPointCount }, () => ({ x: 0, y: 0, z: 0, depthScale: 0 }));
    const projectedRing1 = Array.from({ length: ringCount }, () => ({ x: 0, y: 0, z: 0 }));
    const projectedRing2 = Array.from({ length: ringCount }, () => ({ x: 0, y: 0, z: 0 }));
    const projectedDust = Array.from({ length: dustCount }, () => ({ x: 0, y: 0, z: 0, depthScale: 0 }));

    let lastTime = performance.now();

    const render = (timeMs: number) => {
      const dt = Math.min((timeMs - lastTime) * 0.001, 0.1); // Cap delta-time to avoid huge leaps
      lastTime = timeMs;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (width <= 0 || height <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Default centering on first run
      if (!hasMouseMoved) {
        mouseRef.current.targetX = width / 2;
        mouseRef.current.targetY = height / 2;
        if (mouseRef.current.x === 0 && mouseRef.current.y === 0) {
          mouseRef.current.x = width / 2;
          mouseRef.current.y = height / 2;
        }
      }

      // Smooth hydraulic follow interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.15;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.15;

      const timeSec = timeMs * 0.001;

      // Dynamic center drifting physics + mouse pull bias
      const floatX = Math.sin(timeSec * 0.5) * 35 + Math.cos(timeSec * 0.25) * 15;
      const floatY = Math.cos(timeSec * 0.4) * 25 + Math.sin(timeSec * 0.35) * 10;
      
      const targetX = width / 2 + floatX + (mouseRef.current.x - width / 2) * 0.4;
      const targetY = height / 2 + floatY + (mouseRef.current.y - height / 2) * 0.4;

      centerX += (targetX - centerX) * 0.25;
      centerY += (targetY - centerY) * 0.25;

      // Interactive 3D Camera Tilt based on mouse coords
      const mouseBiasX = (mouseRef.current.x - width / 2) * 0.0018;
      const mouseBiasY = (mouseRef.current.y - height / 2) * 0.0018;

      // Progress angles physically scaled by delta-time
      angleY += (0.6 + Math.sin(timeSec * 0.3) * 0.15) * dt;
      angleX += (0.35 + Math.cos(timeSec * 0.25) * 0.08) * dt;

      const currentAngleY = angleY + mouseBiasX;
      const currentAngleX = angleX + mouseBiasY;

      // Counter-rotation parameters for Inner Core Parallax
      innerAngleY -= (0.35 + Math.cos(timeSec * 0.2) * 0.08) * dt;
      innerAngleX -= (0.18 + Math.sin(timeSec * 0.15) * 0.04) * dt;

      const currentInnerAngleY = innerAngleY - mouseBiasX * 0.5;
      const currentInnerAngleX = innerAngleX - mouseBiasY * 0.5;

      // 1. Plasma core radial glow (rendered first)
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, outerRadius * 0.9
      );
      coreGradient.addColorStop(0, `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.18)`);
      coreGradient.addColorStop(0.4, `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.09)`);
      coreGradient.addColorStop(0.75, `rgba(${rgbGlow.r}, ${rgbGlow.g}, ${rgbGlow.b}, 0.03)`);
      coreGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius * 0.9, 0, Math.PI * 2);
      ctx.fill();

      // 2. Project Space Dust
      const dustAngleY = timeSec * 0.02;
      const dustAngleX = timeSec * 0.01;
      const cosDY = Math.cos(dustAngleY);
      const sinDY = Math.sin(dustAngleY);
      const cosDX = Math.cos(dustAngleX);
      const sinDX = Math.sin(dustAngleX);

      for (let i = 0; i < dustCount; i++) {
        const p = dustPoints[i];
        // Inline Y rotation
        const x1 = p.x * cosDY + p.z * sinDY;
        const y1 = p.y;
        const z1 = -p.x * sinDY + p.z * cosDY;
        // Inline X rotation
        const x2 = x1;
        const y2 = y1 * cosDX - z1 * sinDX;
        const z2 = y1 * sinDX + z1 * cosDX;

        const scale = fov / (fov + z2);
        projectedDust[i].x = centerX + x2 * scale;
        projectedDust[i].y = centerY + y2 * scale;
        projectedDust[i].z = z2;
        projectedDust[i].depthScale = scale;
      }

      // Draw background space dust (z > 0 is deeper inside)
      ctx.fillStyle = `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.2)`;
      projectedDust.forEach(p => {
        if (p.z > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.depthScale * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 3. Project & Draw Inner Core wireframe (uses high-speed inline matrix math)
      const cosInnerY = Math.cos(currentInnerAngleY);
      const sinInnerY = Math.sin(currentInnerAngleY);
      const cosInnerX = Math.cos(currentInnerAngleX);
      const sinInnerX = Math.sin(currentInnerAngleX);

      for (let i = 0; i < innerPointCount; i++) {
        const p = innerPoints[i];
        // Rotate Y
        const x1 = p.x * cosInnerY + p.z * sinInnerY;
        const y1 = p.y;
        const z1 = -p.x * sinInnerY + p.z * cosInnerY;
        // Rotate X
        const x2 = x1;
        const y2 = y1 * cosInnerX - z1 * sinInnerX;
        const z2 = y1 * sinInnerX + z1 * cosInnerX;

        const scale = fov / (fov + z2);
        projectedInner[i].x = centerX + x2 * scale;
        projectedInner[i].y = centerY + y2 * scale;
        projectedInner[i].z = z2;
        projectedInner[i].depthScale = scale;
      }

      // Draw Inner crystalline links
      ctx.lineWidth = 0.55;
      for (let i = 0; i < innerPointCount; i++) {
        for (let j = i + 1; j < innerPointCount; j++) {
          const dx = projectedInner[i].x - projectedInner[j].x;
          const dy = projectedInner[i].y - projectedInner[j].y;
          const dist = dx*dx + dy*dy;
          if (dist < 1900) {
            const avgZ = (projectedInner[i].z + projectedInner[j].z) * 0.5;
            const lineAlpha = Math.max(0.04, Math.min(0.35, 0.3 * (1 - avgZ / innerRadius)));
            ctx.strokeStyle = `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projectedInner[i].x, projectedInner[i].y);
            ctx.lineTo(projectedInner[j].x, projectedInner[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Inner Core micro-nodes
      projectedInner.forEach(p => {
        const nodeAlpha = Math.max(0.2, Math.min(0.85, 0.75 * (1 - p.z / innerRadius)));
        ctx.fillStyle = `rgba(${rgbGlow.r}, ${rgbGlow.g}, ${rgbGlow.b}, ${nodeAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.depthScale * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Project & Draw Outer Constellation Sphere
      const cosOuterY = Math.cos(currentAngleY);
      const sinOuterY = Math.sin(currentAngleY);
      const cosOuterX = Math.cos(currentAngleX);
      const sinOuterX = Math.sin(currentAngleX);

      for (let i = 0; i < outerPointCount; i++) {
        const p = outerPoints[i];
        // Rotate Y
        const x1 = p.x * cosOuterY + p.z * sinOuterY;
        const y1 = p.y;
        const z1 = -p.x * sinOuterY + p.z * cosOuterY;
        // Rotate X
        const x2 = x1;
        const y2 = y1 * cosOuterX - z1 * sinOuterX;
        const z2 = y1 * sinOuterX + z1 * cosOuterX;

        const scale = fov / (fov + z2);
        projectedOuter[i].x = centerX + x2 * scale;
        projectedOuter[i].y = centerY + y2 * scale;
        projectedOuter[i].z = z2;
        projectedOuter[i].depthScale = scale;
      }

      // Sweeping Laser Scanner physics
      const laserY = centerY + Math.sin(timeSec * 1.6) * (outerRadius + 15);
      const laserWidth = outerRadius * 1.85;

      // Draw Constellation Connections (Excited via laser wave proximity)
      ctx.lineWidth = 0.55;
      for (let k = 0; k < connections.length; k++) {
        const [i, j] = connections[k];
        const p1 = projectedOuter[i];
        const p2 = projectedOuter[j];

        const avgZ = (p1.z + p2.z) * 0.5;
        const avgY = (p1.y + p2.y) * 0.5;
        const distToLaser = Math.abs(avgY - laserY);

        let alphaFactor = Math.max(0.04, Math.min(0.35, 0.35 * (1 - avgZ / outerRadius)));
        let r = rgbSecondary.r, g = rgbSecondary.g, b = rgbSecondary.b;

        if (distToLaser < 16) {
          const excitation = (16 - distToLaser) / 16;
          alphaFactor = Math.min(0.9, alphaFactor + excitation * 0.45);
          r = rgbPrimary.r;
          g = rgbPrimary.g;
          b = rgbPrimary.b;
        }

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alphaFactor})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw Outer Sphere nodes with special custom styling (Crosshairs, Squares, Circles)
      projectedOuter.forEach((p, idx) => {
        const distToLaser = Math.abs(p.y - laserY);
        let pointAlpha = Math.max(0.12, Math.min(0.85, 0.72 * (1 - p.z / outerRadius)));
        let pointSize = Math.max(1, Math.min(4.0, 2.8 * p.depthScale));
        let r = rgbSecondary.r, g = rgbSecondary.g, b = rgbSecondary.b;
        let isExcited = false;

        if (distToLaser < 16) {
          const excitation = (16 - distToLaser) / 16;
          pointAlpha = Math.min(1.0, pointAlpha + excitation * 0.45);
          pointSize += excitation * 1.5;
          r = rgbGlow.r;
          g = rgbGlow.g;
          b = rgbGlow.b;
          isExcited = true;
        } else if (p.z < 0) {
          r = rgbPrimary.r;
          g = rgbPrimary.g;
          b = rgbPrimary.b;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pointAlpha})`;
        ctx.globalAlpha = pointAlpha;

        if (isExcited && p.z < 0) {
          ctx.shadowColor = `rgba(${rgbGlow.r}, ${rgbGlow.g}, ${rgbGlow.b}, 0.8)`;
          ctx.shadowBlur = 10;
        }

        if (idx % 18 === 0) {
          // Delicate crosshair symbol "+"
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pointAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(p.x - pointSize - 2, p.y);
          ctx.lineTo(p.x + pointSize + 2, p.y);
          ctx.moveTo(p.x, p.y - pointSize - 2);
          ctx.lineTo(p.x, p.y + pointSize + 2);
          ctx.stroke();
        } else if (idx % 22 === 0) {
          // Hollow tactical node box
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${pointAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.strokeRect(p.x - pointSize, p.y - pointSize, pointSize * 2, pointSize * 2);
        } else {
          // High-tech point circular node
          ctx.beginPath();
          ctx.arc(p.x, p.y, pointSize, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.shadowBlur = 0; // reset
        ctx.globalAlpha = 1.0;
      });

      // 5. Project & Draw Cyber Ring 1 (Uses optimized inline rotation)
      const ring1AngleY = currentAngleY * 1.4;
      const ring1AngleX = currentAngleX * 0.9;
      const cosR1Y = Math.cos(ring1AngleY);
      const sinR1Y = Math.sin(ring1AngleY);
      const cosR1X = Math.cos(ring1AngleX);
      const sinR1X = Math.sin(ring1AngleX);

      for (let i = 0; i < ringCount; i++) {
        const p = ring1Points[i];
        // Rotate Y
        const x1 = p.x * cosR1Y + p.z * sinR1Y;
        const y1 = p.y;
        const z1 = -p.x * sinR1Y + p.z * cosR1Y;
        // Rotate X
        const x2 = x1;
        const y2 = y1 * cosR1X - z1 * sinR1X;
        const z2 = y1 * sinR1X + z1 * cosR1X;

        const scale = fov / (fov + z2);
        projectedRing1[i].x = centerX + x2 * scale;
        projectedRing1[i].y = centerY + y2 * scale;
        projectedRing1[i].z = z2;
      }

      // Draw Ring 1 Paths (segmented holographic dashed style)
      ctx.lineWidth = 1.0;
      for (let i = 0; i < projectedRing1.length; i++) {
        const p1 = projectedRing1[i];
        const p2 = projectedRing1[(i + 1) % projectedRing1.length];
        const avgZ = (p1.z + p2.z) * 0.5;
        const ringAlpha = Math.max(0.02, Math.min(0.45, 0.38 * (1 - avgZ / ring1Radius)));

        if (i % 12 < 8) {
          ctx.strokeStyle = `rgba(${rgbGlow.r}, ${rgbGlow.g}, ${rgbGlow.b}, ${ringAlpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Optimized radar tick measuring system (0 trig allocations inside the frame!)
        if (i % 15 === 0) {
          const tickScale = (ring1Radius + 6) / ring1Radius;
          const pOuterX = ring1Points[i].x * tickScale;
          const pOuterY = ring1Points[i].y * tickScale;
          const pOuterZ = ring1Points[i].z * tickScale;

          // Rotate tickOuter dynamically using same matrices
          const ox1 = pOuterX * cosR1Y + pOuterZ * sinR1Y;
          const oy1 = pOuterY;
          const oz1 = -pOuterX * sinR1Y + pOuterZ * cosR1Y;

          const ox2 = ox1;
          const oy2 = oy1 * cosR1X - oz1 * sinR1X;
          const oz2 = oy1 * sinR1X + oz1 * cosR1X;

          const scaleOuter = fov / (fov + oz2);
          const tx2 = centerX + ox2 * scaleOuter;
          const ty2 = centerY + oy2 * scaleOuter;

          ctx.strokeStyle = `rgba(${rgbGlow.r}, ${rgbGlow.g}, ${rgbGlow.b}, ${ringAlpha * 1.6})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(tx2, ty2);
          ctx.stroke();
        }
      }

      // 6. Project & Draw Cyber Ring 2 (Counter-rotating orbits)
      const ring2AngleY = -currentAngleY * 1.1;
      const ring2AngleX = currentAngleX * 0.7;
      const cosR2Y = Math.cos(ring2AngleY);
      const sinR2Y = Math.sin(ring2AngleY);
      const cosR2X = Math.cos(ring2AngleX);
      const sinR2X = Math.sin(ring2AngleX);

      for (let i = 0; i < ringCount; i++) {
        const p = ring2Points[i];
        // Rotate Y
        const x1 = p.x * cosR2Y + p.z * sinR2Y;
        const y1 = p.y;
        const z1 = -p.x * sinR2Y + p.z * cosR2Y;
        // Rotate X
        const x2 = x1;
        const y2 = y1 * cosR2X - z1 * sinR2X;
        const z2 = y1 * sinR2X + z1 * cosR2X;

        const scale = fov / (fov + z2);
        projectedRing2[i].x = centerX + x2 * scale;
        projectedRing2[i].y = centerY + y2 * scale;
        projectedRing2[i].z = z2;
      }

      // Draw Orbiting Ring 2 paths + gliding packet satellites
      for (let i = 0; i < projectedRing2.length; i++) {
        const p1 = projectedRing2[i];
        const p2 = projectedRing2[(i + 1) % projectedRing2.length];
        const avgZ = (p1.z + p2.z) * 0.5;
        const ringAlpha = Math.max(0.01, Math.min(0.28, 0.24 * (1 - avgZ / ring2Radius)));

        if (i % 5 < 2) {
          ctx.strokeStyle = `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, ${ringAlpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }

        // Active telemetry packets sliding dynamically along orbit 2
        const orbitOffset = Math.floor(timeSec * 35);
        if ((i + orbitOffset) % ringCount === 0 || (i + orbitOffset + 45) % ringCount === 0) {
          const packetColor = (i + orbitOffset) % ringCount === 0 ? rgbPrimary : rgbGlow;
          ctx.fillStyle = `rgba(${packetColor.r}, ${packetColor.g}, ${packetColor.b}, 0.95)`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${packetColor.r}, ${packetColor.g}, ${packetColor.b}, 0.8)`;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, 4.5, 0, Math.PI * 2);
          ctx.fill();

          // Smooth fading trail segments
          for (let trail = 1; trail <= 4; trail++) {
            const prevIdx = (i - trail + ringCount) % ringCount;
            const ptPrev = projectedRing2[prevIdx];
            ctx.fillStyle = `rgba(${packetColor.r}, ${packetColor.g}, ${packetColor.b}, ${0.5 / trail})`;
            ctx.beginPath();
            ctx.arc(ptPrev.x, ptPrev.y, 4.5 - trail * 0.8, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.shadowBlur = 0; // reset
        }
      }

      // 7. Render Scanline laser wave overlay
      const scanLineGrad = ctx.createLinearGradient(centerX - laserWidth, laserY, centerX + laserWidth, laserY);
      scanLineGrad.addColorStop(0, 'transparent');
      scanLineGrad.addColorStop(0.25, `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0)`);
      scanLineGrad.addColorStop(0.5, `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.65)`);
      scanLineGrad.addColorStop(0.75, `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0)`);
      scanLineGrad.addColorStop(1, 'transparent');

      ctx.strokeStyle = scanLineGrad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(centerX - laserWidth, laserY);
      ctx.lineTo(centerX + laserWidth, laserY);
      ctx.stroke();

      // Laser aura pulse
      ctx.fillStyle = `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.04)`;
      ctx.beginPath();
      ctx.ellipse(centerX, laserY, laserWidth, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // 8. Draw foreground space dust (overlapping outer sphere for real 3D depth)
      ctx.fillStyle = `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.4)`;
      projectedDust.forEach(p => {
        if (p.z <= 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.depthScale * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 9. HIGH-TECH TARGETING SYSTEM HUD (Tracks nearest node relative to cursor coordinates)
      let closestNodeIdx = -1;
      let minDistance = 15000; // Activation distance squared
      projectedOuter.forEach((p, idx) => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = dx*dx + dy*dy;
        if (dist < minDistance) {
          minDistance = dist;
          closestNodeIdx = idx;
        }
      });

      if (closestNodeIdx !== -1) {
        const targetNode = projectedOuter[closestNodeIdx];
        ctx.strokeStyle = `rgba(${rgbGlow.r}, ${rgbGlow.g}, ${rgbGlow.b}, 0.8)`;
        ctx.lineWidth = 0.8;
        
        // Spinning locking reticle
        ctx.save();
        ctx.translate(targetNode.x, targetNode.y);
        ctx.rotate(timeSec * 2.2);
        ctx.strokeRect(-10, -10, 20, 20);
        ctx.restore();

        // Target alignment brackets
        ctx.beginPath();
        ctx.moveTo(targetNode.x - 14, targetNode.y);
        ctx.lineTo(targetNode.x - 6, targetNode.y);
        ctx.moveTo(targetNode.x + 6, targetNode.y);
        ctx.lineTo(targetNode.x + 14, targetNode.y);
        ctx.moveTo(targetNode.x, targetNode.y - 14);
        ctx.lineTo(targetNode.x, targetNode.y - 6);
        ctx.moveTo(targetNode.x, targetNode.y + 6);
        ctx.lineTo(targetNode.x, targetNode.y + 14);
        ctx.stroke();

        // High-tech target readout labels
        ctx.fillStyle = `rgba(${rgbGlow.r}, ${rgbGlow.g}, ${rgbGlow.b}, 0.9)`;
        ctx.font = '7px "JetBrains Mono", monospace';
        ctx.fillText(`SYS_LOCK: #${closestNodeIdx}`, targetNode.x + 16, targetNode.y - 10);
        ctx.fillStyle = `rgba(${rgbGlow.r}, ${rgbGlow.g}, ${rgbGlow.b}, 0.65)`;
        ctx.fillText(`Z_DEPTH: ${Math.round(targetNode.z)}m`, targetNode.x + 16, targetNode.y - 2);
      }

      // 10. CALIBRATION GUIDES FRAME (Static outer precision compass)
      const calRadius = ring2Radius + 30;
      ctx.strokeStyle = `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.12)`;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(centerX, centerY, calRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Static crosshair compass marks at 0, 90, 180, 270 deg
      for (let angleDeg = 0; angleDeg < 360; angleDeg += 90) {
        const rad = (angleDeg * Math.PI) / 180;
        const bX = centerX + calRadius * Math.cos(rad);
        const bY = centerY + calRadius * Math.sin(rad);

        ctx.strokeStyle = `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.7)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(bX, bY, 4, rad - Math.PI/4, rad + Math.PI/4);
        ctx.stroke();

        ctx.fillStyle = `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.5)`;
        ctx.font = '8px "JetBrains Mono", monospace';
        const txt = angleDeg.toString().padStart(3, '0') + '°';
        const offsetDist = 14;
        ctx.fillText(
          txt,
          bX + Math.cos(rad) * offsetDist - 10,
          bY + Math.sin(rad) * offsetDist + 3
        );
      }

      // 11. LEFT & RIGHT CORNER TELEMETRY OVERLAYS (Cyberpunk matrix HUD data)
      // Left HUD panel link
      const leftStartX = centerX - outerRadius * 0.55;
      const leftStartY = centerY - 20;
      const leftMidX = centerX - outerRadius - 55;
      const leftMidY = centerY - 45;
      const leftEndX = leftMidX - 85;

      ctx.strokeStyle = `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.25)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(leftStartX, leftStartY);
      ctx.lineTo(leftMidX, leftMidY);
      ctx.lineTo(leftEndX, leftMidY);
      ctx.stroke();

      ctx.fillStyle = `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.85)`;
      ctx.beginPath();
      ctx.arc(leftStartX, leftStartY, 2, 0, Math.PI * 2);
      ctx.arc(leftMidX, leftMidY, 2, 0, Math.PI * 2);
      ctx.fill();

      // Left panel text readouts
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText(`SYS_SCANNER // COGNITIVE`, leftEndX, leftMidY - 7);
      ctx.fillStyle = `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.55)`;
      ctx.fillText(`XYZ: [${Math.round(centerX)}, ${Math.round(centerY)}, ${Math.round(angleY * 100) % 360}]`, leftEndX, leftMidY + 13);
      ctx.fillText(`ANG_VEL: ${(angleY * 5).toFixed(2)} rad/s`, leftEndX, leftMidY + 24);

      // Mini dynamic bar heights
      const lvX = leftEndX + 85;
      const lvY = leftMidY - 3;
      for (let b = 0; b < 6; b++) {
        const levelHeight = 3 + b * 2;
        ctx.fillStyle = b < 4 ? `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.75)` : `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.15)`;
        ctx.fillRect(lvX + b * 4, lvY - levelHeight, 2.5, levelHeight);
      }

      // Right HUD panel link
      const rightStartX = centerX + outerRadius * 0.55;
      const rightStartY = centerY + 20;
      const rightMidX = centerX + outerRadius + 55;
      const rightMidY = centerY + 45;
      const rightEndX = rightMidX + 85;

      ctx.strokeStyle = `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.25)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rightStartX, rightStartY);
      ctx.lineTo(rightMidX, rightMidY);
      ctx.lineTo(rightEndX, rightMidY);
      ctx.stroke();

      ctx.fillStyle = `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.85)`;
      ctx.beginPath();
      ctx.arc(rightStartX, rightStartY, 2, 0, Math.PI * 2);
      ctx.arc(rightMidX, rightMidY, 2, 0, Math.PI * 2);
      ctx.fill();

      // Right panel text readouts
      ctx.fillStyle = `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.85)`;
      ctx.fillText(`MATRIX_SYS // RENDER_3D`, rightMidX, rightMidY - 7);
      ctx.fillStyle = `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.55)`;
      ctx.fillText(`LOCK_RATE: 99.98% [OK]`, rightMidX, rightMidY + 13);
      ctx.fillText(`CPU_USAGE: ${((Math.sin(timeSec) + 1.6) * 6 + 12).toFixed(1)}%`, rightMidX, rightMidY + 24);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, rgbPrimary, rgbSecondary, rgbGlow]);

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
