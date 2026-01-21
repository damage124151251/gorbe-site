'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

interface GorbeProps {
  mousePosition: { x: number; y: number };
  isThinking: boolean;
  isSpeaking: boolean;
}

function Gorbe({ mousePosition, isThinking, isSpeaking }: GorbeProps) {
  const { scene } = useGLTF('/models/gorbe.glb');
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Clone the scene to avoid mutation issues
  const clonedScene = scene.clone();

  // Find eyes in the model (will try to find any mesh that might be eyes)
  const eyeMeshes = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Look for meshes that might be eyes
        const name = child.name.toLowerCase();
        if (name.includes('eye') || name.includes('olho') || name.includes('pupil')) {
          eyeMeshes.current.push(child);
        }
      }
    });
  }, [clonedScene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smooth rotation following mouse
    const targetRotationY = (mousePosition.x - 0.5) * 0.5;
    const targetRotationX = (mousePosition.y - 0.5) * -0.3;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.05
    );

    // Floating animation
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;

    // Breathing/pulse effect when thinking
    if (isThinking) {
      const scale = 1 + Math.sin(time * 3) * 0.02;
      groupRef.current.scale.setScalar(scale);
    } else {
      groupRef.current.scale.setScalar(1);
    }

    // Eye movement (if eyes found)
    eyeMeshes.current.forEach((eye) => {
      eye.lookAt(
        mousePosition.x * 2 - 1,
        -(mousePosition.y * 2 - 1),
        2
      );
    });
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={clonedScene}
        scale={2}
        position={[0, -1, 0]}
      />

      {/* Glow effect ring */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2, 64]} />
        <meshBasicMaterial
          color="#a3e635"
          transparent
          opacity={isThinking ? 0.4 : 0.2}
        />
      </mesh>
    </group>
  );
}

interface GorbeSceneProps {
  mousePosition: { x: number; y: number };
  isThinking: boolean;
  isSpeaking: boolean;
  onLoad?: () => void;
}

export default function GorbeScene({ mousePosition, isThinking, isSpeaking, onLoad }: GorbeSceneProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Preload the model
    useGLTF.preload('/models/gorbe.glb');
    const timer = setTimeout(() => {
      setLoaded(true);
      onLoad?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onLoad]);

  return (
    <div className="canvas-container w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#a3e635" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#a3e635" />

        {/* Gorbe Model */}
        <Gorbe
          mousePosition={mousePosition}
          isThinking={isThinking}
          isSpeaking={isSpeaking}
        />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Status indicators */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isThinking ? 'bg-yellow-400 animate-pulse' : isSpeaking ? 'bg-gorbe-lime animate-pulse' : 'bg-gorbe-lime'}`} />
        <span className="text-sm text-gray-400 font-mono">
          {isThinking ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Online'}
        </span>
      </div>
    </div>
  );
}
