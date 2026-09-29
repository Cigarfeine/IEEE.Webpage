"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionOverlay from "@/components/ui/SectionOverlay";
import { Shield, Zap, GitBranch, Globe } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export default function ExpandingReveal() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const compactOverlayRef = useRef<HTMLDivElement>(null);
  const expandedHudRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLSpanElement>(null);
  const rightTextRef = useRef<HTMLSpanElement>(null);
  const mobileTopTextRef = useRef<HTMLDivElement>(null);
  const mobileBottomTextRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const card = portalRef.current;
      if (!card || !triggerRef.current) return;

      // Calculate initial responsive pill clip percentages (100% matched to resting gap)
      const getPillGeometry = () => {
        const cardRect = card.getBoundingClientRect();
        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth < 1024;
        const pillWidth = isMobile ? 70 : isTablet ? 100 : 124;
        const pillHeight = isMobile ? 26 : isTablet ? 34 : 40;

        const h = cardRect.height || 480;
        const w = cardRect.width || 1000;

        const clipY = Math.max(0, ((h - pillHeight) / 2 / h) * 100);
        const clipX = Math.max(0, ((w - pillWidth) / 2 / w) * 100);

        return { clipY, clipX };
      };

      const geo = getPillGeometry();
      const clipProxy = { y: geo.clipY, x: geo.clipX };

      // Set initial pill clipping
      card.style.clipPath = `inset(${clipProxy.y.toFixed(2)}% ${clipProxy.x.toFixed(2)}% round 20px)`;

      // Pinned Cinematic Expanding Portal Timeline (100% GPU Compositor Accelerated)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "center center",
          end: "+=120%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            const updated = getPillGeometry();
            clipProxy.y = updated.clipY;
            clipProxy.x = updated.clipX;
            card.style.clipPath = `inset(${clipProxy.y.toFixed(2)}% ${clipProxy.x.toFixed(2)}% round 20px)`;
          },
        },
      });

      // 1. Text Dissolves & Outward Motion (Clean minimal dissipation)
      tl.to(
        [topTextRef.current, mobileTopTextRef.current],
        {
          y: -35,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0
      )
        .to(
          [bottomTextRef.current, mobileBottomTextRef.current],
          {
            y: 35,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0
        )
        .to(
          leftTextRef.current,
          {
            x: -50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0
        )
        .to(
          rightTextRef.current,
          {
            x: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0
        )
        .to(
          badgeRef.current,
          {
            opacity: 0,
            y: -15,
            duration: 0.4,
            ease: "power2.out",
          },
          0
        )
        .to(
          subtitleRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.4,
            ease: "power2.out",
          },
          0
        )
        .to(
          compactOverlayRef.current,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power1.out",
          },
          0
        )

        // 2. Buttery Smooth Hardware-Accelerated Aperture Expansion via Numerical Proxy
        .to(
          clipProxy,
          {
            y: 0,
            x: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onUpdate: () => {
              card.style.clipPath = `inset(${clipProxy.y.toFixed(2)}% ${clipProxy.x.toFixed(2)}% round 20px)`;
            },
          },
          0
        )

        // 3. Subtle Parallax Image Settle
        .fromTo(
          imageRef.current,
          { scale: 1.08 },
          {
            scale: 1.0,
            duration: 1.2,
            ease: "power2.out",
          },
          0
        )

        // 4. Clean Minimal Archival Caption Reveal
        .to(
          expandedHudRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            pointerEvents: "auto",
          },
          0.85
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
        className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        {/* Editorial Eyebrow Badge */}
        <div ref={badgeRef} className="mb-6 sm:mb-8 will-change-transform">
          <span className="font-mono text-xs uppercase tracking-widest text-white/50 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            Core Philosophy
          </span>
        </div>

        {/* Central Stage Wrapper */}
        <div
          ref={stageWrapRef}
          className="relative w-full max-w-7xl mx-auto flex items-center justify-center min-h-[460px] sm:min-h-[540px]"
        >
          {/* Monumental Headline Layer */}
          <div className="font-display font-extrabold uppercase tracking-tight text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] leading-[1.08] select-none flex flex-col items-center justify-center w-full z-10 pointer-events-none">
            {/* MOBILE PRESENTATION (screens < sm): Symmetrical Top / Aperture Gap / Bottom */}
            <div className="sm:hidden flex flex-col items-center justify-center w-full py-2">
              {/* Mobile Row 1 */}
              <div ref={mobileTopTextRef} className="will-change-transform text-center mb-1">
                <span className="block text-white text-xl xs:text-2xl leading-tight">WE ENGINEER</span>
                <span className="block text-white/95 text-lg xs:text-xl leading-tight mt-0.5">PRODUCTION</span>
              </div>

              {/* Mobile Center Gap for Aperture Pill */}
              <div className="h-10 w-24 my-1 shrink-0 pointer-events-none" />

              {/* Mobile Row 2 */}
              <div ref={mobileBottomTextRef} className="will-change-transform text-center mt-1">
                <span className="block text-white/95 text-lg xs:text-xl leading-tight">SYSTEMS</span>
                <span className="block text-white/80 text-xl xs:text-2xl leading-tight mt-0.5">THAT SCALE</span>
              </div>
            </div>

            {/* DESKTOP PRESENTATION (screens >= sm): Monumental 3-Row Split */}
            <div className="hidden sm:flex flex-col items-center justify-center w-full">
              {/* Row 1 */}
              <div ref={topTextRef} className="will-change-transform mb-1 sm:mb-2 text-center">
                <span className="block text-white">WE ENGINEER</span>
              </div>

              {/* Row 2: PRODUCTION [CENTER APERTURE SPACER] SYSTEMS */}
              <div className="relative flex items-center justify-center w-full my-1 sm:my-2">
                {/* Left half: ends at 50% - gap */}
                <div className="w-1/2 flex justify-end items-center sm:pr-14 md:pr-16 lg:pr-20">
                  <span
                    ref={leftTextRef}
                    className="inline-block text-white will-change-transform shrink-0 text-right whitespace-nowrap"
                  >
                    PRODUCTION
                  </span>
                </div>

                {/* Right half: starts at 50% + gap */}
                <div className="w-1/2 flex justify-start items-center sm:pl-14 md:pl-16 lg:pl-20">
                  <span
                    ref={rightTextRef}
                    className="inline-block text-white/90 will-change-transform shrink-0 text-left whitespace-nowrap"
                  >
                    SYSTEMS
                  </span>
                </div>
              </div>

              {/* Row 3 */}
              <div ref={bottomTextRef} className="will-change-transform mt-1 sm:mt-2 text-center">
                <span className="block text-white/80">THAT SCALE</span>
              </div>
            </div>
          </div>

          {/* Cinematic Expanding Portal Card (Centered directly in stage) */}
          <div
            ref={portalRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,1140px)] aspect-[16/10] sm:aspect-[16/9] max-h-[540px] overflow-hidden select-none z-20 will-change-[clip-path] shadow-2xl shadow-black/95 rounded-[20px]"
          >
            {/* Real Imagery with Parallax Scale */}
            <div ref={imageRef} className="absolute inset-0 will-change-transform">
              <Image
                src={getAssetPath("/assets/gallery/fig1-workshop.jpg")}
                alt="IEEE CS Student Workshop"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle bottom vignette strictly for caption readability */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian/75 to-transparent pointer-events-none" />
            </div>

            {/* Liquid Glass Edge Refraction */}
            <div className="absolute inset-0 rounded-[inherit] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] pointer-events-none" />

            {/* Compact Resting State Indicator (Pill pulse in resting state) */}
            <div
              ref={compactOverlayRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime/90 animate-pulse" />
            </div>

            {/* Minimal Editorial Archival Badge Docked Discreetly at Bottom Edge */}
            <div
              ref={expandedHudRef}
              className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-center justify-between z-10 opacity-0 pointer-events-none translate-y-2 will-change-[opacity,transform]"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-obsidian/80 backdrop-blur-md border border-white/10 text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider font-medium">
                  IEEE Student Branch · Engineering Workshops
                </span>
              </div>

              <span className="font-mono text-[10px] sm:text-xs text-white/40 tracking-widest hidden sm:inline uppercase">
                Archival Record // 2025
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 sm:mt-8 font-sans text-white/50 text-sm sm:text-base max-w-lg mx-auto will-change-transform leading-relaxed"
        >
          High-concurrency hardware labs, neural accelerators, and resilient distributed architectures engineered for scale.
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
                className="breakdown-card p-6 sm:p-7 rounded-2xl bg-[#0e1311] border border-white/10 hover:border-lime/30 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between group shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-lime tracking-wider">
                      {item.idx}
                    </span>
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-lime transition-colors duration-300" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-lime transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-white/40">
                  <span className="uppercase tracking-wider">SPECIFICATION</span>
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
