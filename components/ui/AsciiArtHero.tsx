import React, { useEffect, useRef } from 'react';
import InteractiveAscii from './ascii-interactive';

export default function AsciiArtHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ascii = new (InteractiveAscii as any)(containerRef.current, {
      imageSrc: '/acsii.jpg',
      theme: 'marble',
      hoverMode: 'glitch',
      charSet: 'standard',
      columns: 150,
      hoverRadius: 40,
      enableGlow: true,
      transparentBg: true,
      bgThreshold: 0.11,
      contrast: 1.15,
      brightness: 1.1
    });
    return () => ascii.destroy();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="ascii-frame ascii-scanlines w-full max-w-2xl" 
      style={{ aspectRatio: '675 / 587' }}
    />
  );
}
