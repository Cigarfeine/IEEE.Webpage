"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ButtonRoll from "@/components/ui/ButtonRoll";
import SectionOverlay from "@/components/ui/SectionOverlay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getAssetPath } from "@/lib/utils";

interface PillarItem {
  idx: string;
  title: string;
  desc: string;
  image: string;
  specCode: string;
  chips: string[];
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const railProgressRef = useRef<HTMLDivElement>(null);
  const beaconRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const [activePillar, setActivePillar] = useState<number>(0);
  const [beaconTop, setBeaconTop] = useState<number>(0);
  const activePillarRef = useRef<number>(0);

  // 3D Perspective Tilt state for archival media card
  const [cardTilt, setCardTilt] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const pillars: PillarItem[] = [
    {
      idx: "01",
      title: "Systems Architecture.",
      desc: "Distributed systems, low-latency microservices, and Linux kernel telemetry designed for mission-critical reliability under extreme concurrency.",
      image: getAssetPath("/assets/gallery/fig4-lecture.jpg"),
      specCode: "SYS-KERNEL // TELEMETRY & LOW-LATENCY IPC",
      chips: ["POSIX Concurrency", "Distributed Raft", "Zero-Copy I/O"],
    },
    {
      idx: "02",
      title: "Machine Intelligence.",
      desc: "Deep neural networks, high-throughput transformer pipelines, and edge TPU deployment frameworks running inference at production scale.",
      image: getAssetPath("/assets/gallery/fig1-workshop.jpg"),
      specCode: "NEURAL-NETS // TRANSFORMER PIPELINES & EDGE TPU",
      chips: ["Tensor Parallelism", "ViT Architecture", "Quantized Edge"],
    },
    {
      idx: "03",
      title: "Cyber-Physical Security.",
      desc: "Hardened kernel protocols, zero-trust cryptographic primitives, and resilient cyber-defense architectures battle-tested in adversarial environments.",
      image: getAssetPath("/assets/gallery/fig2-hackathon.jpg"),
      specCode: "ZERO-TRUST // CRYPTOGRAPHIC KERNEL PRIMITIVES",
      chips: ["eBPF Observability", "Zero-Trust Primitives", "Adversarial CTF"],
    },
    {
      idx: "04",
      title: "Global Fellowship.",
      desc: "Direct integration with global IEEE Computer Society chapters, indexed research publications, and international symposium cohorts across 160+ countries.",
      image: getAssetPath("/assets/gallery/fig3-committee.jpg"),
      specCode: "IEEE R10 // PEER-INDEXED RESEARCH ARCHIVE",
      chips: ["IEEE Xplore Archive", "Region 10 Summit", "Fellowship Network"],
    },
  ];

  // Align docking indicator square with active pillar
  const updateBeaconPosition = useCallback((index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      // Align square center with first text line
      setBeaconTop(el.offsetTop + 8);
    }
  }, []);

  useEffect(() => {
    updateBeaconPosition(activePillar);
  }, [activePillar, updateBeaconPosition]);

  // Handle 3D perspective mouse tilt on desktop
  const handleMediaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setCardTilt({ x, y, active: true });
  };

  const handleMediaMouseLeave = () => {
    setCardTilt({ x: 0, y: 0, active: false });
  };

  // Smooth scroll to a discipline when clicked
  const scrollToPillar = (idx: number) => {
    setActivePillar(idx);
    activePillarRef.current = idx;
    updateBeaconPosition(idx);

    if (!pinRef.current) return;

    const pinRect = pinRef.current.getBoundingClientRect();
    const currentScroll = window.scrollY;
    const pinTop = pinRect.top + currentScroll;
    const pinHeight = pinRef.current.offsetHeight - window.innerHeight;
    const targetScroll = pinTop + ((idx + 0.25) / 4) * pinHeight;

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

      // Split-Line Upward Mask Reveal for H2 Headline
      gsap.fromTo(
        ".manifesto-hero-line",
        { yPercent: 110, skewY: 3 },
        {
          yPercent: 0,
          skewY: 0,
          stagger: 0.12,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".manifesto-hero-line",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Kinetic Word-by-Word Scrubbing Reveal (Apple/Awwwards contrast)
      gsap.fromTo(
        ".manifesto-word",
        { opacity: 0.16, color: "rgba(17, 17, 17, 0.2)" },
        {
          opacity: 1,
          color: "rgba(17, 17, 17, 1)",
          stagger: 0.035,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto-quote-wrap",
            start: "top 78%",
            end: "bottom 48%",
            scrub: 0.5,
          },
        }
      );

      // Window parallax for top leadership council photo
      gsap.fromTo(
        ".manifesto-parallax-img",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".manifesto-img-container",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Pinned ScrollTrigger for "How we work" showcase (Desktop min-width: 1024px)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (!pinRef.current) return;

        ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.4,
          onUpdate: (self) => {
            // Update active discipline integer step without rapid React re-render thrashing
            const step = Math.min(3, Math.floor(self.progress * 4));
            if (step !== activePillarRef.current) {
              activePillarRef.current = step;
              setActivePillar(step);
            }

            // Direct GPU-accelerated progress rail filling
            if (railProgressRef.current) {
              railProgressRef.current.style.transform = `scaleY(${self.progress})`;
            }

            // Intra-step progress calculation for active card sub-progress bar
            const stepProgress = (self.progress * 4) % 1;
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${Math.max(
                0.04,
                stepProgress
              )})`;
            }
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      data-overlap-previous=""
      className="relative z-20 py-24 sm:py-32 bg-paper text-ink rounded-t-[2.5rem] sm:rounded-t-[3.5rem] shadow-[0_-25px_60px_rgba(0,0,0,0.45)]"
    >
      <SectionOverlay id="manifesto-overlay" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Architectural Coordinates & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-black/10 mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-petrol animate-pulse" />
            <span className="font-mono text-xs text-black/70 uppercase tracking-widest">
              Chapter Manifesto // 01
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-black/45 tracking-widest uppercase">
            <span>08°33&apos;N 76°32&apos;E</span>
            <span>//</span>
            <span>CHARTER CODE: 0626</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-black/60 font-medium tracking-wider">
              FOLIO 2026
            </span>
          </div>
        </div>

        {/* 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Media Card with 3D Perspective Tilt & Archival Badge */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div
              onMouseMove={handleMediaMouseMove}
              onMouseLeave={handleMediaMouseLeave}
              style={{
                perspective: "1000px",
              }}
              className="group"
            >
              <div
                style={{
                  transform: cardTilt.active
                    ? `rotateX(${cardTilt.y}deg) rotateY(${cardTilt.x}deg) scale3d(1.02, 1.02, 1.02)`
                    : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
                  transition: cardTilt.active
                    ? "transform 0.15s ease-out"
                    : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
                className="manifesto-img-container relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 shadow-[0_20px_45px_rgba(0,0,0,0.18)] bg-black/5"
              >
                <div className="absolute inset-[-10%] w-[120%] h-[120%]">
                  <Image
                    src={getAssetPath("/assets/gallery/fig3-committee.jpg")}
                    alt="IEEE CS Executive Council"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="manifesto-parallax-img object-cover scale-105 transition-transform duration-700 group-hover:scale-110 will-change-transform"
                    priority
                  />
                </div>

                {/* Subtle Cinematic Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

                {/* Liquid Glass Archival Pill Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/90">
                    EXECUTIVE DIRECTORY // 2026
                  </span>
                </div>

                {/* Bottom Media Metadata */}
                <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-lime/95 block mb-1">
                    Leadership Council
                  </span>
                  <span className="font-display font-medium text-lg tracking-tight block">
                    Student Branch Executive Committee
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Affiliation Card */}
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xs border border-black/10 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-petrol font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-petrol" />
                  AFFILIATION // GLOBAL IEEE REGION 10
                </span>
                <span className="font-mono text-[10px] text-black/40 uppercase">
                  SB CODE: 64581
                </span>
              </div>
              <p className="font-medium text-sm text-black/80 leading-relaxed mb-4">
                Chartered under IEEE Computer Society, IEEE Kerala Section, and Mar
                Athanasius College of Engineering Kothamangalam / MBITS Student Branch network.
              </p>
              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-[11px] font-mono text-black/55">
                <span>PEER NETWORK: 400K+</span>
                <span>•</span>
                <span>CHAPTER EST. 2023</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Typography & Masked kinetic reveal */}
          <div className="lg:col-span-7 flex flex-col">
            <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.65rem] leading-[1.02] tracking-tight text-black mb-8 select-none">
              <span className="block overflow-hidden pb-1">
                <span className="manifesto-hero-line inline-block will-change-transform">
                  WE FORGE
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="manifesto-hero-line inline-block font-serif italic font-normal text-petrol lowercase tracking-normal will-change-transform">
                  production-grade
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="manifesto-hero-line inline-block will-change-transform">
                  ENGINEERS.
                </span>
              </span>
            </h2>

            <div className="space-y-6 text-black/80 text-base sm:text-lg leading-relaxed font-normal">
              <p className="max-w-[65ch]">
                At IEEE Computer Society MBITS, we are more than a collegiate
                organization. We operate an intensive workshop where ambitious software
                builders, systems architects, and machine intelligence researchers
                collaborate to build robust computing systems that withstand real-world chaos.
              </p>

              {/* Kinetic Quote Scrubbing Box */}
              <div className="manifesto-quote-wrap relative p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xs border border-black/10 border-l-4 border-l-petrol shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-petrol font-semibold">
                    CORE AXIOM // FOUNDATIONAL DOCTRINE
                  </span>
                  <span className="font-mono text-[10px] text-black/40">
                    REF. 01/26
                  </span>
                </div>
                <p className="font-medium text-lg sm:text-xl md:text-2xl leading-relaxed tracking-tight">
                  {`"We believe genuine engineering isn't just about syntax—it's about architecting resilient systems that endure under extreme load, high throughput, and real-world failure modes."`
                    .split(" ")
                    .map((word, idx) => (
                      <span
                        key={idx}
                        className="manifesto-word inline-block mr-1.5 will-change-[opacity,color] transition-colors"
                      >
                        {word}
                      </span>
                    ))}
                </p>
              </div>
            </div>

            {/* Action Bar & Cohort Badge */}
            <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
              <ButtonRoll href="#tracks" variant="dark" size="md" withArrow>
                EXPLORE TRACKS
              </ButtonRoll>
              <ButtonRoll href="#membership" variant="paper" size="md">
                VIEW MEMBERSHIP
              </ButtonRoll>
              <div className="hidden sm:flex items-center gap-2 pl-2 font-mono text-xs text-black/55">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>240+ ACTIVE FELLOWS</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            HOW WE WORK / CORE DISCIPLINES: Cinematic Pinned Scroll Architecture
           ========================================================================= */}
        <div
          ref={pinRef}
          className="relative lg:min-h-[360vh] mt-24 pt-16 border-t border-black/10"
        >
          {/* Sticky Viewport Stage for Desktop (1024px+) */}
          <div className="sticky top-0 h-screen hidden lg:flex flex-col justify-center">
            
            {/* Header Row with Active Step Telemetry */}
            <div className="flex items-end justify-between pb-4 mb-6 xl:mb-8 border-b border-black/10">
              <div>
                <span className="font-mono text-xs text-petrol font-medium uppercase tracking-wider block mb-1">
                  Operating Principles
                </span>
                <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight leading-[0.95]">
                  How we work.
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-mono text-sm font-semibold text-black/60 bg-black/5 px-4 py-2 rounded-full border border-black/10">
                  <span className="text-petrol font-bold">{pillars[activePillar].idx}</span> / 04
                </div>
                <span className="font-mono text-xs text-black/50 font-medium uppercase tracking-wider hidden xl:inline">
                  CORE DISCIPLINES
                </span>
              </div>
            </div>

            {/* Split Screen Stage: Left Interactive Rail, Right Morphing Cinematic Deck */}
            <div className="grid grid-cols-12 gap-8 xl:gap-14 items-center">
              
              {/* Left Column: Interactive Stepper List with Architectural Rail */}
              <div className="col-span-7 relative pl-10 py-2">
                
                {/* Vertical Rail Track */}
                <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-black/10 rounded-full" />
                {/* Active Scaled Fill Line */}
                <div
                  ref={railProgressRef}
                  className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-petrol rounded-full origin-top will-change-transform"
                  style={{ transform: "scaleY(0)" }}
                />

                {/* Docking Beacon: Rotating square tracking active pillar */}
                <div
                  ref={beaconRef}
                  className="absolute left-0 w-4 h-4 bg-paper border-2 border-petrol rounded-xs shadow-xs pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center z-10"
                  style={{
                    transform: `translateY(${beaconTop}px) rotate(${activePillar * 90}deg)`,
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-petrol rounded-full" />
                </div>

                <div className="space-y-6 xl:space-y-7">
                  {pillars.map((pillar, i) => {
                    const isActive = activePillar === i;
                    return (
                      <div
                        key={pillar.idx}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        onClick={() => scrollToPillar(i)}
                        className={`group flex items-start gap-5 cursor-pointer select-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                          !isActive ? "hover:opacity-75 hover:translate-x-2" : ""
                        }`}
                        style={{
                          transform: isActive ? "translateX(36px)" : "translateX(0px)",
                          opacity: isActive ? 1 : 0.3,
                        }}
                      >
                        <span className={`font-mono text-base xl:text-lg font-bold transition-colors duration-500 mt-0.5 ${
                          isActive ? "text-petrol" : "text-black/40"
                        }`}>
                          {pillar.idx}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-xl xl:text-2xl text-black mb-1 transition-colors group-hover:text-petrol">
                            {pillar.title}
                          </h4>
                          <p className="text-xs xl:text-sm text-black/75 leading-relaxed max-w-xl font-normal line-clamp-2 mb-2">
                            {pillar.desc}
                          </p>
                          {/* Micro Spec Pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {pillar.chips.map((chip, cIdx) => (
                              <span
                                key={cIdx}
                                className={`font-mono text-[10px] xl:text-[11px] px-2 py-0.5 rounded-md transition-all duration-500 ${
                                  isActive
                                    ? "bg-petrol/10 text-petrol font-medium border border-petrol/20"
                                    : "bg-black/5 text-black/50 border border-black/5"
                                }`}
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Morphing Cinematic Frame (Depth Deck) */}
              <div className="col-span-5 flex justify-end">
                <div
                  ref={cardContainerRef}
                  className="relative w-full max-w-[390px] xl:max-w-[430px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.22)] border border-black/10 bg-black/10"
                >
                  {/* Stacked Image Layers with Cross-Zoom Depth Transitions */}
                  {pillars.map((pillar, i) => {
                    const isCurrent = activePillar === i;
                    return (
                      <div
                        key={pillar.idx}
                        className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-[opacity,transform]"
                        style={{
                          opacity: isCurrent ? 1 : 0,
                          transform: isCurrent ? "scale(1)" : "scale(1.08)",
                          pointerEvents: isCurrent ? "auto" : "none",
                        }}
                      >
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                          priority={i === 0}
                        />

                        {/* Cinematic Vignette & Edge Light */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/35 pointer-events-none" />

                        {/* Top Liquid Glass Spec Badge */}
                        <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                            <span className="font-mono text-[10px] uppercase tracking-wider text-white/90">
                              {pillar.specCode}
                            </span>
                          </div>
                          <span className="font-mono text-xs text-white/70 font-semibold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                            {pillar.idx}
                          </span>
                        </div>

                        {/* Bottom Overlay Information */}
                        <div className="absolute bottom-6 left-6 right-6 text-white z-20">
                          <span className="font-mono text-xs uppercase tracking-widest text-lime/95 block mb-1">
                            Discipline {pillar.idx}
                          </span>
                          <span className="font-display font-bold text-2xl block mb-2">
                            {pillar.title}
                          </span>
                          <p className="font-mono text-xs text-white/75 line-clamp-2 leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Intra-Step Progress Bar at bottom of card */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30 overflow-hidden">
                    <div
                      ref={progressBarRef}
                      className="h-full bg-lime origin-left will-change-transform"
                      style={{ transform: "scaleX(0.04)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Responsive Fallback Layout (< 1024px) */}
          <div className="block lg:hidden space-y-6">
            <div className="flex items-end justify-between pb-4 border-b border-black/10">
              <div>
                <span className="font-mono text-xs text-petrol font-medium uppercase tracking-wider block mb-1">
                  Operating Principles
                </span>
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-black">
                  How we work.
                </h3>
              </div>
              <span className="font-mono text-xs text-black/50 font-medium uppercase tracking-wider">
                4 Disciplines
              </span>
            </div>

            {/* Mobile quick-switch tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
              {pillars.map((p) => (
                <a
                  key={p.idx}
                  href={`#mobile-pillar-${p.idx}`}
                  className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-black/75 hover:text-petrol hover:border-petrol/40 whitespace-nowrap shadow-2xs transition-colors"
                >
                  <span className="font-bold text-petrol mr-1">{p.idx}</span>
                  {p.title.replace(".", "")}
                </a>
              ))}
            </div>

            {/* Mobile Cards with High-End Editorial Styling */}
            <div className="space-y-6">
              {pillars.map((pillar) => (
                <div
                  key={pillar.idx}
                  id={`mobile-pillar-${pillar.idx}`}
                  className="space-y-4 p-5 sm:p-6 rounded-2xl bg-white border border-black/10 shadow-sm scroll-mt-24"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-petrol rounded-xs rotate-45" />
                      <span className="font-mono text-xs font-bold text-petrol">
                        {pillar.idx}
                      </span>
                      <h4 className="font-display font-bold text-xl text-black">
                        {pillar.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-black/75 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 py-1">
                    {pillar.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-black/5 text-black/60 border border-black/5"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-black/10 shadow-sm">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/90">
                        {pillar.specCode}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
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
      </div>
    </section>
  );
}
