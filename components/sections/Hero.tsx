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
          yPercent: 18,
          scale: 0.92,
          opacity: 0.35,
          ease: "none",
        },
        0
      );

      // 4. Background Sonar Matrix: Slower anchored drift for multi-plane parallax depth
      scrollTl.to(
        "canvas[aria-hidden='true']",
        {
          yPercent: 12,
          ease: "none",
        },
        0
      );

      // 5. Radial Glow Wash: Synchronized soft drift
      scrollTl.to(
        ".hero-radial-glow",
        {
          yPercent: 15,
          opacity: 0.4,
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
                  className="group relative cursor-pointer inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-lime text-obsidian font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-lime/95 hover:shadow-[0_0_24px_rgba(203,235,58,0.35)] hover:scale-[1.02]"
                >
                  <span>EXPLORE WORKS</span>
                  <span className="w-7 h-7 rounded-full bg-obsidian/15 flex items-center justify-center text-obsidian transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </a>

                <a
                  href="#manifesto"
                  className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 backdrop-blur-sm"
                >
                  <span>Read the manifesto</span>
                  <span className="text-lime transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive ASCII Veiled Statue with breathing room */}
            <div className="hero-media lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex items-center justify-end w-full lg:translate-x-3 xl:translate-x-6 2xl:translate-x-8 will-change-transform">
              <div className="relative w-full max-w-[540px] sm:max-w-[620px] lg:max-w-[720px] xl:max-w-[820px] 2xl:max-w-[900px] flex justify-end ml-auto">
                {/* Subtle studio rim backlight for photographic figure-ground separation */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(ellipse_60%_55%_at_55%_48%,rgba(203,235,58,0.11)_0%,rgba(203,235,58,0.03)_50%,transparent_75%)] blur-2xl will-change-transform"
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
