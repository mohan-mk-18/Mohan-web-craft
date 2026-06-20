"use client";

import { useRef, ReactNode, MouseEvent } from "react";

interface TiltCardProps {
  children:   ReactNode;
  className?: string;
  intensity?: number;
  scale?:     number;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 14,
  scale     = 1.04,
}: TiltCardProps) {
  const ref      = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const card = ref.current;
      if (!card) return;
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;
      const y = (e.clientY - top)  / height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * intensity * 2}deg) rotateY(${x * intensity * 2}deg) scale3d(${scale},${scale},${scale}) translateZ(8px)`;
      const shine = shineRef.current;
      if (shine) {
        shine.style.opacity    = "1";
        shine.style.background = `radial-gradient(circle at ${(x+0.5)*100}% ${(y+0.5)*100}%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 40%, transparent 65%)`;
      }
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frameRef.current);
    const card = ref.current;
    if (card) card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1) translateZ(0px)";
    const shine = shineRef.current;
    if (shine) shine.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      className={`relative will-change-transform transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={shineRef} className="absolute inset-0 rounded-2xl pointer-events-none z-10 opacity-0 transition-opacity duration-200" aria-hidden />
      {children}
    </div>
  );
}
