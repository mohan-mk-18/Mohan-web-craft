"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Work",     href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process"  },
  { label: "Contact",  href: "#contact"  },
];

const WA_LINK = "https://wa.me/?text=Hi%20Mohan%2C%20I%20need%20a%20website";

export default function Navigation() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeSection,setActiveSection] = useState("hero");
  const navRef = useRef<HTMLElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracking */
  useEffect(() => {
    const ids = ["hero", "about", "projects", "services", "process", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 glass-strong shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav("#hero"); }}
          className="font-display text-xl font-semibold tracking-tight text-moon"
        >
          <span className="text-gradient-star">Mohan&apos;s</span>
          <span className="text-moon"> WebCraft</span>
          <span className="text-muted font-light">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive  = activeSection === sectionId;
            return (
              <li key={href}>
                <button
                  onClick={() => handleNav(href)}
                  className={`relative text-sm font-body font-medium transition-colors duration-300 ${
                    isActive ? "text-moon" : "text-muted hover:text-silver"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-star rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-star/10 border border-star/30 text-star text-sm font-medium hover:bg-star/20 hover:border-star/50 transition-all duration-300"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2 z-50 relative"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] bg-moon rounded transition-all duration-300 origin-center ${
              menuOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-6"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-moon rounded transition-all duration-300 ${
              menuOpen ? "opacity-0 w-0" : "w-5 opacity-100"
            }`}
          />
          <span
            className={`block h-[1.5px] bg-moon rounded transition-all duration-300 origin-center ${
              menuOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-6"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-strong border-t border-white/[0.06] px-6 py-6 flex flex-col gap-5"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className="text-left text-base font-display font-medium text-silver hover:text-moon transition-colors"
              >
                {label}
              </button>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-star font-medium text-sm mt-2"
              onClick={() => setMenuOpen(false)}
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}