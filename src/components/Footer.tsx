"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";

const EMAIL = "yashasmn.cy23@rvce.edu.in";

const blurReveal = {
  hidden:  { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)" },
};

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  };

  return (
    <footer
      id="contact"
      className="relative section-padding border-t border-[rgba(139,92,246,0.1)]"
      style={{ background: "rgba(5,3,8,0.85)" }}
      aria-labelledby="contact-heading"
    >
      {/* Large centred glow behind the heading */}
      <div className="glow-blob" style={{
        width: "700px", height: "450px",
        top: "0%", left: "50%",
        transform: "translateX(-50%)",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.13) 0%, transparent 60%)",
      }} aria-hidden="true" />

      <div className="site-container relative z-10">
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={blurReveal} transition={{ duration: 0.4 }}
          className="eyebrow" aria-hidden="true"
        >
          {"// 03 - contact"}
        </motion.p>

        {/* Terminal heading */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={blurReveal} transition={{ duration: 0.4, delay: 0.06 }}
          className="mb-6"
        >
          <h2
            id="contact-heading"
            className="font-light uppercase leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
              letterSpacing: "0.06em",
              color: "#ede9f5",
            }}
          >
            <span className="text-[#8b5cf6]">yashas@portfolio</span>
            <span className="text-[#8f83a3]"> ~ % </span>
            <span style={{
              background: "linear-gradient(90deg, #8b5cf6, #4f46e5)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              let&#39;s talk
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(360px,0.42fr)_1fr] gap-10 xl:gap-16 items-start mb-16">
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={blurReveal} transition={{ duration: 0.4, delay: 0.12 }}
            className="text-[#8f83a3] text-base leading-relaxed max-w-xl"
          >
            Open to interesting problems, collaborations, and conversations. Drop me a line.
          </motion.p>

          {/* Contact links */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={blurReveal} transition={{ duration: 0.4, delay: 0.18 }}
            className="flex flex-col lg:flex-row flex-wrap gap-6 xl:gap-8 items-start lg:items-center xl:justify-end"
          >
          {/* Email + copy */}
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-2 font-mono text-sm text-[#8f83a3] hover:text-[#8b5cf6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded px-1"
              id="contact-email" aria-label="Send email to Yashas"
            >
              <Mail size={15} aria-hidden="true" />
              {EMAIL}
            </a>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded text-[#8f83a3] hover:text-[#8b5cf6] hover:bg-[rgba(139,92,246,0.1)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]"
              aria-label={copied ? "Email copied!" : "Copy email address"}
            >
              {copied ? <Check size={13} className="text-[#8b5cf6]" aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
            </button>
            {copied && <span className="font-mono text-xs text-[#8b5cf6]" role="status">copied!</span>}
          </div>

          <span className="hidden sm:block text-[rgba(139,92,246,0.2)]" aria-hidden="true">|</span>

          <a
            href="https://linkedin.com/in/yashas-mn"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm text-[#8f83a3] hover:text-[#8b5cf6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded px-1"
            id="contact-linkedin" aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={15} /> linkedin.com/in/yashas-mn
          </a>

          <span className="hidden sm:block text-[rgba(139,92,246,0.2)]" aria-hidden="true">|</span>

          <a
            href="https://github.com/YASHAS-MN"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm text-[#8f83a3] hover:text-[#8b5cf6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded px-1"
            id="contact-github" aria-label="GitHub profile"
          >
            <GithubIcon size={15} /> github.com/YASHAS-MN
          </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[rgba(139,92,246,0.08)]">
          <span className="font-mono text-xs text-[#8f83a3]/40">&copy; 2024 Yashas M N. Built with Next.js</span>
          <span className="font-mono text-xs text-[#8f83a3]/25">{"> "}exit 0</span>
        </div>
      </div>
    </footer>
  );
}
