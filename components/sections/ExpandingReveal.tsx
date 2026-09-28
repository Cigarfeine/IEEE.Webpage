"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionOverlay from "@/components/ui/SectionOverlay";
import { Shield, Zap, GitBranch, Globe, ArrowUpRight } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export default function ExpandingReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const compactOverlayRef = useRef<HTMLDivElement>(null);
  const expandedHudRef = useRef<HTMLDivElement>(null);
  const dockedHeaderRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const [activeTab, setActiveTab] = useState(0);

  const showcaseStreams = [
    {
      id: "systems",
      label: "01 // SYSTEMS LAB",
      tag: "FLAGSHIP RESEARCH TESTBED",
      title: "Distributed Intelligence & Architecture Lab",
      description:
        "High-concurrency hardware labs, neural accelerators, and low-latency distributed pipeline testbeds.",
      image: getAssetPath("/assets/gallery/fig1-workshop.jpg"),
    },
    {
      id: "hackathon",
      label: "02 // HACKGENESIS 48H",
      tag: "CONTINUOUS ENGINEERING ARENA",
      title: "HackGenesis 48-Hour Systems Build",
      description:
        "Continuous 48-hour competitive sprint engineering production microservices, kernels, and autonomous systems.",
      image: getAssetPath("/assets/gallery/fig2-hackathon.jpg"),
    },
    {
      id: "symposium",
      label: "03 // COMPUTING FORUM",
      tag: "IEEE GLOBAL KNOWLEDGE EXCHANGE",
      title: "Advanced Systems & Architecture Colloquium",
      description:
        "Technical keynotes and peer reviews with leading engineers across distributed architectures and AI systems.",
      image: getAssetPath("/assets/gallery/fig4-lecture.jpg"),
    },
  ];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Calculate centering delta so portal centers perfectly in viewport on expand
      const getCenterOffset = () => {
        if (!anchorRef.current) return 0;
        const rect = anchorRef.current.getBoundingClientRect();
        const anchorCenter = rect.left + rect.width / 2;
        const windowCenter = window.innerWidth / 2;
        return windowCenter - anchorCenter;
      };

      const initialOffset = getCenterOffset();

      // Pinned Cinematic Expanding Portal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "center center",
          end: "+=150%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Synchronized Aperture Expansion:
      // Grows from inline capsule to full cinematic viewport and centers precisely
      tl.to(portalRef.current, {
        width: "min(94vw, 1140px)",
        height: "clamp(380px, 56vh, 540px)",
        x: initialOffset,
        duration: 2,
        ease: "power2.inOut",
      })
        // Text dissolves gracefully in-place without flying off the viewport edges
        .to(
          leftTextRef.current,
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          rightTextRef.current,
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          topTextRef.current,
          {
            y: -20,
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          bottomTextRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          badgeRef.current,
          {
            opacity: 0,
            y: -10,
            duration: 0.7,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          subtitleRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.7,
            ease: "power2.inOut",
          },
          0
        )
        // Compact pill overlay fades out early
        .to(
          compactOverlayRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: "power1.out",
          },
          0
        )
        // Docked header illuminates cleanly above the expanded stage
        .to(
          dockedHeaderRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          0.6
        )
        // Expanded telemetry HUD illuminates inside the stage
        .to(
          expandedHudRef.current,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 1,
            ease: "power2.out",
          },
          0.7
        );

      // Staggered reveal for 4-column editorial pillars
      gsap.fromTo(
        ".breakdown-card",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".breakdown-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const pillars = [
    {
      idx: "(01)",
      icon: Zap,
      title: "Rapid Prototype to Production",
      desc: "Bridging the gap between academic theory and industry engineering with accelerated build cycles and production deployments.",
      stat: "14-DAY SPRINTS",
    },
    {
      idx: "(02)",
      icon: GitBranch,
      title: "Scalable Systems Architecture",
      desc: "Engineered from day one for modularity, sub-millisecond latency, and horizontal scalability under high concurrency.",
      stat: "SUB-MS LATENCY",
    },
    {
      idx: "(03)",
      icon: Shield,
      title: "Hardened Security & Integrity",
      desc: "Robust cryptographic primitives, zero-trust role-based access architectures, and kernel-level verification paradigms.",
      stat: "ZERO-TRUST SPEC",
    },
    {
      idx: "(04)",
      icon: Globe,
      title: "Global IEEE Chapter Network",
      desc: "Connect directly with international IEEE research councils, attend prestigious symposiums, and co-author indexed papers.",
      stat: "CHAPTER #14591",
    },
  ];

  return (
    <section
      ref={containerRef}
      id="reveal"
      className="relative z-30 py-24 sm:py-32 bg-obsidian text-white overflow-hidden"
    >
      <SectionOverlay id="reveal-overlay" />

      {/* Pinned Kinetic Expanding Stage */}
      <div
        ref={triggerRef}
        className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        {/* Editorial Eyebrow Badge */}
        <div ref={badgeRef} className="mb-6 sm:mb-8">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-white/60 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            Core Philosophy
          </span>
        </div>

        {/* Central Stage Wrapper */}
        <div
          ref={stageWrapRef}
          className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[460px] sm:min-h-[540px]"
        >
          {/* Docked Header above expanded portal */}
          <div
            ref={dockedHeaderRef}
            className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 w-[min(94vw,1140px)] flex items-center justify-between opacity-0 pointer-events-none px-2 font-mono text-xs tracking-widest text-white/70 transition-opacity z-30"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-white font-medium uppercase tracking-wider text-[11px] sm:text-xs">
                Production Systems That Endure
              </span>
            </div>
            <span className="hidden sm:inline-block text-white/50 text-[11px] sm:text-xs font-mono">
              IEEE Computer Society
            </span>
          </div>

          {/* Monumental Headline Layer (Inline Aperture nestled with zero overflow) */}
          <div className="font-display font-extrabold uppercase tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] 2xl:text-[3.25rem] leading-[1.08] select-none flex flex-col items-center justify-center w-full z-10 pointer-events-none">
            {/* Row 1 */}
            <div ref={topTextRef} className="overflow-hidden mb-1 sm:mb-2">
              <span className="block text-white">WE ENGINEER</span>
            </div>

            {/* Row 2: PRODUCTION [APERTURE ANCHOR] SYSTEMS */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-5 my-1 sm:my-2 w-full">
              <span
                ref={leftTextRef}
                className="inline-block text-white will-change-transform shrink-0"
              >
                PRODUCTION
              </span>

              {/* Aperture Anchor Wrapper: keeps flow position and expands symmetrically */}
              <div
                ref={anchorRef}
                className="relative shrink-0 flex items-center justify-center w-[110px] sm:w-[130px] md:w-[140px] h-[38px] sm:h-[44px] md:h-[48px] pointer-events-auto"
              >
                {/* The Cinematic Expanding Portal: starts at 24px radius (a pill at 48px height) and expands into rounded-3xl card */}
                <div
                  ref={portalRef}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden select-none z-20 will-change-[width,height,transform] shadow-2xl shadow-black/90 w-full h-full rounded-[24px]"
                >
                  {/* Visual Imagery */}
                  <div className="absolute inset-0">
                    <Image
                      src={showcaseStreams[activeTab].image}
                      alt={showcaseStreams[activeTab].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    {/* Top gradient for telemetry contrast */}
                    <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-obsidian/95 via-obsidian/60 to-transparent" />
                    {/* Bottom gradient for title readability */}
                    <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-obsidian/95 via-obsidian/75 to-transparent" />
                    {/* Center soft vignette */}
                    <div className="absolute inset-0 bg-obsidian/20 backdrop-blur-[0.5px]" />
                  </div>

                  {/* Liquid Glass Edge Refraction (Rule 4: NO Neon Outer Glow) */}
                  <div className="absolute inset-0 rounded-[inherit] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] pointer-events-none" />

                  {/* COMPACT RESTING STATE OVERLAY (visible before scroll) */}
                  <div
                    ref={compactOverlayRef}
                    className="absolute inset-0 flex items-center justify-between px-3 z-10 bg-obsidian/40"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                    <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white tracking-widest uppercase">
                      PORTAL // 01
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] text-lime font-bold">
                      LIVE
                    </span>
                  </div>

                  {/* EXPANDED FULL-STAGE HUD OVERLAY (illuminates during scroll) */}
                  <div
                    ref={expandedHudRef}
                    className="absolute inset-0 p-5 sm:p-7 md:p-8 flex flex-col justify-between z-10 opacity-0 pointer-events-none"
                  >
                    {/* Top Telemetry Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[11px] sm:text-xs text-white/80">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-lime/15 border border-lime/30 text-lime font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                          ACTIVE TESTBED
                        </span>
                        <span className="hidden sm:inline text-white/30">//</span>
                        <span className="hidden sm:inline text-white font-medium">
                          MBITS SYSTEMS LAB
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 text-white/70">
                        <span className="hidden md:inline">
                          LATENCY: <span className="text-lime font-bold">0.74ms</span>
                        </span>
                        <span className="text-white/90">120 FPS</span>
                      </div>
                    </div>

                    {/* Center Interactive Stream Switcher */}
                    <div className="my-auto py-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                      {showcaseStreams.map((stream, idx) => (
                        <button
                          key={stream.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab(idx);
                          }}
                          className={`px-4 py-1.5 rounded-full font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                            activeTab === idx
                              ? "bg-lime text-obsidian font-bold shadow-md shadow-lime/20"
                              : "bg-obsidian/80 backdrop-blur-md text-white/80 border border-white/20 hover:border-white/50 hover:text-white"
                          }`}
                        >
                          {stream.label}
                        </button>
                      ))}
                    </div>

                    {/* Bottom Metadata & Action CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10 text-left">
                      <div>
                        <span className="font-mono text-[10px] sm:text-xs text-lime uppercase tracking-widest block mb-1">
                          {showcaseStreams[activeTab].tag}
                        </span>
                        <h4 className="font-display font-bold uppercase tracking-tight text-base sm:text-xl md:text-2xl text-white">
                          {showcaseStreams[activeTab].title}
                        </h4>
                        <p className="font-sans normal-case text-xs sm:text-sm text-white/75 max-w-lg mt-1 leading-relaxed">
                          {showcaseStreams[activeTab].description}
                        </p>
                      </div>

                      <a
                        href="#works"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-lime hover:text-obsidian border border-white/20 hover:border-lime text-xs font-mono uppercase tracking-wider text-white transition-all duration-300 group/btn shrink-0 self-start sm:self-auto cursor-pointer"
                      >
                        <span>INSPECT WORK</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <span
                ref={rightTextRef}
                className="inline-block text-white/90 will-change-transform shrink-0"
              >
                SYSTEMS
              </span>
            </div>

            {/* Row 3 */}
            <div ref={bottomTextRef} className="overflow-hidden mt-1 sm:mt-2">
              <span className="block text-white/80">THAT SCALE</span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 sm:mt-8 font-sans text-white/60 text-sm sm:text-base max-w-xl mx-auto"
        >
          Scroll to explore the engineering matrix. Engineered for high concurrency,
          sub-millisecond throughput, and verified cryptographic resilience.
        </p>
      </div>

      {/* 4-Column Numbered Editorial Breakdown */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-24">
        <div className="breakdown-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.idx}
                className="breakdown-card p-6 sm:p-7 rounded-2xl bg-obsidian-surface border border-white/10 hover:border-lime/40 transition-all duration-300 flex flex-col justify-between group shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm font-bold text-lime">
                      {item.idx}
                    </span>
                    <Icon className="w-5 h-5 text-white/40 group-hover:text-lime transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-lime transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-white/40">
                  <span>CHAPTER CORE</span>
                  <span className="text-lime font-bold">{item.stat}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
