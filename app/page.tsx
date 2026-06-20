import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navigation from "@/components/Navigation";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

// Three.js background — client-only, no SSR
const SpaceBackground = dynamic(
  () => import("@/components/SpaceBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Fixed 3-D space canvas behind everything */}
      <SpaceBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Persistent WhatsApp CTA */}
      <FloatingWhatsApp />
    </SmoothScrollProvider>
  );
}
