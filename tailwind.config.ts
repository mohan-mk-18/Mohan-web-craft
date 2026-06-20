import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void:    "#000003",
        deep:    "#02030e",
        cosmic:  "#05091a",
        nebula:  "#111827",
        star:    "#5aa9ff",
        violet:  "#8b5cf6",
        aurora:  "#22d3ee",
        moon:    "#eaf2ff",
        silver:  "#c8d8f0",
        muted:   "#b8c4d8",
        faint:   "#5a6880",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body:    ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "space-radial":
          "radial-gradient(ellipse at 50% 50%, #0b1020 0%, #070b14 50%, #05070d 100%)",
        "glow-blue":
          "radial-gradient(circle, rgba(90,169,255,0.15) 0%, transparent 70%)",
        "glow-violet":
          "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        "glow-cyan":
          "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
        "card-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      },
      boxShadow: {
        "glow-star":   "0 0 40px rgba(90,169,255,0.2), 0 0 80px rgba(90,169,255,0.08)",
        "glow-violet": "0 0 40px rgba(139,92,246,0.2), 0 0 80px rgba(139,92,246,0.08)",
        "glow-aurora": "0 0 40px rgba(34,211,238,0.2), 0 0 80px rgba(34,211,238,0.08)",
        "card":        "0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
        driftX: {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%":      { transform: "translateX(8px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        float:       "float 6s ease-in-out infinite",
        floatSlow:   "float 9s ease-in-out infinite",
        pulseGlow:   "pulseGlow 3s ease-in-out infinite",
        driftX:      "driftX 8s ease-in-out infinite",
        shimmer:     "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
