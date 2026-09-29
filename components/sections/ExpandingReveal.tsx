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
  const expandedHudRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const part3Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const card = portalRef.current;
      const trigger = triggerRef.current;
      if (!card || !trigger) return;

      // Numerical proxy for GPU-accelerated aperture expansion
      // Starts as a sleek center letterbox slit, slowly expands to full 16:9 canvas
      const clipProxy = {
        y: 44,
        x: 36,
        scale: 0.86,
        opacity: 0,
      };

      const updateCardStyles = () => {
        card.style.clipPath = `inset(${clipProxy.y.toFixed(2)}% ${clipProxy.x.toFixed(2)}% round 24px)`;
        card.style.transform = `translate(-50%, -50%) scale(${clipProxy.scale.toFixed(3)})`;
        card.style.opacity = `${clipProxy.opacity.toFixed(3)}`;
        card.style.visibility = clipProxy.opacity > 0.01 ? "visible" : "hidden";
      };

      // Set initial styles
      updateCardStyles();

      // Pinned Cinematic Expanding Portal Timeline (100% GPU Compositor Accelerated)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "center center",
          end: "+=220%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: updateCardStyles,
        },
      });

      // Hook continuous updates to ensure card styles stay 100% synchronized on every scrub tick
      tl.eventCallback("onUpdate", updateCardStyles);

      // Explicit initial timeline state: card is strictly hidden during text illumination
      tl.set(clipProxy, { opacity: 0, y: 44, x: 36, scale: 0.86 }, 0);

      // PHASE 1: Sequential Text Illumination (Part by Part)
      // Words scrub into brilliant white line-by-line as user scrolls down
      tl.fromTo(
        part1Ref.current,
        { opacity: 0.22, y: 18 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" },
        0
      )
        .fromTo(
          part2Ref.current,
          { opacity: 0.22, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" },
          0.35
        )
        .fromTo(
          part3Ref.current,
          { opacity: 0.22, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" },
          0.70
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0.2, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" },
          0.70
        )

        // PHASE 2: Savor the Full Typographic Statement (Hold from 1.05 to 1.45)

        // PHASE 3: Text Graceful Dispersal & Outward Translation
        .to(
          part1Ref.current,
          { y: -65, opacity: 0, duration: 0.55, ease: "power2.in" },
          1.45
        )
        .to(
          part3Ref.current,
          { y: 65, opacity: 0, duration: 0.55, ease: "power2.in" },
          1.45
        )
        .to(
          part2Ref.current,
          { scale: 1.05, opacity: 0, duration: 0.5, ease: "power2.in" },
          1.50
        )
        .to(
          [badgeRef.current, subtitleRef.current],
          { opacity: 0, y: -12, duration: 0.4, ease: "power2.in" },
          1.45
        )

        // PHASE 4: Aperture Ignites & Slowly Animates Open
        // Card fades in from opacity 0 strictly as text disperses
        .fromTo(
          clipProxy,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.35,
            ease: "power1.out",
          },
          1.55
        )
        // Slow, majestic expansion from center slit to full 16:9 canvas
        .fromTo(
          clipProxy,
          { y: 44, x: 36, scale: 0.86 },
          {
            y: 0,
            x: 0,
            scale: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          1.55
        )
        // Subtle cinematic parallax counter-zoom on authentic workshop photography
        .fromTo(
          imageRef.current,
          { scale: 1.16 },
          { scale: 1.0, duration: 1.5, ease: "power2.out" },
          1.55
        )

        // PHASE 5: Archival Caption Reveals at Bottom Edge
        .fromTo(
          expandedHudRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            pointerEvents: "auto",
          },
          2.6
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
        <div ref={badgeRef} className="mb-6 sm:mb-8 will-change-[opacity,transform]">
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
          {/* Monumental Centered Typographic Headline Layer */}
          <div className="font-display font-extrabold uppercase tracking-tight text-lg xs:text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] leading-[1.12] sm:leading-[1.04] select-none flex flex-col items-center justify-center w-full z-10 pointer-events-none text-center px-2 sm:px-0">
            {/* Part 1: WE ENGINEER */}
            <div ref={part1Ref} className="will-change-[opacity,transform] mb-1 sm:mb-2 text-center">
              <span className="block text-white whitespace-nowrap">WE ENGINEER</span>
            </div>

            {/* Part 2: PRODUCTION SYSTEMS */}
            <div ref={part2Ref} className="will-change-[opacity,transform] mb-1 sm:mb-2 text-center">
              <span className="block text-white/95 whitespace-nowrap">PRODUCTION SYSTEMS</span>
            </div>

            {/* Part 3: THAT SCALE */}
            <div ref={part3Ref} className="will-change-[opacity,transform] mt-1 sm:mt-2 text-center">
              <span className="block text-white/80 whitespace-nowrap">THAT SCALE</span>
            </div>
          </div>

          {/* Cinematic Expanding Portal Card (Centered directly in stage) */}
          <div
            ref={portalRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,1140px)] aspect-[16/10] sm:aspect-[16/9] max-h-[560px] overflow-hidden select-none z-20 will-change-[clip-path,transform,opacity] shadow-2xl shadow-black/95 rounded-[24px] pointer-events-none"
          >
            {/* Real Workshop Imagery with Parallax Scale */}
            <div ref={imageRef} className="absolute inset-0 will-change-transform">
              <Image
                src={getAssetPath("/assets/gallery/fig1-workshop.jpg")}
                alt="IEEE CS Student Workshop"
                fill
                className="object-cover"
                priority
              />
              {/* Subtle bottom vignette strictly for caption readability */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-obsidian/85 to-transparent pointer-events-none" />
            </div>

            {/* Liquid Glass Edge Refraction */}
            <div className="absolute inset-0 rounded-[inherit] border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] pointer-events-none" />

            {/* Minimal Editorial Archival Badge Docked Discreetly at Bottom Edge */}
            <div
              ref={expandedHudRef}
              className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex items-center justify-between z-10 opacity-0 pointer-events-none translate-y-3 will-change-[opacity,transform]"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-obsidian/85 backdrop-blur-md border border-white/10 text-white/90">
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
          className="mt-6 sm:mt-8 font-sans text-white/50 text-sm sm:text-base max-w-lg mx-auto will-change-[opacity,transform] leading-relaxed"
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
