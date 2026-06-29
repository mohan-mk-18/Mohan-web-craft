"use client";

import { useState, useEffect } from "react";
import IntroScreen from "@/components/IntroScreen";

export default function IntroWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [introDone, setIntroDone] = useState(false);

  // Lock body scroll while intro is showing
  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  return (
    <>
      {!introDone && (
        <IntroScreen onComplete={() => setIntroDone(true)} />
      )}
      {/* Portfolio is always rendered so Three.js / GSAP initialise
          in the background — they become visible when intro fades out */}
      <div
        style={{
          opacity:    introDone ? 1 : 0,
          transition: introDone ? "opacity 0.5s ease 0.1s" : "none",
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}