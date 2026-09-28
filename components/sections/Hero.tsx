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
        y: 40,
        duration: 1,
        stagger: 0.15,
      })
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

      // Good-Fella style layered scroll parallax
      gsap.to(".hero-scroll-content", {
        y: 45,
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      gsap.to(".hero-media", {
        y: 65,
        scale: 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
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
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_65%_55%_at_35%_45%,rgba(11,15,14,0.85)_0%,transparent_100%)]"
        />

        <div className="hero-scroll-content max-w-[1560px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 w-full flex-1 flex flex-col justify-center relative z-10 will-change-transform">
          
          {/* 2-Column Hero Layout: Minimal High-Craft Typography on Left, ASCII Statue on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            
            {/* Left Column: Quiet, Powerful Headline & Clean CTAs */}
            <div className="lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex flex-col justify-center">
              <h1
                ref={headlineRef}
                className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[5rem] leading-[0.97] tracking-tight text-white mb-6 select-none"
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

              {/* Good-Fella style Minimal CTAs */}
              <div className="hero-cta flex flex-wrap items-center gap-6">
                <a
                  href="#works"
                  className="group inline-flex items-center gap-3 px-6 py-3 rounded-sm bg-lime text-obsidian font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-lime/90 hover:shadow-[0_0_20px_rgba(203,235,58,0.3)]"
                >
                  <span>EXPLORE WORKS</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href="#manifesto"
                  className="group inline-flex items-center gap-2 text-white/70 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors pb-0.5 border-b border-white/20 hover:border-white"
                >
                  <span>Read the manifesto</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive ASCII Veiled Statue with breathing room */}
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
