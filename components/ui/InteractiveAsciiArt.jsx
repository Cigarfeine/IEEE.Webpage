"use client";

import React, { useEffect, useRef } from 'react';
import InteractiveAscii from './ascii-interactive.js';
import './ascii-interactive.css';

/**
 * React Component for Interactive ASCII Art
 * 
 * Props:
 * - imageSrc: string (URL or imported image asset)
 * - theme: 'marble' | 'matrix' | 'amber' | 'cyberpunk' | 'ice' | 'original'
 * - hoverMode: 'repel' | 'glitch' | 'spotlight' | 'wave' | 'reveal'
 * - columns: number (grid density, e.g. 100-140)
 * - enableGlow: boolean
 * - enableSound: boolean
 * - className: string
 */
export default function InteractiveAsciiArt({
  imageSrc = '/acsii.jpg',
  theme = 'marble',
  hoverMode = 'repel',
  columns = 110,
  enableGlow = true,
  enableSound = false,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const asciiInstanceRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize interactive ASCII engine
    asciiInstanceRef.current = new InteractiveAscii(containerRef.current, {
      imageSrc,
      theme,
      hoverMode,
      columns,
      enableGlow,
      enableSound
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
      asciiInstanceRef.current.setOption('columns', columns);
      asciiInstanceRef.current.setOption('enableGlow', enableGlow);
      asciiInstanceRef.current.setOption('enableSound', enableSound);
    }
  }, [theme, hoverMode, columns, enableGlow, enableSound]);

  return (
    <div
      ref={containerRef}
      className={`ascii-frame ascii-scanlines ${className}`}
      style={{
        aspectRatio: '675 / 587',
        width: '100%',
        maxWidth: '680px',
        ...style
      }}
    />
  );
}
