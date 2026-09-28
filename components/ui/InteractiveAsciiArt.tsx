"use client";

import React, { useEffect, useRef } from "react";
import InteractiveAscii from "./ascii-interactive.js";
import "./ascii-interactive.css";
import { getAssetPath } from "@/lib/utils";

export interface InteractiveAsciiArtProps {
  imageSrc?: string;
  theme?: "marble" | "matrix" | "amber" | "cyberpunk" | "ice" | "original";
  hoverMode?: "repel" | "glitch" | "spotlight" | "wave" | "reveal";
  columns?: number;
  enableGlow?: boolean;
  enableSound?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function InteractiveAsciiArt({
  imageSrc: propImageSrc,
  theme = "matrix",
  hoverMode = "glitch",
  columns = 110,
  enableGlow = true,
  enableSound = false,
  className = "",
  style = {},
}: InteractiveAsciiArtProps) {
  const imageSrc = getAssetPath(propImageSrc || "/assets/acsii.jpg");
  const containerRef = useRef<HTMLDivElement>(null);
  const asciiInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize interactive ASCII engine
    asciiInstanceRef.current = new InteractiveAscii(containerRef.current, {
      imageSrc,
      theme,
      hoverMode,
      columns,
      enableGlow,
      enableSound,
    });

    return () => {
      if (asciiInstanceRef.current) {
        asciiInstanceRef.current.destroy();
      }
    };
  }, [imageSrc]);

  // Update dynamic properties
  useEffect(() => {
    if (asciiInstanceRef.current) {
      asciiInstanceRef.current.setTheme(theme);
      asciiInstanceRef.current.setHoverMode(hoverMode);
      asciiInstanceRef.current.setOption("columns", columns);
      asciiInstanceRef.current.setOption("enableGlow", enableGlow);
      asciiInstanceRef.current.setOption("enableSound", enableSound);
    }
  }, [theme, hoverMode, columns, enableGlow, enableSound]);

  return (
    <div
      ref={containerRef}
      className={`ascii-frame select-none ${className}`}
      style={{
        aspectRatio: "475 / 567",
        width: "100%",
        ...style,
      }}
    />
  );
}
