"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

const navItems = [
  { label: "~/home",     href: "#home"     },
  { label: "~/projects", href: "#projects" },
  { label: "~/skills",   href: "#skills"   },
  { label: "~/about",    href: "#about"    },
  { label: "~/contact",  href: "#contact"  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050308]/90 border-b border-[#241633] backdrop-blur-md"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="site-container">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => go(e, "#home")}
            className="font-mono font-semibold text-[#8b5cf6] tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded"
            aria-label="Go to top"
          >
            YMN<span className="text-[#8f83a3]">.dev</span>
          </a>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => go(e, item.href)}
                  className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#8f83a3] hover:text-[#8b5cf6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] rounded px-1"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Resume */}
          <a
            href="/resume.pdf"
            download="YashasMN_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#8b5cf6]/60 text-[#8b5cf6] font-mono text-xs uppercase tracking-wider hover:bg-[#8b5cf6]/10 hover:border-[#8b5cf6] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6]"
            aria-label="Download resume PDF"
          >
            <Download size={13} aria-hidden="true" />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
