'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface GorbeProps {
  mousePosition: { x: number; y: number };
  isThinking: boolean;
}

function GorbeCharacter({ mousePosition, isThinking }: GorbeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/gorbe.glb');

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
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.1 - 1;

    // Pulse effect when thinking
    if (isThinking) {
      const scale = 1 + Math.sin(time * 3) * 0.02;
      groupRef.current.scale.setScalar(scale * 2);
    } else {
      groupRef.current.scale.setScalar(2);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <primitive object={scene.clone()} />
      {/* Glow ring */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2, 64]} />
        <meshBasicMaterial color="#a3e635" transparent opacity={isThinking ? 0.4 : 0.2} />
      </mesh>
    </group>
  );
}

function Scene({ mousePosition, isThinking }: GorbeProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#a3e635" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#a3e635" />

      <Suspense fallback={null}>
        <GorbeCharacter mousePosition={mousePosition} isThinking={isThinking} />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  );
}

interface GorbeSceneProps {
  mousePosition: { x: number; y: number };
  isThinking: boolean;
  isSpeaking: boolean;
  onLoad?: () => void;
}

export default function GorbeScene({ mousePosition, isThinking, isSpeaking, onLoad }: GorbeSceneProps) {
  const [isClient, setIsClient] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Preload model
    try {
      useGLTF.preload('/models/gorbe.glb');
    } catch (e) {
      console.error('Failed to preload model:', e);
    }

    const timer = setTimeout(() => {
      onLoad?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoad]);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gorbe-dark">
        <div className="text-gorbe-lime animate-pulse">Initializing 3D...</div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gorbe-dark">
        <div className="text-6xl mb-4">🤖</div>
        <div className="text-gorbe-lime text-xl font-bold">GORBE</div>
        <div className="text-gray-400 text-sm mt-2">3D Model Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onError={() => setHasError(true)}
      >
        <Scene mousePosition={mousePosition} isThinking={isThinking} />
      </Canvas>

      {/* Status indicator */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isThinking ? 'bg-yellow-400 animate-pulse' : isSpeaking ? 'bg-gorbe-lime animate-pulse' : 'bg-gorbe-lime'}`} />
        <span className="text-sm text-gray-400 font-mono">
          {isThinking ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Online'}
        </span>
      </div>
    </div>
  );
}
