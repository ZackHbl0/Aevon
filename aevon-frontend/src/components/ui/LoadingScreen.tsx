"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D assets and fonts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100000] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          
          {/* Logo Reveal */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="overflow-hidden mb-8">
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <span className="font-heading text-6xl md:text-8xl font-black tracking-tighter flex items-center">
                  <span className="text-primary-indigo">A</span>
                  <span className="text-white">EVON</span>
                </span>
              </motion.div>
            </div>
            
            <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-primary via-primary-indigo to-primary-purple"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
