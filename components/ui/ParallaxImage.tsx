"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  speed?: number; // travel percentage (e.g. 12 means -12% to +12%)
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  aspectRatio = "aspect-[16/10]",
  speed = 12,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  overlay = true,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    // Set initial offset for smooth window parallax
    gsap.set(img, {
      yPercent: -speed,
      willChange: "transform",
    });

    const tween = gsap.to(img, {
      yPercent: speed,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${aspectRatio} ${containerClassName}`}
    >
      {/* Oversized Parallax Image wrapper */}
      <div
        ref={imgRef}
        className="absolute inset-[-14%] w-[128%] h-[128%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${className}`}
        />
      </div>

      {/* Subtle Good-Fella editorial vignette / dark scrim */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      )}
    </div>
  );
}
