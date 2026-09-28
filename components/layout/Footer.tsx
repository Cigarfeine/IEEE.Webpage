"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Check, Globe } from "lucide-react";
import DualAsciiHands from "@/components/ui/DualAsciiHands";
import { getAssetPath } from "@/lib/utils";

export default function Footer() {
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
    }, 2500);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative min-h-[100dvh] lg:h-[100dvh] bg-obsidian-pure text-white overflow-hidden select-none flex flex-col justify-between pt-6 sm:pt-8 pb-3 border-t border-white/10">
      
      {/* TOP TIER: Brand Triad + Editorial 3-Column Directory */}
      <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 w-full flex-none">
        
        {/* ENLARGED & BALANCED BRAND TRIAD LOGOS */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 pb-6 border-b border-white/10">
          <div className="relative h-10 sm:h-11 w-36 sm:w-40 opacity-95 hover:opacity-100 transition-opacity">
            <Image
              src={getAssetPath("/assets/logos/ieee-master.svg")}
              alt="IEEE Master"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div className="relative h-9 sm:h-10 w-36 sm:w-40 opacity-95 hover:opacity-100 transition-opacity">
            <Image
              src={getAssetPath("/assets/logos/ieee-cs.svg")}
              alt="IEEE Computer Society"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
          <div className="h-6 w-px bg-white/20" />
          <div className="relative h-9 sm:h-10 w-36 sm:w-40 opacity-95 hover:opacity-100 transition-opacity">
            <Image
              src={getAssetPath("/assets/logos/mbits-official.png")}
              alt="MBITS Student Branch"
              fill
              className="object-contain object-left brightness-0 invert"
              priority
            />
          </div>
        </div>

        {/* 3-COLUMN MINIMAL DIRECTORY (Zero AI Slop Labels) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 pt-6 pb-2 items-start">
          
          {/* COLUMN 1: Chapter Mission & Dispatches (5 Cols) */}
          <div className="md:col-span-5 flex flex-col gap-3.5">
            <p className="text-white/70 text-xs sm:text-[13px] leading-relaxed max-w-md font-sans">
              MBITS IEEE Computer Society is the flagship chapter for production-grade
              systems engineering, applied machine intelligence, and distributed architecture.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm pt-1">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:border-lime/60 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.edu"
                  className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-sm px-3.5 py-2 text-xs text-white placeholder:text-white/30 focus:border-lime/60 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 mt-0.5">
                <button
                  type="submit"
                  className="flex-1 bg-lime hover:bg-lime/90 text-obsidian font-mono font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-sm transition-all duration-200 flex items-center justify-between cursor-pointer shadow-[0_0_12px_rgba(203,235,58,0.2)]"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> SUBSCRIBED
                    </span>
                  ) : (
                    <span>JOIN DISPATCHES</span>
                  )}
                  <span className="text-obsidian font-bold text-sm">+</span>
                </button>
              </div>

              <div className="flex flex-col gap-1 pt-1 font-mono text-[10px] text-white/50">
                <div className="flex items-center gap-1.5">
                  <span className="text-lime">■</span>
                  <span className="uppercase tracking-wider">
                    ENROLLING RESEARCHERS · 2026 COHORT
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lime/70">■</span>
                  <span className="uppercase tracking-wider">
                    LIMITED LAB FELLOWSHIPS AVAILABLE
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* COLUMN 2: Navigation Directory (3 Cols - Naked Minimalist Links) */}
          <div className="md:col-span-3 flex flex-col gap-2 font-mono text-xs">
            <ul className="space-y-2">
              <li>
                <Link
                  href="#manifesto"
                  className="text-white/70 hover:text-white transition-colors tracking-wider block"
                >
                  MANIFESTO
                </Link>
              </li>
              <li>
                <Link
                  href="#works"
                  className="text-white/70 hover:text-white transition-colors tracking-wider block"
                >
                  SELECTED WORKS
                </Link>
              </li>
              <li>
                <Link
                  href="#reveal"
                  className="text-white/70 hover:text-white transition-colors tracking-wider block"
                >
                  IDEOLOGY
                </Link>
              </li>
              <li>
                <Link
                  href="#tracks"
                  className="text-white/70 hover:text-white transition-colors tracking-wider block"
                >
                  ENGINEERING TRACKS
                </Link>
              </li>
              <li>
                <Link
                  href="#membership"
                  className="text-white/70 hover:text-white transition-colors tracking-wider block"
                >
                  FELLOWSHIP PLANS
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-white/70 hover:text-white transition-colors tracking-wider block"
                >
                  PROTOCOL FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Communication & Lab Contacts (4 Cols - Naked Direct Links) */}
          <div className="md:col-span-4 flex flex-col gap-2 text-xs">
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              <a
                href="mailto:ieee.cs@mbits.ac.in"
                className="text-white/70 hover:text-lime transition-colors underline decoration-white/20 underline-offset-4 w-fit"
              >
                ieee.cs@mbits.ac.in
              </a>
              <a
                href="mailto:chair.cs@mbits.ac.in"
                className="text-white/70 hover:text-lime transition-colors underline decoration-white/20 underline-offset-4 w-fit"
              >
                chair.cs@mbits.ac.in
              </a>
              <a
                href="mailto:research.cs@mbits.ac.in"
                className="text-white/70 hover:text-lime transition-colors underline decoration-white/20 underline-offset-4 w-fit"
              >
                research.cs@mbits.ac.in
              </a>
            </div>

            <div className="pt-3 flex flex-col gap-1.5 text-[11px] text-white/50">
              <a
                href="https://computer.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-lime" />
                <span>IEEE Computer Society Global</span>
              </a>
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
                Code of Ethics
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* MIDDLE TIER: DUAL CONVERGING ASCII HANDS STAGE */}
      <div className="w-full flex-1 min-h-[170px] sm:min-h-[220px] relative flex items-center justify-center my-1 overflow-hidden">
        <DualAsciiHands
          leftHandSrc="/assets/hands/lefthand.png"
          rightHandSrc="/assets/hands/righthand.png"
        />
      </div>

      {/* BOTTOM TIER: Full-Width Typographic Watermark + Minimal Utility Bar */}
      <div className="w-full flex-none flex flex-col mt-auto">
        
        {/* Large Typographic Watermark (100% Vector Visible Edge-to-Edge) */}
        <div className="w-full overflow-hidden pointer-events-none select-none px-2 sm:px-4">
          <svg
            viewBox="0 0 1600 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto text-white/[0.08]"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
            <text
              x="50%"
              y="114"
              textAnchor="middle"
              fill="currentColor"
              fontFamily="var(--font-syne), sans-serif"
              fontWeight="900"
              fontSize="73"
              letterSpacing="-0.035em"
            >
              IEEE COMPUTER SOCIETY
            </text>
          </svg>
        </div>

        {/* MINIMAL BOTTOM UTILITY BAR */}
        <div className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 w-full pt-3 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/40 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-wider uppercase">
            <span>© 2026 IEEE CS MBITS</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="text-[11px] tracking-wider uppercase text-white/50 font-mono">
            Made by <span className="text-white hover:text-lime transition-colors duration-200 font-medium">Arshad</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-lime hover:text-lime transition-all duration-300 cursor-pointer text-xs"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
}
