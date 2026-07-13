"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Code2, Smartphone, Blocks, Sparkles, ArrowRight } from "lucide-react";

const services = [
  {
    id: "premium-websites",
    title: "Premium Websites",
    description: "High-converting digital storefronts designed to capture attention, elevate brand perception, and multiply your conversion rates.",
    icon: Code2,
    color: "rgba(59, 130, 246, 0.2)",
    border: "border-blue-500/30",
    gradient: "from-blue-500/20 to-indigo-500/20",
    href: "/expertise/digital-strategy"
  },
  {
    id: "mobile-applications",
    title: "Mobile Applications",
    description: "Immersive, high-performance mobile experiences that drive long-term user retention and create daily active engagement.",
    icon: Smartphone,
    color: "rgba(168, 85, 247, 0.2)",
    border: "border-purple-500/30",
    gradient: "from-purple-500/20 to-pink-500/20",
    href: "/expertise/mobile-engineering"
  },
  {
    id: "saas-platforms",
    title: "SaaS Platforms",
    description: "Robust, scalable software ecosystems built to handle explosive user growth, optimize operations, and secure enterprise revenue.",
    icon: Blocks,
    color: "rgba(16, 185, 129, 0.2)",
    border: "border-emerald-500/30",
    gradient: "from-emerald-500/20 to-teal-500/20",
    href: "/expertise/web-architecture"
  },
  {
    id: "ai-solutions",
    title: "AI Solutions",
    description: "Intelligent automation and predictive systems that drastically reduce operational costs and accelerate critical decision-making.",
    icon: Sparkles,
    color: "rgba(245, 158, 11, 0.2)",
    border: "border-amber-500/30",
    gradient: "from-amber-500/20 to-orange-500/20",
    href: "/expertise/ai-machine-learning"
  },
];

export default function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>("premium-websites");
  
  // For cinematic text reveal
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section id="services" ref={containerRef} className="py-32 relative bg-transparent overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Cinematic Header */}
        <motion.div
          style={{ opacity, y }}
          className="max-w-4xl mb-20"
        >
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-tight flex flex-col">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">Digital magic,</span>
            <span className="text-gray-400 dark:text-gray-600">engineered to scale.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light max-w-2xl">
            We don't just write code. We architect scalable, premium solutions that give you an unfair advantage.
          </p>
        </motion.div>

        {/* Flex Cards Accordion */}
        <div className="flex flex-col md:flex-row w-full h-[800px] md:h-[600px] gap-4 md:gap-2">
          {services.map((service) => {
            const isActive = hoveredId === service.id;
            
            return (
              <motion.div
                key={service.id}
                layout
                onHoverStart={() => setHoveredId(service.id)}
                onClick={() => setHoveredId(service.id)}
                initial={{ borderRadius: 32 }}
                animate={{
                  flex: isActive ? 5 : 1,
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  mass: 0.8
                }}
                className={`relative overflow-hidden cursor-pointer flex flex-col justify-end p-8 glass-premium border transition-all duration-500 ${
                  isActive ? `${service.border} bg-black/5 dark:bg-white/10` : "border-black/5 dark:border-white/5 bg-transparent"
                }`}
              >
                {/* Background Ambient Glow (Only when active) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 blur-2xl -z-10`}
                    />
                  )}
                </AnimatePresence>

                {/* Content Container */}
                <div className="flex flex-col md:flex-row md:items-end gap-6 relative z-10 w-full h-full">
                  
                  {/* Icon & Vertical Title (Always visible) */}
                  <div className="flex flex-row md:flex-col justify-between items-start md:items-center h-full w-full md:w-16 shrink-0">
                    <motion.div
                      layout
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-colors duration-500 shadow-xl ${
                        isActive 
                          ? "bg-gray-900 border-gray-700 text-white dark:bg-white dark:border-gray-200 dark:text-black" 
                          : "bg-black/5 border-black/10 text-gray-900 dark:bg-white/5 dark:border-white/10 dark:text-white"
                      }`}
                    >
                      <service.icon className="w-8 h-8" />
                    </motion.div>
                    
                    {/* Vertical Text on Desktop, Horizontal on Mobile */}
                    <motion.h3
                      layout
                      className={`font-heading font-bold text-2xl whitespace-nowrap md:-rotate-90 md:origin-center tracking-tight transition-colors duration-500 ${
                        isActive ? "text-gray-900 dark:text-white md:opacity-0" : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {service.title}
                    </motion.h3>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="flex-1 min-w-0 flex flex-col justify-end"
                      >
                        <h3 className="text-4xl md:text-5xl font-heading font-black text-gray-900 dark:text-white mb-4 tracking-tighter">
                          {service.title}
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-8 max-w-xl">
                          {service.description}
                        </p>
                        
                        <div className="mt-auto">
                          <Link 
                            href={service.href}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold hover:gap-4 transition-all duration-300 shadow-lg"
                          >
                            Explore Expertise <ArrowRight size={18} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
      
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-indigo/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
    </section>
  );
}
