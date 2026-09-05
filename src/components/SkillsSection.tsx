"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { skillGroups } from "@/data/skills";

const BODY_FONT = "var(--font-space-grotesk), 'Space Grotesk', ui-sans-serif, system-ui, sans-serif";

const toolProjects: Record<string, string[]> = {
  Python: ["AC_IEH", "AI_MN", "CodeMarket", "Credit_Card_Fraud_Detection-AIML-", "Doctor-AI", "PrivV0", "PrivWatch", "SnapFix", "hotel_network_management", "Huffman_Coding", "n-Body"],
  "C++": ["LeetCode"],
  TypeScript: ["Kizuna", "NebulaVerse", "YMN_Portfolio"],
  JavaScript: ["Senitel"],
  Flask: ["SnapFix"],
  React: ["Kizuna", "NebulaVerse", "YMN_Portfolio"],
  "Next.js": ["NebulaVerse", "YMN_Portfolio"],
  "REST APIs": ["SnapFix", "Kizuna"],
  PostgreSQL: ["SnapFix"],
  SQLite: ["Senitel"],
  PyTorch: ["AC_IEH", "PrivWatch"],
  TensorFlow: ["AC_IEH", "SnapFix"],
  "scikit-learn": ["SnapFix", "PrivV0", "Senitel"],
  Pandas: ["AC_IEH", "PrivV0", "Senitel"],
  NumPy: ["AC_IEH", "PrivV0", "PrivWatch"],
  SUMO: ["Golden-hour"],
  TraCI: ["Golden-hour"],
  "Data Structures & Algorithms": ["LeetCode", "Huffman_Coding"],
  DBMS: ["SnapFix"],
  "Blockchain Technology": ["NebulaVerse"],
  Docker: [],
  Git: [],
  GitHub: [],
};

const blurReveal = {
  hidden:  { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
};

export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [connector, setConnector] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const skillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeSkill) return;
    const updateConnector = () => {
      const source = skillRefs.current[activeSkill];
      const card = cardRef.current;
      if (!source || !card) return;
      const sourceRect = source.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const cardIsBelow = cardRect.top > sourceRect.bottom;
      setConnector({
        x1: sourceRect.left + sourceRect.width / 2,
        y1: cardIsBelow ? sourceRect.bottom : sourceRect.top,
        x2: cardRect.left + cardRect.width / 2,
        y2: cardIsBelow ? cardRect.top : cardRect.bottom,
      });
    };
    const frame = requestAnimationFrame(updateConnector);
    window.addEventListener("resize", updateConnector);
    window.addEventListener("scroll", updateConnector, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateConnector);
      window.removeEventListener("scroll", updateConnector);
    };
  }, [activeSkill]);

  useEffect(() => {
    if (!activeSkill) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSkill(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSkill]);

  return (
    <section id="skills" className="relative section-padding" style={{ background: "rgba(5,3,8,0.6)" }} aria-labelledby="skills-heading">
      <div className="glow-blob" style={{ width:"420px", height:"420px", top:"15%", left:"-80px", background:"radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%)" }} aria-hidden="true" />
      <div className="glow-blob" style={{ width:"320px", height:"320px", bottom:"8%", right:"2%",  background:"radial-gradient(circle,rgba(79,70,229,0.07) 0%,transparent 70%)" }} aria-hidden="true" />

      <div className="site-container relative z-10">
        <motion.p initial="hidden" whileInView="visible" viewport={{ once:true }} variants={blurReveal} transition={{ duration:0.4 }} className="eyebrow" aria-hidden="true">
          {"// 01 - skills"}
        </motion.p>
        <motion.h2 id="skills-heading" initial="hidden" whileInView="visible" viewport={{ once:true }} variants={blurReveal} transition={{ duration:0.4, delay:0.06 }} className="section-heading">
          Tech Stack
        </motion.h2>

        <div className="flex flex-col gap-10 xl:gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div key={group.importAlias} initial="hidden" whileInView="visible" viewport={{ once:true, margin:"-40px" }} variants={blurReveal} transition={{ duration:0.45, delay:gi*0.07 }} className="xl:grid xl:grid-cols-[minmax(300px,0.3fr)_minmax(0,1fr)] xl:items-start xl:gap-10">
              {/* Import statement header */}
              <code className="font-mono block mb-5 xl:mb-0 break-words" style={{ fontSize:"15px" }} aria-hidden="true">
                <span style={{ color:"rgba(143,131,163,0.5)" }}>import </span>
                <span style={{ color:"rgba(143,131,163,0.5)" }}>{"{ "}</span>
                <span className="font-semibold" style={{ color:"#8b5cf6" }}>{group.importAlias}</span>
                <span style={{ color:"rgba(143,131,163,0.5)" }}>{" } from "}</span>
                <span style={{ color:"#6d28d9" }}>&#39;{group.category}&#39;</span>
              </code>

              <div className="flex flex-wrap gap-3" role="list" aria-label={`${group.category} skills`}>
                {group.skills.map((skill) => (
                  <button
                    key={skill}
                    role="listitem"
                    ref={(element) => { skillRefs.current[skill] = element; }}
                    onClick={() => setActiveSkill(skill)}
                    aria-label={`Show projects using ${skill}`}
                    style={{ fontFamily:BODY_FONT, fontSize:"16px", color:"#8f83a3" }}
                    className="skill-chip px-4 py-2.5 rounded-lg border border-[rgba(139,92,246,0.18)] bg-[rgba(5,5,8,0.85)] hover:border-[rgba(139,92,246,0.6)] hover:text-[#8b5cf6] hover:shadow-[0_0_16px_rgba(139,92,246,0.16)] transition-all duration-200 cursor-pointer select-none"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeSkill && (
          <>
            <motion.div
              className="fixed inset-0 z-40 skill-scrim"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveSkill(null)} aria-hidden="true"
            />
            <svg className="fixed inset-0 z-50 pointer-events-none skill-connector" aria-hidden="true">
              <motion.line
                x1={connector.x1} y1={connector.y1} x2={connector.x2} y2={connector.y2}
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }}
              />
            </svg>
            <motion.div
              ref={cardRef}
              className="skill-detail-card card fixed z-50"
              initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 8 }}
              role="dialog" aria-modal="true" aria-label={`${activeSkill} projects`}
            >
              <div className="flex items-center gap-3 border-b border-[rgba(139,92,246,0.16)] pb-3 mb-4">
                <span className="skill-detail-kicker">projects using</span>
                <h3>{activeSkill}</h3>
                <button onClick={() => setActiveSkill(null)} className="ml-auto p-1 text-[#8f83a3] hover:text-[#ede9f5]" aria-label="Close projects">
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
              {toolProjects[activeSkill]?.length ? (
                <ul className="skill-project-list">
                  {toolProjects[activeSkill].map((project) => <li key={project}>{project}</li>)}
                </ul>
              ) : (
                <p className="skill-project-empty">No public project mapping detected.</p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
