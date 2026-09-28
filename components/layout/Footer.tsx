"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUp, Plus, Check } from "lucide-react";
import DualAsciiHands, { DualAsciiHandsRef, AsciiTheme } from "@/components/ui/DualAsciiHands";

export default function Footer() {
  const handsRef = useRef<DualAsciiHandsRef>(null);
  const [currentTheme, setCurrentTheme] = useState<AsciiTheme>("copper");
  const [gridActive, setGridActive] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setName("");
      setEmail("");
    }, 2000);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#0c0c0c] text-white pt-24 pb-8 overflow-hidden select-none">
      {/* TOP COLOPHON & DIRECTORY (Good-Fella 3-Column Layout) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* COLUMN 1 (LEFT, 5 Cols): Future Updates Form & Status Indicators */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <h3 className="font-sans text-base font-normal tracking-tight text-white/90">
              Don&apos;t miss out on future updates.
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 max-w-sm">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full bg-[#1c1c1c] border border-white/10 rounded-[3px] px-3.5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none transition-colors"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-[#1c1c1c] border border-white/10 rounded-[3px] px-3.5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none transition-colors"
              />

              <div className="flex items-center gap-2 mt-0.5">
                <button
                  type="submit"
                  className="flex-1 bg-white hover:bg-[#ff6b4a] hover:text-white text-black font-mono font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-[3px] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>SUBSCRIBED</span>
                    </>
                  ) : (
                    <span>SUBSCRIBE</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handsRef.current?.cycleTheme()}
                  aria-label="Toggle theme or add action"
                  className="w-11 h-11 bg-[#1c1c1c] border border-white/10 text-white/80 hover:text-white hover:border-white/30 rounded-[3px] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="font-mono text-xs text-white/35 mt-0.5">
                Unsubscribe anytime.
              </span>
            </form>

            {/* Recruitment / Cohort Status Indicators with square bullet marks */}
            <div className="flex flex-col gap-2 pt-2 font-mono text-xs text-white/70">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-[1px] bg-[#ff4d29] shrink-0 shadow-[0_0_8px_rgba(255,77,41,0.7)]" />
                <span className="uppercase tracking-wider">
                  ACCEPTING RESEARCHERS. JOIN THE COHORT.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-[1px] bg-[#ff4d29] shrink-0 shadow-[0_0_8px_rgba(255,77,41,0.7)]" />
                <span className="uppercase tracking-wider">
                  ONLY 4 LAB FELLOWSHIPS AVAILABLE
                </span>
              </div>
            </div>
          </div>

          {/* COLUMN 2 (CENTER, 3 Cols): Clean Monospace Navigation Column */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-3.5 font-mono text-xs sm:text-sm uppercase tracking-wider text-white/70">
            <Link
              href="#manifesto"
              className="hover:text-white transition-colors w-fit"
            >
              MANIFESTO
            </Link>
            <Link
              href="#works"
              className="hover:text-white transition-colors w-fit"
            >
              SELECTED WORKS
            </Link>
            <Link
              href="#reveal"
              className="hover:text-white transition-colors w-fit"
            >
              IDEOLOGY
            </Link>
            <Link
              href="#tracks"
              className="hover:text-white transition-colors w-fit"
            >
              TRACKS
            </Link>
            <Link
              href="#membership"
              className="hover:text-white transition-colors w-fit"
            >
              MEMBERSHIP
            </Link>
            <Link
              href="#faq"
              className="hover:text-white transition-colors w-fit"
            >
              PROTOCOL FAQ
            </Link>
          </div>

          {/* COLUMN 3 (RIGHT, 4 Cols): Contact Links, Legal Notices & Interactive Keys */}
          <div className="md:col-span-4 flex flex-col gap-5 text-sm">
            {/* Direct Email Lines */}
            <div className="flex flex-col gap-1.5 font-sans">
              <a
                href="mailto:ieee.cs@mbits.ac.in"
                className="text-white/70 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 w-fit"
              >
                ieee.cs@mbits.ac.in
              </a>
              <a
                href="mailto:chair.cs@mbits.ac.in"
                className="text-white/70 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 w-fit"
              >
                chair.cs@mbits.ac.in
              </a>
              <a
                href="mailto:research.cs@mbits.ac.in"
                className="text-white/70 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 w-fit"
              >
                research.cs@mbits.ac.in
              </a>
            </div>

            {/* Legal / Policy Links */}
            <div className="flex flex-col gap-1 text-xs text-white/50">
              <a
                href="https://www.ieee.org/about/help/security-privacy.html"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors underline decoration-white/10 underline-offset-2 w-fit"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.ieee.org/about/corporate/governance/p9-26.html"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors underline decoration-white/10 underline-offset-2 w-fit"
              >
                Legal Notice & Ethics
              </a>
            </div>

            {/* Interactive Keyboard Shortcuts / Action Toggles (Good-Fella Signature) */}
            <div className="flex flex-col gap-2 pt-2">
              {/* Grid Toggle */}
              <button
                type="button"
                onClick={() => handsRef.current?.toggleGrid()}
                className="flex items-center gap-2.5 font-mono text-xs text-white/40 hover:text-white/80 transition-colors cursor-pointer text-left w-fit group"
              >
                <span className="px-1.5 py-0.5 rounded-[2px] bg-white/10 text-white/70 text-[10px] tracking-tight group-hover:bg-white/20 transition-colors">
                  ⌘G
                </span>
                <span className={gridActive ? "text-lime" : ""}>
                  grid {gridActive ? "(active)" : ""}
                </span>
              </button>

              {/* Theme / Color Cycle */}
              <button
                type="button"
                onClick={() => handsRef.current?.cycleTheme()}
                className="flex items-center gap-2.5 font-mono text-xs text-white/40 hover:text-white/80 transition-colors cursor-pointer text-left w-fit group"
              >
                <span className="px-1.5 py-0.5 rounded-[2px] bg-white/10 text-white/70 text-[10px] tracking-tight group-hover:bg-white/20 transition-colors">
                  C
                </span>
                <span>
                  change color{" "}
                  <span className="text-white/60">({currentTheme})</span>
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MIDDLE SECTION: DUAL ASCII HANDS CONVERGENCE STAGE + WATERMARK */}
      <div className="w-full relative mt-2">
        <DualAsciiHands
          ref={handsRef}
          leftHandSrc="/assets/hands/lefthand.png"
          rightHandSrc="/assets/hands/righthand.png"
          initialTheme="copper"
          onThemeChange={setCurrentTheme}
          onGridChange={setGridActive}
        />
      </div>

      {/* BOTTOM UTILITY BAR */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span>MBITS CHAPTER #14591</span>
          <span>•</span>
          <span>KERALA, INDIA</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-lime hover:text-lime transition-all duration-300 cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
