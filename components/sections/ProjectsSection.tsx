"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "@/components/ui/TiltCard";

interface Project {
  title:    string;
  context:  string;
  result:   string;
  gradient: string;
  emoji:    string;
  tag:      string;
  label:    string;
  url:      string;
}

const projects: Project[] = [
  {
    title:   "The GOAT Restaurant",
    context:
      "A premium fine-dining restaurant in Chennai needed a website that matched its luxury positioning — Michelin-style cuisine, cinematic ambience, and a 4.9-star reputation across 2,500+ reviews.",
    result:
      "Built a cinematic multi-section site with table reservations, a full interactive menu, signature dish showcases, and award/recognition highlights — designed to feel as premium as the dining experience itself.",
    gradient: "from-[#2a1408] via-[#1a0f08] to-[#0a0a0a]",
    emoji:    "🍽️",
    tag:      "Self projects",
    label:    "Fine dining website",
    url:      "https://the-goat-restaurant.vercel.app",
  },
  {
    title:   "Tea Brown Cafe",
    context:
      "Salem's own tea destination needed an online presence to drive WhatsApp orders — from ₹15 masala tea to filter coffee and milkshakes — and showcase its cosy, affordable cafe vibe.",
    result:
      "Delivered a warm, inviting multi-page site with a live menu, weekly bestsellers, customer reviews, and one-tap WhatsApp ordering on every dish — built to convert browsers into walk-ins.",
    gradient: "from-[#2a1b0a] via-[#1f1410] to-[#0a0a0a]",
    emoji:    "🍵",
    tag:      "Self projects",
    label:    "Cafe & tea shop website",
    url:      "https://tea-brown-cafe.netlify.app",
  },
  {
    title:   "Crown & Caliber Watch Showroom",
    context:
      "A sample template built to demonstrate the Popular Package (₹5,000) — showing how a single-page business site with WhatsApp integration looks for a luxury retail brand.",
    result:
      "Single-page site featuring collections, featured products, brand gallery, testimonials, appointment booking, WhatsApp enquiry button, and Google Maps — everything a showroom needs, in one page.",
    gradient: "from-[#1a1500] via-[#111008] to-[#0a0a0a]",
    emoji:    "⌚",
    tag:      "Sample template",
    label:    "Watch showroom · Popular Package",
    url:      "https://watch-showroom-sample.netlify.app/",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".proj-header", {
        scrollTrigger: {
          trigger: ".proj-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      });

      gsap.from(".proj-card", {
        scrollTrigger: {
          trigger: ".proj-grid",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 0, y: 55, stagger: 0.16, duration: 0.9, ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-pad relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-aurora/[0.04] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="cosmic-divider mb-16" />

        {/* Header */}
        <div className="proj-header text-center mb-14">
          <p className="text-xs font-body font-medium text-star uppercase tracking-widest mb-4">
            Selected work
          </p>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-moon leading-[1.15] mb-4">
            Projects I&apos;ve{" "}
            <span className="text-gradient-aurora">built</span>
          </h2>
          <p className="font-body text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Real client websites and live samples — click any project to see it
            in action.
          </p>
        </div>

        {/* Cards — 1 col → 2 col → 3 col */}
        <div className="proj-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj.title} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isClientProject = project.tag === "Client project";

  return (
    <TiltCard className="proj-card" intensity={12} scale={1.04}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col rounded-2xl overflow-hidden glass border border-white/[0.07] shadow-card hover:border-star/30 transition-all duration-300 h-full cursor-pointer"
      >
        {/* Mockup preview area */}
        <div
          className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden flex-shrink-0`}
        >
          {/* Browser bar */}
          <div className="absolute top-0 left-0 right-0 h-7 bg-black/30 backdrop-blur-sm flex items-center gap-1.5 px-3">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <div className="ml-3 flex-1 h-3 rounded bg-white/[0.06] max-w-40 flex items-center px-2">
              <span className="text-[9px] text-white/40 font-mono truncate">
                {project.url.replace("https://", "")}
              </span>
            </div>
          </div>

          {/* Simulated page layout */}
          <div className="absolute top-12 left-4 right-4 space-y-2">
            <div className="h-2.5 rounded bg-white/10 w-3/4" />
            <div className="h-1.5 rounded bg-white/[0.07] w-full" />
            <div className="h-1.5 rounded bg-white/[0.07] w-5/6" />
            <div className="mt-3 flex gap-2">
              <div className="h-6 rounded bg-white/[0.12] w-16" />
              <div className="h-6 rounded bg-white/[0.07] w-12" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-9 rounded bg-white/[0.06]" />
              ))}
            </div>
          </div>

          {/* Emoji */}
          <div className="absolute bottom-3 right-4 text-3xl opacity-80">
            {project.emoji}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 px-4 py-2 rounded-full bg-star text-void text-xs font-display font-semibold flex items-center gap-1.5 shadow-glow-star">
              Visit live site
              <ArrowUpRightIcon />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className={`inline-block text-[10px] font-body font-medium uppercase tracking-widest ${
                  isClientProject ? "text-aurora" : "text-[#f59e0b]"
                }`}
              >
                {project.tag}
              </span>
              <span className="text-faint text-[10px]">·</span>
              <span className="text-[10px] font-body text-faint uppercase tracking-widest">
                {project.label}
              </span>
            </div>
            <ArrowUpRightIcon className="text-faint group-hover:text-star transition-colors duration-300" />
          </div>

          <h3 className="font-display font-semibold text-moon text-base leading-snug mb-2 group-hover:text-star transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm font-body text-muted leading-relaxed mb-3 flex-1">
            {project.context}
          </p>
          <p className="text-xs font-body text-aurora/80 border-t border-white/[0.06] pt-3 leading-relaxed">
            {project.result}
          </p>
        </div>
      </a>
    </TiltCard>
  );
}

function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`flex-shrink-0 ${className}`}
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}