'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// Mouse position store
let mouseX = 0;
let mouseY = 0;

// Gorbe 3D Model Component
function GorbeModel() {
    const group = useRef<THREE.Group>(null);
    const { scene } = useGLTF('/gorbe.glb');
    const { camera } = useThree();

    // Clone the scene to avoid modifying the cached original
    const clonedScene = scene.clone();

    // Find eyes in the model (will look for objects named 'eye' or similar)
    const leftEye = useRef<THREE.Object3D | null>(null);
    const rightEye = useRef<THREE.Object3D | null>(null);

    useEffect(() => {
        // Try to find eye objects in the model
        clonedScene.traverse((child) => {
            const name = child.name.toLowerCase();
            if (name.includes('eye') && name.includes('left')) {
                leftEye.current = child;
            } else if (name.includes('eye') && name.includes('right')) {
                rightEye.current = child;
            } else if (name.includes('eye_l')) {
                leftEye.current = child;
            } else if (name.includes('eye_r')) {
                rightEye.current = child;
            }
        });
    }, [clonedScene]);

    // Animate eyes to follow mouse
    useFrame(() => {
        if (group.current) {
            // Subtle idle animation
            group.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.05;

            // Eye tracking effect (subtle head rotation towards mouse)
            const targetRotationY = mouseX * 0.3;
            const targetRotationX = -mouseY * 0.2;

            group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.05;
            group.current.rotation.x += (targetRotationX - group.current.rotation.x) * 0.05;
        }

        // If we found eyes, make them look at a point based on mouse
        if (leftEye.current) {
            const lookTarget = new THREE.Vector3(mouseX * 2, mouseY * 2, 2);
            leftEye.current.lookAt(lookTarget);
        }
        if (rightEye.current) {
            const lookTarget = new THREE.Vector3(mouseX * 2, mouseY * 2, 2);
            rightEye.current.lookAt(lookTarget);
        }
    });

    return (
        <group ref={group} position={[0, -1, 0]} scale={1.5}>
            <primitive object={clonedScene} />
        </group>
    );
}

// Fallback when model is loading
function ModelFallback() {
    return (
        <Html center>
            <div className="text-gorbe-lime animate-pulse">Loading Gorbe...</div>
        </Html>
    );
}

interface GorbeViewerProps {
    thought?: string;
    isThinking?: boolean;
    isSpeaking?: boolean;
}

export default function GorbeViewer({ thought = '', isThinking = false, isSpeaking = false }: GorbeViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [modelLoaded, setModelLoaded] = useState(false);

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                // Normalize mouse position to -1 to 1
                mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-[500px]">
            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                className="w-full h-full"
                onCreated={() => setModelLoaded(true)}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#84cc16" />

                <Suspense fallback={<ModelFallback />}>
                    <GorbeModel />
                    <Environment preset="city" />
                </Suspense>

                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    minDistance={3}
                    maxDistance={8}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>

            {/* Live indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 glass px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full live-badge"></span>
                <span className="text-xs font-semibold">LIVE</span>
            </div>

            {/* Viewer count (fake) */}
            <div className="absolute top-4 right-4 flex items-center gap-2 glass px-3 py-1.5 rounded-full">
                <svg className="w-4 h-4 text-gorbe-lime" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span className="text-xs font-semibold">{Math.floor(Math.random() * 100) + 50}</span>
            </div>

            {/* Speech bubble */}
            <AnimatePresence>
                {(thought || isThinking) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="absolute bottom-4 left-4 right-4 max-w-md mx-auto"
                    >
                        <div className="speech-bubble">
                            {isThinking ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gorbe-lime rounded-full loading-dot"></div>
                                    <div className="w-2 h-2 bg-gorbe-lime rounded-full loading-dot"></div>
                                    <div className="w-2 h-2 bg-gorbe-lime rounded-full loading-dot"></div>
                                    <span className="text-gorbe-white/60 text-sm ml-2">thinking...</span>
                                </div>
                            ) : (
                                <p className="text-gorbe-white">
                                    {thought}
                                    {isSpeaking && <span className="typing-cursor">|</span>}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls hint */}
            <div className="absolute bottom-4 right-4 text-gorbe-white/40 text-xs">
                Drag to rotate | Scroll to zoom
            </div>
        </div>
    );
}

// Preload the model
useGLTF.preload('/gorbe.glb');
