"use client";

import React, { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Shield, Cookie } from "lucide-react";

const legalPages = [
  { slug: "privacy-policy", title: "Privacy Policy", icon: Shield },
  { slug: "terms-of-service", title: "Terms of Service", icon: FileText },
  { slug: "cookie-policy", title: "Cookie Policy", icon: Cookie },
];

const legalData: Record<string, { title: string; lastUpdated: string; content: React.ReactNode }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    lastUpdated: "January 1, 2026",
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary-indigo">
        <h2>1. Introduction</h2>
        <p>
          At Aevon, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
        </p>

        <h2>2. The Data We Collect About You</h2>
        <p>
          Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
        </p>
        <ul>
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
        </ul>

        <h2>3. How We Use Your Personal Data</h2>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul>
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>
      </div>
    )
  },
  "terms-of-service": {
    title: "Terms of Service",
    lastUpdated: "January 1, 2026",
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary-indigo">
        <h2>1. Agreement to Terms</h2>
        <p>
          These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Aevon ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
        </p>

        <h2>2. Intellectual Property Rights</h2>
        <p>
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
        </p>

        <h2>3. User Representations</h2>
        <p>
          By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.
        </p>
      </div>
    )
  },
  "cookie-policy": {
    title: "Cookie Policy",
    lastUpdated: "January 1, 2026",
    content: (
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary-indigo">
        <h2>1. What Are Cookies</h2>
        <p>
          As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.
        </p>

        <h2>2. How We Use Cookies</h2>
        <p>
          We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
        </p>

        <h2>3. Disabling Cookies</h2>
        <p>
          You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
        </p>
      </div>
    )
  }
};

export default function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const data = legalData[resolvedParams.slug] || {
    title: "Document Not Found",
    lastUpdated: "N/A",
    content: <p>The requested legal document does not exist. Please navigate back.</p>
  };

  return (
    <article className="min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-indigo dark:hover:text-white transition-colors mb-12 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo rounded-md p-1 -ml-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Glass Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-xl shadow-lg">
              <h3 className="font-heading font-semibold text-lg mb-6 text-gray-900 dark:text-white">Legal Documents</h3>
              <nav className="flex flex-col space-y-2">
                {legalPages.map((page) => {
                  const isActive = page.slug === resolvedParams.slug;
                  const Icon = page.icon;
                  return (
                    <Link
                      key={page.slug}
                      href={`/legal/${page.slug}`}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-indigo ${
                        isActive 
                          ? "bg-primary-indigo text-white shadow-md shadow-primary-indigo/20" 
                          : "text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium text-sm">{page.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="mb-12 pb-8 border-b border-black/5 dark:border-white/10">
              <h1 className="text-4xl md:text-5xl font-heading font-black tracking-tighter text-gray-900 dark:text-white mb-4">
                {data.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Last updated: {data.lastUpdated}
              </p>
            </header>

            <div className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
              {data.content}
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}
