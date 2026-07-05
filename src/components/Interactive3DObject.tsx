import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Icosahedron, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

interface TechCoreProps {
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
}

function TechCore({ primaryColor, secondaryColor, glowColor }: TechCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const dynamicLightRef = useRef<THREE.PointLight>(null);
  const { width: viewportWidth } = useThree().viewport;

  // Responsive scaling based on 3D viewport width
  // viewportWidth is in 3D scene units, ranging typically from ~3 on mobile to ~10 on desktop.
  const scale = Math.min(Math.max(viewportWidth * 0.16, 0.55), 1.25);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth, ambient continuous rotation
    groupRef.current.rotation.x += 0.002;
    groupRef.current.rotation.y += 0.0015;
    
    if (shellRef.current) {
      shellRef.current.rotation.x -= 0.004;
      shellRef.current.rotation.y -= 0.003;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z += 0.008;
      ringRef1.current.rotation.x += 0.001;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z -= 0.006;
      ringRef2.current.rotation.y += 0.002;
    }
    
    // Smoothly interpolate position to track normalized mouse coordinates
    const maxMove = viewportWidth * 0.22;
    const targetX = state.pointer.x * maxMove;
    const targetY = state.pointer.y * maxMove;
    
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

    // Dynamic point light breathing pulse effect
    if (dynamicLightRef.current) {
      dynamicLightRef.current.intensity = 3.5 + Math.sin(time * 2.5) * 1.5;
      dynamicLightRef.current.position.x = Math.sin(time * 1.5) * 1.5;
      dynamicLightRef.current.position.y = Math.cos(time * 1.2) * 1.5;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* 3D Light Setup within the Object Group to create dynamic shading and theme integration */}
      <pointLight ref={dynamicLightRef} position={[0, 0, 1]} intensity={4} color={primaryColor} />
      <pointLight position={[2, 3, 2]} intensity={3} color={secondaryColor} />
      <pointLight position={[-2, -3, 2]} intensity={2.5} color={glowColor} />
      <pointLight position={[0, 0, -3]} intensity={2} color={primaryColor} />

      {/* Inner Transparent Holographic Distorted Sphere Core */}
      <Float speed={4.0} rotationIntensity={0.6} floatIntensity={1.0}>
        <Sphere args={[1.0, 64, 64]} scale={1.0}>
          <MeshDistortMaterial
            color={primaryColor}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.15}
            distort={0.45}
            speed={2.8}
            transparent
            opacity={0.55}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
      </Float>

      {/* Outer Rotating Cybernetic Wireframe Shell */}
      <Icosahedron ref={shellRef} args={[1.5, 2]} scale={1.0}>
        <meshBasicMaterial 
          color={secondaryColor}
          wireframe 
          transparent 
          opacity={0.25} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Icosahedron>

      {/* Intersecting Cyber Ring 1 */}
      <Ring ref={ringRef1} args={[1.8, 1.83, 64]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshBasicMaterial 
          color={glowColor}
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </Ring>

      {/* Intersecting Cyber Ring 2 */}
      <Ring ref={ringRef2} args={[2.1, 2.12, 64]} rotation={[-Math.PI / 4, -Math.PI / 6, 0]}>
        <meshBasicMaterial 
          color={secondaryColor}
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </Ring>
    </group>
  );
}

export function Interactive3DObject() {
  const { theme } = useTheme();

  // Define colors based on active theme choice
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

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-50 sm:opacity-75 md:opacity-90">
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.8} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <TechCore 
            primaryColor={primaryColor} 
            secondaryColor={secondaryColor} 
            glowColor={glowColor} 
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
