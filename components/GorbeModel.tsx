'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface GorbeSceneProps {
  mousePosition: { x: number; y: number };
  isThinking: boolean;
  isSpeaking: boolean;
  onLoad?: () => void;
}

export default function GorbeScene({ mousePosition, isThinking, isSpeaking, onLoad }: GorbeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const greenLight = new THREE.PointLight(0xa3e635, 0.8, 10);
    greenLight.position.set(0, 2, 3);
    scene.add(greenLight);

    // Glow ring
    const ringGeometry = new THREE.RingGeometry(1.5, 2, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1.5;
    scene.add(ring);

    // Load model
    let model: THREE.Group | null = null;
    const loader = new GLTFLoader();

    loader.load(
      '/models/gorbe.glb',
      (gltf) => {
        model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.position.set(0, -1, 0);
        scene.add(model);
        setLoading(false);
        onLoad?.();
      },
      (progress) => {
        // Loading progress
      },
      (err) => {
        console.error('Error loading model:', err);
        setError(true);
        setLoading(false);
      }
    );

    // Mouse tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Update target rotation based on mouse
      targetRotationY = (mousePosition.x - 0.5) * 0.5;
      targetRotationX = (mousePosition.y - 0.5) * -0.3;

      // Smooth interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      if (model) {
        model.rotation.x = currentRotationX;
        model.rotation.y = currentRotationY;

        // Floating animation
        model.position.y = -1 + Math.sin(time * 0.5) * 0.1;

        // Pulse when thinking
        if (isThinking) {
          const scale = 2 + Math.sin(time * 3) * 0.05;
          model.scale.set(scale, scale, scale);
        } else {
          model.scale.set(2, 2, 2);
        }
      }

      // Ring pulse
      ring.material.opacity = isThinking ? 0.4 + Math.sin(time * 2) * 0.2 : 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update mouse position ref
  useEffect(() => {
    // Mouse position is passed as prop and used in animation loop
  }, [mousePosition]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gorbe-dark z-10">
          <div className="text-6xl mb-4 animate-bounce">🤖</div>
          <div className="text-gorbe-lime animate-pulse">Loading Gorbe...</div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gorbe-dark z-10">
          <div className="text-6xl mb-4">🤖</div>
          <div className="text-gorbe-lime text-xl font-bold">GORBE</div>
          <div className="text-gray-400 text-sm mt-2">3D Loading...</div>
        </div>
      )}

      {/* Status indicator */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
        <div className={`w-3 h-3 rounded-full ${isThinking ? 'bg-yellow-400 animate-pulse' : isSpeaking ? 'bg-gorbe-lime animate-pulse' : 'bg-gorbe-lime'}`} />
        <span className="text-sm text-gray-400 font-mono">
          {isThinking ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Online'}
        </span>
      </div>
    </div>
  );
}
