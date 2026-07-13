"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";
import { useActiveSection } from "@/hooks/useActiveSection";

const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Work", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const activeSection = useActiveSection(["services", "projects", "about", "contact"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pointer-events-none ${
          scrolled ? "pt-6" : "pt-8"
        }`}
      >
        <div
          className={`relative flex items-center justify-between transition-all duration-500 pointer-events-auto ${
            scrolled
              ? "w-[90%] max-w-5xl rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.8)] px-6 py-3 border border-black/5 dark:border-white/10"
              : "w-full container mx-auto px-6 md:px-12 py-4 bg-transparent"
          }`}
        >
          {/* Animated Gradient Border only visible when scrolled */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 -z-10 rounded-full overflow-hidden"
              >
                <div className="absolute inset-[-50%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(79,70,229,0.5)_360deg)] dark:bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,0.4)_360deg)] opacity-30" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo */}
          <Magnetic intensity={0.1}>
            <Link href="/" className="relative z-50 flex items-center group">
              <span className="font-heading text-2xl font-black tracking-tighter flex items-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-primary-indigo">A</span>
                <span className="text-gray-900 dark:text-white">EVON</span>
              </span>
            </Link>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <SmoothScrollLink
                  href={link.href}
                  isActive={activeSection === link.href.split("#")[1]}
                  className="relative z-10 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors block"
                  activeClassName="text-black dark:text-white font-semibold"
                >
                  {link.name}
                </SmoothScrollLink>
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="navbar-hover"
                    className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>
            ))}
            
            <div className="flex items-center pl-4 space-x-4">
              <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10"></div>
              <ThemeToggle />
              <Magnetic intensity={0.2}>
                <SmoothScrollLink
                  href="/#contact"
                  className="relative group px-6 py-2.5 rounded-full overflow-hidden text-sm font-medium block"
                >
                  <span className="absolute inset-0 w-full h-full bg-gray-900 dark:bg-white rounded-full transition-transform duration-300 group-hover:scale-105"></span>
                  <span className="relative z-10 text-white dark:text-black transition-colors">Start Project</span>
                </SmoothScrollLink>
              </Magnetic>
            </div>
          </nav>

          {/* Mobile Menu Button - Morphing */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white"
              aria-label="Toggle Menu"
            >
              <div className="w-5 h-5 relative flex items-center justify-center">
                <motion.span
                  className="absolute h-[2px] w-full bg-current rounded-full"
                  animate={{ 
                    y: mobileMenuOpen ? 0 : -4,
                    rotate: mobileMenuOpen ? 45 : 0 
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute h-[2px] w-full bg-current rounded-full"
                  animate={{ 
                    y: mobileMenuOpen ? 0 : 4,
                    rotate: mobileMenuOpen ? -45 : 0 
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Magical Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0,transparent_50%)]" />
            <nav className="flex flex-col items-center space-y-2 w-full px-6 relative z-10">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden py-2">
                  <motion.div
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <SmoothScrollLink
                      href={link.href}
                      className="group flex flex-col items-center"
                      onClick={() => setMobileMenuOpen(false)}
                      isActive={activeSection === link.href.split("#")[1]}
                      activeClassName="opacity-100"
                    >
                      <span className={`font-heading text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r hover:scale-110 transition-transform duration-300 ${
                        activeSection === link.href.split("#")[1] 
                          ? 'from-primary-indigo to-primary-purple' 
                          : 'from-gray-900 to-gray-500 dark:from-white dark:to-gray-500'
                      }`}>
                        {link.name}
                      </span>
                    </SmoothScrollLink>
                  </motion.div>
                </div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-12"
              >
                <SmoothScrollLink
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-10 py-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-xl tracking-wide shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300 inline-block"
                >
                  Start a Project
                </SmoothScrollLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
