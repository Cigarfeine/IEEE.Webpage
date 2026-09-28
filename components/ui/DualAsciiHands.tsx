"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAssetPath } from "@/lib/utils";

interface DualAsciiHandsProps {
  leftHandSrc?: string;
  rightHandSrc?: string;
  className?: string;
}

// Strictly Signature Acid Lime palette matching home ASCII art
const LIME_PALETTE = {
  fg: "#CBEB3A",
  accent: "#DDF45B",
  highlight: "#F5FFB8",
  ramp: (lum: number) => {
    if (lum < 0.22) return "#455904";
    if (lum < 0.45) return "#7a9b0c";
    if (lum < 0.72) return "#CBEB3A";
    if (lum < 0.88) return "#DDF45B";
    return "#F5FFB8";
  },
};

// Pure ASCII art gradient characters matching home ascii viewer
const ASCII_CHARS = ".:-=+*#%@";
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

export default function DualAsciiHands({
  leftHandSrc = "/assets/hands/lefthand.png",
  rightHandSrc = "/assets/hands/righthand.png",
  className = "",
}: DualAsciiHandsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let convergenceOffset = 40; // Starts slightly separated, smoothly converges on scroll

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    // Load Hand Images
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
    const fontAspect = 1.7; // Standard monospace aspect ratio (height = 1.7 * width)

    const sampleCanvas = document.createElement("canvas");
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

    const buildGrid = () => {
      if (loadedCount < 2 || !sampleCtx || canvas.width === 0 || canvas.height === 0) return;
      particles = [];

      sampleCanvas.width = cols;
      sampleCanvas.height = rows;
      sampleCtx.clearRect(0, 0, cols, rows);

      // Responsive clearance so center colophon always breathes
      const isMobile = (container.clientWidth || window.innerWidth) < 640;
      const leftHandRatio = isMobile ? 0.30 : 0.35;
      const rightHandRatio = isMobile ? 0.29 : 0.34;

      // UN-STRETCHED ASPECT RATIO:
      // Dividing by fontAspect (1.7) corrects the physical height distortion
      // ensuring hands appear completely natural and not vertically stretched
      const leftAspect = leftImg.height / leftImg.width;
      const leftW = Math.round(cols * leftHandRatio);
      const leftH = Math.round((leftW * leftAspect) / fontAspect);
      const leftY = Math.round((rows - leftH) * 0.5);

      const rightAspect = rightImg.height / rightImg.width;
      const rightW = Math.round(cols * rightHandRatio);
      const rightH = Math.round((rightW * rightAspect) / fontAspect);
      const rightX = cols - rightW;
      const rightY = Math.round((rows - rightH) * 0.5);

      // Draw hands into sample canvas with corrected proportions
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

          // Perceptual luminance
          let luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
          luminance = Math.max(0, Math.min(1, (luminance - 0.05) * 1.3)) * alpha;

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

      // Responsive column density
      cols = Math.floor(Math.min(160, Math.max(76, rect.width / 9.2)));
      cellW = canvas.width / cols;
      cellH = cellW * fontAspect;
      rows = Math.ceil(canvas.height / cellH);
      fontSize = Math.floor(cellW * 1.55);

      buildGrid();
    };

    window.addEventListener("resize", resize);
    resize();

    // Mouse Tracking
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

    // Scroll Convergence Scrub (GSAP)
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 95%",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        // Hands subtly glide inward from outer edges as user scrolls to footer
        convergenceOffset = (1 - self.progress) * 45;
      },
    });

    // Render Loop (Same gentle, low-intensity shimmer as home ASCII engine)
    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `700 ${fontSize}px var(--font-mono), "Space Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Subtle, controlled hover radius matching home ASCII art
      const hoverRadius = 65 * (canvas.width / (container.clientWidth || 1));

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Parallax convergence
        const sideDirection = p.side === "left" ? -1 : 1;
        const targetX = p.origX + sideDirection * convergenceOffset;

        // Subtle ambient breathing float
        const idleWave = Math.sin(time + (p.side === "left" ? 0 : Math.PI * 0.75)) * 3;
        const targetY = p.origY + idleWave;

        // Keep particle anchored (no violent scattering or repulsion)
        p.x = targetX;
        p.y = targetY;

        // Subtle hover shimmer
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && dist < hoverRadius && dist > 0.001) {
          const proximityFactor = 1 - dist / hoverRadius;

          // Low-intensity character scramble matching home art
          if (p.char && p.char !== " " && p.brightness >= 0.12) {
            if (Math.random() < 0.15 + proximityFactor * 0.12) {
              const candidate = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
              p.scrambleChar = candidate;
              p.scrambleTimer = 5; // Fast 5-frame recovery
            }
          }
        }

        if (p.scrambleTimer > 0) {
          p.scrambleTimer--;
          if (p.scrambleTimer === 0) {
            p.scrambleChar = p.char;
          }
        }

        // Render glyph in signature lime
        const isGlitching = p.scrambleTimer > 0;
        if (isGlitching) {
          ctx.fillStyle = LIME_PALETTE.highlight;
          ctx.globalAlpha = 1.0;
          ctx.fillText(p.scrambleChar, p.x, p.y);
        } else {
          ctx.fillStyle = LIME_PALETTE.ramp(p.brightness);
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
  }, [leftHandSrc, rightHandSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* The Dual ASCII Hands Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full block cursor-crosshair"
        style={{ touchAction: "none" }}
      />

      {/* Center Colophon Overlay Between the Fingers */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4">
        <div className="flex flex-col items-center gap-2.5 max-w-[260px] sm:max-w-md mx-auto">
          {/* Minimal Crosshair Icon in subtle lime */}
          <div className="w-6 h-6 flex items-center justify-center text-lime/50">
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
    </div>
  );
}
