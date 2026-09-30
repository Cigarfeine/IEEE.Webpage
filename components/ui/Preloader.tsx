"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function ScrambleText({ text = "LOADING", duration = 1.1, runId = 0 }: { text?: string; duration?: number; runId?: number }) {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const target = text;
    const startTime = performance.now();
    let animId: number;

    const update = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const revealedCount = Math.floor(progress * target.length);

      let result = "";
      for (let i = 0; i < target.length; i++) {
        if (i < revealedCount) {
          result += target[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      if (elRef.current) {
        elRef.current.textContent = result;
      }

      if (progress < 1) {
        animId = requestAnimationFrame(update);
      } else if (elRef.current) {
        elRef.current.textContent = target;
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [text, duration, runId]);

  return (
    <span
      ref={elRef}
      className="font-mono text-[11px] font-medium tracking-[0.28em] uppercase text-white/50 select-none tabular-nums"
    >
      {text}
    </span>
  );
}

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [runId, setRunId] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const squaresRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).replayPreloader = () => {
        setComplete(false);
        setRunId((r) => r + 1);
      };
    }
  }, []);

  useGSAP(() => {
    if (complete) return;

    // Reset overlay styles if replaying
    if (overlayRef.current) {
      overlayRef.current.style.visibility = "visible";
      overlayRef.current.style.pointerEvents = "auto";
      overlayRef.current.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    }
    if (centerRef.current) {
      gsap.set(centerRef.current, { opacity: 1, y: 0 });
    }

    // 1. Lenis Scroll Lock (without altering body overflow to avoid layout scrollbar jumps)
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        // Unlock scroll when complete
        if (typeof window !== "undefined" && (window as any).lenis) {
          (window as any).lenis.start();
        }
        setComplete(true);
      },
    });
    timelineRef.current = tl;
    if (typeof window !== "undefined") {
      (window as any).preloaderTimeline = tl;
    }

    // 2. Good-Fella Signature 4-Block Tumbling Geometry
    const squares = squaresRef.current.filter(Boolean);
    squares.forEach((sq, idx) => {
      if (!sq) return;
      tl.fromTo(
        sq,
        {
          x: idx === 0 ? -16 : (idx - 1) * 18,
          rotate: 0,
        },
        {
          x: 18 * idx - 16,
          rotate: 90,
          duration: 0.7,
          ease: "expo.inOut",
          immediateRender: false,
        },
        idx === 0 ? 0 : ">-25%"
      );
    });

    // Exact Good-Fella timeline marker: 2.275s
    const wipeStartTime = 2.275;

    // 3. Fade Out Center Content
    tl.to(
      centerRef.current,
      {
        opacity: 0,
        y: -10,
        duration: 0.35,
        ease: "power3.out",
      },
      wipeStartTime + 0.1
    );

    // 4. Signature Good-Fella Dual-Phase Diagonal Polygon Curtain Wipe
    const clipProgress = { value: 0 };

    tl.to(
      clipProgress,
      {
        value: 1,
        duration: 1.35,
        ease: "expo.inOut",
        onUpdate: () => {
          const v = clipProgress.value;
          if (overlayRef.current) {
            // Good-Fella exact dual-phase diagonal clip polygon
            overlayRef.current.style.clipPath =
              v <= 0
                ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                : v >= 1
                ? "polygon(0% 100%, 0% 100%, 0% 100%)"
                : v <= 0.5
                ? `polygon(0% 100%, ${2 * v * 100}% 0%, 100% 0%, 100% 100%)`
                : `polygon(0% 100%, 100% ${(v - 0.5) * 200}%, 100% 100%)`;
          }
        },
      },
      wipeStartTime
    );

    // Cleanly hide without triggering layout reflow & free GPU layer
    tl.set(overlayRef.current, {
      visibility: "hidden",
      pointerEvents: "none",
      willChange: "auto",
    });

    return () => {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
      tl.kill();
    };
  }, [complete, runId]);

  return (
    <div
      ref={overlayRef}
      data-preloader="true"
      aria-hidden={complete}
      className={`fixed inset-0 z-[10000] flex items-center justify-center bg-[#07090a] text-white select-none touch-none overscroll-none transition-opacity duration-300 ${
        complete ? "pointer-events-none opacity-0 invisible" : "pointer-events-auto opacity-100 visible"
      }`}
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        contain: "strict",
      }}
    >
      {/* Pure Focused Center Animation */}
      <div
        ref={centerRef}
        className="flex flex-col items-center gap-5"
      >
        {/* Signature 4-Block Tumbling Geometry */}
        <div
          className="relative overflow-x-clip overflow-y-visible"
          style={{ width: 70, height: 16 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              ref={(el) => {
                squaresRef.current[i] = el;
              }}
              className="absolute top-0 left-0 bg-lime rounded-[1.5px]"
              style={{
                width: 16,
                height: 16,
                transform: "translateX(-16px)",
                transformOrigin: "bottom right",
              }}
            />
          ))}
        </div>

        {/* Minimalist Subdued Scramble Text */}
        <div className="overflow-hidden h-4 flex items-center justify-center">
          <ScrambleText text="LOADING" duration={1.2} runId={runId} />
        </div>
      </div>
    </div>
  );
}
