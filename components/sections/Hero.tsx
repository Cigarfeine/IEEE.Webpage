"use client";

import React, { useRef } from "react";
import AsciiViewer from "@/components/ui/AsciiViewer";
import SectionOverlay from "@/components/ui/SectionOverlay";
import { SonarGrid } from "@/components/ui/sonar-grid";
import { ArrowUpRight } from "lucide-react";
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

      tl.from(".hero-title-line", {
        opacity: 0,
        y: 35,
        duration: 0.9,
        stagger: 0.12,
        }, "-=0.4")
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

      // Signature Good-Fella Multi-Plane Scroll Parallax
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.0,
          invalidateOnRefresh: true,
        },
      });

      // 1. Overall Hero Content Counter-Descent (translates down as viewport scrolls up, matching good-fella translate(0%, 35%))
      scrollTl.to(
        ".hero-scroll-content",
        {
          yPercent: 32,
          ease: "none",
        },
        0
      );

      // 2. Left Typographic Column: Gentle float + gradual fade-out
      scrollTl.to(
        ".hero-text-col",
        {
          yPercent: 8,
          opacity: 0.25,
          ease: "none",
        },
        0
      );

      // 3. Right 3D ASCII Media: Differential spatial depth drift & scale
      scrollTl.to(
        ".hero-media",
        {
          yPercent: 14,
          scale: 0.94,
          opacity: 0.45,
          ease: "none",
        },
        0
      );

      // 4. Radial Glow Wash: Synchronized soft drift
      scrollTl.to(
        ".hero-radial-glow",
        {
          yPercent: 15,
          opacity: 0.3,
          ease: "none",
        },
        0
      );
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
        baseOpacity={0.18}
        ringWidth={95}
        speed={250}
        amplitude={2.3}
        pingEvery={3.0}
        interactive={true}
        seedPing={true}
        pingArea={[0.15, 0.2, 0.85, 0.8]}
        className="relative min-h-[100dvh] pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-44 lg:pb-24 flex flex-col justify-center w-full"
      >
        {/* Soft radial backdrop wash to ensure extreme typographic contrast */}
        <div
          aria-hidden="true"
          className="hero-radial-glow pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_55%_at_35%_45%,rgba(11,15,14,0.85)_0%,transparent_100%)] will-change-transform"
        />

        <div className="hero-scroll-content max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 w-full flex-1 flex flex-col justify-center relative z-10 will-change-transform">
          
          {/* 2-Column Hero Layout: Minimal High-Craft Typography on Left, ASCII Statue on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            
            {/* Left Column: Quiet, Powerful Headline & Clean CTAs */}
            <div className="hero-text-col lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex flex-col justify-center will-change-transform">
              <h1
                ref={headlineRef}
                className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[4.85rem] leading-[0.98] tracking-tight text-white mb-6 select-none"
              >
                <span className="hero-title-line block">We engineer</span>
                <span className="hero-title-line block">
                  <span className="text-lime font-serif italic font-normal tracking-normal lowercase">
                    resilient
                  </span>{" "}
                  systems
                </span>
                <span className="hero-title-line block text-white/90">
                  &amp; computing.
                </span>
              </h1>

              <p className="hero-desc text-base sm:text-lg text-white/60 max-w-xl leading-relaxed mb-10 font-normal">
                MBITS IEEE Computer Society is the flagship chapter for production-grade
                systems engineering, applied machine intelligence, and distributed architecture.
              </p>

              {/* High-End Soft CTAs */}
              <div className="hero-cta flex flex-wrap items-center gap-5 sm:gap-6">
                <a
                  href="#works"
                  className="group relative overflow-hidden cursor-pointer select-none inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-lime text-obsidian font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-lime/95 hover:shadow-[0_0_24px_rgba(203,235,58,0.35)] hover:scale-[1.03] active:scale-[0.96]"
                >
                  {/* Liquid Sheen Sweep */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <span className="relative z-10">EXPLORE WORKS</span>
                  <span className="relative z-10 w-7 h-7 rounded-full bg-obsidian/15 group-hover:bg-obsidian/25 group-hover:scale-105 flex items-center justify-center text-obsidian transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>

                <a
                  href="#manifesto"
                  className="group relative overflow-hidden cursor-pointer select-none inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] active:scale-[0.96] backdrop-blur-sm"
                >
                  {/* Liquid Sheen Sweep */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <span className="relative z-10">Read the manifesto</span>
                  <span className="relative z-10 text-lime transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive ASCII Veiled Statue with breathing room */}
            <div className="hero-media lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex items-center justify-end w-full lg:translate-x-3 xl:translate-x-6 2xl:translate-x-8 will-change-transform">
              <div className="relative w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[720px] xl:max-w-[820px] 2xl:max-w-[900px] flex justify-end ml-auto">
                {/* Whisper-soft studio rim backlight for photographic figure-ground separation */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-[radial-gradient(ellipse_55%_50%_at_55%_48%,rgba(203,235,58,0.035)_0%,transparent_70%)] will-change-transform"
                />
                <AsciiViewer />
              </div>
            </div>

          </div>
        </div>
      </SonarGrid>
    </section>
  );
}
