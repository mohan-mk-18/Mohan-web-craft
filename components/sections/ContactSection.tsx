"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";

const WA_LINK =
  "https://wa.me/919514870795?text=Hi%20Mohan%2C%20I%27d%20like%20to%20discuss%20a%20website%20project";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-header", { scrollTrigger:{ trigger:".contact-header", start:"top 85%", toggleActions:"play none none none" }, opacity:0, y:30, duration:0.8, ease:"power3.out" });
      gsap.from(".contact-left",   { scrollTrigger:{ trigger:".contact-grid",   start:"top 75%", toggleActions:"play none none none" }, opacity:0, x:-40, duration:0.9, ease:"power2.out" });
      gsap.from(".contact-right",  { scrollTrigger:{ trigger:".contact-grid",   start:"top 75%", toggleActions:"play none none none" }, opacity:0, x:40,  duration:0.9, ease:"power2.out", delay:0.12 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={sectionRef} className="section-pad relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[350px] rounded-full bg-star/[0.06] blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-violet/[0.05] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="cosmic-divider mb-12 sm:mb-16" />

        {/* Header */}
        <div className="contact-header text-center mb-10 sm:mb-14">
          <p className="text-xs font-body font-medium text-star uppercase tracking-widest mb-3 sm:mb-4">
            Let&apos;s work together
          </p>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-moon leading-[1.15] mb-3 sm:mb-4">
            Ready to get{" "}
            <span className="text-gradient-star">your site online?</span>
          </h2>
          <p className="font-body text-muted text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            WhatsApp is the fastest way to reach me. I typically respond within 2 hours.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start max-w-5xl mx-auto">

          {/* Left */}
          <div className="contact-left space-y-4 sm:space-y-5">

            {/* WhatsApp CTA */}
            <motion.a
              href={WA_LINK} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-[#25d366]/25 hover:border-[#25d366]/40 transition-all duration-300 group"
              style={{ background: "linear-gradient(135deg, rgba(18,140,126,0.12), rgba(37,211,102,0.12))" }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#25d366]/15 flex items-center justify-center flex-shrink-0 text-[#25d366] group-hover:bg-[#25d366]/25 transition-colors">
                <WhatsAppIcon size={22} />
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-moon text-sm sm:text-base">Chat on WhatsApp</p>
                <p className="text-xs sm:text-sm font-body text-muted">+91 XXXXX XXXXX · Replies in ~2 hrs</p>
              </div>
              <svg className="ml-auto text-[#25d366] flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>

            {/* Info tiles — 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              <InfoTile icon="📧" label="Email"    value="mohanwebcraft@gmail.com" href="mailto:mohanwebcraft@gmail.com" small />
              <InfoTile icon="📍" label="Location" value="Salem, India" />
              <InfoTile icon="⏱" label="Response" value="Within 2 hours" />
              <InfoTile icon="🌏" label="Serving"  value="Pan-India" />
            </div>

            {/* Trust */}
            <div className="glass border border-white/[0.06] rounded-xl p-3 sm:p-4 text-center">
              <p className="text-xs font-body text-muted leading-relaxed">
                🔒 Your details stay private. I only use contact info to reply to your enquiry.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <TiltCard className="contact-right" intensity={8} scale={1.02}>
            <div className="glass border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-card">
              <h3 className="font-display font-semibold text-moon text-base sm:text-lg mb-4 sm:mb-5">
                Or send a message
              </h3>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success"
                    initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                    className="flex flex-col items-center text-center py-8 sm:py-10 gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-aurora/10 border border-aurora/25 flex items-center justify-center text-xl">🚀</div>
                    <div>
                      <p className="font-display font-semibold text-moon text-sm sm:text-base mb-1">Message received!</p>
                      <p className="text-xs sm:text-sm font-body text-muted">I'll get back to you within 2 hours.</p>
                    </div>
                    <button onClick={() => setSubmitted(false)} className="text-sm text-star underline underline-offset-4">
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" initial={{ opacity:0 }} animate={{ opacity:1 }}>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      <Field label="Your name"  name="name"  type="text"  placeholder="Your name"     value={formState.name}  onChange={handleChange} />
                      <Field label="Email"       name="email" type="email" placeholder="you@email.com" value={formState.email} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-[10px] sm:text-xs font-body text-muted mb-1.5 uppercase tracking-wider">
                        Tell me about your project
                      </label>
                      <textarea
                        name="message" rows={4}
                        placeholder="I run a small business and need a website to…"
                        value={formState.message} onChange={handleChange}
                        className="w-full bg-white/[0.03] border border-white/[0.09] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-body text-silver placeholder:text-faint focus:outline-none focus:border-star/40 focus:bg-white/[0.05] resize-none transition-all duration-200"
                      />
                    </div>
                    <button type="submit" disabled={sending}
                      className="w-full py-3 sm:py-3.5 rounded-xl bg-star/10 border border-star/30 text-star font-display font-medium text-sm hover:bg-star/20 hover:border-star/50 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {sending ? (
                        <><span className="w-4 h-4 border border-star/50 border-t-star rounded-full animate-spin"/>Sending…</>
                      ) : "Send message"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

function InfoTile({ icon, label, value, href, small }:
  { icon:string; label:string; value:string; href?:string; small?:boolean }) {
  const content = (
    <div className="glass border border-white/[0.06] rounded-xl p-3 flex items-start gap-2.5 hover:border-white/[0.1] transition-colors h-full">
      <span className="text-base sm:text-lg flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[9px] sm:text-[10px] font-body text-faint uppercase tracking-wider mb-0.5">{label}</p>
        <p className={`font-body text-silver truncate ${small ? "text-[10px] sm:text-xs" : "text-xs"}`}>{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{content}</a> : <div>{content}</div>;
}

function Field({ label, name, type, placeholder, value, onChange }:
  { label:string; name:string; type:string; placeholder:string; value:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void }) {
  return (
    <div>
      <label className="block text-[10px] sm:text-xs font-body text-muted mb-1.5 uppercase tracking-wider">{label}</label>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
        className="w-full bg-white/[0.03] border border-white/[0.09] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-body text-silver placeholder:text-faint focus:outline-none focus:border-star/40 focus:bg-white/[0.05] transition-all duration-200"
      />
    </div>
  );
}

function WhatsAppIcon({ size=20 }:{ size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}