"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import TiltCard from "@/components/ui/TiltCard";

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".testi-inner", {
        scrollTrigger: { trigger: ".testi-inner", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, y: 40, duration: 0.9, ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-violet/[0.05] blur-[110px] -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="cosmic-divider mb-16" />

        <div className="testi-inner text-center flex flex-col items-center">
          <p className="text-xs font-body font-medium text-star uppercase tracking-widest mb-4">
            Client voices
          </p>
          <h2 className="font-display font-semibold text-4xl sm:text-5xl text-moon leading-[1.15] mb-6">
            What clients say
          </h2>

          {/* Placeholder — honest, not fake */}
          <TiltCard intensity={8} scale={1.03} className="mx-auto">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center text-center gap-5 glass border border-white/[0.08] rounded-2xl px-10 py-10 max-w-md mx-auto shadow-card"
            >
            <div className="w-14 h-14 rounded-full bg-star/[0.08] border border-star/20 flex items-center justify-center text-2xl">
              ✦
            </div>
            <div className="text-center">
              <p className="font-display font-medium text-moon text-base mb-2">
                Reviews coming soon
              </p>
              <p className="font-body text-muted text-sm leading-relaxed">
                I&apos;m currently working with my first clients.
                Real reviews will appear here once projects are delivered.
                Transparency is part of how I work.
              </p>
            </div>
            <div className="flex gap-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={1.5}
                  className="text-muted"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
