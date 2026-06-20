"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TiltCard from "@/components/ui/TiltCard";

const steps = [
  {
    number: "01",
    icon:   "💬",
    title:  "Chat on WhatsApp",
    body:   "Send me a message. Tell me what your business does and what you need. No lengthy forms — just a conversation.",
    accent: "border-aurora/25 text-aurora",
    bg:     "bg-aurora/[0.06]",
  },
  {
    number: "02",
    icon:   "🔨",
    title:  "I build your site",
    body:   "I design and code your single-page website. AI-assisted workflow means faster iteration without cutting corners.",
    accent: "border-star/25 text-star",
    bg:     "bg-star/[0.06]",
  },
  {
    number: "03",
    icon:   "🔍",
    title:  "You review & request edits",
    body:   "I share a live preview. You give me feedback. I make revisions until you're satisfied — included in the price.",
    accent: "border-violet/25 text-[#c4b5fd]",
    bg:     "bg-violet/[0.06]",
  },
  {
    number: "04",
    icon:   "🚀",
    title:  "We launch",
    body:   "Once approved, your site goes live. I stay available for questions after launch — especially on the domain and hosting.",
    accent: "border-aurora/25 text-aurora",
    bg:     "bg-aurora/[0.06]",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".proc-header", {
        scrollTrigger: { trigger: ".proc-header", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      });

      gsap.from(".proc-step", {
        scrollTrigger: { trigger: ".proc-steps", start: "top 72%", toggleActions: "play none none none" },
        opacity: 0, y: 50, stagger: 0.18, duration: 0.85, ease: "power2.out",
      });

      // Connector line draw
      gsap.from(".proc-connector", {
        scrollTrigger: { trigger: ".proc-steps", start: "top 70%", toggleActions: "play none none none" },
        scaleX: 0, transformOrigin: "left center",
        stagger: 0.18, duration: 0.6, ease: "power2.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section-pad relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-star/[0.04] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="cosmic-divider mb-16" />

        {/* Header */}
        <div className="proc-header text-center mb-14">
          <p className="text-xs font-body font-medium text-star uppercase tracking-widest mb-4">
            How it works
          </p>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-moon leading-[1.15] mb-4">
            From idea to{" "}
            <span className="text-gradient-star">live website</span>
          </h2>
          <p className="font-body text-muted text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Four steps. No meetings, no jargon, no surprises — just results.
          </p>
        </div>

        {/* Steps — desktop horizontal, mobile vertical */}
        <div className="proc-steps grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">

          {/* Desktop connector line behind cards */}
          <div className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-px z-0">
            <div className="h-full bg-gradient-to-r from-aurora/20 via-star/20 to-violet/20" />
            {/* Animated dots */}
            {[0, 33, 66].map((pct) => (
              <div
                key={pct}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-star/40"
                style={{ left: `${pct}%` }}
              />
            ))}
          </div>

          {steps.map((step, i) => (
            <div key={step.number} className="proc-step relative z-10 flex flex-col">
              {i < steps.length - 1 && (
                <div className="md:hidden proc-connector self-start ml-6 w-px h-6 bg-white/10 mt-1 mb-1" />
              )}
              <TiltCard className="h-full" intensity={10} scale={1.035}>
                <div className={`glass border rounded-2xl p-5 flex flex-col gap-4 h-full ${step.accent.split(" ")[0]}`}>
                  <div className="flex items-center justify-between">
                    <span className={`w-9 h-9 rounded-xl ${step.bg} flex items-center justify-center text-xl flex-shrink-0`}>
                      {step.icon}
                    </span>
                    <span className={`font-display font-bold text-xl ${step.accent.split(" ")[1]} opacity-40`}>
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-moon text-sm mb-1.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-body text-muted text-xs leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
