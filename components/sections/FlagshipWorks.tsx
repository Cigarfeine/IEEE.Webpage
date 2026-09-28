"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ButtonRoll from "@/components/ui/ButtonRoll";
import SectionOverlay from "@/components/ui/SectionOverlay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface WorkProject {
  id: string;
  title: string;
  discipline: string;
  year: string;
  image: string;
  desc: string;
  link: string;
}

export default function FlagshipWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorTop, setIndicatorTop] = useState<number>(0);

  const works: WorkProject[] = [
    {
      id: "01",
      title: "KRAKEN EBPF KERNEL",
      discipline: "Systems Kernel · C / Rust",
      year: "2026",
      image: "/assets/gallery/fig4-lecture.jpg",
      desc: "Low-overhead Linux kernel observability instrumentation and high-throughput network packet telemetry.",
      link: "#join",
    },
    {
      id: "02",
      title: "NEURAL ACCELERATOR",
      discipline: "Neural Engine · PyTorch / CUDA",
      year: "2025",
      image: "/assets/gallery/fig1-workshop.jpg",
      desc: "Distributed transformer inference engine with 4-bit INT4 quantization and custom flash-attention kernels.",
      link: "#join",
    },
    {
      id: "03",
      title: "HACKGENESIS 48H",
      discipline: "Distributed Systems · Next.js / Go",
      year: "2025",
      image: "/assets/gallery/fig2-hackathon.jpg",
      desc: "48-hour continuous software sprint deploying 40+ concurrent real-time microservices across 200+ engineers.",
      link: "#join",
    },
    {
      id: "04",
      title: "DISTRIBUTED CONSENSUS RAFT",
      discipline: "Consensus Engine · Rust",
      year: "2024",
      image: "/assets/gallery/fig3-committee.jpg",
      desc: "Byzantine-resilient distributed state replication engine with sub-5ms heartbeat failover and formal verification.",
      link: "#join",
    },
  ];

  // Update sliding indicator position on active index change
  useEffect(() => {
    const el = thumbnailRefs.current[activeIdx];
    if (el) {
      setIndicatorTop(el.offsetTop + el.offsetHeight / 2 - 4);
    }
  }, [activeIdx]);

  const scrollToProject = (index: number) => {
    setActiveIdx(index);
    const target = document.getElementById(`work-project-${index}`);
    if (!target) return;

    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(target, {
        offset: -100,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Overlap dimming for previous section (Manifesto)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          const manifestoOverlay = document.getElementById("manifesto-overlay");
          if (manifestoOverlay) {
            manifestoOverlay.style.opacity = `${self.progress * 0.6}`;
          }
        },
      });

      // Synchronize active project thumbnail with right-hand scrolling stream
      works.forEach((_, idx) => {
        const el = document.getElementById(`work-project-${idx}`);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIdx(idx);
            }
          },
        });
      });

      // Good-Fella style smooth inertial parallax + entrance scaling
      const cards = gsap.utils.toArray<HTMLElement>(".work-project-card");
      cards.forEach((card) => {
        const img = card.querySelector(".work-parallax-img");
        const stage = card.querySelector(".work-card-stage");

        // Inertial parallax scrub on inner image
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }

        // Smooth subtle card scale and entrance opacity
        if (stage) {
          gsap.fromTo(
            stage,
            { scale: 0.97, opacity: 0.85 },
            {
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 55%",
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="works"
      data-overlap-previous=""
      className="relative z-25 py-24 sm:py-32 lg:py-36 bg-[#0E1211] text-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] shadow-[0_-25px_60px_rgba(0,0,0,0.85)] border-t border-white/10"
    >
      <SectionOverlay id="works-overlay" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* ========================================================
              LEFT COLUMN: Good-Fella Sticky Navigation Rail
             ======================================================== */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 self-start flex flex-col justify-between h-auto lg:min-h-[560px] py-2">
            <div>
              {/* Monumental Headline */}
              <h2 className="font-sans font-bold text-5xl sm:text-6xl lg:text-[4.25rem] tracking-[-0.04em] text-white leading-[0.95]">
                Selected<br />
                work.
              </h2>

              {/* Editorial Sub-copy */}
              <p className="mt-6 text-sm text-white/50 leading-relaxed max-w-[280px]">
                Selected sites for consumer, systems and research initiatives. The code travels.
              </p>
            </div>

            {/* Desktop Vertical Thumbnails List with Sliding Active Needle */}
            <div className="hidden lg:flex flex-col gap-3.5 relative my-6 w-fit pr-6">
              {works.map((work, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={work.id}
                    ref={(el) => {
                      thumbnailRefs.current[idx] = el;
                    }}
                    onClick={() => scrollToProject(idx)}
                    className="group relative flex items-center text-left transition-all duration-300 focus:outline-none w-fit"
                    aria-label={`Scroll to ${work.title}`}
                  >
                    {/* Thumbnail Card with matching rounded shape */}
                    <div
                      className={`relative w-20 h-14 rounded-lg overflow-hidden bg-black/80 border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isActive
                          ? "border-lime/90 ring-1 ring-lime/50 opacity-100 shadow-[0_0_20px_rgba(203,235,58,0.25)] scale-105"
                          : "border-white/10 opacity-30 hover:opacity-85 hover:border-white/40 hover:scale-105"
                      }`}
                    >
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
                          isActive ? "opacity-0" : "opacity-40"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}

              {/* Smoothly Sliding Active Indicator Needle */}
              <div
                className="absolute right-0 w-2 h-2 bg-lime rounded-full shadow-[0_0_10px_rgba(203,235,58,0.9)] animate-pulse transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"
                style={{ transform: `translateY(${indicatorTop}px)` }}
              />
            </div>

            {/* Mobile / Tablet Horizontal Thumbnails Scroller */}
            <div className="flex lg:hidden items-center gap-3 overflow-x-auto my-6 pb-2 scrollbar-none">
              {works.map((work, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={work.id}
                    onClick={() => scrollToProject(idx)}
                    className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border transition-all duration-300 ${
                      isActive
                        ? "border-lime ring-1 ring-lime/60 opacity-100 scale-105"
                        : "border-white/10 opacity-30"
                    }`}
                  >
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* View All Button matching overall website button architecture */}
            <div className="pt-2">
              <ButtonRoll href="#join" variant="lime" size="md" withArrow>
                VIEW ALL
              </ButtonRoll>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: High-Fidelity Scrolling Projects Feed
             ======================================================== */}
          <div className="lg:col-span-8 flex flex-col space-y-24 sm:space-y-32">
            {works.map((work, idx) => (
              <div
                key={work.id}
                id={`work-project-${idx}`}
                className="work-project-card group relative scroll-mt-28"
              >
                {/* Showcase Stage Container with matching rounded-2xl sm:rounded-3xl */}
                <div className="work-card-stage relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#141918] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-lime/40 group-hover:shadow-[0_25px_60px_rgba(203,235,58,0.12)]">
                  
                  {/* Inertial Parallax Image Inside Stage */}
                  <div className="absolute inset-[-8%] w-[116%] h-[116%] overflow-hidden">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 68vw"
                      className="work-parallax-img object-cover will-change-transform filter brightness-95 group-hover:brightness-105 group-hover:scale-[1.07] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      priority={idx === 0}
                    />
                  </div>

                  {/* High-end Cinematic Studio Lighting & Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25 pointer-events-none transition-opacity duration-700 group-hover:opacity-70" />

                  {/* Clean Inset Action Badge with tactile hover reaction */}
                  <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 group-hover:translate-x-1">
                    <ButtonRoll href={work.link} variant="lime" size="sm" withArrow>
                      VIEW PROJECT
                    </ButtonRoll>
                  </div>
                </div>

                {/* Metadata Row Under Image */}
                <div className="mt-4 px-1 flex flex-wrap items-center justify-between gap-3 font-mono">
                  <h3 className="font-sans font-bold uppercase text-sm sm:text-base text-white group-hover:text-lime transition-colors duration-300 tracking-wider">
                    {work.title}
                  </h3>
                  <span className="text-xs text-white/50 tracking-wider">
                    {work.discipline}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
