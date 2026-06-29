"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Script ──────────────────────────────────────────────────── */
const LINES = [
  "Hi, I'm Mohan — a freelance web developer from Salem.",
  "If your business needs a strong online presence,",
  "I build websites that make it happen.",
  "Welcome to my portfolio. Let's get started.",
];

type Phase = "idle" | "playing" | "done";
interface Star { id:number; x:number; y:number; r:number; o:number; d:number; }
interface Props { onComplete: () => void; }

/* ═══════════════════════════════════════════════════════════════ */
export default function IntroScreen({ onComplete }: Props) {
  const [stars,      setStars]   = useState<Star[]>([]);
  const [phase,      setPhase]   = useState<Phase>("idle");
  const [lineIdx,    setLineIdx] = useState(-1);   // which line is active (-1 = none)
  const [exiting,    setExiting] = useState(false);

  const killed  = useRef(false);
  const synthRef= useRef<SpeechSynthesis | null>(null);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  /* ── Stars ─────────────────────────────────────────────────── */
  useEffect(() => {
    setStars(Array.from({ length: 42 }, (_, i) => ({
      id: i, x: Math.random()*100, y: Math.random()*100,
      r: Math.random()*1.6+0.5, o: Math.random()*0.4+0.15, d: Math.random()*4,
    })));
    return () => {
      killed.current = true;
      timerRefs.current.forEach(clearTimeout);
      try { synthRef.current?.cancel(); } catch (_) {}
    };
  }, []);

  /* ── Exit ─────────────────────────────────────────────────── */
  const doExit = () => {
    killed.current = true;
    timerRefs.current.forEach(clearTimeout);
    try { synthRef.current?.cancel(); } catch (_) {}
    setExiting(true);
    setTimeout(onComplete, 900);
  };

  /* ── Pick best voice ───────────────────────────────────────── */
  const pickVoice = (): SpeechSynthesisVoice | null => {
    const voices = synthRef.current?.getVoices() ?? [];
    return (
      voices.find(v => v.name === "Google UK English Male")                          ||
      voices.find(v => v.lang === "en-GB")                                           ||
      voices.find(v => v.lang.startsWith("en") &&
        !v.name.match(/zira|samantha|female|karen|moira/i))                          ||
      voices.find(v => v.lang.startsWith("en"))                                      ||
      null
    );
  };

  /* ══════════════════════════════════════════════════════════════
     CORE: speak one line → show its text simultaneously → chain
     Text appears the MOMENT the utterance starts → perfect sync
     ══════════════════════════════════════════════════════════════ */
  const speakAt = (idx: number) => {
    if (killed.current) return;

    if (idx >= LINES.length) {
      /* All lines done */
      setPhase("done");
      const t = setTimeout(() => { if (!killed.current) doExit(); }, 2200);
      timerRefs.current.push(t);
      return;
    }

    /* ── Reveal line text ── */
    setLineIdx(idx);

    const s = synthRef.current;
    if (!s) {
      /* No Web Speech API — pure timer fallback */
      const t = setTimeout(() => speakAt(idx + 1), 2600);
      timerRefs.current.push(t);
      return;
    }

    const utt   = new SpeechSynthesisUtterance(LINES[idx]);
    const voice = pickVoice();
    if (voice) utt.voice = voice;
    utt.rate    = 0.95;   // Natural speed — not slow
    utt.pitch   = 1.05;
    utt.volume  = 1.0;

    const pause = idx === LINES.length - 1 ? 500 : 180;

    utt.onend = () => {
      if (!killed.current) setTimeout(() => speakAt(idx + 1), pause);
    };
    utt.onerror = () => {
      /* Voice error — advance via timer so text keeps moving */
      if (!killed.current) {
        const t = setTimeout(() => speakAt(idx + 1), 2400);
        timerRefs.current.push(t);
      }
    };

    s.speak(utt);
  };

  /* ══════════════════════════════════════════════════════════════
     PLAY HANDLER — one clear tap, iOS-primer included
     ══════════════════════════════════════════════════════════════ */
  const handlePlay = () => {
    const s = typeof window !== "undefined" ? window.speechSynthesis : null;
    synthRef.current = s;
    killed.current   = false;
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];

    setPhase("playing");
    setLineIdx(-1);

    if (!s) {
      /* No speech API — pure timer mode */
      speakAt(0);
      return;
    }

    s.cancel();

    /*
     * iOS WebKit requires the first speak() call to be SYNCHRONOUS
     * inside a user-gesture handler.  We speak a near-silent primer
     * right here, then chain the real script in its onend callback.
     */
    const primer   = new SpeechSynthesisUtterance("\u200B");
    primer.volume  = 0.001;
    primer.rate    = 10;

    let primed = false;
    const go = () => {
      if (primed || killed.current) return;
      primed = true;
      speakAt(0);
    };

    primer.onend   = go;
    primer.onerror = go;
    setTimeout(go, 500); /* hard fallback if primer never fires */
    s.speak(primer);
  };

  /* ── Derived ──────────────────────────────────────────────── */
  const visibleCount = lineIdx + 1; /* 0 = nothing, 1 = first line, etc. */

  /* ── Render ───────────────────────────────────────────────── */
  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background:"radial-gradient(ellipse at 42% 38%, #06091c 0%, #020309 60%, #000000 100%)" }}
        >
          {/* ── Keyframes ──────────────────────────────────── */}
          <style>{`
            @keyframes mfloat  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
            @keyframes mwave   { 0%,100%{transform:rotate(0deg)}   28%{transform:rotate(-22deg)} 72%{transform:rotate(15deg)} }
            @keyframes mblink  { 0%,80%,100%{opacity:.7}           90%{opacity:1;filter:drop-shadow(0 0 6px #22d3ee)} }
            @keyframes mvpulse { 0%,100%{opacity:.22}              50%{opacity:.54} }
            @keyframes meye    { 0%,100%{opacity:.3}               50%{opacity:.72} }
            @keyframes mstar   { 0%,100%{opacity:var(--so)}        50%{opacity:calc(var(--so)*.2)} }
            .mf  { animation: mfloat  5s   ease-in-out infinite; }
            .mw  { animation: mwave   1.1s ease-in-out infinite; transform-box:fill-box; transform-origin:50% 0%; }
            .mb  { animation: mblink  1.7s ease-in-out infinite; }
            .mvp { animation: mvpulse 1.9s ease-in-out infinite; }
            .me  { animation: meye    1.5s ease-in-out infinite; }
          `}</style>

          {/* Stars */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
            {stars.map(s => (
              <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white"
                style={{ "--so":s.o, opacity:s.o,
                  animation:`mstar ${2.5+s.d}s ease-in-out ${s.d}s infinite`
                } as React.CSSProperties}
              />
            ))}
          </svg>

          {/* Subtle grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{ backgroundImage:"linear-gradient(rgba(90,169,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(90,169,255,.5) 1px,transparent 1px)", backgroundSize:"60px 60px" }}
          />

          {/* Skip */}
          <motion.button
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
            onClick={doExit}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-display font-medium text-muted border border-white/10 hover:border-white/25 hover:text-silver transition-all z-10"
            style={{ background:"rgba(255,255,255,0.03)", backdropFilter:"blur(10px)" }}
          >
            Skip
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>

          {/* ── Main layout ─────────────────────────────────── */}
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-14">

            {/* Mascot */}
            <motion.div
              initial={{ y:70, opacity:0 }} animate={{ y:0, opacity:1 }}
              transition={{ duration:1.0, delay:0.2, ease:[0.16,1,0.3,1] }}
              className="flex-shrink-0"
            >
              <AstronautMascot speaking={phase === "playing"} />
            </motion.div>

            {/* Speech card */}
            <motion.div
              initial={{ x:40, opacity:0 }} animate={{ x:0, opacity:1 }}
              transition={{ duration:0.9, delay:0.5, ease:[0.16,1,0.3,1] }}
              className="flex-1 w-full max-w-md lg:max-w-none"
            >
              <div
                className="relative rounded-2xl border border-white/[0.09] px-5 py-6 sm:px-7 sm:py-7"
                style={{ background:"rgba(255,255,255,0.032)", backdropFilter:"blur(18px)" }}
              >
                {/* Desktop connector */}
                <div className="hidden lg:block absolute -left-[9px] top-12 w-4 h-4 rotate-45"
                  style={{ background:"rgba(6,9,28,0.9)", border:"1px solid rgba(255,255,255,0.09)", borderRight:"none", borderTop:"none" }}
                />

                <p className="text-[9px] sm:text-[10px] font-body text-faint uppercase tracking-widest mb-5">
                  Mohan&apos;s WebCraft · Salem, India
                </p>

                {/* ── IDLE: single prominent play button ──── */}
                {phase === "idle" && (
                  <motion.div
                    initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                    transition={{ delay:0.7 }}
                  >
                    <p className="font-body text-muted text-sm leading-relaxed mb-5">
                      Tap the button below to hear a short intro
                    </p>
                    <button
                      onClick={handlePlay}
                      className="w-full py-4 rounded-xl font-display font-semibold text-base flex items-center justify-center gap-3 text-void bg-star hover:bg-[#7bc4ff] transition-all duration-300 active:scale-95"
                      style={{ boxShadow:"0 0 36px rgba(90,169,255,0.45)" }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      Play intro with voice
                    </button>
                    <p className="text-center text-[10px] font-body text-faint mt-3">
                      Or tap <span className="text-muted">Skip</span> to go straight to the portfolio
                    </p>
                  </motion.div>
                )}

                {/* ── PLAYING: lines appear one by one ─────── */}
                {phase !== "idle" && (
                  <div className="space-y-3 sm:space-y-4 min-h-[120px] sm:min-h-[140px]">
                    <AnimatePresence initial={false}>
                      {LINES.slice(0, visibleCount).map((line, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity:0, y:14 }}
                          animate={{ opacity:1, y:0 }}
                          transition={{ duration:0.4, ease:"easeOut" }}
                          className={`leading-snug ${
                            i === visibleCount - 1 && phase === "playing"
                              ? "font-display font-semibold text-moon text-base sm:text-lg lg:text-xl"
                              : "font-body text-muted text-sm sm:text-base lg:text-lg"
                          }`}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* ── DONE: enter portfolio ─────────────────── */}
                <AnimatePresence>
                  {phase === "done" && (
                    <motion.button
                      initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                      transition={{ delay:0.3 }}
                      onClick={doExit}
                      className="mt-5 w-full py-3 sm:py-3.5 rounded-xl text-sm font-display font-semibold flex items-center justify-center gap-2 bg-star text-void hover:bg-[#7bc4ff] transition-all duration-300 active:scale-95"
                      style={{ boxShadow:"0 0 28px rgba(90,169,255,0.38)" }}
                    >
                      Enter portfolio
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.1 }}
                className="mt-3 text-center text-[9px] sm:text-[10px] font-body text-faint tracking-widest uppercase"
              >
                mohanwebcraft@gmail.com
              </motion.p>
            </motion.div>
          </div>

          {/* Progress dots (playing only) */}
          <AnimatePresence>
            {phase === "playing" && visibleCount > 0 && (
              <motion.div
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                className="absolute bottom-5 sm:bottom-8 flex items-center gap-2"
              >
                {LINES.map((_, i) => (
                  <motion.div key={i}
                    animate={i < visibleCount ? { width:"18px", opacity:1 } : { width:"6px", opacity:0.22 }}
                    transition={{ duration:0.3 }}
                    className="h-1.5 rounded-full bg-star"
                    style={{ width:"6px" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/*  Astronaut Mascot                                               */
/* ═══════════════════════════════════════════════════════════════ */
function AstronautMascot({ speaking }: { speaking: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-8 rounded-full"
        style={{ background:"radial-gradient(ellipse,rgba(90,169,255,.30) 0%,transparent 70%)", filter:"blur(12px)" }}
      />
      <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className="mf"
        style={{ width:"clamp(140px,38vw,230px)", height:"auto",
          filter:"drop-shadow(0 4px 20px rgba(90,169,255,0.18))" }}
        aria-hidden
      >
        <defs>
          <radialGradient id="rv"  cx="38%" cy="32%" r="68%"><stop offset="0%"   stopColor="#1a3a6a"/><stop offset="100%" stopColor="#030d20"/></radialGradient>
          <radialGradient id="rvg" cx="35%" cy="30%" r="70%"><stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.4"/><stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/></radialGradient>
          <radialGradient id="rh"  cx="33%" cy="28%" r="72%"><stop offset="0%"   stopColor="#eaf2ff"/><stop offset="100%" stopColor="#c4d4e8"/></radialGradient>
          <radialGradient id="rb"  cx="30%" cy="25%" r="78%"><stop offset="0%"   stopColor="#e6f0fc"/><stop offset="100%" stopColor="#c0d0e6"/></radialGradient>
        </defs>
        {/* Backpack */}
        <rect x="138" y="164" width="30" height="56" rx="10" fill="#bfcbdb"/>
        <rect x="141" y="172" width="12" height="3"  rx="1.5" fill="#a5b5c5"/>
        <rect x="141" y="179" width="12" height="3"  rx="1.5" fill="#a5b5c5"/>
        <rect x="141" y="186" width="8"  height="3"  rx="1.5" fill="#a5b5c5"/>
        {/* Body */}
        <rect x="40" y="158" width="118" height="95" rx="26" fill="url(#rb)"/>
        <rect x="40" y="220" width="118" height="33" rx="26" fill="#bccce0"/>
        <circle cx="60"  cy="178" r="9"   fill="#b2c2d6"/><circle cx="60"  cy="178" r="5.5" fill="#a4b4c6"/>
        <circle cx="140" cy="178" r="9"   fill="#b2c2d6"/><circle cx="140" cy="178" r="5.5" fill="#a4b4c6"/>
        {/* Chest panel */}
        <rect x="66" y="178" width="66" height="52" rx="11" fill="#0a1628"/>
        <rect x="69" y="181" width="60" height="46" rx="9"  fill="#080f1e"/>
        <circle cx="82" cy="197" r="5.5" fill={speaking?"#22d3ee":"#1a4060"} className={speaking?"mvp":""}/>
        <circle cx="82" cy="197" r="2.8" fill={speaking?"#90f8ff":"#2a608a"}/>
        <rect x="93" y="191" width="27" height="3" rx="1.5" fill="#386aaa" opacity={speaking?0.95:0.5}/>
        <rect x="93" y="197" width="20" height="3" rx="1.5" fill="#386aaa" opacity={speaking?0.75:0.35}/>
        <rect x="93" y="203" width="24" height="3" rx="1.5" fill="#386aaa" opacity={speaking?0.55:0.22}/>
        <rect x="75" y="214" width="48" height="9"  rx="4.5" fill="#101e30"/>
        <rect x="78" y="216" width="12" height="5"  rx="2.5" fill="#1e4870"/>
        <rect x="93" y="216" width="12" height="5"  rx="2.5" fill="#1e4870"/>
        {/* Left arm */}
        <rect x="8"  y="164" width="34" height="76" rx="17" fill="url(#rb)"/>
        <rect x="10" y="199" width="30" height="7"  rx="3.5" fill="#b4c4d8"/>
        <ellipse cx="25" cy="245" rx="18" ry="15" fill="#adbdcf"/>
        <ellipse cx="25" cy="242" rx="13" ry="10" fill="#becee0"/>
        {/* Right arm — waves when speaking */}
        <g className={speaking ? "mw" : ""}>
          <rect x="158" y="164" width="34" height="76" rx="17" fill="url(#rb)"/>
          <rect x="160" y="199" width="30" height="7"  rx="3.5" fill="#b4c4d8"/>
          <ellipse cx="175" cy="245" rx="18" ry="15" fill="#adbdcf"/>
          <ellipse cx="175" cy="242" rx="13" ry="10" fill="#becee0"/>
        </g>
        {/* Helmet */}
        <rect x="72" y="152" width="56" height="16" rx="8" fill="#b4c4d8"/>
        <circle cx="100" cy="92" r="68" fill="url(#rh)"/>
        <ellipse cx="84" cy="50" rx="25" ry="16" fill="white" opacity="0.20" transform="rotate(-22 84 50)"/>
        <rect x="29"  y="76" width="16" height="44" rx="8" fill="#beccde"/>
        <rect x="155" y="76" width="16" height="44" rx="8" fill="#beccde"/>
        {[82,89,96,103].map(y => (
          <g key={y}>
            <rect x="32"  y={y} width="10" height="3" rx="1.5" fill="#a0b0c2"/>
            <rect x="158" y={y} width="10" height="3" rx="1.5" fill="#a0b0c2"/>
          </g>
        ))}
        {/* Visor */}
        <ellipse cx="100" cy="98" rx="52" ry="48" fill="#7a8ea4"/>
        <ellipse cx="100" cy="98" rx="48" ry="44" fill="url(#rv)"/>
        <ellipse cx="100" cy="98" rx="48" ry="44" fill="url(#rvg)" className={speaking?"mvp":""} opacity={speaking?1:0.35}/>
        <ellipse cx="100" cy="98" rx="48" ry="44" fill="none" stroke="#22d3ee" strokeWidth="1.3" opacity={speaking?0.55:0.18}/>
        <ellipse cx="80"  cy="80" rx="15" ry="10" fill="white" opacity="0.09" transform="rotate(-22 80 80)"/>
        <ellipse cx="74"  cy="75" rx="5"  ry="3.5" fill="white" opacity="0.18" transform="rotate(-22 74 75)"/>
        {/* Face */}
        <g className={speaking ? "me" : ""}>
          <circle cx="87"  cy="96" r="7"   fill="#22d3ee" opacity="0.28"/>
          <circle cx="87"  cy="96" r="3.5" fill="#60f5ff" opacity="0.75"/>
          <circle cx="113" cy="96" r="7"   fill="#22d3ee" opacity="0.28"/>
          <circle cx="113" cy="96" r="3.5" fill="#60f5ff" opacity="0.75"/>
        </g>
        <path d="M 85 114 Q 100 124 115 114" stroke="#22d3ee" strokeWidth="2" fill="none"
          opacity={speaking?0.40:0.18} strokeLinecap="round"/>
        {/* Antenna */}
        <line x1="100" y1="24" x2="100" y2="56" stroke="#aabcce" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="100" cy="56" r="5.5" fill="#98aac0"/>
        <circle cx="100" cy="21" r="13"  fill="#22d3ee" opacity="0.10"/>
        <circle cx="100" cy="21" r="7.5" fill="#22d3ee" className={speaking?"mb":""} opacity={speaking?0.88:0.60}/>
        <circle cx="100" cy="21" r="4"   fill="#b8f8ff" opacity="0.95"/>
        {/* Legs */}
        <rect x="56"  y="250" width="38" height="38" rx="16" fill="#c8d4e8"/>
        <rect x="106" y="250" width="38" height="38" rx="16" fill="#c8d4e8"/>
        <rect x="47"  y="278" width="54" height="20" rx="10" fill="#a4b4c8"/>
        <rect x="50"  y="280" width="48" height="14" rx="7"  fill="#b4c4d8"/>
        <rect x="99"  y="278" width="54" height="20" rx="10" fill="#a4b4c8"/>
        <rect x="102" y="280" width="48" height="14" rx="7"  fill="#b4c4d8"/>
        <circle cx="100" cy="92" r="77" fill="none" stroke="#5aa9ff" strokeWidth="1" opacity="0.07"/>
      </svg>
    </div>
  );
}