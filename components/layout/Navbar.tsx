"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const [indicatorTop, setIndicatorTop] = useState<number>(0);

  const headerRef = useRef<HTMLElement>(null);
  const menuLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = [
    { name: "MANIFESTO", label: "Manifesto", href: "#manifesto", num: "01" },
    { name: "WORKS", label: "Selected Works", href: "#works", num: "02" },
    { name: "REVEAL", label: "Ideology", href: "#reveal", num: "03" },
    { name: "TRACKS", label: "Engineering Tracks", href: "#tracks", num: "04" },
    { name: "MEMBERSHIP", label: "Fellowship Plans", href: "#membership", num: "05" },
    { name: "FAQ", label: "Protocol FAQ", href: "#faq", num: "06" },
  ];

  // Scroll detection for minimal backdrop transition
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 40);

      if (headerRef.current) {
        if (current > 300 && current > lastScroll && !menuOpen) {
          gsap.to(headerRef.current, {
            yPercent: -100,
            duration: 0.35,
            ease: "power2.out",
          });
        } else {
          gsap.to(headerRef.current, {
            yPercent: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        }
      }
      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Align sliding indicator square with hovered menu link
  useEffect(() => {
    const el = menuLinkRefs.current[hoveredIdx];
    if (el) {
      setIndicatorTop(el.offsetTop + el.offsetHeight / 2 - 6);
    }
  }, [hoveredIdx, menuOpen]);

  return (
    <>
      {/* =========================================================================
          GOOD-FELLA EXACT 3-COLUMN MINIMAL HEADER
         ========================================================================= */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[100] transition-[padding,background-color,border-color] duration-500 ease-out ${
          menuOpen
            ? "py-5 sm:py-6 bg-[#0a0d12] border-b border-white/10"
            : scrolled
            ? "py-4 sm:py-5 bg-[#0a0d12]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
            : "pt-6 sm:pt-8 pb-4 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-2 lg:grid-cols-3 items-center">
          
          {/* COLUMN 1 (LEFT): Minimal Clean Logos */}
          <div className="justify-self-start">
            <Link
              href="/"
              className="flex items-center gap-3.5 group transition-opacity duration-300 hover:opacity-75"
              aria-label="IEEE Computer Society Home"
            >
              <img
                src="/assets/logos/ieee-cs.svg"
                alt="IEEE Computer Society"
                className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="h-4 w-px bg-white/20" />
              <img
                src="/assets/logos/mbits-official.png"
                alt="MBITS"
                className="h-5 sm:h-6 w-auto object-contain brightness-0 invert opacity-90 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>
          </div>

          {/* COLUMN 2 (CENTER on desktop, RIGHT on mobile): Good-Fella Menu Toggle */}
          <div className="justify-self-end lg:justify-self-center">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="group flex cursor-pointer items-center gap-3 transition-opacity duration-300 hover:opacity-75 text-white uppercase tracking-tight text-xs font-mono select-none"
            >
              {/* Rolling Dual Text */}
              <span className="relative h-[1.15em] w-[3.5em] overflow-hidden leading-none text-left">
                <span
                  className="flex flex-col gap-1 transition-transform duration-300 ease-out"
                  style={{
                    transform: menuOpen ? "translateY(calc(-1.15em - 4px))" : "translateY(0px)",
                  }}
                >
                  <span className="block h-[1.15em] leading-none">Menu</span>
                  <span className="block h-[1.15em] leading-none text-lime font-bold">Close</span>
                </span>
              </span>

              {/* Good-Fella 2-Line Morphing Icon */}
              <span className="relative flex h-4 w-4 flex-col items-center justify-center">
                <span
                  className="absolute h-[1.5px] w-full origin-center transition-all duration-300 ease-out"
                  style={{
                    transform: menuOpen ? "rotate(45deg) translateY(0px)" : "rotate(0deg) translateY(-3px)",
                    backgroundColor: menuOpen ? "#CBEB3A" : "currentColor",
                  }}
                />
                <span
                  className="absolute h-[1.5px] w-full origin-center transition-all duration-300 ease-out"
                  style={{
                    transform: menuOpen ? "rotate(-45deg) translateY(0px)" : "rotate(0deg) translateY(3px)",
                    backgroundColor: menuOpen ? "#CBEB3A" : "currentColor",
                  }}
                />
              </span>
            </button>
          </div>

          {/* COLUMN 3 (RIGHT): Minimal Architectural CTA Button */}
          <div className="justify-self-end hidden lg:inline-flex">
            <a
              href="#join"
              className="group min-w-0 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap font-mono text-xs uppercase tracking-wider inline-flex transition-all duration-300"
            >
              <span className="relative flex items-center">
                <span className="flex items-center justify-center h-9 px-5 bg-lime text-black font-semibold rounded-sm transition-all duration-300 group-hover:bg-lime/90 group-hover:shadow-[0_0_20px_rgba(203,235,58,0.3)]">
                  <span>Join chapter</span>
                </span>
                <span className="flex items-center justify-center w-9 h-9 ml-1 bg-lime text-black rounded-sm transition-all duration-300 group-hover:bg-lime/90">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </a>
          </div>

        </div>
      </header>

      {/* =========================================================================
          GOOD-FELLA CURTAIN DRAWER (Opens Below Intact Header)
         ========================================================================= */}
      <div
        className={`fixed inset-x-0 top-0 z-[90] bg-[#0a0d12]/98 backdrop-blur-3xl pt-24 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-b border-white/10 overflow-y-auto max-h-screen ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-8"
        }`}
      >
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-4 sm:pt-6">
          
          {/* Column 1: Monumental Stepper with Sliding Square */}
          <div className="lg:col-span-4 relative pl-7 sm:pl-8">
            {/* Good-Fella Sliding & Rotating Indicator Square */}
            <div
              className="absolute left-0 w-3 h-3 bg-lime shadow-[0_0_12px_rgba(203,235,58,0.6)] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateY(${indicatorTop}px) rotate(${hoveredIdx * 90}deg)`,
              }}
            />

            <nav className="flex flex-col gap-1 sm:gap-2">
              {navLinks.map((link, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <a
                    key={link.name}
                    ref={(el) => {
                      menuLinkRefs.current[idx] = el;
                    }}
                    href={link.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-1 sm:py-2 font-display font-medium text-2xl sm:text-4xl lg:text-5xl tracking-tight transition-all duration-300 ${
                      isHovered
                        ? "text-lime translate-x-3"
                        : "text-white/80 hover:text-white translate-x-0"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Column 2: Minimal Editorial Studio Contact (Good-Fella style) */}
          <div className="lg:col-span-3 flex flex-col gap-8 text-sm font-sans pt-2">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                Chapter
              </span>
              <p className="text-white/80 leading-relaxed">
                Mar Baselios Institute of Technology &amp; Science<br />
                IEEE Computer Society Student Branch
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                Contact
              </span>
              <a
                href="mailto:ieee.cs@mbits.ac.in"
                className="text-white/90 hover:text-lime transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-lime"
              >
                ieee.cs@mbits.ac.in
              </a>
            </div>

            <div className="mt-auto flex flex-col gap-2 font-mono text-xs text-white/50 pt-4">
              <span className="inline-flex items-center gap-2 text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                Admissions open for 2026 cohort
              </span>
            </div>
          </div>

          {/* Column 3: Featured Visual Story Cards (Good-Fella style 2 cards) */}
          <div className="lg:col-span-5 hidden lg:grid grid-cols-2 gap-6">
            <div className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 bg-black/40">
              <Image
                src="/assets/gallery/fig3-committee.jpg"
                alt="Executive Council"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono text-[10px] uppercase text-white/50 block mb-1">
                  About Chapter
                </span>
                <span className="font-display font-medium text-sm">
                  Executive Council
                </span>
              </div>
            </div>

            <div className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 bg-black/40">
              <Image
                src="/assets/gallery/fig4-lecture.jpg"
                alt="Featured Initiative"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono text-[10px] uppercase text-white/50 block mb-1">
                  Featured Project
                </span>
                <span className="font-display font-medium text-sm">
                  Kraken eBPF Kernel
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
