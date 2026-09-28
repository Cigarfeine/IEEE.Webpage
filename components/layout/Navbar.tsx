"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const [indicatorTop, setIndicatorTop] = useState<number>(0);

  const headerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const menuLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = [
    { name: "MANIFESTO", label: "Manifesto", href: "#manifesto", num: "01" },
    { name: "WORKS", label: "Selected Works", href: "#works", num: "02" },
    { name: "REVEAL", label: "Ideology", href: "#reveal", num: "03" },
    { name: "TRACKS", label: "Engineering Tracks", href: "#tracks", num: "04" },
    { name: "MEMBERSHIP", label: "Fellowship Plans", href: "#membership", num: "05" },
    { name: "FAQ", label: "Protocol FAQ", href: "#faq", num: "06" },
  ];

  // 1. Live IST Clock (Editorial micro-HUD)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Smart Scroll & Directional Headroom Reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 40);

      // Auto-hide on deep scroll down, reveal on scroll up
      if (headerRef.current) {
        if (current > 250 && current > lastScroll && !menuOpen) {
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

  // 3. Align sliding indicator square with hovered menu link
  useEffect(() => {
    const el = menuLinkRefs.current[hoveredIdx];
    if (el) {
      setIndicatorTop(el.offsetTop + el.offsetHeight / 2 - 7);
    }
  }, [hoveredIdx, menuOpen]);

  // 4. Magnetic Hover Physics on CTA Button
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(ctaRef.current, {
      x: x * 0.28,
      y: y * 0.28,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!ctaRef.current) return;
    gsap.to(ctaRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1.1, 0.4)",
    });
  };

  return (
    <>
      {/* =========================================================================
          MAIN ARCHITECTURAL NAVBAR (Good-Fella 3-Zone Hierarchy)
         ========================================================================= */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "py-3 bg-[#0a0d12]/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
            : "py-6 sm:py-7 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          
          {/* ZONE 1 (LEFT): Dual Brand Architecture */}
          <div className="flex items-center gap-3 sm:gap-4 select-none">
            <Link
              href="/"
              className="group flex items-center transition-all duration-300 hover:opacity-90"
              title="IEEE Computer Society - Home"
            >
              <img
                src="/assets/logos/ieee-cs.svg"
                alt="IEEE Computer Society"
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <div className="h-5 sm:h-6 w-px bg-white/20" />

            <a
              href="https://mbits.ac.in"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 transition-all duration-300 opacity-80 hover:opacity-100"
              title="Mar Baselios Institute of Technology and Science"
            >
              <img
                src="/assets/logos/mbits-official.png"
                alt="MBITS"
                className="h-6 sm:h-7 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
              <span className="hidden xl:inline-flex items-center font-mono text-[9px] uppercase tracking-widest text-lime/90 font-bold px-1.5 py-0.5 rounded-full bg-lime/10 border border-lime/25">
                #14591
              </span>
            </a>
          </div>

          {/* ZONE 2 (CENTER): Editorial HUD + Quick Links + Menu Toggle */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Ambient HUD Telemetry Capsule */}
            <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
              <span className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <span>KOCHI, IN</span>
                <span className="text-white/20">/</span>
                <span className="text-white/90 tabular-nums">{timeString || "18:00:00 IST"}</span>
              </span>
              <div className="h-3 w-px bg-white/10" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-lime/90 font-medium">
                SYS_ACTIVE
              </span>
            </div>

            {/* Quick Kinetic Rolling Links */}
            <nav className="flex items-center gap-5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05]">
              {navLinks.slice(0, 4).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative overflow-hidden h-[18px] text-[12px] font-mono tracking-widest text-white/70 hover:text-white transition-colors"
                >
                  <span className="flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2">
                    <span className="h-[18px] flex items-center">{link.name}</span>
                    <span className="h-[18px] flex items-center text-lime font-bold">{link.name}</span>
                  </span>
                </a>
              ))}
            </nav>

            {/* Good-Fella [ MENU ] Trigger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group relative overflow-hidden h-8 px-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
              aria-label="Toggle Fullscreen Menu"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime group-hover:scale-125 transition-transform" />
              <span className="flex flex-col h-4 overflow-hidden">
                <span className="flex items-center h-4 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  MENU
                </span>
                <span className="flex items-center h-4 text-lime transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  INDEX
                </span>
              </span>
            </button>
          </div>

          {/* ZONE 3 (RIGHT): Magnetic Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-4">
            {/* Desktop Magnetic Join CTA */}
            <a
              ref={ctaRef}
              href="#join"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime text-obsidian font-mono text-xs font-bold tracking-wider uppercase transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(203,235,58,0.4)] will-change-transform group"
            >
              <span>JOIN CHAPTER</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 text-white hover:text-lime transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          GOOD-FELLA FULLSCREEN THEATRICAL EDITORIAL OVERLAY
         ========================================================================= */}
      <div
        className={`fixed inset-0 z-[100] bg-[#090b0f]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-y-auto overflow-x-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-8"
        }`}
      >
        {/* Overlay Pinned Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logos/ieee-cs.svg"
              alt="IEEE CS"
              className="h-6 sm:h-7 w-auto object-contain"
            />
            <div className="h-4 w-px bg-white/20" />
            <span className="font-mono text-[11px] sm:text-xs text-white/50 uppercase tracking-widest">
              INDEX // DIRECTORY
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-white/70 hover:text-lime transition-colors"
            >
              <span>CLOSE</span>
              <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-lime/40">
                <X className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* 3-Column Editorial Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-6 sm:py-8">
          
          {/* Column 1: Monumental Typography Stepper with Sliding Lime Square */}
          <div className="lg:col-span-6 relative pl-6 sm:pl-10">
            {/* Good-Fella Sliding Indicator Square */}
            <div
              className="absolute left-0 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-lime shadow-[0_0_12px_rgba(203,235,58,0.6)] pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                transform: `translateY(${indicatorTop}px) rotate(${hoveredIdx * 90}deg)`,
              }}
            />

            <div className="space-y-3 sm:space-y-6">
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
                    className={`group flex items-baseline gap-3 sm:gap-6 cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isHovered
                        ? "translate-x-2.5 sm:translate-x-6 opacity-100"
                        : "translate-x-0 opacity-45"
                    }`}
                  >
                    <span className="font-mono text-[11px] sm:text-sm text-lime/90 font-bold shrink-0">
                      {link.num}
                    </span>
                    <span className="font-display font-extrabold uppercase text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white group-hover:text-lime transition-colors">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Monospace Telemetry & Campus Coordinates */}
          <div className="lg:col-span-3 hidden sm:flex flex-col gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs text-white/60">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-lime block mb-1">
                AFFILIATION
              </span>
              <p className="text-white/80 leading-relaxed font-sans text-sm">
                IEEE Computer Society Kerala Section &amp; MBITS Autonomous Student Branch #14591.
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-lime block mb-1">
                LOCATION // NODE
              </span>
              <p className="text-white/80 leading-relaxed">
                Kothamangalam, Kerala, IN<br />
                Coordinates: 09°58'N 76°35'E
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-lime block mb-1">
                STATUS
              </span>
              <span className="inline-flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                ADMISSIONS ACTIVE // 2026
              </span>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                DIRECT TRANSMISSION
              </span>
              <a
                href="mailto:ieee.cs@mbits.ac.in"
                className="text-lime hover:underline block truncate"
              >
                ieee.cs@mbits.ac.in
              </a>
            </div>
          </div>

          {/* Column 3: Featured Visual Story Cards (Good-Fella Media Showcase) */}
          <div className="lg:col-span-3 hidden lg:flex flex-col gap-5">
            <div className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <Image
                src="/assets/gallery/fig3-committee.jpg"
                alt="Executive Council"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="font-mono text-[9px] uppercase text-lime block">
                  // LEADERSHIP
                </span>
                <span className="font-display font-bold text-xs">
                  Executive Council 2025–26
                </span>
              </div>
            </div>

            <div className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-black/40">
              <Image
                src="/assets/gallery/fig4-lecture.jpg"
                alt="Flagship Lecture"
                fill
                sizes="300px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="font-mono text-[9px] uppercase text-lime block">
                  // RESEARCH
                </span>
                <span className="font-display font-bold text-xs">
                  Kraken eBPF Kernel
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Overlay Footer Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/50">
          <div className="flex items-center gap-4">
            <span>© 2026 IEEE CS MBITS</span>
            <span>•</span>
            <span className="text-white/80">{timeString}</span>
          </div>

          <a
            href="#join"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-lime text-obsidian font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(203,235,58,0.4)] transition-all"
          >
            <span>JOIN CHAPTER NOW</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
