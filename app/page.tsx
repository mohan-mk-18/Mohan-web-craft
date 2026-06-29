import dynamic from "next/dynamic";
import IntroWrapper from "@/components/IntroWrapper";          {/* ← ADD this import */}
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navigation from "@/components/Navigation";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

const SpaceBackground = dynamic(
  () => import("@/components/SpaceBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <IntroWrapper>                                              {/* ← ADD this wrapper */}
      <SmoothScrollProvider>
        <SpaceBackground />
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ServicesSection />
          <ProcessSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </SmoothScrollProvider>
    </IntroWrapper>                                            
  );
}