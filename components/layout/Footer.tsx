"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Check, Globe } from "lucide-react";
import DualAsciiHands from "@/components/ui/DualAsciiHands";
import { getAssetPath } from "@/lib/utils";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setName("");
      setEmail("");
    }, 2500);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-obsidian-pure text-white pt-24 pb-10 border-t border-white/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* BRAND TRIAD LOGOS & STATEMENT */}
        <div className="flex flex-wrap items-center gap-6 pb-12 border-b border-white/10">
          <div className="relative h-9 w-28 opacity-85 hover:opacity-100 transition-opacity">
            <Image
              src={getAssetPath("/assets/logos/ieee-master.svg")}
              alt="IEEE Master"
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="h-5 w-px bg-white/15" />
          <div className="relative h-8 w-28 opacity-85 hover:opacity-100 transition-opacity">
            <Image
              src={getAssetPath("/assets/logos/ieee-cs.svg")}
              alt="IEEE Computer Society"
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="h-5 w-px bg-white/15" />
          <div className="relative h-8 w-28 opacity-85 hover:opacity-100 transition-opacity">
            <Image
              src={getAssetPath("/assets/logos/mbits-official.png")}
              alt="MBITS Student Branch"
              fill
              className="object-contain object-left brightness-0 invert"
            />
          </div>
          <div className="ml-auto hidden md:flex items-center gap-2 font-mono text-xs text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            <span>MBITS Campus, Kerala · Chapter #14591</span>
          </div>
        </div>

        {/* 3-COLUMN COLOPHON & DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 py-14 items-start border-b border-white/5">
          
          {/* COLUMN 1 (5 Cols): Chapter Mission & Updates */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <p className="text-white/70 text-sm leading-relaxed max-w-md font-sans">
              IEEE Computer Society Student Branch Chapter, Mar Athanasius College of
              Engineering Kothamangalam / MBITS Campus. Advancing computing as a science and
              profession through kernel architectures, intelligent pipelines, and open research.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 max-w-sm pt-2">
              <span className="font-mono text-xs text-white/70 uppercase tracking-wider block">
                Stay tuned to future updates
              </span>

              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-lime/50 focus:outline-none transition-colors"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.edu"
                  className="w-full bg-white/5 border border-white/10 rounded px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-lime/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 mt-1">
                <button
                  type="submit"
                  className="flex-1 bg-lime hover:bg-lime-glow text-black font-mono font-bold text-xs uppercase tracking-wider py-3 px-5 rounded transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(203,235,58,0.2)]"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-black" />
                      <span>SUBSCRIBED TO DISPATCHES</span>
                    </>
                  ) : (
                    <span>JOIN DISPATCHES</span>
                  )}
                </button>
              </div>

              <span className="font-mono text-[11px] text-white/35">
                Zero spam. Research and chapter releases only.
              </span>
            </form>

            {/* Status indicators */}
            <div className="flex flex-col gap-2 pt-1 font-mono text-xs text-white/70">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                <span className="uppercase tracking-wider text-[11px]">
                  ENROLLING RESEARCHERS · 2026 COHORT
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime/60" />
                <span className="uppercase tracking-wider text-[11px]">
                  LIMITED LAB FELLOWSHIPS AVAILABLE
                </span>
              </div>
            </div>
          </div>

          {/* COLUMN 2 (3 Cols): Navigation */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs sm:text-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-lime/90 block mb-2">
              Navigation
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#manifesto"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Manifesto
                </Link>
              </li>
              <li>
                <Link
                  href="#works"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Selected Works
                </Link>
              </li>
              <li>
                <Link
                  href="#reveal"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Ideology
                </Link>
              </li>
              <li>
                <Link
                  href="#tracks"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Engineering Tracks
                </Link>
              </li>
              <li>
                <Link
                  href="#membership"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Fellowship Plans
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Protocol FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 (4 Cols): Direct Contacts & Institutional Links */}
          <div className="md:col-span-4 flex flex-col gap-4 text-xs sm:text-sm">
            <span className="font-mono text-xs uppercase tracking-widest text-lime/90 block mb-2">
              Communication & Lab
            </span>

            <div className="flex flex-col gap-2 font-mono text-xs">
              <a
                href="mailto:ieee.cs@mbits.ac.in"
                className="text-white/70 hover:text-lime transition-colors underline decoration-white/20 underline-offset-4 w-fit"
              >
                ieee.cs@mbits.ac.in
              </a>
              <a
                href="mailto:chair.cs@mbits.ac.in"
                className="text-white/70 hover:text-lime transition-colors underline decoration-white/20 underline-offset-4 w-fit"
              >
                chair.cs@mbits.ac.in
              </a>
              <a
                href="mailto:research.cs@mbits.ac.in"
                className="text-white/70 hover:text-lime transition-colors underline decoration-white/20 underline-offset-4 w-fit"
              >
                research.cs@mbits.ac.in
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-1.5 text-xs text-white/50">
              <a
                href="https://computer.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Globe className="w-3.5 h-3.5 text-lime" />
                <span>IEEE Computer Society Global</span>
              </a>
              <a
                href="https://www.ieee.org/about/help/security-privacy.html"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors underline decoration-white/10 underline-offset-2 w-fit"
              >
                IEEE Privacy Policy
              </a>
              <a
                href="https://www.ieee.org/about/corporate/governance/p9-26.html"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors underline decoration-white/10 underline-offset-2 w-fit"
              >
                IEEE Code of Ethics
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* DUAL CONVERGING ASCII HANDS STAGE */}
      <div className="w-full relative mt-4">
        <DualAsciiHands
          leftHandSrc="/assets/hands/lefthand.png"
          rightHandSrc="/assets/hands/righthand.png"
        />
      </div>

      {/* BOTTOM UTILITY BAR */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40 border-t border-white/5">
        <div className="flex flex-wrap items-center gap-2">
          <span>© 2026 IEEE CS MBITS CHAPTER #14591</span>
          <span>•</span>
          <span>ALL RIGHTS RESERVED</span>
          {time && (
            <>
              <span>•</span>
              <span className="text-lime/70">{time}</span>
            </>
          )}
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-lime hover:text-lime transition-all duration-300 cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
