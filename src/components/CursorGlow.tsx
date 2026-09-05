"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      const rect = glowRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.09) 0%, transparent 65%)`;
    };

    const hero = glowRef.current?.parentElement;
    hero?.addEventListener("mousemove", handleMouseMove);
    return () => hero?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none absolute inset-0 z-0 transition-all duration-300"
      aria-hidden="true"
    />
  );
}
