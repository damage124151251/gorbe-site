'use client';

import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface GorbeSceneProps {
  isThinking: boolean;
  isSpeaking: boolean;
  onLoad?: () => void;
}

export default function GorbeScene({ isThinking, isSpeaking, onLoad }: GorbeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Use refs to track current prop values for animation loop
  const thinkingRef = useRef(isThinking);
  const speakingRef = useRef(isSpeaking);

  // Update refs when props change
  useEffect(() => {
    thinkingRef.current = isThinking;
  }, [isThinking]);

  useEffect(() => {
    speakingRef.current = isSpeaking;
  }, [isSpeaking]);

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

    // OrbitControls - like Blender 3D navigation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.target.set(0, 0, 0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    const greenLight = new THREE.PointLight(0xa3e635, 0.5, 10);
    greenLight.position.set(0, 2, 3);
    scene.add(greenLight);

    // Grid helper for 3D reference
    const gridHelper = new THREE.GridHelper(10, 20, 0x333333, 0x222222);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Load model
    let model: THREE.Group | null = null;
    const loader = new GLTFLoader();

    loader.load(
      '/models/gorbe.glb',
      (gltf) => {
        model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.position.set(0, -1, 0);

        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        model.position.y = -1;

        scene.add(model);
        setLoading(false);
        onLoad?.();
      },
      undefined,
      (err) => {
        console.error('Error loading model:', err);
        setError(true);
        setLoading(false);
      }
    );

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Update controls
      controls.update();

      if (model) {
        // Pulse when thinking
        if (thinkingRef.current) {
          const scale = 2 + Math.sin(time * 3) * 0.05;
          model.scale.set(scale, scale, scale);
        } else {
          model.scale.set(2, 2, 2);
        }
      }

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
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onLoad]);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing">
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gorbe-dark z-10">
          <div className="w-16 h-16 mb-4 rounded-full border-4 border-gorbe-lime/30 border-t-gorbe-lime animate-spin" />
          <div className="text-gorbe-lime animate-pulse">Loading Gorbe...</div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gorbe-dark z-10">
          <div className="text-gorbe-lime text-xl font-bold">GORBE</div>
          <div className="text-gray-400 text-sm mt-2">3D Loading...</div>
        </div>
      )}

      {/* Controls hint */}
      {!loading && !error && (
        <div className="absolute bottom-4 left-4 text-xs text-gray-500 pointer-events-none">
          <div>Drag to rotate</div>
          <div>Scroll to zoom</div>
          <div>Right-click to pan</div>
        </div>
      )}
    </div>
  );
}
