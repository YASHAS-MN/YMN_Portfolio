"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { CollapsedCard, ExpandedCard } from "./ProjectCard";

const blurReveal = {
  hidden:  { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
};

export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const handleExpand = useCallback((id: string) => setExpandedId(id), []);
  const handleClose  = useCallback(() => setExpandedId(null), []);
  const expandedProject = projects.find((p) => p.id === expandedId);

  return (
    <section id="projects" className="relative section-padding" aria-labelledby="projects-heading">
      <div className="dot-grid" aria-hidden="true" />

      <div className="glow-blob" style={{
        width: "500px", height: "500px", top: "5%", right: "-80px",
        background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)",
      }} aria-hidden="true" />

      <div className="projects-container relative z-10">
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={blurReveal} transition={{ duration: 0.4 }}
          className="eyebrow" aria-hidden="true"
        >
          {"// 02 - projects"}
        </motion.p>

        <motion.h2
          id="projects-heading"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={blurReveal} transition={{ duration: 0.4, delay: 0.06 }}
          className="section-heading"
        >
          Selected Work
        </motion.h2>

        {/* Grid - 32px gap, stretch rows to equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6 xl:gap-8 items-stretch">
          {projects.map((project, i) => (
            <CollapsedCard
              key={project.id}
              project={project}
              index={i}
              onExpand={handleExpand}
            />
          ))}
        </div>
      </div>

      {/* Expanded card overlay */}
      <AnimatePresence>
        {expandedProject && (
          <>
            {/* Lighter scrim - dims, doesn't fully obscure */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Expanded card centered */}
            <div
              key="expanded"
              className="fixed inset-0 z-50 flex items-center justify-center px-6 py-8 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label={`${expandedProject.title} details`}
            >
              <ExpandedCard project={expandedProject} onClose={handleClose} />
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
