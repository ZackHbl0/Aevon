import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Example mock data until API is wired up
const getProjectData = (slug: string) => {
  const projects: Record<string, any> = {
    "citypulse": {
      title: "CityPulse",
      category: "Smart City Platform",
      year: "2025",
      description: "An integrated urban intelligence platform designed to harmonize city operations. We built CityPulse to process millions of real-time IoT data points, transforming raw municipal data into actionable insights for city administrators and citizens alike.",
      challenge: "Modern cities produce massive amounts of fragmented data across traffic, energy, and public services. The challenge was to create a centralized, low-latency ecosystem capable of ingesting high-frequency streams without crashing, while presenting the data in a hyper-intuitive interface.",
      solution: "We engineered a robust Go-based microservices backend paired with Apache Kafka for real-time stream processing. The frontend utilizes a highly optimized WebGL rendering engine built on Next.js to visualize city-wide data dynamically, allowing instant decision-making during urban crises.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Go", "PostgreSQL", "Kafka", "WebGL"],
      cover: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=2000",
      images: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1200",
      ],
      demoUrl: "https://example.com/citypulse",
      githubUrl: "https://github.com/aevon",
      businessImpact: "Reduced municipal response times by 40% and lowered urban energy consumption by 15% within the first six months of deployment.",
      results: "Currently tracking over 2M active IoT nodes across 3 major metropolitan areas."
    },
    "medibook": {
      title: "MediBook",
      category: "Medical SaaS Platform",
      year: "2024",
      description: "A premium patient management and scheduling ecosystem for high-end medical clinics. MediBook bridges the gap between complex healthcare compliance and consumer-grade user experiences.",
      challenge: "Healthcare software is notoriously clunky and difficult to navigate. The goal was to build a HIPAA-compliant platform that felt as smooth and luxurious as a modern consumer app, while handling complex multi-clinic scheduling logic.",
      solution: "We developed a secure, multi-tenant architecture using Node.js and PostgreSQL. The frontend was built with React and Tailwind CSS, focusing heavily on micro-interactions and an ultra-clean UI to reduce cognitive load for medical staff.",
      technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis", "AWS HIPAA Cloud"],
      cover: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=2000",
      images: [
        "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1200",
      ],
      demoUrl: "https://example.com/medibook",
      githubUrl: "https://github.com/aevon",
      businessImpact: "Decreased patient no-show rates by 35% and saved clinic staff an average of 15 hours per week in administrative overhead.",
      results: "Adopted by 50+ premium private clinics nationwide."
    },
    "classyone": {
      title: "ClassyOne",
      category: "School Management Platform",
      year: "2024",
      description: "A unified operating system for modern educational institutions. ClassyOne brings administration, grading, and parent-teacher communication into a single, elegant interface.",
      challenge: "Schools suffer from extreme tool fatigue, juggling separate apps for grades, messaging, and administration. The challenge was consolidating these features into an intuitive platform that teachers actually enjoy using.",
      solution: "We utilized a serverless architecture to ensure high scalability during peak times (like report card season). The interface relies on a sophisticated design system that prioritizes clarity, utilizing optimistic UI updates to make the platform feel instantly responsive.",
      technologies: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "Vercel", "Tailwind CSS"],
      cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000",
      images: [
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200",
      ],
      demoUrl: "https://example.com/classyone",
      businessImpact: "Streamlined administrative workflows, reducing operational software costs for institutions by 40%.",
      results: "Onboarded 200,000+ students and parents in the first academic year."
    },
    "lumiere": {
      title: "Lumière",
      category: "Premium Restaurant Platform",
      year: "2025",
      description: "An exclusive reservation and brand experience platform for Michelin-starred restaurants. Lumière transforms the booking process into an extension of the fine-dining experience.",
      challenge: "High-end restaurants often rely on generic third-party booking systems that dilute their brand identity. The challenge was to create a bespoke, white-labeled solution that felt deeply luxurious and exclusive.",
      solution: "We crafted a highly immersive, visually driven frontend with Framer Motion, utilizing smooth page transitions and cinematic photography. The backend integrates seamlessly with existing point-of-sale systems while managing dynamic availability.",
      technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Stripe", "Supabase"],
      cover: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000",
      images: [
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
      ],
      demoUrl: "https://example.com/lumiere",
      businessImpact: "Increased direct, commission-free bookings by 60%, drastically improving profit margins for partnered restaurants.",
      results: "Processed over $5M in prepaid reservation deposits."
    },
    "aura": {
      title: "Aura",
      category: "E-Commerce Platform",
      year: "2023",
      description: "A high-performance headless commerce ecosystem built for luxury fashion brands. Aura delivers sub-second page loads without sacrificing rich media fidelity.",
      challenge: "Visual-heavy e-commerce sites often suffer from poor performance, directly harming conversion rates. The goal was to build a store that supports 4K video and high-res imagery while maintaining a perfect Lighthouse score.",
      solution: "We implemented a headless architecture separating the Shopify backend from a custom Next.js frontend. Advanced edge caching, intelligent image optimization, and aggressive prefetching were utilized to make navigation instantaneous.",
      technologies: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Framer Motion", "Redis"],
      cover: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
      ],
      demoUrl: "https://example.com/aura",
      githubUrl: "https://github.com/aevon",
      businessImpact: "Boosted average conversion rates by 2.4x and reduced cart abandonment by 18% due to frictionless checkout flows.",
      results: "Handled $12M+ in gross merchandise value during the Black Friday peak with zero downtime."
    }
  };
  return projects[slug];
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectData(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-24 pb-32">
      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12 mb-20">
        <Link 
          href="/#projects" 
          className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-black/10 dark:border-white/10">
              <div>
                <span className="block text-sm text-gray-500 mb-1">Client</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.title}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">Year</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.year}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">Role</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.category}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              {project.demoUrl && (
                <a 
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center flex-1 py-3 px-6 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                >
                  Live Site <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center py-3 px-6 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white transition-colors"
                >
                  <Code2 className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full aspect-[21/9] relative mb-32">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Case Study */}
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="space-y-24">
          {/* Challenge */}
          <div className="grid md:grid-cols-3 gap-8">
            <h2 className="font-heading text-2xl font-bold md:col-span-1 text-gray-900 dark:text-white">The Challenge</h2>
            <div className="md:col-span-2 prose prose-gray dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {project.challenge}
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="grid md:grid-cols-3 gap-8">
            <h2 className="font-heading text-2xl font-bold md:col-span-1 text-gray-900 dark:text-white">Our Solution</h2>
            <div className="md:col-span-2 prose prose-gray dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="grid md:grid-cols-3 gap-8">
            <h2 className="font-heading text-2xl font-bold md:col-span-1 text-gray-900 dark:text-white">Technologies</h2>
            <div className="md:col-span-2 flex flex-wrap gap-3">
              {project.technologies.map((tech: string) => (
                <span 
                  key={tech}
                  className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Business Impact */}
          {project.businessImpact && (
            <div className="grid md:grid-cols-3 gap-8">
              <h2 className="font-heading text-2xl font-bold md:col-span-1 text-gray-900 dark:text-white">Business Impact</h2>
              <div className="md:col-span-2 prose prose-gray dark:prose-invert">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {project.businessImpact}
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {project.results && (
            <div className="grid md:grid-cols-3 gap-8">
              <h2 className="font-heading text-2xl font-bold md:col-span-1 text-primary-purple">Results</h2>
              <div className="md:col-span-2 prose prose-gray dark:prose-invert">
                <p className="text-gray-900 dark:text-white font-medium text-xl leading-relaxed">
                  {project.results}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Next Project (Placeholder) */}
      <div className="container mx-auto px-6 md:px-12 mt-40">
        <div className="py-24 border-t border-black/10 dark:border-white/10 flex flex-col items-center justify-center text-center">
          <span className="text-gray-500 uppercase tracking-widest text-sm font-medium mb-4">Next Project</span>
          <h2 className="font-heading text-5xl md:text-7xl font-bold text-gray-900 dark:text-white hover:text-primary-purple transition-colors cursor-pointer">
            Aura OS
          </h2>
        </div>
      </div>
    </article>
  );
}
