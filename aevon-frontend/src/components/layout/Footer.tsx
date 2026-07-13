"use client";

import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";
import { SmoothScrollLink } from "@/components/ui/SmoothScrollLink";

const InstagramIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    aria-hidden="true"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);


const TiktokIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 448 512" 
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
  </svg>
);

const GithubIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    aria-hidden="true"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-[#0a0a0a] pt-32 pb-12 relative overflow-hidden border-t border-black/5 dark:border-white/5">
      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-indigo/5 blur-[150px] rounded-[100%] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-5 pr-0 md:pr-12 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo rounded-sm">
                <span className="font-heading text-4xl font-bold tracking-tighter flex items-center">
                  <span className="text-primary-indigo">A</span>
                  <span className="text-gray-900 dark:text-white">EVON</span>
                </span>
              </Link>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm text-base leading-relaxed mb-10 font-light">
                Engineering premium digital experiences for ambitious businesses worldwide. We transform complex problems into elegant solutions.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Magnetic intensity={0.2}>
                <a
                  href="https://www.instagram.com/aevon.code/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary-indigo dark:hover:text-white hover:border-primary-indigo/30 hover:bg-primary-indigo/5 transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo"
                >
                  <InstagramIcon size={18} strokeWidth={2} />
                </a>
              </Magnetic>

              <Magnetic intensity={0.2}>
                <a
                  href="https://github.com/ZackHbl0"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary-indigo dark:hover:text-white hover:border-primary-indigo/30 hover:bg-primary-indigo/5 transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo"
                >
                  <GithubIcon size={18} strokeWidth={2} />
                </a>
              </Magnetic>
              <Magnetic intensity={0.2}>
                <a
                  href="https://www.tiktok.com/@aevon.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary-indigo dark:hover:text-white hover:border-primary-indigo/30 hover:bg-primary-indigo/5 transition-all duration-300 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo"
                >
                  <TiktokIcon size={16} />
                </a>
              </Magnetic>

            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-medium text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">
              Expertise
            </h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
              <li><Link href="/expertise/digital-strategy" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">Digital Strategy</Link></li>
              <li><Link href="/expertise/web-architecture" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">Web Architecture</Link></li>
              <li><Link href="/expertise/mobile-engineering" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">Mobile Engineering</Link></li>
              <li><Link href="/expertise/ai-machine-learning" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">AI & Machine Learning</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-medium text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
              <li><SmoothScrollLink href="/#about" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">About</SmoothScrollLink></li>
              <li><SmoothScrollLink href="/#projects" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">Selected Works</SmoothScrollLink></li>
              <li><SmoothScrollLink href="/#services" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">Methodology</SmoothScrollLink></li>
              <li><SmoothScrollLink href="/#contact" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">Contact</SmoothScrollLink></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-3">
             <h4 className="font-medium text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-sm">
              <li><Link href="/legal/privacy-policy" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">Privacy Policy</Link></li>
              <li><Link href="/legal/terms-of-service" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">Terms of Service</Link></li>
              <li><Link href="/legal/cookie-policy" className="inline-block hover:text-primary-indigo dark:hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-primary-indigo">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 dark:text-gray-500">
          <p>© {currentYear} Aevon. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">Designed with precision in Casablanca.</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
            <span className="hidden md:inline-block">All systems normal.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
