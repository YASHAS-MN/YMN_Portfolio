"use client";

import { useEffect, useState, useRef } from "react";
import CursorGlow from "./CursorGlow";

const FULL_NAME = "Yashas M N";
const CHAR_DELAYS = [65, 95, 50, 115, 60, 75, 85, 55, 70, 80];

type Phase = "void" | "typing" | "idle";

export default function Hero() {
  const [phase,      setPhase]      = useState<Phase>("void");
  const [charCount,  setCharCount]  = useState(0);
  const [cursorVis,  setCursorVis]  = useState(true);
  const [nameHovered, setNameHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetPoint = useRef({ x: 0, y: 0 });
  const currentPoint = useRef({ x: 0, y: 0 });

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // 800ms void → typing
  useEffect(() => {
    if (prefersReducedMotion) {
      timer.current = setTimeout(() => {
        setCharCount(FULL_NAME.length);
        setPhase("idle");
      }, 0);
      return () => { if (timer.current) clearTimeout(timer.current); };
    }
    timer.current = setTimeout(() => setPhase("typing"), 800);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [prefersReducedMotion]);

  // Character-by-character typing
  useEffect(() => {
    if (phase !== "typing") return;
    if (charCount >= FULL_NAME.length) {
      timer.current = setTimeout(() => setPhase("idle"), 0);
      return () => { if (timer.current) clearTimeout(timer.current); };
    }
    const delay = CHAR_DELAYS[charCount % CHAR_DELAYS.length];
    timer.current = setTimeout(() => setCharCount((c) => c + 1), delay);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [phase, charCount]);

  // Blinking cursor at idle
  useEffect(() => {
    if (phase !== "idle") return;
    const id = setInterval(() => setCursorVis((v) => !v), 520);
    return () => clearInterval(id);
  }, [phase]);

  const displayName = FULL_NAME.slice(0, charCount);
  const canAnimateName = displayName.length > 0 && !prefersReducedMotion;

  const renderHoverFrame = () => {
    if (!nameRef.current) {
      frameRef.current = null;
      return;
    }

    currentPoint.current.x += (targetPoint.current.x - currentPoint.current.x) * 0.22;
    currentPoint.current.y += (targetPoint.current.y - currentPoint.current.y) * 0.22;

    nameRef.current.style.setProperty("--name-hover-x", `${currentPoint.current.x}px`);
    nameRef.current.style.setProperty("--name-hover-y", `${currentPoint.current.y}px`);

    const dx = Math.abs(targetPoint.current.x - currentPoint.current.x);
    const dy = Math.abs(targetPoint.current.y - currentPoint.current.y);
    if (dx > 0.2 || dy > 0.2) {
      frameRef.current = requestAnimationFrame(renderHoverFrame);
    } else {
      frameRef.current = null;
    }
  };

  const handleNamePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!canAnimateName || !nameRef.current) return;

    const rect = nameRef.current.getBoundingClientRect();
    targetPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (!nameHovered) {
      currentPoint.current = targetPoint.current;
      nameRef.current.style.setProperty("--name-hover-x", `${targetPoint.current.x}px`);
      nameRef.current.style.setProperty("--name-hover-y", `${targetPoint.current.y}px`);
    }

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(renderHoverFrame);
    }

    if (!nameHovered) setNameHovered(true);
  };

  const handleNamePointerLeave = () => {
    setNameHovered(false);
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  };

  return (
    <section
      id="home"
      className="scanlines relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="dot-grid" aria-hidden="true" />
      <CursorGlow />
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <filter id="hero-text-warp" x="-18%" y="-35%" width="136%" height="170%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014 0.042" numOctaves="2" seed="7" result="noise">
              <animate attributeName="baseFrequency" values="0.014 0.042;0.026 0.052;0.014 0.042" dur="1.8s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Ambient void glow */}
      <div
        className="glow-blob"
        style={{ width: "700px", height: "700px", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Terminal prompt */}
        {phase !== "idle" && (
          <div className="mb-4 font-mono text-[#8f83a3]" style={{ fontSize: "16px", letterSpacing: "0.08em" }} aria-hidden="true">
            {phase === "void" ? "> _" : "> whoami"}
          </div>
        )}

        {/* ── THE NAME ── */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(4rem, 12vw, 10rem)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ede9f5",
            lineHeight: 1,
            cursor: phase === "idle" ? "default" : "default",
          }}
          aria-label={FULL_NAME}
        >
          <span
            ref={nameRef}
            className={`hero-name-text ${nameHovered ? "is-hovered" : ""}`}
            data-text={displayName}
            onPointerMove={handleNamePointerMove}
            onPointerLeave={handleNamePointerLeave}
            aria-hidden="true"
          >
            {displayName}
          </span>

          {/* Blinking block cursor */}
          {(phase === "typing" || phase === "idle") && (
            <span
              aria-hidden="true"
              className="hero-typing-cursor"
              style={{
                opacity: phase === "typing" || cursorVis ? 1 : 0,
              }}
            />
          )}
        </h1>

        {/* Minimal scroll cue */}
        {phase === "idle" && (
          <div className="mt-20" aria-hidden="true">
            <div style={{ width: "1px", height: "64px", background: "linear-gradient(to bottom, rgba(139,92,246,0.4), transparent)", margin: "0 auto" }} />
            <p className="font-mono mt-3" style={{ fontSize: "11px", color: "rgba(139,92,246,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>scroll</p>
          </div>
        )}
      </div>
    </section>
  );
}
