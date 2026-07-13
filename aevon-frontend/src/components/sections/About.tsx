"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useInView, animate } from "framer-motion";

// --- Subcomponents ---

function Counter({ from = 0, to, prefix = "", suffix = "" }: { from?: number, to: number, prefix?: string, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const node = nodeRef.current;
    if (inView && node) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(value) {
          node.textContent = `${prefix}${Math.round(value)}${suffix}`;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, prefix, suffix, inView]);

  return <span ref={nodeRef} className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-gray-900 dark:text-white drop-shadow-xl">{prefix}{from}{suffix}</span>;
}

function BentoCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20; 
    const y = (e.clientY - top - height / 2) / 20;
    
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    
    rotateX.set(-y);
    rotateY.set(x);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });
  
  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, white, transparent)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-8 md:p-12 overflow-hidden ${className}`}
    >
      {/* Flashlight Border Effect */}
      <motion.div
        className="absolute inset-0 border-[2px] border-primary-indigo/50 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      />
      {/* Flashlight Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-indigo/10 via-primary-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      />
      
      {/* 3D Content Wrapper */}
      <div style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }} className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

function ScrubbedText({ text }: { text: string }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 45%"]
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-1 md:gap-y-3 max-w-6xl">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        return (
          <motion.span key={i} style={{ opacity }} className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-medium text-gray-900 dark:text-white tracking-tight leading-[1.1]">
            {word}
          </motion.span>
        );
      })}
    </div>
  )
}

function Radar() {
  return (
    <div className="absolute right-0 bottom-0 w-full h-full flex items-center justify-end pointer-events-none overflow-hidden opacity-30 dark:opacity-50">
      <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] translate-x-1/4 translate-y-1/4">
        {/* Radar Rings */}
        <div className="absolute inset-0 rounded-full border border-primary-indigo/20"></div>
        <div className="absolute inset-10 rounded-full border border-primary-indigo/30"></div>
        <div className="absolute inset-20 rounded-full border border-primary-indigo/40"></div>
        <div className="absolute inset-32 rounded-full border border-primary-indigo/50"></div>
        
        {/* Sweeping radar */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{ background: "conic-gradient(from 0deg, transparent 70%, rgba(79, 70, 229, 0.4) 100%)" }}
        />
        
        {/* Casablanca Blip */}
        <motion.div 
          animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-[40%] left-[30%] w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#0066ff]"
        />
        <motion.div 
          animate={{ scale: [1, 4], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-[40%] left-[30%] w-3 h-3 bg-primary rounded-full"
        />

        {/* Global Blips */}
        <div className="absolute top-[20%] right-[30%] w-2 h-2 bg-primary-purple rounded-full shadow-[0_0_10px_#8b5cf6]"></div>
        <div className="absolute bottom-[30%] left-[20%] w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]"></div>
      </div>
    </div>
  );
}

// --- Main Component ---

export default function About() {
  return (
    <section id="about" className="py-32 md:py-48 relative bg-gray-50 dark:bg-black overflow-hidden perspective-[2000px]">
      
      {/* Background glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-indigo/5 dark:bg-primary-indigo/10 blur-[150px] rounded-[100%] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Scrubbed Typography Intro */}
        <div className="mb-32 md:mb-48">
          <ScrubbedText text="We obsess over the invisible details. From sub-millisecond API responses to hyper-fluid animations, our expertise is built to engineer market-defining digital products." />
        </div>

        {/* 3D Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
          
          {/* Large box: Global Reach Map */}
          <BentoCard className="md:col-span-2 min-h-[400px] lg:min-h-[500px] flex flex-col justify-between">
            <div style={{ transform: "translateZ(30px)" }} className="relative z-20 max-w-md">
              <span className="px-4 py-1.5 rounded-full border border-primary-indigo/20 bg-primary-indigo/5 text-primary-indigo text-xs md:text-sm font-semibold tracking-wide uppercase mb-6 inline-block">
                Global Presence
              </span>
              <h3 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Based in Casablanca. <br />
                <span className="text-gray-400 dark:text-gray-500">Scaling Worldwide.</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl">
                We partner with ambitious brands across the globe to build the next generation of the web.
              </p>
            </div>
            <Radar />
          </BentoCard>

          {/* Pillars Box */}
          <BentoCard className="md:col-span-1 min-h-[400px] lg:min-h-[500px] flex flex-col">
            <div style={{ transform: "translateZ(30px)" }} className="mb-8">
              <span className="px-4 py-1.5 rounded-full border border-primary-purple/20 bg-primary-purple/5 text-primary-purple text-xs md:text-sm font-semibold tracking-wide uppercase inline-block">
                Core Pillars
              </span>
            </div>
            
            <ul style={{ transform: "translateZ(40px)" }} className="space-y-6 flex-1 flex flex-col justify-center">
              {["Premium Websites", "SaaS Platforms", "Mobile Apps", "AI Solutions", "Enterprise Software"].map((item, i) => (
                <li key={i} className="flex items-center gap-5 text-gray-800 dark:text-gray-200 font-medium text-lg lg:text-xl group cursor-pointer w-fit">
                  <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-primary-indigo group-hover:border-primary-indigo transition-colors duration-300 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-600 group-hover:bg-white transition-colors duration-300"></div>
                  </div>
                  <span className="group-hover:translate-x-3 transition-transform duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          {/* Stats 1: Platforms Shipped */}
          <BentoCard className="md:col-span-1 min-h-[300px] lg:min-h-[400px] flex flex-col items-center justify-center text-center">
            <div style={{ transform: "translateZ(50px)" }}>
              <Counter to={150} suffix="+" />
              <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-500 font-bold mt-6">Platforms Shipped</p>
            </div>
          </BentoCard>

          {/* Stats 2: Client Valuation */}
          <BentoCard className="md:col-span-2 min-h-[300px] lg:min-h-[400px] flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Subtle background element inside stats */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.1)_0%,transparent_70%)] pointer-events-none"></div>
            
            <div style={{ transform: "translateZ(50px)" }}>
              <Counter to={2} prefix="$" suffix="B+" />
              <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-500 font-bold mt-6">Client Valuation Generated</p>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
