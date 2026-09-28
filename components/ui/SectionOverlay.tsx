"use client";

import React from "react";
import clsx from "clsx";

interface SectionOverlayProps {
  id?: string;
  className?: string;
}

export default function SectionOverlay({ id, className }: SectionOverlayProps) {
  return (
    <div
      id={id}
      aria-hidden="true"
      className={clsx(
        "g_section-overlay pointer-events-none absolute inset-0 z-30 bg-[#181818] opacity-0 transition-opacity duration-300",
        className
      )}
    />
  );
}
