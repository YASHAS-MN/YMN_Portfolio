"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const IMG_W = 460;
const IMG_H = 580;

// Elbow leader lines — 2-segment dogleg paths in image pixel space
const HUD_LABELS = [
  {
    id: "name",
    text: "NAME: YASHAS M N",
    anchor: [268, 108] as [number, number],
    elbow:  [310,  84] as [number, number],
    end:    [480,  84] as [number, number],
    side:   "right" as const,
  },
  {
    id: "role",
    text: "ROLE: SW ENGINEER",
    anchor: [260, 152] as [number, number],
    elbow:  [310, 132] as [number, number],
    end:    [480, 132] as [number, number],
    side:   "right" as const,
  },
  {
    id: "location",
    text: "LOCATION: BENGALURU, IN",
    anchor: [150, 388] as [number, number],
    elbow:  [ 96, 412] as [number, number],
    end:    [-24, 412] as [number, number],
    side:   "left" as const,
  },
  {
    id: "status",
    text: "STATUS: OPEN_TO_WORK",
    anchor: [148, 456] as [number, number],
    elbow:  [ 96, 480] as [number, number],
    end:    [-24, 480] as [number, number],
    side:   "left" as const,
  },
];

function segLen(ax: number, ay: number, bx: number, by: number) {
  return Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
}

function HudOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {HUD_LABELS.map((item, i) => {
            const [ax, ay] = item.anchor;
            const [ex, ey] = item.elbow;
            const [lx, ly] = item.end;
            const seg1 = segLen(ax, ay, ex, ey);
            const seg2 = segLen(ex, ey, lx, ly);
            const isRight = item.side === "right";

            return (
              <g key={item.id}>
                {/* Anchor dot */}
                <motion.circle
                  cx={ax} cy={ay} r={3} fill="#9fb3c8"
                  initial={{ opacity: 0, r: 0 }}
                  animate={{ opacity: 0.85, r: 3 }}
                  transition={{ delay: i * 0.07, duration: 0.16 }}
                />
                {/* Seg 1 — diagonal */}
                <motion.line
                  x1={ax} y1={ay} x2={ex} y2={ey}
                  stroke="#9fb3c8" strokeWidth="1"
                  strokeDasharray={seg1} strokeDashoffset={seg1}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ delay: i * 0.07 + 0.06, duration: 0.22, ease: "easeOut" }}
                />
                {/* Seg 2 — horizontal run */}
                <motion.line
                  x1={ex} y1={ey} x2={lx} y2={ly}
                  stroke="#9fb3c8" strokeWidth="1"
                  strokeDasharray={seg2} strokeDashoffset={seg2}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ delay: i * 0.07 + 0.28, duration: 0.28, ease: "easeOut" }}
                />
                {/* End tick */}
                <motion.line
                  x1={lx} y1={ly - 5} x2={lx} y2={ly + 5}
                  stroke="#9fb3c8" strokeWidth="1"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.07 + 0.56, duration: 0.1 }}
                />
                {/* Label text */}
                <motion.text
                  x={isRight ? lx + 6 : lx - 6} y={ly}
                  textAnchor={isRight ? "start" : "end"}
                  dominantBaseline="middle"
                  fill="#9fb3c8"
                  fontSize={10}
                  fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
                  letterSpacing="0.05em"
                  style={{ textTransform: "uppercase" }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.07 + 0.62, duration: 0.2 }}
                >
                  {item.text}
                </motion.text>
              </g>
            );
          })}
        </motion.g>
      )}
    </AnimatePresence>
  );
}

export default function PhotoCard() {
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    /*
      overflow: visible so SVG labels that extend beyond the image bounds
      are not clipped — no padding hack needed.
    */
    <div
      className="relative select-none w-full"
      style={{ maxWidth: "500px", overflow: "visible" }}
      aria-label="Photo of Yashas M N with HUD annotations on hover"
    >
      {/* Atmospheric glow behind photo */}
      <div
        className="glow-blob"
        style={{
          width: "500px", height: "500px",
          bottom: "-60px", left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10"
        onMouseEnter={() => !prefersReducedMotion && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: "center bottom", overflow: "visible" }}
      >
        <Image
          src="/yashas-about-transparent.png"
          alt="Yashas M N — Software Engineer"
          width={IMG_W}
          height={IMG_H}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />

        {/* SVG — overflow:visible so leader labels extend beyond image bounds */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${IMG_W} ${IMG_H}`}
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          style={{ filter: "drop-shadow(0 0 3px rgba(159,179,200,0.4))" }}
          aria-hidden="true"
        >
          <HudOverlay visible={hovered} />
        </svg>
      </motion.div>
    </div>
  );
}
