"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAssetPath } from "@/lib/utils";

export type AsciiTheme = "copper" | "lime" | "white";

export interface DualAsciiHandsRef {
  cycleTheme: () => void;
  toggleGrid: () => void;
  theme: AsciiTheme;
  gridActive: boolean;
}

interface DualAsciiHandsProps {
  leftHandSrc?: string;
  rightHandSrc?: string;
  initialTheme?: AsciiTheme;
  className?: string;
  onThemeChange?: (theme: AsciiTheme) => void;
  onGridChange?: (grid: boolean) => void;
}

// Multi-stop color ramps for nuanced volumetric ASCII glow
const THEME_PALETTES = {
  copper: {
    name: "copper",
    base: "#ff6b4a",
    accent: "#ff9e80",
    shadow: "#b3381e",
    highlight: "#ffc2b3",
    glow: "rgba(255, 107, 74, 0.4)",
    ramp: (lum: number) => {
      if (lum < 0.25) return "#9e2f18";
      if (lum < 0.5) return "#d9532f";
      if (lum < 0.75) return "#ff6b4a";
      if (lum < 0.9) return "#ff8c69";
      return "#ffc2b3";
    },
  },
  lime: {
    name: "lime",
    base: "#CBEB3A",
    accent: "#E6FF66",
    shadow: "#729107",
    highlight: "#F5FFB8",
    glow: "rgba(203, 235, 58, 0.4)",
    ramp: (lum: number) => {
      if (lum < 0.25) return "#587004";
      if (lum < 0.5) return "#93b814";
      if (lum < 0.75) return "#CBEB3A";
      if (lum < 0.9) return "#E6FF66";
      return "#F5FFB8";
    },
  },
  white: {
    name: "white",
    base: "#EAE6DF",
    accent: "#FFFFFF",
    shadow: "#78716C",
    highlight: "#FFFFFF",
    glow: "rgba(240, 235, 225, 0.4)",
    ramp: (lum: number) => {
      if (lum < 0.25) return "#57534E";
      if (lum < 0.5) return "#A8A29E";
      if (lum < 0.75) return "#EAE6DF";
      if (lum < 0.9) return "#F5F5F4";
      return "#FFFFFF";
    },
  },
};

// Rich technical ASCII glyph sets as seen in good-fella.com
const DENSITY_GLYPHS = [
  " ",
  "·",
  ".",
  "-",
  ":",
  "~",
  "+",
  "=",
  "/",
  "\\",
  "[",
  "]",
  "x",
  "z",
  "v",
  "0",
  "#",
  "%",
  "@",
];

const SCRAMBLE_POOL = "{}[](/)\\+-_~=<>:;!?jrxnuvcz01*#%@";

const DualAsciiHands = forwardRef<DualAsciiHandsRef, DualAsciiHandsProps>(
  (
    {
      leftHandSrc = "/assets/hands/lefthand.png",
      rightHandSrc = "/assets/hands/righthand.png",
      initialTheme = "copper",
      className = "",
      onThemeChange,
      onGridChange,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [theme, setTheme] = useState<AsciiTheme>(initialTheme);
    const [gridActive, setGridActive] = useState<boolean>(false);

    // Imperative control handle
    useImperativeHandle(ref, () => ({
      cycleTheme: () => {
        setTheme((prev) => {
          const next: AsciiTheme =
            prev === "copper" ? "lime" : prev === "lime" ? "white" : "copper";
          onThemeChange?.(next);
          return next;
        });
      },
      toggleGrid: () => {
        setGridActive((prev) => {
          const next = !prev;
          onGridChange?.(next);
          return next;
        });
      },
      theme,
      gridActive,
    }));

    useEffect(() => {
      onThemeChange?.(theme);
    }, [theme, onThemeChange]);

    useEffect(() => {
      onGridChange?.(gridActive);
    }, [gridActive, onGridChange]);

    // Keyboard shortcuts (C for color, G for grid)
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        ) {
          return;
        }

        if (e.key === "c" || e.key === "C") {
          setTheme((prev) => {
            const next: AsciiTheme =
              prev === "copper" ? "lime" : prev === "lime" ? "white" : "copper";
            onThemeChange?.(next);
            return next;
          });
        } else if (e.key === "g" || e.key === "G") {
          setGridActive((prev) => {
            const next = !prev;
            onGridChange?.(next);
            return next;
          });
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onThemeChange, onGridChange]);

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      let animationFrameId: number;
      let time = 0;
      let convergenceOffset = 45; // Starts separated, scrubs inward on scroll

      const mouse = {
        x: -9999,
        y: -9999,
        active: false,
      };

      // Load Images
      const leftImg = new Image();
      const rightImg = new Image();
      leftImg.crossOrigin = "anonymous";
      rightImg.crossOrigin = "anonymous";

      let loadedCount = 0;
      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount === 2) {
          resize();
        }
      };

      leftImg.onload = onImageLoad;
      rightImg.onload = onImageLoad;
      leftImg.src = getAssetPath(leftHandSrc);
      rightImg.src = getAssetPath(rightHandSrc);

      interface Particle {
        origX: number;
        origY: number;
        x: number;
        y: number;
        vx: number;
        vy: number;
        char: string;
        scrambleChar: string;
        scrambleTimer: number;
        brightness: number;
        side: "left" | "right";
      }

      let particles: Particle[] = [];
      let cols = 150;
      let rows = 60;
      let cellW = 0;
      let cellH = 0;
      let fontSize = 11;

      const sampleCanvas = document.createElement("canvas");
      const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

      const buildGrid = () => {
        if (loadedCount < 2 || !sampleCtx || canvas.width === 0 || canvas.height === 0) return;
        particles = [];

        sampleCanvas.width = cols;
        sampleCanvas.height = rows;
        sampleCtx.clearRect(0, 0, cols, rows);

        // Aspect ratio calculations:
        // Left hand sits in the left region: from x=0 to ~34% of width
        // Right hand sits in the right region: from ~66% to 100% of width
        // Center 32% zone is left open for the colophon text!
        // Responsive aspect ratio calculations:
        // On mobile (< 640px), reduce hand width ratio to 0.28-0.30 so center colophon has generous breathing room
        const isMobile = (container.clientWidth || window.innerWidth) < 640;
        const leftHandRatio = isMobile ? 0.30 : 0.35;
        const rightHandRatio = isMobile ? 0.29 : 0.34;

        const leftAspect = leftImg.height / leftImg.width;
        const leftW = Math.round(cols * leftHandRatio);
        const leftH = Math.round(leftW * leftAspect);
        const leftY = Math.round((rows - leftH) * (isMobile ? 0.38 : 0.42));

        const rightAspect = rightImg.height / rightImg.width;
        const rightW = Math.round(cols * rightHandRatio);
        const rightH = Math.round(rightW * rightAspect);
        const rightX = cols - rightW;
        const rightY = Math.round((rows - rightH) * (isMobile ? 0.44 : 0.46));

        // Draw left and right hands to offscreen sampling buffer
        sampleCtx.drawImage(leftImg, 0, leftY, leftW, leftH);
        sampleCtx.drawImage(rightImg, rightX, rightY, rightW, rightH);

        const imgData = sampleCtx.getImageData(0, 0, cols, rows).data;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = (r * cols + c) * 4;
            const red = imgData[idx];
            const green = imgData[idx + 1];
            const blue = imgData[idx + 2];
            const alpha = imgData[idx + 3] / 255;

            if (alpha < 0.08) continue;

            // Compute perceptual luminance with subtle boost
            let luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
            luminance = Math.max(0, Math.min(1, (luminance - 0.05) * 1.32)) * alpha;

            if (luminance < 0.06) continue;

            const charIndex = Math.min(
              DENSITY_GLYPHS.length - 1,
              Math.floor(luminance * DENSITY_GLYPHS.length)
            );
            const char = DENSITY_GLYPHS[charIndex];

            const posX = c * cellW + cellW / 2;
            const posY = r * cellH + cellH / 2;

            particles.push({
              origX: posX,
              origY: posY,
              x: posX,
              y: posY,
              vx: 0,
              vy: 0,
              char,
              scrambleChar: char,
              scrambleTimer: 0,
              brightness: luminance,
              side: c < cols / 2 ? "left" : "right",
            });
          }
        }
      };

      const resize = () => {
        if (!container || !canvas) return;
        const rect = container.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);

        // Responsive columns: fewer on mobile for high framerate
        cols = Math.floor(Math.min(160, Math.max(76, rect.width / 9.2)));
        cellW = canvas.width / cols;
        cellH = cellW * 1.7; // monospace height aspect
        rows = Math.ceil(canvas.height / cellH);
        fontSize = Math.floor(cellW * 1.55);

        buildGrid();
      };

      window.addEventListener("resize", resize);
      resize();

      // Mouse tracking
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        mouse.x = (e.clientX - rect.left) * scaleX;
        mouse.y = (e.clientY - rect.top) * scaleY;
        mouse.active = true;
      };

      const handleMouseLeave = () => {
        mouse.active = false;
        mouse.x = -9999;
        mouse.y = -9999;
      };

      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);

      // ScrollTrigger Parallax Convergence
      const st = ScrollTrigger.create({
        trigger: container,
        start: "top 95%",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          // As user reaches bottom, hands converge inward
          convergenceOffset = (1 - self.progress) * 55;
        },
      });

      // Render Loop
      const render = () => {
        time += 0.035;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = `700 ${fontSize}px var(--font-mono), "Space Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const currentPalette = THEME_PALETTES[theme];
        const hoverRadius = 85 * (canvas.width / (container.clientWidth || 1));

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Scroll convergence delta
          const sideDirection = p.side === "left" ? -1 : 1;
          const targetX = p.origX + sideDirection * convergenceOffset;

          // Idle sine wave floating
          const idleWave = Math.sin(time + (p.side === "left" ? 0 : Math.PI * 0.75)) * 3.5;
          const targetY = p.origY + idleWave;

          // Cursor proximity calculations
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (mouse.active && dist < hoverRadius) {
            const intensity = 1 - dist / hoverRadius;

            // Repel micro-physics
            const angle = Math.atan2(dy, dx);
            const repelForce = intensity * 16;
            p.vx += Math.cos(angle) * repelForce;
            p.vy += Math.sin(angle) * repelForce;

            // Character glitch / decoding effect
            if (Math.random() < 0.28) {
              p.scrambleChar =
                SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)];
              p.scrambleTimer = 6;
            }
          }

          if (p.scrambleTimer > 0) {
            p.scrambleTimer--;
            if (p.scrambleTimer === 0) {
              p.scrambleChar = p.char;
            }
          }

          // Damped spring physics returning particle to anchor
          p.vx = (p.vx + (targetX - p.x) * 0.12) * 0.82;
          p.vy = (p.vy + (targetY - p.y) * 0.12) * 0.82;
          p.x += p.vx;
          p.y += p.vy;

          // Draw ASCII glyph with nuanced color ramp
          const isGlitching = p.scrambleTimer > 0;
          if (isGlitching) {
            ctx.fillStyle = currentPalette.highlight;
            ctx.globalAlpha = 1.0;
            ctx.fillText(p.scrambleChar, p.x, p.y);
          } else {
            ctx.fillStyle = currentPalette.ramp(p.brightness);
            ctx.globalAlpha = Math.max(0.2, p.brightness);
            ctx.fillText(p.char, p.x, p.y);
          }
        }

        ctx.globalAlpha = 1.0;
        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        st.kill();
      };
    }, [leftHandSrc, rightHandSrc, theme]);

    return (
      <div
        ref={containerRef}
        className={`relative w-full h-[460px] sm:h-[520px] md:h-[580px] lg:h-[640px] flex items-center justify-center overflow-hidden select-none ${className}`}
      >
        {/* Giant Watermark Typography Submerged in Background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 top-auto flex items-end justify-center pointer-events-none select-none overflow-hidden z-0"
        >
          <span className="font-display font-black uppercase text-[15vw] sm:text-[14vw] md:text-[13vw] tracking-tighter text-white/[0.045] leading-[0.76] translate-y-[16%] whitespace-nowrap">
            ComputerSociety
          </span>
        </div>

        {/* The Dual ASCII Hands Canvas */}
        <canvas
          ref={canvasRef}
          className="relative z-10 w-full h-full block cursor-crosshair"
          style={{ touchAction: "none" }}
        />

        {/* Center Colophon Overlay Between the Fingers */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <div className="flex flex-col items-center gap-2.5 max-w-[260px] sm:max-w-md mx-auto">
            {/* Minimal Crosshair Icon */}
            <div className="w-6 h-6 flex items-center justify-center text-white/50">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>

            <div className="flex flex-col gap-1 text-white/80 font-mono text-[11px] sm:text-xs">
              <span className="text-white/40 text-[10px]">© 2026</span>
              <span className="font-medium text-white/95 tracking-tight text-xs sm:text-sm">
                IEEE Computer Society MBITS
              </span>
              <span className="text-white/45 text-[10px] sm:text-[11px] tracking-wide leading-tight">
                Advancing Computing as a Science & Profession.
              </span>
            </div>
          </div>
        </div>

        {/* Optional CRT Scanlines Overlay */}
        {gridActive && (
          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.55)_50%)] bg-[length:100%_4px] opacity-75"
          />
        )}
      </div>
    );
  }
);

DualAsciiHands.displayName = "DualAsciiHands";

export default DualAsciiHands;
