"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "@/components/ui/TiltCard";

const storyCards = [
  {
    icon: "🎓", title: "Student → Freelancer",
    body:  "I'm Mohan, a college student from Salem who decided the best way to learn web development is to build real things for real clients. No fake portfolio pieces, no inflated claims.",
    accent: "border-star/20 hover:border-star/40", glow: "bg-star/[0.05]", tag: "My story",
  },
  {
    icon: "⚡", title: "Fast & Focused",
    body:  "I specialise in business websites — clean, fast, and mobile-optimised. I use AI-assisted tools to deliver at a pace and price most agencies can't match.",
    accent: "border-aurora/20 hover:border-aurora/40", glow: "bg-aurora/[0.05]", tag: "My approach",
  },
  {
    icon: "🤝", title: "A Fair Trade",
    body:  "I'm taking on selected projects at starter pricing. You get a professionally built website; I get real experience and an honest review.",
    accent: "border-violet/20 hover:border-violet/40", glow: "bg-violet/[0.05]", tag: "My promise",
  },
];

const statCards = [
  { icon: "📍", value: "Salem, TN",  label: "Based in"     },
  { icon: "⚡", value: "72 hours",   label: "Avg. delivery" },
  { icon: "💬", value: "Direct",     label: "Communication" },
  { icon: "🌏", value: "Pan-India",  label: "Reach"         },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".about-label",      { scrollTrigger:{ trigger:".about-label",      start:"top 86%", toggleActions:"play none none none" }, opacity:0, y:18,  duration:0.6,  ease:"power2.out" });
      gsap.from(".about-heading",    { scrollTrigger:{ trigger:".about-heading",    start:"top 83%", toggleActions:"play none none none" }, opacity:0, y:40,  duration:0.85, ease:"power3.out" });
      gsap.from(".about-story-card", { scrollTrigger:{ trigger:".about-story-grid", start:"top 78%", toggleActions:"play none none none" }, opacity:0, y:50,  stagger:0.15, duration:0.8, ease:"power2.out" });
      gsap.from(".about-stat-card",  { scrollTrigger:{ trigger:".about-stat-grid",  start:"top 80%", toggleActions:"play none none none" }, opacity:0, scale:0.88, stagger:0.10, duration:0.7, ease:"back.out(1.5)" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-violet/[0.05] blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[280px] rounded-full bg-star/[0.04] blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="cosmic-divider mb-12 sm:mb-16" />

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="about-label text-xs font-body font-medium text-star uppercase tracking-widest mb-3 sm:mb-4">
            Who I am
          </p>
          <h2 className="about-heading font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-moon max-w-2xl mx-auto px-2">
            Building the web,{" "}
            <span className="text-gradient-aurora">one honest project</span>{" "}
            at a time.
          </h2>
        </div>

        {/* Story cards */}
        <div className="about-story-grid grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {storyCards.map((card) => (
            <TiltCard key={card.title} className="about-story-card" intensity={10} scale={1.03}>
              <div className={`h-full glass border rounded-2xl p-5 flex flex-col gap-3 sm:gap-4 transition-colors duration-300 ${card.accent}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${card.glow} border border-white/[0.07] flex items-center justify-center text-xl sm:text-2xl flex-shrink-0`}>
                    {card.icon}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-body text-faint uppercase tracking-widest mt-1">{card.tag}</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-moon text-sm sm:text-base mb-1.5 leading-snug">{card.title}</h3>
                  <p  className="font-body text-muted text-xs sm:text-sm leading-relaxed">{card.body}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Stats + orbital */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">

          {/* 2×2 stat cards */}
          <div className="about-stat-grid grid grid-cols-2 gap-3 sm:gap-4">
            {statCards.map(({ icon, value, label }) => (
              <TiltCard key={label} className="about-stat-card" intensity={8} scale={1.04}>
                <div className="glass border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col gap-2 sm:gap-3 hover:border-white/[0.16] transition-colors duration-300">
                  <span className="text-xl sm:text-2xl">{icon}</span>
                  <div>
                    <p className="font-display font-bold text-moon text-lg sm:text-xl leading-none mb-0.5">{value}</p>
                    <p className="text-[10px] sm:text-xs font-body text-muted uppercase tracking-wider">{label}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Orbital ring — hidden on small phones, shown sm+ */}
          <div className="hidden sm:flex justify-center lg:justify-end">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
              <div className="absolute inset-0 rounded-full border border-star/10 animate-[spin_38s_linear_infinite]">
                <div className="absolute -top-1.5 left-1/2 w-3 h-3 rounded-full bg-star/70 shadow-[0_0_10px_#5aa9ff] -translate-x-1/2" />
              </div>
              <div className="absolute inset-5 rounded-full border border-violet/10 animate-[spin_26s_linear_infinite_reverse]">
                <div className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-violet/70 shadow-[0_0_8px_#8b5cf6] -translate-x-1/2" />
              </div>
              <div className="absolute inset-10 rounded-full border border-aurora/[0.08] animate-[spin_18s_linear_infinite]">
                <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-aurora/60 shadow-[0_0_6px_#22d3ee] -translate-x-1/2" />
              </div>
              <div className="absolute inset-14 rounded-full glass border border-white/[0.08] flex flex-col items-center justify-center text-center gap-1.5">
                <span className="text-2xl sm:text-3xl">🚀</span>
                <span className="font-display font-semibold text-moon text-xs px-2 leading-snug">Ready to build</span>
                <span className="text-[10px] text-muted font-body">Salem → anywhere</span>
              </div>
              <div className="absolute -top-4 right-2 px-2.5 py-1 rounded-full glass border border-aurora/25 text-[10px] sm:text-xs font-body text-aurora font-medium animate-float whitespace-nowrap">
                Fast delivery
              </div>
              <div className="absolute -bottom-4 left-2 px-2.5 py-1 rounded-full glass border border-violet/25 text-[10px] sm:text-xs font-body text-[#c4b5fd] font-medium animate-floatSlow whitespace-nowrap">
                Starter pricing
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}