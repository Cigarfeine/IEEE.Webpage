"use client";

import React, { useRef } from "react";
import ButtonRoll from "@/components/ui/ButtonRoll";
import AsciiViewer from "@/components/ui/AsciiViewer";
import SectionOverlay from "@/components/ui/SectionOverlay";
import { SonarGrid } from "@/components/ui/sonar-grid";
import { Play, Sparkles, Terminal } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
      })
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 40,
            duration: 1,
            stagger: 0.15,
          },
          "-=0.5"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
          },
          "-=0.6"
        )
        .from(
          ".hero-media",
          {
            opacity: 0,
            scale: 0.95,
            duration: 1,
          },
          "-=0.8"
        );

      // Subtle parallax & fade as user scrolls into the stacked Manifesto
      gsap.to(".hero-scroll-content", {
        y: 60,
        opacity: 0.88,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-obsidian select-none"
    >
      {/* Background Scrim for stacked card overlap */}
      <SectionOverlay id="hero-overlay" />

      {/* Living Interactive SonarGrid Background Matrix */}
      <SonarGrid
        color="#CBEB3A"
        spacing={26}
        dotRadius={1.3}
        baseOpacity={0.22}
        ringWidth={95}
        speed={250}
        amplitude={2.3}
        pingEvery={3.0}
        interactive={true}
        seedPing={true}
        pingArea={[0.15, 0.2, 0.85, 0.8]}
        className="relative min-h-[100dvh] pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-36 lg:pb-24 flex flex-col justify-between w-full"
      >
        {/* Soft radial backdrop wash to ensure extreme typographic contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_55%_at_35%_45%,rgba(11,15,14,0.85)_0%,transparent_100%)]"
        />

        <div className="hero-scroll-content max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 w-full flex-1 flex flex-col justify-center relative z-10 will-change-transform">
        {/* Top meta pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
            <span className="font-mono text-xs text-white/80 tracking-wider uppercase">
              CHAPTER #14591 // AUTONOMOUS_STUDENT_BRANCH
            </span>
          </div>

          <div className="hero-badge hidden sm:flex items-center gap-3 font-mono text-xs text-white/50">
            <span className="flex items-center gap-1.5 text-lime">
              <Sparkles className="w-3.5 h-3.5" />
              SESSION 2025–2026
            </span>
            <span>•</span>
            <span>MBITS CAMPUS, KOCHI REGION</span>
          </div>
        </div>

        {/* 2-Column Hero Layout: Brutalist Typography on Left, Minimal ASCII Statue on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex flex-col justify-center">
            <h1
              ref={headlineRef}
              className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.6rem] 2xl:text-[5.2rem] leading-[0.94] tracking-tighter text-white mb-6 select-none"
            >
              <span className="hero-title-line block">WE ENGINEER</span>
              <span className="hero-title-line block">
                <span className="font-serif italic font-normal text-lime lowercase tracking-normal">
                  resilient
                </span>{" "}
                SYSTEMS
              </span>
              <span className="hero-title-line block text-white/90">
                &amp; COMPUTING.
              </span>
            </h1>

            <p className="hero-desc text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-10 font-normal">
              MBITS IEEE Computer Society is the flagship chapter for production-grade
              systems engineering, applied machine intelligence, and distributed architecture.
              Build alongside passionate builders.
            </p>

            {/* Habito-style dual rolling buttons */}
            <div className="hero-cta flex flex-wrap items-center gap-4 sm:gap-5">
              <ButtonRoll href="#works" variant="lime" size="lg" withArrow>
                EXPLORE WORKS
              </ButtonRoll>
              <ButtonRoll href="#membership" variant="dark" size="lg" withDot>
                MEMBERSHIP TIERS
              </ButtonRoll>
            </div>

            {/* Quick stats footer inside hero */}
            <div className="hero-cta mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <span className="font-display font-bold text-2xl sm:text-3xl text-white block">
                  450+
                </span>
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider block mt-1">
                  Active Engineers
                </span>
              </div>
              <div>
                <span className="font-display font-bold text-2xl sm:text-3xl text-lime block">
                  18+
                </span>
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider block mt-1">
                  Major Artifacts
                </span>
              </div>
              <div>
                <span className="font-display font-bold text-2xl sm:text-3xl text-white block">
                  100%
                </span>
                <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider block mt-1">
                  Open Source
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Minimal Interactive ASCII Veiled Statue (Larger, Right-Aligned to the end) */}
          <div className="hero-media lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex items-center justify-end w-full lg:translate-x-3 xl:translate-x-6 2xl:translate-x-8">
            <div className="w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[720px] xl:max-w-[820px] 2xl:max-w-[900px] flex justify-end ml-auto">
              <AsciiViewer />
            </div>
          </div>
        </div>
      </div>
    </SonarGrid>
  </section>
);
}
