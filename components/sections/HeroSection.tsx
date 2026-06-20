"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const WA_LINK =
  "https://wa.me/919514870795?text=Hi%20Mohan%2C%20I%20need%20a%20website";

const stats = [
  { value: "72h",  label: "Delivery time" },
  { value: "3–5",  label: "Starter slots"  },
  { value: "100%", label: "Mobile-ready"   },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "power3.out" } });

      tl.from(".hero-tag", {
        opacity: 0, y: 16, duration: 0.6,
      })
        .from(".hero-word", {
          opacity: 0, y: 70, stagger: 0.06, duration: 0.85,
        }, "-=0.2")
        .from(".hero-sub", {
          opacity: 0, y: 20, duration: 0.65,
        }, "-=0.45")
        .from(".hero-cta", {
          opacity: 0, y: 18, stagger: 0.1, duration: 0.55,
        }, "-=0.4")
        .from(".hero-card", {
          opacity: 0, x: 45, duration: 0.9, ease: "power2.out",
        }, "-=0.6")
        .from(".hero-scroll", {
          opacity: 0, duration: 0.5,
        }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = ["Your website,", "live in 72 hours."];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-star/[0.07] blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/2 w-[300px] h-[300px] rounded-full bg-aurora/[0.05] blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 lg:pt-40 lg:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">

          {/* Left — copy */}
          <div className="max-w-2xl">

            {/* Eyebrow tag */}
            <div className="hero-tag inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-star/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-aurora animate-pulseGlow" />
              <span className="text-xs font-body font-medium text-muted tracking-widest uppercase">
                Freelance web developer · Salem, India
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-semibold leading-[1.1] mb-6">
              {headline.map((line, li) => (
                <div key={li} className="overflow-hidden">
                  {line.split(" ").map((word, wi) => (
                    <span
                      key={wi}
                      className={`hero-word inline-block mr-[0.3em] ${
                        li === 1
                          ? "text-gradient-star text-5xl sm:text-6xl lg:text-7xl"
                          : "text-moon text-5xl sm:text-6xl lg:text-7xl"
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              ))}
            </h1>

            {/* Subheadline */}
            <p className="hero-sub font-body text-muted text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              AI-assisted design. Clean code. Single-page sites built fast
              for small businesses across India —{" "}
              <span className="text-silver font-medium">starting at ₹3,500</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-star text-void font-display font-semibold text-sm hover:bg-[#7bc4ff] transition-all duration-300 shadow-glow-star hover:shadow-[0_0_50px_rgba(90,169,255,0.4)]"
              >
                <WhatsAppIcon />
                Start on WhatsApp
              </a>
              <button
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hero-cta flex items-center gap-2 px-7 py-3.5 rounded-full glass border border-white/10 text-silver font-display font-medium text-sm hover:border-white/20 hover:text-moon transition-all duration-300"
              >
                View my work
                <ArrowDownIcon />
              </button>
            </div>
          </div>

          {/* Right — floating stats card */}
          <div className="hero-card lg:flex-shrink-0 w-full lg:w-auto max-w-sm lg:max-w-none">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative glass border-glow-star rounded-2xl p-6 lg:w-64"
            >
              {/* Glow aura */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-star/10 via-transparent to-violet/10 pointer-events-none" />

              <p className="text-xs font-body text-muted mb-4 uppercase tracking-widest">
                Current availability
              </p>

              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-aurora animate-pulseGlow shadow-[0_0_8px_#22d3ee]" />
                <span className="font-display font-semibold text-moon text-sm">
                  Open for new projects
                </span>
              </div>

              <div className="space-y-3">
                {stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-2 border-b border-white/[0.05] last:border-0"
                  >
                    <span className="text-muted text-xs font-body">{label}</span>
                    <span className="font-display font-semibold text-moon text-sm">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.05]">
                <p className="text-xs text-muted font-body text-center">
                  First 5 clients · Starter pricing
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-body text-muted uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-muted to-transparent"
          />
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
    </svg>
  );
}
