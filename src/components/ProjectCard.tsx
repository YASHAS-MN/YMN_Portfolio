"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";

function TagPill({ tag }: { tag: string }) {
  return (
    <span className="inline-block font-mono text-[11px] uppercase tracking-wider px-2.5 py-1.5 rounded-md border border-[rgba(139,92,246,0.2)] text-[#8f83a3] bg-[rgba(5,5,8,0.85)] hover:border-[rgba(139,92,246,0.6)] hover:text-[#8b5cf6] transition-all duration-200 cursor-default">
      {tag}
    </span>
  );
}

const REPO_SLUG: Record<string, string> = {
  sentinel:      "Senitel",
  snapfix:       "SnapFix",
  nebulaverse:   "NebulaVerse",
  "golden-hour": "Golden-hour",
  privwatch:     "PrivWatch",
};

// ─── Collapsed card — grid view ───────────────────────────────────────────────
interface CollapsedCardProps {
  project: Project;
  index: number;
  onExpand: (id: string) => void;
}

export function CollapsedCard({ project, index, onExpand }: CollapsedCardProps) {
  return (
    <motion.article
      layoutId={`proj-${project.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onExpand(project.id)}
      className="card group flex flex-col cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]"
      style={{ minHeight: "220px" }}
      aria-label={`${project.title} — click to expand`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onExpand(project.id); }
      }}
    >
      <span className="card-corner card-corner-bl" aria-hidden="true" />
      <span className="card-corner card-corner-br" aria-hidden="true" />

      {/* Tab bar */}
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[rgba(139,92,246,0.1)]">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-[rgba(139,92,246,0.5)]" />
          <span className="w-2 h-2 rounded-full bg-[rgba(109,40,217,0.5)]" />
          <span className="w-2 h-2 rounded-full bg-[rgba(79,70,229,0.5)]" />
        </div>
        <span className="ml-2 font-mono text-[11px] text-[#8f83a3] group-hover:text-[#8b5cf6] transition-colors duration-200">
          {project.filename}
        </span>
      </div>

      {/* Collapsed: ONLY title + one-line tagline */}
      <div className="flex flex-col flex-1 gap-3">
        <h3
          className="font-light uppercase tracking-[0.07em] text-[#ede9f5] group-hover:text-[#8b5cf6] transition-colors duration-200"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
        >
          {project.title}
        </h3>

        <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#8f83a3" }}>
          {project.tagline}
        </p>

        <div className="flex-1" />

        <div className="flex items-center gap-1.5 pt-3 border-t border-[rgba(139,92,246,0.06)]">
          <span className="font-mono text-[10px] text-[#8f83a3]/35 uppercase tracking-widest group-hover:text-[#8b5cf6]/50 transition-colors">
            click to expand
          </span>
          <span className="text-[#8b5cf6]/25 group-hover:text-[#8b5cf6]/50 transition-colors" aria-hidden="true">›</span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Expanded card — full detail modal ────────────────────────────────────────
interface ExpandedCardProps {
  project: Project;
  onClose: () => void;
}

export function ExpandedCard({ project, onClose }: ExpandedCardProps) {
  const [showScan,    setShowScan]    = useState(true);
  // detailReady uses setTimeout so detail content fades in AFTER the resize animation
  const [detailReady, setDetailReady] = useState(false);

  useEffect(() => {
    // Hide scan line after it animates
    const t1 = setTimeout(() => setShowScan(false), 420);
    // Show detail content 380ms in — after spring resize settles
    const t2 = setTimeout(() => setDetailReady(true), 380);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <motion.div
      layoutId={`proj-${project.id}`}
      className="card relative w-full max-w-2xl"
      style={{ cursor: "default", overflow: "hidden" }}
      transition={{ type: "spring", damping: 32, stiffness: 300 }}
    >
      {/* Scan-line sweep */}
      {showScan && <div className="scan-sweep" aria-hidden="true" />}

      <span className="card-corner card-corner-bl" aria-hidden="true" />
      <span className="card-corner card-corner-br" aria-hidden="true" />

      {/* Tab bar */}
      <div className="flex items-center gap-2 pb-4 mb-5 border-b border-[rgba(139,92,246,0.15)]">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[rgba(139,92,246,0.5)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[rgba(109,40,217,0.5)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[rgba(79,70,229,0.5)]" />
        </div>
        <span className="ml-2 font-mono text-xs text-[#8b5cf6]">{project.filename}</span>
        <span className="ml-auto font-mono text-[10px] text-[#8f83a3]/50 uppercase tracking-widest">{project.role}</span>
        <button
          onClick={onClose}
          className="ml-4 p-1.5 rounded text-[#8f83a3] hover:text-[#ede9f5] hover:bg-[rgba(139,92,246,0.15)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]"
          aria-label="Close"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Title + tagline — always visible (part of collapsed→expanded morph) */}
      <h3
        className="font-light uppercase tracking-[0.07em] text-[#ede9f5] mb-2"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
      >
        {project.title}
      </h3>
      <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#8f83a3", marginBottom: "1.25rem" }}>
        {project.tagline}
      </p>

      {/* ── Detail content — fades in 380ms after card resize animation ── */}
      <AnimatePresence>
        {detailReady && (
          <motion.div
            key="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[rgba(139,92,246,0.12)] pt-5 flex flex-col gap-5"
          >
            {/* Full multi-sentence description */}
            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#8f83a3" }}>
              {project.description}
            </p>

            {/* Bullet points with → */}
            <ul className="flex flex-col gap-3" aria-label="Key features">
              {project.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#8b5cf6] font-mono mt-0.5 flex-shrink-0" style={{ fontSize: "14px" }} aria-hidden="true">→</span>
                  <span style={{ fontSize: "15px", lineHeight: 1.65, color: "#8f83a3" }}>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* All tags */}
            <div className="flex flex-wrap gap-2" aria-label="Technologies">
              {project.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
            </div>

            {/* GitHub link */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[13px] text-[#8b5cf6]/70 hover:text-[#8b5cf6] transition-colors duration-200 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded"
              aria-label={`View ${project.title} on GitHub`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              github.com/YASHAS-MN/{REPO_SLUG[project.id] ?? project.id}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
