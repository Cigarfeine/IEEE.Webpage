"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Globe } from "lucide-react";

export default function Footer() {
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

  const scrollToTop = () => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-obsidian-pure text-white pt-24 pb-12 border-t border-white/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Triad Logos Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10 items-start">
          <div className="md:col-span-6 flex flex-col gap-6">
            {/* Triad Logos */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative h-10 w-28 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/assets/logos/ieee-master.svg"
                  alt="IEEE Master"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="relative h-9 w-28 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/assets/logos/ieee-cs.svg"
                  alt="IEEE Computer Society"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="relative h-9 w-28 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/assets/logos/mbits-official.png"
                  alt="MBITS Student Branch"
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </div>

            <p className="text-white/60 text-sm max-w-md leading-relaxed">
              IEEE Computer Society Student Branch Chapter, Mar Athanasius College of
              Engineering Kothamangalam / MBITS Campus. Advancing computing as a science and
              profession.
            </p>

            <div className="flex items-center gap-2 font-mono text-xs text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
              <span>MBITS Campus, Kerala</span>
            </div>
          </div>

          {/* Directory Columns */}
          <div className="md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#manifesto"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Manifesto
                </a>
              </li>
              <li>
                <a
                  href="#works"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Selected Works
                </a>
              </li>
              <li>
                <a
                  href="#reveal"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Ideology
                </a>
              </li>
              <li>
                <a
                  href="#tracks"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Tracks
                </a>
              </li>
              <li>
                <a
                  href="#membership"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Fellowship
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50 block mb-4">
              Community
            </span>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current text-lime" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Organization</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current text-lime" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn Chapter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current text-lime" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Twitter / X Updates</span>
                </a>
              </li>
              <li>
                <a
                  href="https://computer.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-lime" />
                  <span>IEEE Computer Society Global</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Monumental Full-Bleed Watermark Marquee in Syne (Matches Habito Studio Footer Marquee) */}
      <div className="py-10 sm:py-16 border-y border-white/10 overflow-hidden select-none w-full my-8 bg-black/40">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
          {[0, 1, 2, 3].map((setIdx) => (
            <div key={setIdx} className="flex items-center gap-8 shrink-0">
              <span className="font-display font-extrabold uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-white/5 hover:text-white/10 transition-colors">
                IEEE COMPUTER SOCIETY
              </span>
              <span className="w-3 h-3 rounded-full bg-lime/20 shrink-0" />
              <span className="font-display font-extrabold uppercase text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-lime/10 hover:text-lime/20 transition-colors">
                MBITS #14591
              </span>
              <span className="w-3 h-3 rounded-full bg-lime/20 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <span>© 2026 IEEE CS MBITS CHAPTER #14591</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-lime hover:text-lime transition-all duration-300"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
