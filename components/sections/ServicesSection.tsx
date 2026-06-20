"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TiltCard from "@/components/ui/TiltCard";

const WA_LINK =
  "https://wa.me/919514870795?text=Hi%20Mohan%2C%20I'm%20interested%20in%20your%20";

interface Service {
  title:    string;
  price:    string;
  delivery: string;
  tag:      string;
  tagColor: string;
  accent:   string;
  glowClass:string;
  features: string[];
  popular:  boolean;
}

const services: Service[] = [
  {
    title:    "Single-Page Business Site",
    price:    "₹3,500",
    delivery: "1–2 days",
    tag:      "Starter",
    tagColor: "text-aurora border-aurora/30 bg-aurora/[0.06]",
    accent:   "border-aurora/20",
    glowClass:"glow-aurora",
    popular:  false,
    features: [
      "Clean single-page design",
      "Mobile-first, fully responsive",
      "WhatsApp contact button",
      "Domain setup guidance",
      "Basic contact section",
      "Simple SEO essentials",
    ],
  },
  {
    title:    "Site + WhatsApp Optimisation",
    price:    "₹5,000",
    delivery: "2 days",
    tag:      "Popular",
    tagColor: "text-star border-star/30 bg-star/[0.06]",
    accent:   "border-star/30",
    glowClass:"glow-star",
    popular:  true,
    features: [
      "Everything in Starter",
      "Click-to-chat WhatsApp flow",
      "Optimised contact conversion",
      "Social media link section",
      "Stronger CTA placement",
      "Priority support",
    ],
  },
  {
    title:    "Site + Domain Launch Package",
    price:    "₹7,000",
    delivery: "2–3 days",
    tag:      "Complete",
    tagColor: "text-[#c4b5fd] border-violet/30 bg-violet/[0.06]",
    accent:   "border-violet/20",
    glowClass:"glow-violet",
    popular:  false,
    features: [
      "Everything in Popular",
      "Domain purchase guidance",
      "Hosting setup walkthrough",
      "Business email guidance",
      "Launch-day support",
      "30-day post-launch help",
    ],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".svc-header", {
        scrollTrigger: { trigger: ".svc-header", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      });

      gsap.from(".svc-card", {
        scrollTrigger: { trigger: ".svc-grid", start: "top 75%", toggleActions: "play none none none" },
        opacity: 0, y: 60, stagger: 0.18, duration: 0.9, ease: "power2.out",
      });

      gsap.from(".svc-trust", {
        scrollTrigger: { trigger: ".svc-trust", start: "top 88%", toggleActions: "play none none none" },
        opacity: 0, y: 20, duration: 0.7, ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-pad relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-star/[0.04] blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="cosmic-divider mb-16" />

        {/* Section header */}
        <div className="svc-header text-center mb-14">
          <p className="text-xs font-body font-medium text-star uppercase tracking-widest mb-4">
            What I build
          </p>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-moon leading-[1.15] mb-4">
            Simple. Fast.{" "}
            <span className="text-gradient-star">Affordable.</span>
          </h2>
          <p className="font-body text-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Three focused packages. No unnecessary complexity. Exactly what a
            small business needs to get online.
          </p>
        </div>

        {/* Cards grid */}
        <div className="svc-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {services.map((svc) => (
            <TiltCard
              key={svc.title}
              className="svc-card"
              intensity={10}
              scale={1.035}
            >
              <div
                className={`relative flex flex-col rounded-2xl glass border p-6 h-full ${svc.accent} ${
                  svc.popular
                    ? "shadow-glow-star ring-1 ring-star/15"
                    : "shadow-card"
                }`}
              >
              {/* Popular badge */}
              {svc.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-star text-void text-xs font-display font-semibold whitespace-nowrap shadow-glow-star">
                  Most popular
                </div>
              )}

              {/* Tag */}
              <div className={`self-start px-2.5 py-1 rounded-full border text-xs font-display font-medium mb-5 ${svc.tagColor}`}>
                {svc.tag}
              </div>

              {/* Title + price */}
              <h3 className="font-display font-semibold text-moon text-lg leading-snug mb-2">
                {svc.title}
              </h3>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display font-bold text-3xl text-moon">
                  {svc.price}
                </span>
              </div>
              <p className="text-xs text-muted font-body mb-6">
                Delivered in {svc.delivery}
              </p>

              {/* Divider */}
              <div className="h-px bg-white/[0.06] mb-6" />

              {/* Features */}
              <ul className="flex-1 space-y-2.5 mb-8">
                {svc.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm font-body text-silver">
                    <CheckIcon />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`${WA_LINK}${encodeURIComponent(svc.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 px-5 rounded-xl text-sm font-display font-medium transition-all duration-300 ${
                  svc.popular
                    ? "bg-star text-void hover:bg-[#7bc4ff] shadow-glow-star hover:shadow-[0_0_40px_rgba(90,169,255,0.4)]"
                    : "glass border border-white/10 text-silver hover:text-moon hover:border-white/20"
                }`}
              >
                Get started
              </a>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Trust note */}
        <div className="svc-trust text-center">
          <p className="inline-flex items-center gap-2 glass border border-white/[0.07] rounded-xl px-5 py-3 text-sm font-body text-muted max-w-2xl">
            <span className="text-aurora text-base">✦</span>
            I&apos;m currently focusing on 3–5 single-page websites to build
            experience, collect reviews, and deliver fast, affordable results.
          </p>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      className="flex-shrink-0 mt-0.5 text-aurora"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
