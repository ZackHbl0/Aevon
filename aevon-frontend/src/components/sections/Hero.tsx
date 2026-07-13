"use client";

import { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import Magnetic from "@/components/ui/Magnetic";
import TextReveal from "@/components/ui/TextReveal";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={2} floatIntensity={3}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 128]} />
        <MeshDistortMaterial
          color="#1e1b4b"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#3730a3"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Aurora Background Upgrade */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 dark:from-indigo-900/40 via-white dark:via-black to-white dark:to-black"></div>
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-80 mix-blend-normal dark:mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={3} color="#8B5CF6" />
          <spotLight position={[-10, -10, -5]} intensity={4} color="#0066FF" />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
          <Suspense fallback={null}>
            <AnimatedSphere />
            <Sparkles count={300} scale={12} size={2} speed={0.3} opacity={0.4} color="#a5b4fc" />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div className="mb-6 max-w-4xl">
          <TextReveal className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 dark:text-white leading-tight">
            Engineering digital excellence.
          </TextReveal>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-gray-600 dark:text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light tracking-wide"
        >
          We transform ambitious ideas into premium software platforms designed to scale and dominate the market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Magnetic intensity={0.2}>
            <a
              href="#contact"
              className="group relative px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-semibold overflow-hidden w-full sm:w-auto text-center shadow-xl dark:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-2xl dark:hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-shadow duration-500 block"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1)"></div>
            </a>
          </Magnetic>

          <Magnetic intensity={0.2}>
            <a
              href="#projects"
              className="group relative px-8 py-4 rounded-full glass border border-black/10 dark:border-white/20 text-gray-900 dark:text-white font-semibold overflow-hidden w-full sm:w-auto text-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-500 block"
            >
              <span className="relative z-10">View Portfolio</span>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Mouse Interaction Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none"></div>
    </section>
  );
}
