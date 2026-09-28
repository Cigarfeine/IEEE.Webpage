"use client";

import React from "react";
import InteractiveAsciiArt from "./InteractiveAsciiArt";
import { getAssetPath } from "@/lib/utils";

interface AsciiViewerProps {
  className?: string;
}

export default function AsciiViewer({ className = "" }: AsciiViewerProps) {
  return (
    <div
      className={`relative w-full flex items-center justify-end select-none ${className}`}
    >
      <InteractiveAsciiArt
        imageSrc={getAssetPath("/assets/acsii.jpg")}
        theme="matrix"
        hoverMode="glitch"
        columns={128}
        enableGlow={false}
        className="w-full h-auto ml-auto"
      />
    </div>
  );
}
