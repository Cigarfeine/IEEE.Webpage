"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

// High-precision monospace scramble text matching preloader
function ScrambleText({
  text = "LOADING",
  duration = 0.75,
  runId = 0,
}: {
  text?: string;
  duration?: number;
  runId?: number;
}) {
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

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const squaresRef = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioningRef = useRef<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [runId, setRunId] = useState<number>(0);

  const startTransition = useCallback(
    (targetHref: string, onExecute?: () => void) => {
      // Prevent overlapping transitions
      if (isTransitioningRef.current) return;

      // Don't trigger if initial preloader is still running
      const preloaderActive = document.querySelector(
        '[data-preloader="true"]:not([aria-hidden="true"])'
      );
      if (preloaderActive) return;

      isTransitioningRef.current = true;
      setActive(true);
      setRunId((r) => r + 1);

      const overlay = overlayRef.current;
      const center = centerRef.current;
      const squares = squaresRef.current.filter(Boolean);

      if (!overlay || !center) {
        isTransitioningRef.current = false;
        setActive(false);
        return;
      }

      // 1. Close any open navigation drawers/menus immediately
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("closeMenu"));
      }

      // 2. Lenis Scroll Lock (without altering body overflow to eliminate layout jitter)
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.stop();
      }

      // 2. Prepare visual states immediately in DOM
      overlay.classList.remove("pointer-events-none", "opacity-0", "invisible");
      overlay.classList.add("pointer-events-auto", "opacity-100", "visible");
      overlay.style.visibility = "visible";
      overlay.style.pointerEvents = "auto";
      overlay.style.opacity = "1";
      overlay.style.willChange = "clip-path";
      gsap.set(center, { opacity: 0, y: 10 });
      squares.forEach((sq, idx) => {
        if (sq) {
          gsap.set(sq, {
            x: idx === 0 ? -16 : (idx - 1) * 18,
            rotate: 0,
          });
        }
      });

      // Accessible reduced motion branch
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        if (onExecute) onExecute();
        if (targetHref?.startsWith("#")) {
          const el = document.querySelector(targetHref);
          if (el) el.scrollIntoView({ behavior: "auto" });
          window.history.pushState(null, "", targetHref);
        }
        overlay.classList.remove("pointer-events-auto", "opacity-100", "visible");
        overlay.classList.add("pointer-events-none", "opacity-0", "invisible");
        overlay.style.visibility = "hidden";
        overlay.style.pointerEvents = "none";
        overlay.style.opacity = "0";
        overlay.style.willChange = "auto";
        isTransitioningRef.current = false;
        setActive(false);
        if (typeof window !== "undefined" && (window as any).lenis) {
          (window as any).lenis.start();
        }
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          overlay.classList.remove("pointer-events-auto", "opacity-100", "visible");
          overlay.classList.add("pointer-events-none", "opacity-0", "invisible");
          overlay.style.visibility = "hidden";
          overlay.style.pointerEvents = "none";
          overlay.style.opacity = "0";
          overlay.style.willChange = "auto";
          isTransitioningRef.current = false;
          setActive(false);
          if (typeof window !== "undefined" && (window as any).lenis) {
            (window as any).lenis.start();
          }
        },
      });
      if (typeof window !== "undefined") {
        (window as any).pageTransitionTimeline = tl;
      }

      // Step A: Velvety Curtain Wipe Up (enters from bottom in 0.28s)
      tl.fromTo(
        overlay,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.28,
          ease: "power3.inOut",
        },
        0
      );

      // Step B: Center Content Reveal (starts at 0.15s)
      tl.to(
        center,
        {
          opacity: 1,
          y: 0,
          duration: 0.18,
          ease: "power2.out",
        },
        0.15
      );

      // 4-Cube Tumbling Stagger (all 4 cubes tumble across rapidly between 0.16s and 0.55s)
      squares.forEach((sq, idx) => {
        if (!sq) return;
        tl.to(
          sq,
          {
            x: 18 * idx - 16,
            rotate: 90,
            duration: 0.35,
            ease: "expo.inOut",
          },
          0.16 + idx * 0.05
        );
      });

      // Step C: Silent Destination Relocation Under The Pitch Obsidian Curtain (at 0.48s)
      tl.add(() => {
        if (onExecute) {
          onExecute();
        } else if (targetHref) {
          if (targetHref.startsWith("#")) {
            const isTop =
              targetHref === "#hero" ||
              targetHref === "#top" ||
              targetHref === "#";
            const el = isTop
              ? document.getElementById("hero") || document.body
              : document.querySelector(targetHref);

            if (el) {
              const offset = isTop ? 0 : -25;
              if (typeof window !== "undefined" && (window as any).lenis) {
                (window as any).lenis.scrollTo(el, {
                  offset,
                  immediate: true,
                  force: true,
                });
              } else {
                const targetTop =
                  el.getBoundingClientRect().top +
                  window.scrollY +
                  offset;
                window.scrollTo({
                  top: targetTop,
                  behavior: "instant" as ScrollBehavior,
                });
              }

              // Update GSAP ScrollTrigger to match new scroll position immediately
              if (
                typeof window !== "undefined" &&
                (window as any).ScrollTrigger
              ) {
                (window as any).ScrollTrigger.refresh();
              }
            }
            window.history.pushState(null, "", targetHref);
          } else if (targetHref === "/" || targetHref === "/#") {
            if (typeof window !== "undefined" && (window as any).lenis) {
              (window as any).lenis.scrollTo(0, {
                immediate: true,
                force: true,
              });
            } else {
              window.scrollTo({
                top: 0,
                behavior: "instant" as ScrollBehavior,
              });
            }
            if (
              typeof window !== "undefined" &&
              (window as any).ScrollTrigger
            ) {
              (window as any).ScrollTrigger.refresh();
            }
            window.history.pushState(null, "", "/");
          }
        }
      }, 0.48);

      // Step D: Center Content Soft Fade Out (0.52s -> 0.70s)
      tl.to(
        center,
        {
          opacity: 0,
          y: -8,
          duration: 0.18,
          ease: "power2.out",
        },
        0.52
      );

      // Step E: Good-Fella Signature Dual-Phase Diagonal Polygon Curtain Wipe Peel (0.58s -> 1.24s)
      const clipProgress = { value: 0 };
      const applyClip = (v: number) => {
        if (overlay) {
          overlay.style.clipPath =
            v <= 0
              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : v >= 1
              ? "polygon(0% 100%, 0% 100%, 0% 100%)"
              : v <= 0.5
              ? `polygon(0% 100%, ${2 * v * 100}% 0%, 100% 0%, 100% 100%)`
              : `polygon(0% 100%, 100% ${(v - 0.5) * 200}%, 100% 100%)`;
        }
      };

      tl.to(
        clipProgress,
        {
          value: 1,
          duration: 0.66,
          ease: "expo.inOut",
          onUpdate: () => {
            applyClip(clipProgress.value);
          },
        },
        0.58
      );
    },
    []
  );

  useEffect(() => {
    // Expose global helper for custom triggers
    if (typeof window !== "undefined") {
      (window as any).triggerPageTransition = (
        targetHref: string,
        onExecute?: () => void
      ) => {
        startTransition(targetHref, onExecute);
      };
    }

    const handleClick = (e: MouseEvent) => {
      // Only handle standard left click without modifier keys
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        return;
      }

      // Search for closest anchor or element with transition markers
      const targetEl = (e.target as HTMLElement).closest(
        "a, [data-transition], [data-transition-target]"
      );
      if (!targetEl) return;

      const href =
        targetEl.getAttribute("data-transition-target") ||
        targetEl.getAttribute("href");
      if (!href) return;

      // Ignore external, protocol, or new window links
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        href === "#" ||
        targetEl.getAttribute("target") === "_blank" ||
        targetEl.hasAttribute("download")
      ) {
        return;
      }

      // Intercept in-page anchors, root, or same-origin paths
      const isAnchor = href.startsWith("#");
      const isHome = href === "/" || href === "/#";
      const isInternalPath =
        href.startsWith("/") && !href.includes(".") && !href.startsWith("//");

      if (isAnchor || isHome || isInternalPath) {
        e.preventDefault();
        startTransition(href);
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      if (typeof window !== "undefined") {
        delete (window as any).triggerPageTransition;
      }
    };
  }, [startTransition]);

  return (
    <div
      ref={overlayRef}
      data-page-transition="true"
      aria-hidden={!active}
      className={`fixed inset-0 z-[9990] flex items-center justify-center bg-[#07090a] text-white select-none touch-none overscroll-none transition-opacity duration-200 ${
        active
          ? "pointer-events-auto opacity-100 visible"
          : "pointer-events-none opacity-0 invisible"
      }`}
      style={{
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        contain: "strict",
      }}
    >
      {/* Pure Focused Center Animation */}
      <div ref={centerRef} className="flex flex-col items-center gap-5">
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
          <ScrambleText text="LOADING" duration={0.7} runId={runId} />
        </div>
      </div>
    </div>
  );
}
