"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Check, Globe } from "lucide-react";
import DualAsciiHands from "@/components/ui/DualAsciiHands";
import { getAssetPath } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const topTierRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const footer = footerRef.current;
      const inner = innerRef.current;
      if (!footer || !inner) return;

      // Master Good-Fella Parallax Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",     // when footer breaches bottom of viewport
          end: "bottom bottom",    // when footer reaches full view
          scrub: 1.0,              // 1s lag-smoothing matching Lenis
          invalidateOnRefresh: true,
        },
      });

      // 1. Overall curtain counter-parallax on inner wrapper (-20% to 0)
      tl.fromTo(
        inner,
        { yPercent: -20, opacity: 0.25 },
        { yPercent: 0, opacity: 1, ease: "none" },
        0
      );

      // 2. Differential depth on top tier (brand triad & directory links)
      if (topTierRef.current) {
        tl.fromTo(
          topTierRef.current,
          { y: -35, opacity: 0.3 },
          { y: 0, opacity: 1, ease: "none" },
          0
        );
      }

      // 3. Multi-plane differential parallax on large typography watermark
      if (watermarkRef.current) {
        tl.fromTo(
          watermarkRef.current,
          { yPercent: -32, opacity: 0.02, scale: 0.98 },
          { yPercent: 0, opacity: 0.08, scale: 1, ease: "none" },
          0
        );
      }

      // 4. Subtle settle on bottom utility bar
      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { y: 15, opacity: 0.4 },
          { y: 0, opacity: 1, ease: "none" },
          0.2
        );
      }
    },
    { scope: footerRef }
  );

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
    <footer
      ref={footerRef}
      className="relative z-0 min-h-[100dvh] lg:h-[100dvh] bg-obsidian-pure text-white overflow-hidden select-none flex flex-col justify-between pt-20 sm:pt-24 lg:pt-22 pb-2 border-t border-white/10"
    >
      {/* Good-Fella Parallax Inner Wrapper */}
      <div
        ref={innerRef}
        className="footer-parallax-inner w-full h-full min-h-0 flex flex-col justify-between will-change-transform flex-1"
      >
        {/* TOP TIER: Brand Triad + Editorial 3-Column Directory */}
        <div
          ref={topTierRef}
          className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 w-full flex-none"
        >
        
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
                  name="name"
                  id="footer-name"
                  autoComplete="name"
                  aria-label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-lime/60 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  id="footer-email"
                  autoComplete="email"
                  aria-label="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.edu"
                  className="w-full sm:w-1/2 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:border-lime/60 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 mt-1">
                <button
                  type="submit"
                  className="group/btn inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-lime text-obsidian font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-lime/95 hover:shadow-[0_0_24px_rgba(203,235,58,0.35)] hover:scale-[1.02] cursor-pointer"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> SUBSCRIBED
                    </span>
                  ) : (
                    <span>JOIN DISPATCHES</span>
                  )}
                  <span className="w-7 h-7 rounded-full bg-obsidian/15 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
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
      <div className="w-full h-[220px] sm:h-[260px] lg:h-auto lg:flex-1 min-h-0 relative flex items-center justify-center my-0 overflow-hidden">
        <DualAsciiHands
          leftHandSrc="/assets/hands/lefthand.webp"
          rightHandSrc="/assets/hands/righthand.webp"
        />
      </div>

      {/* BOTTOM TIER: Full-Width Typographic Watermark + Minimal Utility Bar */}
      <div className="w-full flex-none flex flex-col mt-auto">
        
        {/* Large Typographic Watermark (100% Vector Visible Edge-to-Edge with Parallax) */}
        <div
          ref={watermarkRef}
          className="w-full overflow-hidden pointer-events-none select-none px-2 sm:px-4 will-change-transform"
        >
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
        <div
          ref={bottomBarRef}
          className="max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 w-full pt-3 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/40 border-t border-white/5 will-change-transform"
        >
          <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-wider uppercase">
            <span>© 2026 IEEE CS MBITS</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
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
      </div>

    </footer>
  );
}
