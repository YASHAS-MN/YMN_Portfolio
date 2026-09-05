"use client";

import { useEffect, useState } from "react";
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

function SkillDetailCard({ skill, onClose }: { skill: string; onClose: () => void }) {
  return (
    <div className="skill-detail-anchor">
      <motion.div
        className="skill-detail-card card"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        role="dialog"
        aria-modal="true"
        aria-label={`${skill} projects`}
      >
        <div className="flex items-center gap-3 border-b border-[rgba(139,92,246,0.16)] pb-3 mb-4">
          <span className="skill-detail-kicker">projects using</span>
          <h3>{skill}</h3>
          <button onClick={onClose} className="ml-auto p-1 text-[#8f83a3] hover:text-[#ede9f5]" aria-label="Close projects">
            <X size={17} aria-hidden="true" />
          </button>
        </div>
        {toolProjects[skill]?.length ? (
          <ul className="skill-project-list">
            {toolProjects[skill].map((project) => <li key={project}>{project}</li>)}
          </ul>
        ) : (
          <p className="skill-project-empty">No public project mapping detected.</p>
        )}
      </motion.div>
    </div>
  );
}

export default function SkillsSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleSkillClick = (skill: string) => {
    setActiveSkill(skill);
  };

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
                  <span key={skill} className="skill-chip-anchor">
                    <button
                      role="listitem"
                      onClick={() => handleSkillClick(skill)}
                      aria-label={`Show projects using ${skill}`}
                      style={{ fontFamily:BODY_FONT, fontSize:"16px", color:"#8f83a3" }}
                      className="skill-chip px-4 py-2.5 rounded-lg border border-[rgba(139,92,246,0.18)] bg-[rgba(5,5,8,0.85)] hover:border-[rgba(139,92,246,0.6)] hover:text-[#8b5cf6] hover:shadow-[0_0_16px_rgba(139,92,246,0.16)] transition-all duration-200 cursor-pointer select-none"
                    >
                      {skill}
                    </button>
                    {activeSkill === skill && <SkillDetailCard skill={skill} onClose={() => setActiveSkill(null)} />}
                  </span>
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
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
