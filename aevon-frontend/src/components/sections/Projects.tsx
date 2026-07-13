"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";

const projects = [
  {
    id: "citypulse",
    title: "CityPulse",
    category: "Smart City Platform",
    year: "2025",
    images: [
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    ],
    bgClass: "bg-gray-50 dark:bg-[#000000]",
    textClass: "text-gray-900 dark:text-white",
  },
  {
    id: "medibook",
    title: "MediBook",
    category: "Medical SaaS Platform",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584982751601-97d8cb0f6669?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
    ],
    bgClass: "bg-emerald-50 dark:bg-[#021c13]",
    textClass: "text-gray-900 dark:text-white",
  },
  {
    id: "classyone",
    title: "ClassyOne",
    category: "School Management Platform",
    year: "2024",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2032&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
    ],
    bgClass: "bg-indigo-50 dark:bg-[#090a1a]",
    textClass: "text-gray-900 dark:text-white",
  },
  {
    id: "lumiere",
    title: "Lumière",
    category: "Premium Restaurant Platform",
    year: "2025",
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
    ],
    bgClass: "bg-orange-50 dark:bg-[#2a0e05]",
    textClass: "text-gray-900 dark:text-white",
  },
  {
    id: "aura",
    title: "Aura",
    category: "E-Commerce Platform",
    year: "2023",
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    ],
    bgClass: "bg-pink-50 dark:bg-[#1a0512]",
    textClass: "text-gray-900 dark:text-white",
  },
];

function ProjectSlide({
  project,
  index,
  totalProjects,
  scrollYProgress,
}: {
  project: typeof projects[0];
  index: number;
  totalProjects: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Math for entry and exit. 
  // Each project takes up exactly 1 / totalProjects of the scroll progress.
  const step = 1 / totalProjects;
  
  // slideInStart is when the PREVIOUS project is done pausing, so this one begins to slide up.
  // Actually, let's just make them stagger beautifully.
  // We want `totalProjects` full sections.
  // To keep it simple: project `index` starts sliding in at `(index - 0.5) * step` and finishes at `index * step`.
  // From `index * step` to `(index + 0.5) * step` it pauses.
  const startSlide = (index - 0.5) * step;
  const endSlide = index * step;

  const nextStartSlide = (index + 0.5) * step;
  const nextEndSlide = (index + 1) * step;

  // Y transform: slide in from bottom (100%) to 0%
  const y = useTransform(
    scrollYProgress,
    [startSlide, endSlide],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  // Scale down when next slide covers it
  const scale = useTransform(
    scrollYProgress,
    [nextStartSlide, nextEndSlide],
    [1, 0.9]
  );

  // Darken when next slide covers it
  const filter = useTransform(
    scrollYProgress,
    [nextStartSlide, nextEndSlide],
    ["brightness(1)", "brightness(0.3)"]
  );

  // Parallax for floating images inside
  // Move them slowly while this project is active
  const parallaxY1 = useTransform(scrollYProgress, [startSlide, nextEndSlide], ["10vh", "-10vh"]);
  const parallaxY2 = useTransform(scrollYProgress, [startSlide, nextEndSlide], ["20vh", "-20vh"]);
  const parallaxY3 = useTransform(scrollYProgress, [startSlide, nextEndSlide], ["30vh", "-30vh"]);

  return (
    <motion.div
      style={{ y, scale, filter, zIndex: index }}
      className={`absolute inset-0 w-full h-full flex flex-col lg:flex-row overflow-hidden origin-top ${project.bgClass} transition-colors duration-500`}
    >
      {/* Content Side (Left) */}
      <div className="w-full lg:w-5/12 h-[40%] lg:h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative z-40">
        <div className="space-y-6 max-w-xl">
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 rounded-full glass border border-black/10 dark:border-white/10 text-xs md:text-sm font-medium tracking-wide text-gray-800 dark:text-gray-300">
              {project.year}
            </span>
            <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
              {project.category}
            </span>
          </div>
          
          <h2 className={`font-heading text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-bold tracking-tighter leading-[0.9] ${project.textClass}`}>
            {project.title}
          </h2>
          
          <div className="pt-4 lg:pt-8 pointer-events-auto">
            <Magnetic intensity={0.2}>
              <Link 
                href={`/en/projects/${project.id}`} 
                className="group relative inline-flex items-center gap-4 px-6 md:px-8 py-4 md:py-5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-semibold overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                  Explore Case Study <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-primary-indigo translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) z-0"></div>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Visual Side (Right) */}
      <div className="w-full lg:w-7/12 h-[60%] lg:h-full relative flex items-center justify-center">
        {/* Main large image */}
        <motion.div 
          style={{ y: parallaxY1 }}
          className="absolute w-[85%] md:w-[65%] lg:w-[70%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10"
        >
          <Image src={project.images[0]} alt={project.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority={index === 0} />
        </motion.div>

        {/* Secondary floating image (Top Right) */}
        <motion.div 
          style={{ y: parallaxY3 }}
          className="absolute top-[5%] lg:top-[15%] right-[5%] lg:right-[10%] w-[35%] lg:w-[30%] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] z-30"
        >
          <Image src={project.images[1]} alt={project.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
        </motion.div>

        {/* Tertiary floating image (Bottom Left) */}
        <motion.div 
          style={{ y: parallaxY2 }}
          className="absolute bottom-[5%] lg:bottom-[15%] left-[5%] lg:left-[10%] w-[40%] lg:w-[35%] aspect-square rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20"
        >
          <Image src={project.images[2]} alt={project.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} id="projects" className="relative w-full" style={{ height: `${projects.length * 100}vh` }}>
      {/* Sticky container that holds the viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gray-50 dark:bg-black">
        
        <div className="absolute top-8 left-6 md:left-12 lg:left-24 z-[100] mix-blend-difference pointer-events-none">
          <h3 className="font-heading text-xl md:text-2xl font-bold text-white tracking-widest uppercase opacity-80">
            Selected Works
          </h3>
        </div>

        {/* Project Slides */}
        {projects.map((project, index) => (
          <ProjectSlide
            key={project.id}
            project={project}
            index={index}
            totalProjects={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
