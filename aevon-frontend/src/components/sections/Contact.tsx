"use client";

import { useState } from "react";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    project: "",
    email: "",
  });

  const [isHolding, setIsHolding] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const progress = useMotionValue(0);
  
  // Mouse tracking for the aura
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const startHold = () => {
    // Basic validation
    if (!formState.name || !formState.email) return;
    
    setIsHolding(true);
    animate(progress, 100, {
      duration: 1.5,
      ease: "linear",
      onComplete: () => {
        setIsSubmitted(true);
        
        // Construct the mailto link
        const subject = encodeURIComponent(`New Project Inquiry from ${formState.name}`);
        const body = encodeURIComponent(
          `Hello Aevon,\n\nMy name is ${formState.name} and I represent ${formState.company || "myself"}. We are looking to engineer ${formState.project}.\n\nYou can reach me to discuss details at:\n${formState.email}`
        );
        window.location.href = `mailto:zackhbl400@gmail.com?subject=${subject}&body=${body}`;

        // Reset form
        setTimeout(() => {
          setFormState({ name: "", company: "", project: "", email: "" });
          progress.set(0);
          setIsHolding(false);
          setIsSubmitted(false);
        }, 5000);
      }
    });
  };

  const stopHold = () => {
    if (progress.get() < 100) {
      setIsHolding(false);
      animate(progress, 0, { duration: 0.3 });
    }
  };

  const backgroundAura = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(79, 70, 229, 0.15), transparent 80%)`;

  const isFormValid = formState.name.trim() !== "" && formState.email.trim() !== "";

  return (
    <section 
      id="contact" 
      className="py-32 md:py-48 min-h-screen relative bg-gray-50 dark:bg-black overflow-hidden flex items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Mouse-tracking Aura */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: backgroundAura }}
      />
      
      {/* Subtle Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 mix-blend-overlay pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-8 max-w-3xl mx-auto h-[60vh]"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-32 h-32 rounded-full bg-primary-indigo/20 flex items-center justify-center border border-primary-indigo/50 shadow-[0_0_50px_rgba(79,70,229,0.5)]"
            >
              <CheckCircle size={64} className="text-primary-indigo" />
            </motion.div>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-gray-900 dark:text-white tracking-tighter">
              Signal Received.
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light">
              Thank you, {formState.name}. Our engineers will initiate contact within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="mb-16">
              <span className="px-5 py-2 rounded-full border border-primary-indigo/20 bg-primary-indigo/5 text-primary-indigo text-sm font-semibold tracking-widest uppercase inline-flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary-indigo animate-pulse"></span>
                Initiate Project
              </span>
            </div>

            {/* Mad-Libs Conversational Form */}
            <div className="font-heading text-3xl md:text-5xl lg:text-[4.5rem] font-medium leading-[1.6] md:leading-[1.6] lg:leading-[1.6] text-gray-400 dark:text-gray-600 tracking-tight">
              Hello Aevon, my name is{" "}
              <input 
                type="text" 
                aria-label="Your Name"
                placeholder="Your Name" 
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
                className="bg-transparent border-b-[3px] border-gray-300 dark:border-gray-800 focus:border-primary-indigo text-gray-900 dark:text-white outline-none w-[200px] md:w-[300px] lg:w-[400px] mx-2 md:mx-4 px-2 placeholder:text-gray-300 dark:placeholder:text-gray-800 transition-colors duration-300"
              />{" "}
              and I represent{" "}
              <input 
                type="text" 
                aria-label="Your Company"
                placeholder="Company (Optional)" 
                value={formState.company}
                onChange={(e) => setFormState({...formState, company: e.target.value})}
                className="bg-transparent border-b-[3px] border-gray-300 dark:border-gray-800 focus:border-primary-indigo text-gray-900 dark:text-white outline-none w-[250px] md:w-[400px] lg:w-[500px] mx-2 md:mx-4 px-2 placeholder:text-gray-300 dark:placeholder:text-gray-800 transition-colors duration-300"
              />
              . We are looking to engineer{" "}
              <input 
                type="text" 
                aria-label="Your Project"
                placeholder="A Premium SaaS Platform..." 
                value={formState.project}
                onChange={(e) => setFormState({...formState, project: e.target.value})}
                className="bg-transparent border-b-[3px] border-gray-300 dark:border-gray-800 focus:border-primary-indigo text-gray-900 dark:text-white outline-none w-[300px] md:w-[600px] lg:w-[800px] mt-4 md:mt-0 mx-0 md:mx-4 px-2 placeholder:text-gray-300 dark:placeholder:text-gray-800 transition-colors duration-300"
              />
              . You can reach me to discuss details at{" "}
              <input 
                type="email" 
                aria-label="Your Email Address"
                placeholder="Email Address" 
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
                className="bg-transparent border-b-[3px] border-gray-300 dark:border-gray-800 focus:border-primary-indigo text-gray-900 dark:text-white outline-none w-[250px] md:w-[400px] lg:w-[500px] mt-4 md:mt-0 mx-0 md:mx-4 px-2 placeholder:text-gray-300 dark:placeholder:text-gray-800 transition-colors duration-300"
              />
              .
            </div>

            {/* Hold to Send Button & Info */}
            <div className="mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-16">
              
              <div className="flex flex-col gap-3">
                <p className="text-sm uppercase tracking-[0.2em] font-bold text-gray-400">Direct Link</p>
                <a href="mailto:contact@aevon.com" className="text-2xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white hover:text-primary-indigo transition-colors">
                  contact@aevon.com
                </a>
              </div>

              <div className="relative">
                {/* Instruction Text */}
                <motion.div 
                  animate={{ opacity: isFormValid ? (isHolding ? 0 : 1) : 0 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-primary-indigo whitespace-nowrap"
                >
                  Hold to Ignite
                </motion.div>

                {/* The Physics Button */}
                <motion.button
                  onPointerDown={startHold}
                  onPointerUp={stopHold}
                  onPointerLeave={stopHold}
                  animate={isHolding ? { scale: 0.95 } : { scale: 1 }}
                  disabled={!isFormValid}
                  className={`relative overflow-hidden w-64 h-24 rounded-[2rem] flex items-center justify-center bg-transparent border-2 ${isFormValid ? 'border-gray-900 dark:border-white hover:border-primary-indigo dark:hover:border-primary-indigo cursor-pointer shadow-2xl' : 'border-gray-300 dark:border-white/10 opacity-50 cursor-not-allowed'} transition-colors duration-300 z-20`}
                >
                  {/* Text Layer - Must be visible over both backgrounds */}
                  <span className="relative z-20 font-heading font-bold text-xl uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-3 drop-shadow-md">
                    Transmit <Send size={20} className={isHolding ? "translate-x-2 -translate-y-2 transition-transform duration-1000" : ""} />
                  </span>

                  {/* Liquid Fill Layer */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full bg-primary-indigo z-10"
                    style={{ height: useMotionTemplate`${progress}%` }}
                  />
                </motion.button>
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
