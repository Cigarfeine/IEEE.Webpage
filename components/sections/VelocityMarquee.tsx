"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function VelocityMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Continuous translation
      const tl = gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none",
      });

      const setSkew = gsap.quickTo(trackRef.current, "skewX", {
        duration: 0.35,
        ease: "power2.out",
      });

      // Scroll velocity skew with zero-allocation quickTo
      ScrollTrigger.create({
        trigger: marqueeRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const skewAmount = Math.max(-7, Math.min(7, velocity / 350));
          setSkew(skewAmount);
        },
      });
    },
    { scope: marqueeRef }
  );

  const marqueeItems = [
    "IEEE COMPUTER SOCIETY",
    "MBITS STUDENT BRANCH",
    "NEURAL SYSTEMS",
    "DISTRIBUTED INFRASTRUCTURE",
    "OPEN SOURCE CORE",
    "QUANTUM & EDGE",
  ];

  return (
    <div
      ref={marqueeRef}
      className="relative py-8 md:py-12 bg-obsidian-surface border-y border-white/10 overflow-hidden select-none z-10"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {/* Render 4 duplicates for infinite seamless loop */}
        {[0, 1, 2, 3].map((setIndex) => (
          <div key={setIndex} className="flex items-center gap-8 shrink-0">
            {marqueeItems.map((text, idx) => (
              <React.Fragment key={idx}>
                <span className="font-display font-extrabold uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight text-white/90 hover:text-lime transition-colors cursor-default">
                  {text}
                </span>

                {/* Alternating image thumbnail and lime icon */}
                {idx % 2 === 0 ? (
                  <div className="relative w-12 h-8 rounded-full overflow-hidden border border-lime/40 shrink-0">
                    <Image
                      src="/assets/gallery/fig1-workshop.jpg"
                      alt="Chapter snapshot"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <span className="w-3 h-3 rounded-full bg-lime shrink-0 shadow-[0_0_12px_#CBEB3A]" />
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
