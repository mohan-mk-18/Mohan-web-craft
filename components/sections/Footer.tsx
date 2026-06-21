"use client";

import { motion } from "framer-motion";

const WA_LINK =
  "https://wa.me/919514870795?text=Hi%20Mohan%2C%20I%20need%20a%20website";

const quickLinks = [
  { label: "About",    href: "#about"    },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Process",  href: "#process"  },
  { label: "Contact",  href: "#contact"  },
];

const services = [
  { label: "Single-Page Website (₹3,500)",    href: "#services" },
  { label: "WhatsApp Integration (₹5,000)",   href: "#services" },
  { label: "Full Launch Package (₹7,000)",    href: "#services" },
  { label: "Multi-Page Website (₹15,000)",    href: "#services" },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">

      {/* Top glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-star/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
              className="inline-block font-display text-2xl font-semibold text-moon mb-3"
            >
              <span className="text-gradient-star">Mohan&apos;s</span>
              <span className="text-moon"> WebCraft</span>
              <span className="text-muted font-light">.</span>
            </a>
            <p className="font-body text-muted text-sm leading-relaxed max-w-xs mb-5">
              Freelance web developer from Salem. Fast, affordable
              single-page websites for small businesses across India.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-star/[0.08] border border-star/25 text-star text-sm font-medium hover:bg-star/15 transition-all duration-300"
            >
              <WhatsAppIcon />
              WhatsApp me
            </a>

            {/* AI note */}
            <p className="mt-5 text-[11px] font-body text-faint leading-relaxed max-w-xs">
              ✦ Websites powered by AI-assisted design and modern tooling —
              so I can deliver fast without compromising quality.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-silver text-xs uppercase tracking-widest mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-sm font-body text-muted hover:text-moon transition-colors duration-200 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-silver text-xs uppercase tracking-widest mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-sm font-body text-muted hover:text-moon transition-colors duration-200 text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="cosmic-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-faint">
          <p>
            © {new Date().getFullYear()} Mohan. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-aurora"
            />
            <span>Built with Next.js, Three.js &amp; ☕</span>
          </div>
          <p>Salem, India</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
