"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Dummy data for different expertises
const expertiseData: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  "digital-strategy": {
    title: "Digital Strategy",
    subtitle: "Aligning technology with your business objectives.",
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          At Aevon, we believe that true digital transformation starts with a solid foundation of strategy. We partner with ambitious organizations to navigate the complexities of the digital landscape, identifying opportunities for growth and innovation.
        </p>
        <p className="mb-8">
          Our approach is holistic, encompassing market research, competitive analysis, and an in-depth understanding of your operational capabilities. We don't just recommend technologies; we design roadmaps that ensure every digital initiative delivers measurable ROI.
        </p>
        <h3 className="text-2xl mt-12 mb-6">Core Capabilities</h3>
        <ul className="space-y-4 list-none pl-0">
          {[
            "Digital Transformation Roadmapping",
            "Product Market Fit Analysis",
            "User Experience Strategy",
            "Technology Stack Evaluation"
          ].map((item, i) => (
            <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-indigo mr-4 shadow-[0_0_8px_rgba(79,70,229,0.8)]"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  },
  "web-architecture": {
    title: "Web Architecture",
    subtitle: "Building resilient, scalable, and high-performance platforms.",
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          We architect web applications designed to scale elegantly from day one. Utilizing modern paradigms such as microservices, serverless functions, and edge computing, we ensure your platform remains fast and reliable under any load.
        </p>
        <p className="mb-8">
          Security and performance are embedded into our architectural DNA. We meticulously select the right tools for the job—whether it's React, Next.js, Node, or Go—to create a robust ecosystem that developers love to work with and users love to interact with.
        </p>
        <h3 className="text-2xl mt-12 mb-6">Core Capabilities</h3>
        <ul className="space-y-4 list-none pl-0">
          {[
            "System Design & Architecture",
            "API Development & Integration",
            "Performance Optimization",
            "Cloud Infrastructure (AWS/GCP)"
          ].map((item, i) => (
            <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-indigo mr-4 shadow-[0_0_8px_rgba(79,70,229,0.8)]"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  },
  "mobile-engineering": {
    title: "Mobile Engineering",
    subtitle: "Crafting native and cross-platform mobile experiences.",
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Your mobile presence should feel native, fluid, and intuitive. Our engineering teams specialize in building premium mobile applications that push the boundaries of what's possible on iOS and Android devices.
        </p>
        <p className="mb-8">
          Whether utilizing React Native for cross-platform efficiency or Swift/Kotlin for absolute maximum performance, we focus on smooth animations, offline-first capabilities, and battery-efficient architectures.
        </p>
        <h3 className="text-2xl mt-12 mb-6">Core Capabilities</h3>
        <ul className="space-y-4 list-none pl-0">
          {[
            "React Native Development",
            "iOS (Swift) & Android (Kotlin)",
            "Mobile System Architecture",
            "App Store Optimization & Deployment"
          ].map((item, i) => (
            <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-indigo mr-4 shadow-[0_0_8px_rgba(79,70,229,0.8)]"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  },
  "ai-machine-learning": {
    title: "AI & Machine Learning",
    subtitle: "Intelligent solutions for complex business problems.",
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          We integrate artificial intelligence and machine learning models directly into your product to unlock new capabilities and efficiencies. From predictive analytics to natural language processing, we demystify AI to create tangible business value.
        </p>
        <p className="mb-8">
          Our data science team works closely with our engineers to deploy scalable inference endpoints, train custom models on your proprietary data, and ensure ethical, unbiased outcomes in automated decision-making processes.
        </p>
        <h3 className="text-2xl mt-12 mb-6">Core Capabilities</h3>
        <ul className="space-y-4 list-none pl-0">
          {[
            "Large Language Model Integration",
            "Predictive Analytics",
            "Computer Vision",
            "Data Engineering Pipelines"
          ].map((item, i) => (
            <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary-indigo mr-4 shadow-[0_0_8px_rgba(79,70,229,0.8)]"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }
};

export default function ExpertisePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  const data = expertiseData[resolvedParams.slug] || {
    title: "Expertise Not Found",
    subtitle: "The requested service page does not exist.",
    content: <p>Please navigate back to the home page.</p>
  };

  return (
    <article className="min-h-screen relative overflow-hidden bg-white dark:bg-[#050505]">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-indigo/5 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-purple/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-40 pb-32">
        {/* Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-sm mb-16 text-gray-500 font-medium"
        >
          <Link href="/" className="hover:text-primary-indigo transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo rounded">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-gray-900 dark:text-gray-200">Expertise</span>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <span className="text-primary-indigo">{data.title}</span>
        </motion.nav>

        {/* Hero Section */}
        <header className="mb-24 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-gray-900 dark:text-white mb-6 leading-tight"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-light max-w-2xl"
          >
            {data.subtitle}
          </motion.p>
        </header>

        {/* Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {data.content}
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-12 border-t border-black/5 dark:border-white/10"
        >
          <Link 
            href="/#contact"
            className="inline-flex items-center text-lg font-heading font-bold text-gray-900 dark:text-white group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo rounded-lg p-2 -ml-2"
          >
            Ready to start a project? 
            <span className="ml-4 text-primary-indigo group-hover:translate-x-2 transition-transform duration-300">
              Let's talk <ArrowLeft className="inline w-5 h-5 ml-1 rotate-180" />
            </span>
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
