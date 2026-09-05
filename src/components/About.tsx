"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mail, ArrowRight, Download } from "lucide-react";
import { GraduationCap, Award, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

// --- Font shorthand - stops repeating this long string -----------------------
const BODY_FONT = "var(--font-space-grotesk), 'Space Grotesk', ui-sans-serif, system-ui, sans-serif";

// --- Data --------------------------------------------------------------------
const certifications = [
  "NPTEL - Data Science for Engineers",
  "NPTEL - Knowledge Management",
  "HackerRank - Software Engineering",
  "HackerRank - SQL Intermediate",
];

const blurReveal = {
  hidden:  { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
};

// --- HUD annotations ---------------------------------------------------------
const IMG_W = 1089;
const IMG_H = 1445;

const HUD_LABELS = [
  { id: "name",     text: "NAME: YASHAS M N",          anchor: [635,269] as [number,number], elbow: [700,194] as [number,number], end: [760,194] as [number,number], side: "right" as const },
  { id: "degree",   text: "B.E. CSE - CYBER SECURITY", anchor: [604,386] as [number,number], elbow: [700,309] as [number,number], end: [760,309] as [number,number], side: "right" as const },
  { id: "cgpa",     text: "CGPA: 8.74 / 10.0",         anchor: [627,498] as [number,number], elbow: [700,429] as [number,number], end: [760,429] as [number,number], side: "right" as const },
  { id: "location", text: "BENGALURU, IN",             anchor: [355,972] as [number,number], elbow: [300,1046] as [number,number], end: [260,1046] as [number,number], side: "left"  as const },
  { id: "status",   text: "OPEN TO WORK",              anchor: [350,1146] as [number,number], elbow: [300,1221] as [number,number], end: [260,1221] as [number,number], side: "left"  as const },
];

function segLen(ax: number, ay: number, bx: number, by: number) {
  return Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
}

function HudAnnotations({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {HUD_LABELS.map((item, i) => {
            const [ax, ay] = item.anchor;
            const [ex, ey] = item.elbow;
            const [lx, ly] = item.end;
            const s1 = segLen(ax, ay, ex, ey);
            const s2 = segLen(ex, ey, lx, ly);
            const isRight = item.side === "right";
            return (
              <g key={item.id}>
                <motion.circle cx={ax} cy={ay} r={7} fill="#66717f"
                  initial={{ r:0, opacity:0 }} animate={{ r:7, opacity:0.95 }}
                  transition={{ delay: i*0.06, duration: 0.15 }} />
                <motion.line x1={ax} y1={ay} x2={ex} y2={ey}
                  stroke="#66717f" strokeWidth="3"
                  strokeDasharray={s1} strokeDashoffset={s1}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ delay: i*0.06+0.05, duration: 0.2, ease:"easeOut" }} />
                <motion.line x1={ex} y1={ey} x2={lx} y2={ly}
                  stroke="#66717f" strokeWidth="3"
                  strokeDasharray={s2} strokeDashoffset={s2}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ delay: i*0.06+0.25, duration: 0.3, ease:"easeOut" }} />
                <motion.line x1={lx} y1={ly-14} x2={lx} y2={ly+14}
                  stroke="#66717f" strokeWidth="3"
                  initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ delay: i*0.06+0.55, duration:0.1 }} />
                <motion.text
                  x={isRight ? lx+10 : lx-10} y={ly}
                  textAnchor={isRight ? "start" : "end"}
                  dominantBaseline="middle"
                  fill="#74808f"
                  fontSize={34}
                  fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
                  letterSpacing="0.06em"
                  style={{ textTransform: "uppercase" }}
                  initial={{ opacity:0 }} animate={{ opacity:1 }}
                  transition={{ delay: i*0.06+0.62, duration:0.2 }}
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

// --- Photo with zoom-out + blur background on hover --------------------------
interface PhotoProps { onHoverChange: (v: boolean) => void }

function PhotoWithHUD({ onHoverChange }: PhotoProps) {
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => { setHovered(true);  onHoverChange(true);  };
  const handleLeave = () => { setHovered(false); onHoverChange(false); };

  return (
    <div className="relative" style={{ overflow: "visible" }}>
      {/* Atmospheric glow */}
      <div className="glow-blob" style={{ width:"500px", height:"500px", bottom:"-60px", left:"50%", transform:"translateX(-50%)", background:"radial-gradient(circle,rgba(139,92,246,0.22) 0%,transparent 60%)", zIndex:0 }} aria-hidden="true" />

      <motion.div
      className="about-photo-stage"
      style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"520px", overflow:"visible", transformOrigin:"center center" }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        animate={{ scale: hovered ? 1.04 : 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src="/yashas-about-transparent.png"
          alt="Yashas M N - Software Engineer"
          width={IMG_W}
          height={IMG_H}
          className="w-full h-auto object-contain drop-shadow-2xl"
          priority
        />
        <svg
          className="about-hud absolute inset-0 w-full h-full"
          viewBox={`0 0 ${IMG_W} ${IMG_H}`}
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          style={{ filter:"none" }}
          aria-hidden="true"
        >
          <HudAnnotations visible={hovered} />
        </svg>
      </motion.div>
    </div>
  );
}

// --- Main About section -------------------------------------------------------
export default function About() {
  const [photoHovered, setPhotoHovered] = useState(false);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="relative section-padding" aria-labelledby="about-heading">
      <div className="dot-grid" aria-hidden="true" />

      <div className="glow-blob" style={{ width:"500px", height:"500px", top:"0%", right:"-60px", background:"radial-gradient(circle,rgba(139,92,246,0.07) 0%,transparent 70%)" }} aria-hidden="true" />
      <div className="glow-blob" style={{ width:"400px", height:"400px", bottom:"5%", left:"-60px", background:"radial-gradient(circle,rgba(79,70,229,0.06) 0%,transparent 70%)" }} aria-hidden="true" />

      {/* Blur scrim when photo is hovered - same as projects expand */}
      <AnimatePresence>
        {photoHovered && (
          <motion.div
            key="photo-scrim"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            transition={{ duration: 0.25 }}
            style={{ position:"fixed", inset:0, zIndex:30, background:"rgba(0,0,0,0.46)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)", pointerEvents:"none" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="site-container relative">
        <motion.p initial="hidden" whileInView="visible" viewport={{ once:true }} variants={blurReveal} transition={{ duration:0.4 }} className="eyebrow" aria-hidden="true">
          {"// 00 - about"}
        </motion.p>
        <motion.h2 id="about-heading" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={blurReveal} transition={{ duration:0.4, delay:0.06 }} className="section-heading">
          About Me
        </motion.h2>

        {/* -- Photo LEFT (large) | Bio RIGHT -- */}
        <div className="about-layout grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,0.95fr)] gap-12 xl:gap-20 items-center mb-24" style={{ overflow:"visible" }}>

          {/* Photo - LEFT, naturally large */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once:true }}
            variants={blurReveal} transition={{ duration:0.6 }}
            className="about-photo-column flex justify-center lg:justify-end min-w-0"
            style={{ overflow:"visible", position:"relative", zIndex: photoHovered ? 40 : 1 }}
          >
            <PhotoWithHUD onHoverChange={setPhotoHovered} />
          </motion.div>

          {/* Bio - RIGHT */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once:true }}
            variants={blurReveal} transition={{ duration:0.5, delay:0.1 }}
            className="flex flex-col gap-7 max-w-[740px] min-w-0"
            style={{ transition:"filter 0.3s ease, opacity 0.3s ease", filter: photoHovered ? "blur(4px)" : "none", opacity: photoHovered ? 0.5 : 1 }}
          >
            <p style={{ fontSize:"18px", lineHeight:1.7, color:"#8f83a3" }}>
              I am an engineering student pursuing my{" "}
              <span style={{ color:"#ede9f5" }}>B.E. in Computer Science and Engineering - Cyber Security</span>{" "}
              at <span style={{ color:"#8b5cf6" }}>R.V. College of Engineering, Bengaluru</span>.
              My interests are spread across{" "}
              <span style={{ color:"#ede9f5" }}>AI, machine learning, cyber security, software engineering, system design, databases, networks, and operating systems</span>.
            </p>
            <p style={{ fontSize:"18px", lineHeight:1.7, color:"#8f83a3" }}>
              I have worked on projects that deepen my understanding of these disciplines and help me connect theory
              with real implementation. Each build has shaped how I think about designing, securing, scaling, and
              maintaining systems beyond the prototype stage.
            </p>
            <p style={{ fontSize:"18px", lineHeight:1.7, color:"#8f83a3" }}>
              What keeps me coding late into the night is the drive to build something that actually matters. In a
              tech-centric world, I care about making information and data control more efficient, tackling existing
              hurdles with practical solutions, and choosing the right approach for the problem. More than just writing
              code, I see myself as a{" "}
              <span style={{ color:"#ede9f5" }}>problem identifier, solution architect, and maintainer of reliable systems</span>.
            </p>

            <div className="flex flex-wrap gap-4 items-center pt-2">
              <a href="#projects" onClick={(e) => go(e, "#projects")} className="about-action-btn about-action-btn-primary group" id="about-view-projects">
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </a>
              <a href="/resume.pdf" download="YashasMN_Resume.pdf" className="about-action-btn about-action-btn-secondary" id="about-resume">
                <Download size={16} aria-hidden="true" />
                Resume
              </a>
              <div className="flex items-center gap-3">
                {[
                  { href:"https://github.com/YASHAS-MN",     label:"GitHub",   icon:<GithubIcon size={18} />   },
                  { href:"https://linkedin.com/in/yashas-mn", label:"LinkedIn", icon:<LinkedinIcon size={18} /> },
                  { href:"mailto:yashasmn.cy23@rvce.edu.in",  label:"Email",    icon:<Mail size={18} />         },
                ].map(({ href, label, icon }) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-2 rounded-lg border border-[rgba(139,92,246,0.25)] text-[#8f83a3] hover:text-[#8b5cf6] hover:border-[rgba(139,92,246,0.6)] hover:bg-[rgba(139,92,246,0.08)] transition-all duration-200"
                    aria-label={label}>{icon}</a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* -- Info cards row -- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8"
          style={{ transition:"filter 0.3s ease, opacity 0.3s ease", filter: photoHovered ? "blur(4px)" : "none", opacity: photoHovered ? 0.5 : 1 }}
        >
          {/* Education */}
          <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={blurReveal} transition={{ duration:0.4 }}>
            <span className="card-corner card-corner-bl" aria-hidden="true" />
            <span className="card-corner card-corner-br" aria-hidden="true" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[rgba(139,92,246,0.12)]"><GraduationCap size={18} className="text-[#8b5cf6]" aria-hidden="true" /></div>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:300, fontSize:"13px", letterSpacing:"0.07em", textTransform:"uppercase", color:"#ede9f5" }}>Education</h3>
            </div>
            <p className="font-mono" style={{ fontSize:"16px", color:"#ede9f5" }}>B.E. CSE (Cyber Security)</p>
            <p style={{ fontFamily:BODY_FONT, fontSize:"15px", color:"#8f83a3", marginTop:"4px" }}>R.V. College of Engineering, Bengaluru</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono" style={{ fontSize:"14px", color:"#8f83a3" }}>CGPA:</span>
              <span className="font-mono font-semibold" style={{ fontSize:"16px", color:"#8b5cf6" }}>8.74</span>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={blurReveal} transition={{ duration:0.4, delay:0.08 }}>
            <span className="card-corner card-corner-bl" aria-hidden="true" />
            <span className="card-corner card-corner-br" aria-hidden="true" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[rgba(139,92,246,0.12)]"><Award size={18} className="text-[#8b5cf6]" aria-hidden="true" /></div>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:300, fontSize:"13px", letterSpacing:"0.07em", textTransform:"uppercase", color:"#ede9f5" }}>Certifications</h3>
            </div>
            <ul className="flex flex-col gap-2.5" aria-label="Certifications">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2" style={{ fontFamily:BODY_FONT, fontSize:"15px", lineHeight:1.6, color:"#8f83a3" }}>
                  <span className="text-[#8b5cf6] font-mono mt-0.5 flex-shrink-0" aria-hidden="true">&gt;</span>{cert}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Beyond code */}
          <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={blurReveal} transition={{ duration:0.4, delay:0.16 }}>
            <span className="card-corner card-corner-bl" aria-hidden="true" />
            <span className="card-corner card-corner-br" aria-hidden="true" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[rgba(139,92,246,0.12)]"><Heart size={18} className="text-[#8b5cf6]" aria-hidden="true" /></div>
              <h3 style={{ fontFamily:"var(--font-display)", fontWeight:300, fontSize:"13px", letterSpacing:"0.07em", textTransform:"uppercase", color:"#ede9f5" }}>Beyond Code</h3>
            </div>
            <ul className="flex flex-col gap-2.5" aria-label="Extracurricular">
              <li className="flex items-start gap-2" style={{ fontFamily:BODY_FONT, fontSize:"15px", lineHeight:1.6, color:"#8f83a3" }}>
                <span className="text-[#8b5cf6] font-mono mt-0.5 flex-shrink-0" aria-hidden="true">&gt;</span>
                C2C Program Lead - educational outreach to rural government schools
              </li>
              <li className="flex items-start gap-2" style={{ fontFamily:BODY_FONT, fontSize:"15px", lineHeight:1.6, color:"#8f83a3" }}>
                <span className="text-[#8b5cf6] font-mono mt-0.5 flex-shrink-0" aria-hidden="true">&gt;</span>
                PR Head at Kannada CARV
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
