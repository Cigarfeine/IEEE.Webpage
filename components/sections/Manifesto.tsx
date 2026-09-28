"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ButtonRoll from "@/components/ui/ButtonRoll";
import SectionOverlay from "@/components/ui/SectionOverlay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface PillarItem {
  idx: string;
  title: string;
  desc: string;
  image: string;
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePillar, setActivePillar] = useState<number>(0);
  const [squareTop, setSquareTop] = useState<number>(0);

  const pillars: PillarItem[] = [
    {
      idx: "01",
      title: "Systems Architecture.",
      desc: "Distributed systems, low-latency microservices, and Linux kernel telemetry designed for mission-critical reliability.",
      image: "/assets/gallery/fig4-lecture.jpg",
    },
    {
      idx: "02",
      title: "Machine Intelligence.",
      desc: "Deep neural networks, high-throughput transformer pipelines, and edge TPU deployment frameworks running inference at scale.",
      image: "/assets/gallery/fig1-workshop.jpg",
    },
    {
      idx: "03",
      title: "Cyber-Physical Security.",
      desc: "Hardened kernel protocols, zero-trust cryptographic primitives, and resilient cyber-defense architectures tested in the wild.",
      image: "/assets/gallery/fig2-hackathon.jpg",
    },
    {
      idx: "04",
      title: "Global Fellowship.",
      desc: "Direct integration with global IEEE Computer Society chapters, indexed research publications, and international symposiums.",
      image: "/assets/gallery/fig3-committee.jpg",
    },
  ];

  // Measure and align sliding indicator square with active pillar
  useEffect(() => {
    const el = itemRefs.current[activePillar];
    if (el) {
      setSquareTop(el.offsetTop + 6);
    }
  }, [activePillar]);

  const scrollToPillar = (idx: number) => {
    setActivePillar(idx);
    if (!pinRef.current) return;

    // Calculate vertical offset within the pinned scroll area
    const pinRect = pinRef.current.getBoundingClientRect();
    const currentScroll = window.scrollY;
    const pinTop = pinRect.top + currentScroll;
    const pinHeight = pinRef.current.offsetHeight - window.innerHeight;
    // Target the center of each step interval to avoid edge flicker
    const targetScroll = pinTop + ((idx + 0.35) / 4) * pinHeight;

    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(targetScroll, {
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Stacked Card Overlap Dimming Trigger for preceding hero
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          const heroOverlay = document.getElementById("hero-overlay");
          if (heroOverlay) {
            heroOverlay.style.opacity = `${self.progress * 0.65}`;
          }
        },
      });

      // Kinetic Word-by-Word Scrubbing Reveal
      gsap.fromTo(
        ".manifesto-word",
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto-quote-wrap",
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );

      // Good-Fella style window parallax for top council photo
      gsap.fromTo(
        ".manifesto-parallax-img",
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto-img-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Good-Fella style Pinned ScrollTrigger for "How we work" section (Desktop only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (pinRef.current) {
          ScrollTrigger.create({
            trigger: pinRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
            onUpdate: (self) => {
              const step = Math.min(3, Math.floor(self.progress * 4));
              setActivePillar(step);
            },
          });
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      data-overlap-previous=""
      className="relative z-20 py-24 sm:py-32 bg-paper text-ink rounded-t-[2.5rem] sm:rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
    >
      <SectionOverlay id="manifesto-overlay" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-black/10 mb-16">
          <span className="font-mono text-xs text-black/50 uppercase tracking-widest">
            Chapter Manifesto
          </span>
          <span className="font-mono text-xs text-black/40">
            2026
          </span>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Media Card & Sticky Chapter Mark */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="manifesto-img-container relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 shadow-lg group">
              <div className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image
                  src="/assets/gallery/fig3-committee.jpg"
                  alt="IEEE CS Executive Council"
                  fill
                  className="manifesto-parallax-img object-cover scale-105 transition-transform duration-700 group-hover:scale-110 will-change-transform"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-lime/90 block mb-1">
                  Leadership Council
                </span>
                <span className="font-display font-medium text-base">
                  Executive Committee
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
              <span className="font-mono text-xs uppercase tracking-wider text-black/50 block mb-2">
                AFFILIATION
              </span>
              <p className="font-medium text-sm text-black/80 leading-relaxed">
                Affiliated with IEEE Computer Society, IEEE Kerala Section, and Mar
                Athanasius College of Engineering Kothamangalam / MBITS Student Branch.
              </p>
            </div>
          </div>

          {/* Right Column: High-Impact Typography */}
          <div className="lg:col-span-7 flex flex-col">
            <h2 className="font-display font-extrabold uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tighter text-black mb-8">
              WE FORGE <br />
              <span className="font-serif italic font-normal text-petrol lowercase tracking-normal">
                production-grade
              </span>{" "}
              ENGINEERS.
            </h2>

            <div className="space-y-6 text-black/80 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                At IEEE Computer Society MBITS, we are more than just a collegiate
                organization. We are an intensive laboratory where ambitious software
                builders, systems architects, and machine learning researchers collaborate to
                solve high-complexity computing problems.
              </p>
              <div className="manifesto-quote-wrap p-6 sm:p-8 rounded-2xl bg-black/5 border-l-4 border-petrol font-medium text-black text-lg sm:text-xl leading-relaxed">
                {`"We believe genuine engineering isn't just about syntax—it's about architecting resilient systems that endure under extreme load, high throughput, and real-world failure modes."`
                  .split(" ")
                  .map((word, idx) => (
                    <span
                      key={idx}
                      className="manifesto-word inline-block mr-1.5 will-change-[opacity]"
                    >
                      {word}
                    </span>
                  ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonRoll href="#tracks" variant="dark" size="md" withArrow>
                EXPLORE TRACKS
              </ButtonRoll>
              <ButtonRoll href="#membership" variant="paper" size="md">
                VIEW MEMBERSHIP
              </ButtonRoll>
            </div>
          </div>
        </div>

        {/* =========================================================================
            HOW WE WORK / CORE DISCIPLINES: Good-Fella Pinned Scroll Architecture
           ========================================================================= */}
        <div
          ref={pinRef}
          className="relative lg:min-h-[320vh] mt-24 pt-16 border-t border-black/10"
        >
          {/* Sticky Viewport Stage for Desktop */}
          <div className="sticky top-0 h-screen hidden lg:flex flex-col justify-center">
            
            {/* Good-Fella Header Row */}
            <div className="flex items-end justify-between pb-8 mb-12 border-b border-black/10">
              <div>
                <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-[0.95]">
                  How we work.
                </h3>
              </div>
              <span className="font-mono text-xs text-petrol font-medium uppercase tracking-wider">
                Core Disciplines
              </span>
            </div>

            {/* Split Screen Stage: Left Interactive List, Right Vertical Image Strip */}
            <div className="grid grid-cols-12 gap-12 xl:gap-16 items-center">
              
              {/* Left Column: Interactive Stepper List with Sliding & Rotating Square */}
              <div className="col-span-7 relative pl-10 py-2">
                
                {/* Good-Fella Sliding & Rotating Indicator Square */}
                <div
                  className="absolute left-0 w-3 h-3 bg-petrol shadow-xs pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    transform: `translateY(${squareTop}px) rotate(${activePillar * 90}deg)`,
                  }}
                />

                <div className="space-y-12">
                  {pillars.map((pillar, i) => {
                    const isActive = activePillar === i;
                    return (
                      <div
                        key={pillar.idx}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        onClick={() => scrollToPillar(i)}
                        className="group flex items-start gap-6 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] select-none"
                        style={{
                          transform: isActive ? "translateX(48px)" : "translateX(0px)",
                          opacity: isActive ? 1 : 0.35,
                        }}
                      >
                        <span className="font-mono text-base font-semibold text-black/50 mt-1">
                          {pillar.idx}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-2xl xl:text-3xl text-black mb-2 transition-colors group-hover:text-petrol">
                            {pillar.title}
                          </h4>
                          <p className="text-sm xl:text-base text-black/70 leading-relaxed max-w-xl font-normal">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Sliding Vertical Image Strip */}
              <div className="col-span-5 flex justify-end">
                <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.25)] border border-black/10 bg-black/5">
                  <div
                    className="flex h-full flex-col transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      transform: `translateY(-${activePillar * 100}%)`,
                    }}
                  >
                    {pillars.map((pillar, i) => (
                      <div
                        key={pillar.idx}
                        className="relative h-full w-full flex-shrink-0"
                      >
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                          priority={i === 0}
                        />

                        {/* Subtle Editorial Gradient Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                        {/* Bottom Metadata Tag */}
                        <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                          <span className="font-mono text-xs uppercase tracking-widest text-lime/90 block mb-1">
                            Discipline {pillar.idx}
                          </span>
                          <span className="font-display font-bold text-xl block">
                            {pillar.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Responsive Fallback Layout */}
          <div className="block lg:hidden space-y-12">
            <div className="flex items-end justify-between pb-4 border-b border-black/10">
              <h3 className="font-display font-bold text-3xl sm:text-4xl text-black">
                How we work.
              </h3>
              <span className="font-mono text-xs text-petrol font-medium uppercase tracking-wider">
                Core Disciplines
              </span>
            </div>

            {pillars.map((pillar) => (
              <div
                key={pillar.idx}
                className="space-y-4 p-5 rounded-2xl bg-white border border-black/10 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-petrol rounded-xs" />
                  <span className="font-mono text-xs font-bold text-black/50">
                    {pillar.idx}
                  </span>
                  <h4 className="font-display font-bold text-xl text-black">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-sm text-black/70 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-black/10">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="font-mono text-[10px] uppercase text-lime/90 block">
                      Discipline {pillar.idx}
                    </span>
                    <span className="font-display font-bold text-base">
                      {pillar.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
